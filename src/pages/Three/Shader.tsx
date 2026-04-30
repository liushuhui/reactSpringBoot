import { useEffect, useRef } from "react";
import * as THREE from "three";
const Shader = () => {
    const containerRef = useRef<HTMLCanvasElement>(null);

    const vertexShader = `
        varying float vXPos;
        uniform float uTime;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vXPos = position.x;
            }
        `;

    const fragmentShader = `
        varying float vXPos;
        uniform float uTime;
        void main() {
            float t = (vXPos + 1.0) * 0.5 + sin(uTime) * 0.25;
            vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), t);
            gl_FragColor = vec4(color, 1.0);
        }
        `;

    useEffect(() => {
        const canvas = containerRef.current as HTMLCanvasElement;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
            },
        });

        const geometry = new THREE.BoxGeometry(2, 2);

        const plane = new THREE.Mesh(geometry, material);
        
        scene.add(plane);
        let startTime = Date.now();
        function animate() {
            requestAnimationFrame(animate);
            let time = (Date.now() - startTime) / 1000;
            material.uniforms.uTime.value = time;
            renderer.render(scene, camera);
        }

        animate();

    }, []);


    return (
        <canvas ref={containerRef} style={{ width: 1000, height: 600 }}></canvas>

    );
};

export default Shader;