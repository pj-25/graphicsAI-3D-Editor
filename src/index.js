import './style.css';
import Editor from './editor/Editor';
import * as THREE from 'three';
import InteractiveMesh from './editor/viewport/InteractiveMesh';


const viewportCanvas = document.getElementById('webgl');
const sidePane = document.getElementById('sidepane');

const mouse = {
    pointer: new THREE.Vector2(),
    clicked:false
};
let onMouseClick = (event)=>{
    mouse.clicked = true;
    mouse.pointer.x = ( event.clientX / editor.viewport.width ) * 2 - 1;
    mouse.pointer.y = - ( event.clientY / editor.viewport.height ) * 2 + 1;
};
window.addEventListener('click', onMouseClick);
window.addEventListener('touchstart', (event)=>{
    onMouseClick(event);
    event.preventDefault();
});

//create editor
const editor = new Editor(mouse, viewportCanvas,null, sidePane);

//creating cube
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({color:0x8e9091});
const cube = new InteractiveMesh(editor.viewport, geometry, material, editor.propertiesPane);
editor.viewport.add(cube);

const cameraProperties = {perspective:true};
editor.propertiesPane.add(cameraProperties, 'perspective').onChange(()=>{
    editor.viewport.switchCamera();
});

const pcameraFolder = editor.propertiesPane.addFolder('Camera(Perspective)');
pcameraFolder.add(editor.viewport.controlledCamera.perspectiveCamera.position, 'x').min(-10).max(10).listen();
pcameraFolder.add(editor.viewport.controlledCamera.perspectiveCamera.position, 'y').min(-10).max(10).listen();
pcameraFolder.add(editor.viewport.controlledCamera.perspectiveCamera.position, 'z').min(-10).max(10).listen();
pcameraFolder.add(editor.viewport.controlledCamera.perspectiveCamera, 'fov').min(-180).max(180).listen();
pcameraFolder.open();

const ocameraFolder = editor.propertiesPane.addFolder('Camera(Orthograhpic)');
ocameraFolder.add(editor.viewport.controlledCamera.orthographicCamera.position, 'x').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.controlledCamera.orthographicCamera.position, 'y').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.controlledCamera.orthographicCamera.position, 'z').min(-10).max(10).listen();
ocameraFolder.add(editor.viewport.controlledCamera.orthographicCamera, 'zoom').min(-10).max(10).listen();
ocameraFolder.open();

// editor.viewport.hideHelpers();

//rendering the editor.viewport
editor.viewport.render();

