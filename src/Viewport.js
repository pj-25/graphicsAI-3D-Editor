import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TransformControls} from "three/examples/jsm/controls/TransformControls"


export default class Viewport {

    constructor(domElement, width=window.innerWidth*0.75, height=window.innerHeight, cameraPosition = [1,2,3], clearColor=0x3a3a3a){
        this.render = ()=>{
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.render);
        }

        this.width = width;
        this.height = height;

        //creating scene
        this.scene = new THREE.Scene();

        //creating camera
        this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        this.camera.position.set(...cameraPosition);

        //creating renderer
        this.renderer = new THREE.WebGLRenderer({canvas:domElement});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(clearColor);

        //handling screen resize
        this.onResizeEvent = (event)=>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            const aspectRatio = this.width/this.height;
            this.camera.aspect = aspectRatio;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        }
        this.addResizeListener();

        //add orbit controls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

        //creating helpers
        this.helper = {};
        this.helper.group = new THREE.Group();
        //add grid
        this.helper.grid = new THREE.GridHelper(50,100, 0x4a4a4a, 0x4a4a4a);
        this.helper.group.add(this.helper.grid);
        //add axes
        this.helper.axesGroup = new THREE.Group();
        const positiveAxes = new THREE.AxesHelper(100);
        this.helper.axesGroup.add(positiveAxes);
        const negativeAxes = new THREE.AxesHelper(-100);
        this.helper.axesGroup.add(negativeAxes);
        this.helper.group.add(this.helper.axesGroup);
        this.scene.add(this.helper.group);
    }

    add(object){
        this.scene.add(object);
        object.setTransformControls(new TransformControls(this.camera, this.renderer.domElement));
        object.transformControls.attach(object);
        object.transformControls.addEventListener('mouseDown',(event)=>{
            this.orbitControls.enabled = false;
        });
        object.transformControls.addEventListener('mouseUp',(event)=>{
            this.orbitControls.enabled = true;
        });
        window.addEventListener('keypress', (event)=>{
            switch(event.code){
                case 'KeyG':
                    object.transformControls.setMode('translate');
                    break;
                case 'KeyR':
                    object.transformControls.setMode('rotate');
                    break;
                case 'KeyS':
                    object.transformControls.setMode('scale');
                    break;
            }
        });
        this.scene.add(object.transformControls);
    }


    addResizeListener(){
        window.addEventListener('resize', this.onResizeEvent);
    }

    disableResizeListner(){
        window.removeEventListener('resize', this.onResizeEvent);
    }

    hideHelpers(){
        this.helper.group.visible = false;
    }

    showHelpers(){
        this.helper.group.visible = true;
    }
}