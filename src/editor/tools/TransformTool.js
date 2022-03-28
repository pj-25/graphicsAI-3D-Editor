import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import * as THREE from 'three';
import ToolBox from "./ToolBox";


export default class TransformTool{
    constructor(viewport){
        this.viewport = viewport;
        this.type = ToolBox.TOOLTYPE.TRANSFORM;
        this.transformControl = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
        //TODO: add transform controls on centroid of group
        this.selectedObjectGroup = new THREE.Group();
        this.viewport.add(this.selectedObjectGroup);
        this.active = false;

    }

    //set mode type: translate(default), rotate, scale
    setMode(mode){
        this.transformControl.setMode(mode);
    }

    add(object){
        this.selectedObjectGroup.add(object);
    }

    activate(objects){
        if(this.active && objects.length == 0)return;
        this.active = true;
        for(let obj of objects){
            this.selectedObjectGroup.add(obj);
        }
        this.transformControl.attach(this.selectedObjectGroup);
        this.viewport.add(this.transformControl);
        this.transformControl.addEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControl.addEventListener('mouseUp', this.viewport.enableOrbitControls);        
    }

    deactivate(){
        if(this.active){
            this.active = false;
            this.transformControl.detach();
            //FIXME : only remove group not childrens
            // this.selectedObjectGroup.removeFromParent();
            this.viewport.remove(this.transformControl);
            this.transformControl.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
            this.transformControl.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        }
    }
}