import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import * as THREE from 'three';


export default class MoveTool{
    constructor(scene, controlledCamera, domElement){
        this.scene = scene;
        this.transformControl = new TransformControls(controlledCamera.activeCamera, domElement);  
        this.selectedObjectGroup = new THREE.Group();
        this.isActivated = false;
    }

    activate(...objects){
        this.isActivated = true;
        this.selectedObjectGroup.add(objects);
        this.scene.add(this.selectedObjectGroup);
        this.transformControl.attach(this.selectedObjectGroup);
        for(let obj of objects){
            obj.activateSelection(this.scene, false);
        }
    }

    deactivate(){
        this.isActivated = false;
        
    }
}