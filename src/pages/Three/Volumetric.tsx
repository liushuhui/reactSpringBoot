import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, RenderPass } from "postprocessing";
import { GodraysPass } from "three-good-godrays";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Volumetric = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const renderer = new THREE.WebGLRenderer({
            canvas: container,
            antialias: true,
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 4, 15);
        camera.lookAt(0, 4, -2);

        // 窗户框
        const frame = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 1), new THREE.MeshStandardMaterial({ color: 0x555555 }));

        // 栏杆（制造遮挡）
        for (let i = -3; i <= 3; i += 1.5) {
            const barMesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 8, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
            barMesh.position.set(i, 4, -5);
            barMesh.castShadow = true;
            scene.add(barMesh);
        }
        scene.add(new THREE.AmbientLight(0xff0000));
        // 地板
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        floor.receiveShadow = true;
        scene.add(floor);

        //墙面（后墙与左墙）
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
        const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(20, 15), wallMaterial);
        wallBack.position.set(0, 5, -10);
        scene.add(wallBack);

        const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(20, 15), wallMaterial);
        wallLeft.position.set(-10, 5, 0);
        wallLeft.rotation.y = -Math.PI / 2;
        scene.add(wallLeft);

        const light = new THREE.DirectionalLight(0xffffff, 10);
        light.position.set(0, 12, -10);
        light.target.position.set(0, 4, 0);
        light.castShadow = true;
        light.shadow.mapSize.set(1024, 1024);
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 50;
        scene.add(light);
        scene.add(light.target);

        let params = {
            density: 0.01,
            gammaCorrection: true,
        }

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        let godraysPass = new GodraysPass(light, camera, {
            density: params.density,
            gammaCorrection: params.gammaCorrection,

        });

        godraysPass.renderToScreen = true;
        composer.addPass(godraysPass);

        const controls = new OrbitControls(camera, container);
        controls.enableDamping = true;
        const updateGodarys = () => {
            composer.removePass(godraysPass);
            godraysPass = new GodraysPass(light, camera, {
                density: params.density,
                gammaCorrection: params.gammaCorrection,

            });
            godraysPass.renderToScreen = true;
            composer.addPass(godraysPass);
        }



        const gui = new GUI();
        gui.add(params, "density", 0.0001, 0.02, 0.0001).onChange(updateGodarys);
        gui.add(params, "gammaCorrection").onChange(updateGodarys);


        frame.position.set(0, 2, -6);
        frame.castShadow = true;
        scene.add(frame);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
            composer.render();
        }

        animate();
    })

    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }}></canvas>
    )
}

export default Volumetric;