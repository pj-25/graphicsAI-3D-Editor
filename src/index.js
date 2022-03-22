import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {DragControls} from "three/examples/jsm/controls/DragControls"


ReactDOM.render(
    <h1>🤖️ graphicsAI : Editor 🎨️</h1>,
  document.getElementById('root')
);

const viewport = document.getElementById('webgl');
viewport.style.width = window.width;
viewport.style.height = window.height;

//creating scene
const scene = new THREE.Scene();

//creating camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(3,3,6);

//creating renderer
const renderer = new THREE.WebGLRenderer({canvas:viewport});
renderer.setSize(window.innerWidth, window.innerHeight);
const orbitalControls = new OrbitControls(camera, renderer.domElement);

//creating helpers
const helperGroup = new THREE.Group();
//add grid
const grid = new THREE.GridHelper(50,100);
// grid.material.opacity = 0.4;
helperGroup.add(grid);
//add axes
const axesGroup = new THREE.Group();
const positiveAxes = new THREE.AxesHelper(100);
axesGroup.add(positiveAxes);
const negativeAxes = new THREE.AxesHelper(-100);
axesGroup.add(negativeAxes);
helperGroup.add(axesGroup);
scene.add(helperGroup);

//creating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color:0x444444});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.lookAt(cube.position);

const dragControls = new DragControls([cube], camera, renderer.domElement);
dragControls.addEventListener('dragstart', (event)=>{
    orbitalControls.enabled = false;
    event.object.material.color.set( 0xaaaaaa );
});
dragControls.addEventListener('dragend', (event)=>{
    orbitalControls.enabled = true;
    event.object.material.color.set( 0x444444 );
})

// helperGroup.visible = false;

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//rendering the scene
animate();