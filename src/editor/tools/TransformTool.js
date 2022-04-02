import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import * as THREE from 'three';
import ToolBox from "./ToolBox";


export default class TransformTool{
    constructor(viewport){
        this.viewport = viewport;
        this.type = ToolBox.TOOLTYPE.TRANSFORM;
        this.transformControl = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
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

    activate(objects, mode='translate'){
        if(this.active || objects.length == 0)return;
        this.active = true;
        for(let obj of objects){
            this.selectedObjectGroup.attach(obj);
        }
        this.transformControl.setMode(mode);
        let center = TransformTool.computeGroupCenter(this.selectedObjectGroup);
        this.transformControl.position.copy(center);
        this.transformControl.updateMatrixWorld();
        this.viewport.add(this.selectedObjectGroup);
        this.transformControl.attach(this.selectedObjectGroup);
        this.viewport.add(this.transformControl);
        this.transformControl.addEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControl.addEventListener('mouseUp', this.viewport.enableOrbitControls);        
    }

    static computeGroupCenter(group) {
        let center = new THREE.Vector3();
        let children = group.children;
        let count = children.length;
        for (var i = 0; i < count; i++) {
            center.add(children[i].position);
        }
        center.divideScalar(count);
        return center;
    }

    deactivate(){
        if(this.active){
            this.active = false;
            this.transformControl.detach();
            let childrens = [...this.selectedObjectGroup.children];
            for(let obj of childrens){
                this.viewport.add(obj);
                obj.matrixWorld.decompose(obj.position, obj.quaternion, obj.scale); 
            }
            this.selectedObjectGroup.clear();
            this.viewport.remove(this.selectedObjectGroup);
            this.viewport.remove(this.transformControl);
            this.transformControl.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
            this.transformControl.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
            this.selectedObjectGroup = new THREE.Group();
        }
    }
}