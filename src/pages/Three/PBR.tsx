import { useEffect, useRef } from "react"
import * as THREE from "three"

const PBR = () => {

    const containerRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = containerRef.current as HTMLCanvasElement;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x555555);
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const normalMap = new THREE.TextureLoader().load("https://threejs.org/examples/textures/waternormals.jpg", () => {
            renderer.render(scene, camera);
        });

        const materialMetal = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa, // 非金属颜色
            metalness: 1, // 设为1表示金属表面
            normalMap,
            roughness: 0.3, // 设置粗糙度
            // normalScale: new THREE.Vector2(1, 1),
        });

        const materialNonMetal = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa, // 非金属颜色
            metalness: 0.5, // 设为0表示非金属表面
            roughness: 0.7, // 设置粗糙度
            normalMap
        });

        

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(2, 2, 2);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMetal = new THREE.Mesh(geometry, materialMetal);
        sphereMetal.position.x = -2;

        const sphereNonMetal = new THREE.Mesh(geometry, materialNonMetal);
        sphereNonMetal.position.x = 2;
        scene.add(sphereMetal, sphereNonMetal);

        renderer.render(scene, camera);

    }, [])

    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }} />
    )
}

export default PBR