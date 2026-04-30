import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const OutlineEffect = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = containerRef.current as HTMLCanvasElement;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const cubes: any[] = [];
        const colors = [
            //绿色
            {
                color: 0x00ff00,
                intensity: 5
            },
            //蓝色
            {
                color: 0x0000ff,
                intensity: 15
            },
            //黄色
            {
                color: 0xffff00,
                intensity: 2.5
            },

        ];

        colors.forEach((colorInfo, index) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: colorInfo.color });
            const emissiveMaterial = new THREE.MeshStandardMaterial({
                color: colorInfo.color,
                emissive: colorInfo.color,
                emissiveIntensity: colorInfo.intensity,
                transparent: true,
                opacity: 0.8,
            });

            const cube = new THREE.Mesh(geometry, [
                material,
                material,
                material,
                material,
                emissiveMaterial, // 仅使用发光材质作为立方体的一个面
                material,
            ]);

            // 将立方体均匀分布在屏幕上，增加间距
            const totalCubes = colors.length;
            cube.position.x = (index - (totalCubes - 1) / 2) * 8;// 增加间距从 2.5 到 5
            cube.position.z = -5;
            scene.add(cube);
            cubes.push(cube);

        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            3.0, // 更高的强度
            0.4,
            0.85
        );
        composer.addPass(bloomPass);

        function animate() {
            requestAnimationFrame(animate);
            cubes.forEach((cube, index) => {
                cube.rotation.x += 0.01 * (index + 1);
                cube.rotation.y += 0.01 * (index + 1);
            });
            composer.render();
        }

        animate();

    }, [])

    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }} />
    )
}

export default OutlineEffect