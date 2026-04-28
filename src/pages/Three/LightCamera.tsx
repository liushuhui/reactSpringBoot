import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const LightCamera = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current as HTMLCanvasElement;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        // 创建球体
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff }); // 球体材质，使用标准材质
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const controls = new OrbitControls(camera, canvas);
        controls.update();

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);


        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 300, 0); // 点光源，颜色为白色，强度为200, 距离为0
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0xffffff, 100);
        spotLight.position.set(10, 10, 10);
        spotLight.target = sphere;
        scene.add(spotLight);

        // directionalLight.castShadow = true;
        // // renderer.shadowMap.enabled = true;
        // spotLight.angle = Math.PI / 4;
        // spotLight.penumbra = 0.2; // 设置阴影边缘柔和度

        renderer.render(scene, camera);

        const handleResize = () => {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }, [])

    return (
        <canvas ref={canvasRef} style={{ width: 1000, height: 600 }}></canvas>
    )

}
export default LightCamera;