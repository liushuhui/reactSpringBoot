import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
const EffectComposerCamera = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const container = containerRef.current!;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x999999);

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas: container });
        renderer.setSize(container.clientWidth, container.clientHeight);

        const controls = new OrbitControls(camera, container);
        controls.enableDamping = true;

        // 创建效果合成器
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        // 创建轮廓线效果
        const outlinePass = new OutlinePass(new THREE.Vector2(container.clientWidth, container.clientHeight), scene, camera);
        outlinePass.edgeStrength = 3; // 边缘强度
        outlinePass.edgeGlow = 1; // 发光强度
        outlinePass.edgeThickness = 1; // 边缘厚度
        outlinePass.pulsePeriod = 10; // 脉冲周期
        outlinePass.visibleEdgeColor.set("#ffffff"); // 可见边缘颜色
        outlinePass.hiddenEdgeColor.set("#190a05"); // 被遮挡边缘颜色
        composer.addPass(outlinePass);

        // 创建几个不同的几何体
        const geometries = [
            new THREE.BoxGeometry(),
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.ConeGeometry(0.5, 1, 32)
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xff0000 }),
            new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
            new THREE.MeshPhongMaterial({ color: 0x0000ff })
        ];

        const meshes: any[] = [];

        //创建多个物体并随机分布
        for (let i = 0; i < 3; i++) {
            const mesh = new THREE.Mesh(geometries[i], materials[i]);
            mesh.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
            scene.add(mesh);
            meshes.push(mesh);
        }


        const ambiLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambiLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event: MouseEvent) {
            const rect = renderer.domElement.getBoundingClientRect();

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(meshes);

            if (intersects.length > 0) {
                // 选中第一个相交的物体
                outlinePass.selectedObjects = [intersects[0].object];
            } else {
                // 没有相交的物体，清空选中
                outlinePass.selectedObjects = [];
            }
        }

        function onWindowResize() { 
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener("resize", onWindowResize);
        window.addEventListener("mousemove", onMouseMove)

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            composer.render();
            // renderer.render(scene, camera);
        }

        animate();


        return () => { 
            window.removeEventListener("resize", onWindowResize);
            window.removeEventListener("mousemove", onMouseMove);
        };

    }, []);


    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }}></canvas>
    )
}

export default EffectComposerCamera;