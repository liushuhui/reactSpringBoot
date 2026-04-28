import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ShaderMaterial } from "three";

const ParticlesCamera = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas?.clientWidth / canvas?.clientHeight, 0.1, 1000);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas?.clientWidth, canvas?.clientHeight);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000; // **粒子数量**

        // 定义粒子位置
        const positions = new Float32Array(particlesCount * 3); // 每个粒子有x、y、z三个坐标
        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.6) * 10; // 生成随机位置
        }

        // 将位置添加到几何体
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // 创建粒子材质
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff, // 粒子颜色
            size: 0.1, // 粒子尺寸
        });

        // 创建粒子系统
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const particlesShaderMaterial = new ShaderMaterial({
            vertexShader: `
              varying vec3 vColor;
              void main() {
                vColor = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = 4.0;
              }
            `,
            fragmentShader: `
              varying vec3 vColor;
              void main() {
                gl_FragColor = vec4(vColor, 1.0);
              }
            `,
        });

        const colorfulParticles = new THREE.Points(particlesGeometry, particlesShaderMaterial);
        scene.add(colorfulParticles);

        renderer.render(scene, camera);

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.002;
            particles.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();

    }, [])

    return (
        <canvas ref={canvasRef} style={{ width: 1000, height: 600 }}></canvas>
    )
};

export default ParticlesCamera;