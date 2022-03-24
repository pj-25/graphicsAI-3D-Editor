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

const cameraProperties = {perspective:true};
editor.propertiesPane.add(cameraProperties, 'perspective').onChange(()=>{
    editor.viewport.switchCamera();
})

const pcameraFolder = editor.propertiesPane.addFolder('Camera(Perspective)');
pcameraFolder.add(editor.viewport.cameraHelper.perspectiveCamera.position, 'x').min(-10).max(10).listen();
pcameraFolder.add(editor.viewport.cameraHelper.perspectiveCamera.position, 'y').min(-10).max(10).listen();
pcameraFolder.add(editor.viewport.cameraHelper.perspectiveCamera.position, 'z').min(-10).max(10).listen();


const ocameraFolder = editor.propertiesPane.addFolder('Camera(Orthograhpic)');
ocameraFolder.add(editor.viewport.cameraHelper.orthographicCamera.position, 'x').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.cameraHelper.orthographicCamera.position, 'y').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.cameraHelper.orthographicCamera.position, 'z').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.cameraHelper.orthographicCamera, 'zoom').min(-10).max(10).listen();

// editor.viewport.hideHelpers();

//rendering the editor.viewport
editor.viewport.render();

