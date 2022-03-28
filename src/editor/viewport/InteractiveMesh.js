import * as THREE from 'three';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


export default class InteractiveMesh extends THREE.Mesh{
    constructor(viewport, geometry, material, propertiesPane, selectionColor=0xf49a34){
        super(geometry, material);
        this.type = "InteractiveMesh";
        this.viewport = viewport;
        this.geometry = geometry;

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
        viewport.add(this.transformControls);

        //define and show properties
        //TODO : remove this & add propertyController here
        this.properties;
        this.selectable = true;
        this.selected = false;
        this.hasTransformControl = false;
        this.color = material.color.getHex();
        this.initPropertiesPane(propertiesPane);

        this.edges = new THREE.EdgesGeometry(geometry);
        this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color:selectionColor}));
        this.selectionHelper = new THREE.Group();
        this.selectionHelper.add(this, this.line);
    }

    setTransformControls(transformControls){
        this.transformControls = transformControls;
    }

    initPropertiesPane(propertiesPane){
        this.propertiesFolder = propertiesPane.addFolder('Cube(Mesh)-'+this.id);
        this.propertiesFolder.add(this.position, 'x').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'y').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'z').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this, 'visible').onChange(()=>{
            
        });
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.material.color.set(this.color);
        });
        this.propertiesFolder.add(this, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.onTransformControlsChange();
        });
        this.propertiesFolder.add(this.material, 'wireframe');
        this.propertiesFolder.open();
    }

    onVisibleChange(){
        this.detachTransformControls();
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
    }

    detachTransformControls(){
        this.hasTransformControl = false;
        this.transformControls.detach();
        this.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
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

    onClick(includeTransformControls){
        if(!this.selected){
            this.activateSelection(includeTransformControls);
        }else{
            this.deactivateSelection(includeTransformControls);
        }
    }
}