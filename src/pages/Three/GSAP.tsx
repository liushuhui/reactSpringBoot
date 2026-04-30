import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"

const GSAP = () => {
    const containerRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = containerRef.current!;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 2;
        scene.add(sphere);

        // 使用 gsap 动画相机
        gsap.to(camera.position, { duration: 2, z: 10, ease: "power1.inOut" });

        // 使用GSAP让立方体旋转
        gsap.to(cube.rotation, { duration: 5, y: Math.PI * 2, ease: "elastic.out" });

        // 创建时间线
        const t1 = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });

        // 添加更平滑的动画序列
        t1.to(cube.position, { duration: 2, x: 2, ease: "power1.inOut" })
            .to(sphere.position, { duration: 2, y: 2, ease: "elastic.out(1, 0.3)" }, "-=1.5")
            .to(camera.position, { duration: 3, z: 8, ease: "power1.inOut" }, "-=1")


        // 添加自动旋转
        gsap.to(cube.rotation, { duration: 8, y: Math.PI * 2, epeat: -1, ease: "none" });
        gsap.to(sphere.rotation, { duration: 6, x: Math.PI * 2, repeat: -1, ease: "none" });
        function animate() {
            requestAnimationFrame(animate);
            controls.update();

            renderer.render(scene, camera);
        }

        animate();

    }, [])

    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }} />
    )
}

export default GSAP