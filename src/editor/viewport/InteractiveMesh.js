import * as THREE from 'three';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


export default class InteractiveMesh extends THREE.Mesh{
    constructor(viewport, geometry, material, selectionColor=0xf49a34){
        super(geometry, material);
        this.type = "InteractiveMesh";
        this.viewport = viewport;

        this.transformControls = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
        this.transformControls.visible = false;
        window.addEventListener('keypress', event=>{
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
        });

        //define and show properties
        //TODO : remove this & add propertyController here
        this.properties;
        this.selectable = true;
        this.selected = false;
        this.hasTransformControl = false;
        this.color = material.color.getHex();

        this.edges = new THREE.EdgesGeometry(geometry);
        this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color:selectionColor}));
        this.selectionHelper = new THREE.Group();
        this.selectionHelper.add(this, this.line);
    }

    setTransformControls(transformControls){
        this.transformControls = transformControls;
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
        this.transformControls.attach(this);
        this.transformControls.addEventListener('mouseDown',this.viewport.disableOrbitControls);
        this.transformControls.addEventListener('mouseUp',this.viewport.enableOrbitControls);
        this.viewport.add(this.transformControls);
    }

    detachTransformControls(){
        this.hasTransformControl = false;
        this.transformControls.detach();
        this.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        this.viewport.remove(this.transformControls);
    }

    activateSelection(attach=true){
        this.selected = true;
        this.add(this.selectionHelper);
        if(attach){
            this.attachTransformControls();
        }
    }

    deactivateSelection(detach=true){
        this.selected = false;
        this.remove(this.selectionHelper);
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