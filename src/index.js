import './style.css';
import Editor from './Editor';
import * as THREE from 'three';
import InteractiveMesh from './InteractiveMesh';

const viewportCanvas = document.getElementById('webgl');
const sidePane = document.getElementById('sidepane');

//create editor
const editor = new Editor(viewportCanvas, sidePane);

//creating cube
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({color:0x8e9091});
const cube = new InteractiveMesh(geometry, material, editor.propertiesPane);
editor.viewport.add(cube);
editor.viewport.camera.lookAt(cube.position);

// editor.viewport.hideHelpers();

//rendering the editor.viewport
editor.viewport.render();
