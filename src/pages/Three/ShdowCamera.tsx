import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ShdowCamera = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => { 
        
        const container = containerRef.current!;
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ canvas: container });
        renderer.setSize(container.clientWidth, container.clientHeight);

        // 创建光源（平行光，模拟阳光）
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = container.clientWidth;
        directionalLight.shadow.mapSize.height = container.clientHeight;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        scene.add(directionalLight);

        // 增加环境光
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.y = 1;
        sphere.castShadow = true;
        scene.add(sphere);

        //创建地面
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2; // 使平面水平
        plane.position.y = -2; // 设置平面位置
        plane.receiveShadow = true;
        scene.add(plane);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 启用阻尼效果

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

    }, [])

    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }}></canvas>
    )
}

export default ShdowCamera;