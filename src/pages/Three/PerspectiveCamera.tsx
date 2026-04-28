import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const Three = () => {

  const mountRef = useRef<HTMLCanvasElement>(null);

  const initThree = () => {

  }
  // 创建场景
  useEffect(() => {

    // 创建画布
    const canvas = mountRef.current as HTMLCanvasElement;

    const aspectRatio = canvas.clientWidth / canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

    
    camera.position.z = 5;
    
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ canvas });

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.update();
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    renderer.setSize((window.innerWidth / 2), (window.innerHeight / 2));

    const handleResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <canvas ref={mountRef}></canvas>
}

export default Three;