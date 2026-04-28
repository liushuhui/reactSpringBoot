import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";


const OrthographicCamera = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPerspective, setIsPerspective] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;

        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xeeeeee);

        // 添加光源
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);

        //创建多个立方体，分布在不同的深度
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const meterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

        const cubes: THREE.Mesh[] = [];
        for (let i = 0; i < 10; i++) {
            const cube = new THREE.Mesh(geometry, meterial);
            cube.position.set(i, Math.sin(i * 0.5), i * 5); // 加大纵深深度
            scene.add(cube);
            cubes.push(cube);
        }

        // 添加地面辅助线
        const gridHelper = new THREE.GridHelper(30, 20);
        scene.add(gridHelper);

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ canvas });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // 创建透视相机
        const aspect = canvas.clientWidth / canvas.clientHeight;
        const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        perspectiveCamera.position.set(10, 10, 30); //设置相机位置，拉远相机
        perspectiveCamera.lookAt(0, 0, 0);

        // 创建正交相机
        const orthographicCamera = new THREE.OrthographicCamera(
            -10 * aspect, // 左
            10 * aspect, // 右
            10, // 上
            -10, // 下
            0.1, // 近裁剪面
            1000 // 远裁剪面
        );
        orthographicCamera.position.set(10, 10, 30);
        orthographicCamera.lookAt(0, 0, 0);

        let currentCamera = isPerspective ? perspectiveCamera : orthographicCamera;
        //动画
        const animate = () => {
            requestAnimationFrame(animate);
            cubes.forEach(cube => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

            });
            renderer.render(scene, currentCamera);
        }

        animate()
    }, [isPerspective])

    return (
        <div>
            <Button type="primary" onClick={() => { setIsPerspective(!isPerspective) }}>切换相机</Button>
            <canvas ref={canvasRef} style={{width: 1000, height: 600}}></canvas>
        </div>
    )
}

export default OrthographicCamera;