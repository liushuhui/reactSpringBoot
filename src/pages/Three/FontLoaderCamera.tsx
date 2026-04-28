import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";


const FontLoaderCamera = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current as HTMLCanvasElement;
        const gui = new dat.GUI();
        // 创建场景
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // 添加轨道控制器
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        // 添加灯光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        // 加载字体
        const fontLoader = new FontLoader();
        fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
            // 创建文本几何体
            const textGeometry: any = new TextGeometry("Hello Three.js!", {
                font,
                size: 1.5, // 字体大小
                depth: 0.2, // 文字厚度
                curveSegments: 12, // 曲线分段数
                bevelEnabled: true, // 启用斜角
                bevelThickness: 0.03, // 斜角深度
                bevelSize: 0.02, // 斜角大小
                bevelOffset: 0, // 斜角偏移
                bevelSegments: 5, // 斜角分段数
            });

            // 创建材质
            const textMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff00, // 材质颜色-绿色
                specular: 0x999999, // 镜面高光颜色
                shininess: 30, // 镜面高光亮度
            });

            //创建网格
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            //居中文本
            textGeometry.computeBoundingBox();
            const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
            textMesh.position.x = centerOffset; // 文本居中

            // 创建一个对象来控制立方体的参数
            const cubeParams = {
                rotationX: textMesh.rotation.x,
                rotationY: textMesh.rotation.y,
                color: textMesh.material.color.getHex(),
            };

            gui.add(cubeParams, "rotationX", 0, Math.PI * 2).onChange((value) => {
                textMesh.rotation.x = value;
            });
            gui.add(cubeParams, "rotationY", 0, Math.PI * 2).onChange((value) => {
                textMesh.rotation.y = value;
            });
            gui.addColor(cubeParams, "color").onChange((value) => {
                textMesh.material.color.setHex(value);
            });

            scene.add(textMesh);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: 1000, height: 600 }}></canvas>
    )
}

export default FontLoaderCamera;