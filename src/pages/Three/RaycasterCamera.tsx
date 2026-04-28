import { useEffect, useRef } from "react";
import * as THREE from "three";

const RaycasterCamera = () => {


    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current!;
        const scene = new THREE.Scene();

        const gui = new dat.GUI();

        // 相机：视角设置为 75 度，近裁剪面 0.1，远裁剪面 1000
        const camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        // 将相机位置向后移动
        camera.position.set(0, 0, 5);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const ambientLight = new THREE.AmbientLight(0xffffff); // 增强环境光强度
        scene.add(ambientLight);

        const geometry = new THREE.BoxGeometry();
        const originalColor = 0x00ff00;
        const material = new THREE.MeshBasicMaterial({ color: originalColor });
        // 将立方体位置调整到相机前方
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event: MouseEvent) {
            const rect = renderer.domElement.getBoundingClientRect();

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }

        let previousIntersected: any = null;

        function animate() {
            requestAnimationFrame(animate);

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (
                previousIntersected &&
                (!intersects.length || previousIntersected !== intersects[0].object)
            ) {
                previousIntersected.material.color.setHex(originalColor);
                previousIntersected = null;
            }

            if (intersects.length > 0) {
                const intersectedObject: any = intersects[0].object;
                if (previousIntersected !== intersectedObject) {
                    intersectedObject.material.color.setHex(0xff0000);
                    previousIntersected = intersectedObject;
                }
            }

            renderer.render(scene, camera);
        }

        animate();
        renderer.domElement.addEventListener("mousemove", onMouseMove, false);

        return () => {
            renderer.domElement.removeEventListener("mousemove", onMouseMove, false);
        }

    }, [])



    return (
        <canvas ref={canvasRef} style={{ width: 1000, height: 600 }}></canvas>
    )
}

export default RaycasterCamera;