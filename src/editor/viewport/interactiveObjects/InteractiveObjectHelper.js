import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default class InteractiveObjectHelper{
    constructor(viewport, interactiveObject, selectable = true, selectionColor=0xf49a34){
        this.viewport = viewport;
        this.interactiveObject = interactiveObject;
        this.hasTransformControl = false;
        this.name = "InteractiveObjectHelper";
        
        this.transformControls = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
        
        if(selectable){
            this.selectionColor = selectionColor;
            this.selectable = true;
            this.selected = false;
            this.edges = new THREE.EdgesGeometry(this.interactiveObject.geometry);
            this.selectionMaterial = new THREE.LineBasicMaterial({color:this.selectionColor});
            this.selectionHelper = new THREE.LineSegments(this.edges, this.selectionMaterial);
        }

        this.onKeypressTransformAction = (event)=>{
            if(this.transformControls.visible){
                switch(event.code){
                    case 'KeyG':
                        this.setTransformMode('translate');
                        break;
                    case 'KeyR':
                        this.setTransformMode('rotate');
                        break;
                    case 'KeyS':
                        this.setTransformMode('scale');
                        break;
                }
            }
        };

        this.onKeypressDeleteAction = (event)=>{
            if(this.selected && event.code === 'Delete'){
                this.dispose();
            }
        }
    }

    setTransformMode(mode){
        this.transformControls.setMode(mode);
        switch(mode){
            case 'translate':
                this.viewport.domElement.style.cursor = 'move';
                break;
            case 'rotate':
                this.viewport.domElement.style.cursor = 'all-scroll';
                break;
            case 'scale':
                this.viewport.domElement.style.cursor = 'nwse-resize';
                break;
            default:
                break;
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

    attachTransformControls(mode='translate'){
        this.hasTransformControl = true;
        this.setTransformMode(mode);
        this.transformControls.attach(this.interactiveObject);
        this.transformControls.addEventListener('mouseDown',this.viewport.disableOrbitControls);
        this.transformControls.addEventListener('mouseUp' ,this.viewport.enableOrbitControls);
        this.viewport.domElement.addEventListener('keypress', this.onKeypressTransformAction);
        this.viewport.add(this.transformControls);
    }

    detachTransformControls(){
        this.hasTransformControl = false;
        this.transformControls.detach();
        this.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        this.viewport.domElement.removeEventListener('keypress', this.onKeypressTransformAction);
        this.viewport.remove(this.transformControls);
        this.viewport.domElement.style.cursor = 'default';
    }

    activateSelection(attach=true, bindDeleteAction = true){
        if(this.selectable){
            this.selected = true;
            this.interactiveObject.add(this.selectionHelper);
            if(bindDeleteAction)
                this.viewport.domElement.addEventListener('keydown', this.onKeypressDeleteAction);
            if(attach){
                this.attachTransformControls();
            }
        }
    }

    deactivateSelection(detach=true){
        if(this.selectable){
            this.selected = false;
            this.interactiveObject.remove(this.selectionHelper);
            this.viewport.domElement.removeEventListener('keydown', this.onKeypressDeleteAction);
            if(detach){
                this.detachTransformControls();
            }
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

    dispose(){
        if(this.selectable){
            if(this.selected){
                this.deactivateSelection();
            }
            if(this.edges){
                this.edges.dispose();
                this.selectionMaterial.dispose();
            }
        }
        this.transformControls.dispose();
        if(this.hasTransformControl){
            this.detachTransformControls();
        }
        this.interactiveObject.dispose();
    }
}