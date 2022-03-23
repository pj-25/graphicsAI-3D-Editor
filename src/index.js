import './style.css';
import Viewport from './Viewport';
import * as THREE from 'three';


const viewportCanvas = document.getElementById('webgl');

//create viewport
const viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height); 

//creating cube
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({color:0x8e9091});
const cube = new THREE.Mesh(geometry, material);
viewport.add(cube);
viewport.camera.lookAt(cube.position);

// viewport.hideHelpers();

//rendering the viewport
viewport.render();
