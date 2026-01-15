import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Three = () => {
   const canvas = document.getElementById('webgl');
   const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)

    return (
        <canvas id='webgl'>
            three
        </canvas>
    )
}

export default Three;