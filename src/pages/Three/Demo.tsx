import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


const Demo = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const container = containerRef.current!;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.01, 3000);
        camera.position.set(0, 2, 8);

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshLambertMaterial({ color: 0x00ff7f })
        );

        scene.add(mesh);

        scene.add(new THREE.GridHelper(5, 10, 0x888888, 0x444444));
        scene.add(new THREE.AmbientLight(0xffffff));
        const light = new THREE.DirectionalLight(0xffffff, 10);
        light.position.set(1, 1, 1);
        scene.add(light);

        const orbit = new OrbitControls(camera, container);

        const controls = new TransformControls(camera, container);

        controls.addEventListener('dragging-changed', function (event) {
            orbit.enabled = !event.value;
        });

        controls.attach(mesh);
        scene.add(controls.getHelper());
        const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        scene.add(camera);

        renderer.render(scene, camera);
        orbit.addEventListener('change', function () {
            renderer.render(scene, camera);
        });
        controls.addEventListener('change', function () {
            renderer.render(scene, camera);
        });

    }, []);
    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }}></canvas>
    )

}

export default Demo;