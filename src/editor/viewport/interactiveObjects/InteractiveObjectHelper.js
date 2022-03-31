import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default class InteractiveObjectHelper{
    constructor(viewport, interactiveObject, selectionColor=0xf49a34){
        this.viewport = viewport;
        this.interactiveObject = interactiveObject;
        this.selectionColor = selectionColor;
        this.selectable = true;
        this.selected = false;
        this.hasTransformControl = false;
        
        this.transformControls = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
        this.edges = new THREE.EdgesGeometry(this.interactiveObject.geometry);
        this.selectionHelper = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color:this.selectionColor}));
    
        this.onKeypress = (event)=>{
            if(this.transformControls.visible){
                switch(event.code){
                    case 'KeyG':
                        this.transformControls.setMode('translate');
                        break;
                    case 'KeyR':
                        this.transformControls.setMode('rotate');
                        break;
                    case 'KeyS':
                        this.transformControls.setMode('scale');
                        break;
                }
            }
        }
    }


    updateSelectionHelper(){
        this.edges.copy(new THREE.EdgesGeometry(this.interactiveObject.geometry));
        this.selectionHelper.geometry = this.edges;
    }

    onVisibleChange(){
        if(this.hasTransformControl){
            this.detachTransformControls();
        }
    }

    onTransformControlsChange(){
        if(this.hasTransformControl){
            this.attachTransformControls();
        }else{
            this.detachTransformControls();
        }
    }

    attachTransformControls(){
        this.hasTransformControl = true;
        this.transformControls.attach(this.interactiveObject);
        this.transformControls.addEventListener('mouseDown',this.viewport.disableOrbitControls);
        this.transformControls.addEventListener('mouseUp' ,this.viewport.enableOrbitControls);
        window.addEventListener('keypress', this.onKeypress);
        this.viewport.add(this.transformControls);
    }

    detachTransformControls(){
        this.hasTransformControl = false;
        this.transformControls.detach();
        this.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        window.removeEventListener('keypress', this.onKeypress);
        this.viewport.remove(this.transformControls);
    }

    activateSelection(attach=true){
        this.selected = true;
        this.interactiveObject.add(this.selectionHelper);
        if(attach){
            this.attachTransformControls();
        }
    }

    deactivateSelection(detach=true){
        this.selected = false;
        this.interactiveObject.remove(this.selectionHelper);
        if(detach){
            this.detachTransformControls();
        }
    }

    onSelectionChange(includeTransformControls=false){
        if(this.selected){
            this.activateSelection(includeTransformControls);
        }else{
            this.deactivateSelection(includeTransformControls);
        }
    }

    onClick(includeTransformControls=true){
        if(!this.selected){
            this.activateSelection(includeTransformControls);
        }else{
            this.deactivateSelection(includeTransformControls);
        }
    }
}