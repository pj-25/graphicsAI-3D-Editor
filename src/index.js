import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import * as THREE from 'three'
import {TransformControls} from "three/examples/jsm/controls/TransformControls"
import {DragControls} from "three/examples/jsm/controls/DragControls"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


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
renderer.setClearColor(0x3a3a3a);

const orbitControls = new OrbitControls(camera, renderer.domElement);

//creating helpers
const helperGroup = new THREE.Group();
//add grid
const grid = new THREE.GridHelper(50,100, 0x4a4a4a, 0x4a4a4a);
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
const material = new THREE.MeshBasicMaterial({color:0x8e9091});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.lookAt(cube.position);
const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.attach(cube);
transformControls.addEventListener('mouseDown',(event)=>{
    orbitControls.enabled = false;
});
transformControls.addEventListener('mouseUp',(event)=>{
    orbitControls.enabled = true;
});
window.addEventListener('keypress', (event)=>{
    switch(event.code){
        case 'KeyG':
            transformControls.setMode('translate');
            break;
        case 'KeyR':
            transformControls.setMode('rotate');
            break;
        case 'KeyS':
            transformControls.setMode('scale');
            break;
    }
});
scene.add(transformControls);


// helperGroup.visible = false;

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//rendering the scene
animate();