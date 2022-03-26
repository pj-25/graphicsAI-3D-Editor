import * as THREE from 'three';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";


export default class InteractiveMesh extends THREE.Mesh{
    constructor(viewport, geometry, material, propertiesPane, selectionColor=0xf49a34){
        super(geometry, material);
        this.type = "InteractiveMesh";

        this.transformControls = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);
        this.transformControls.visible = false;
        viewport.scene.add(this.transformControls);

        //define and show properties
        this.selectable = true;
        this.selected = false;
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
        this.propertiesFolder = propertiesPane.addFolder('Cube(Mesh)');
        this.propertiesFolder.add(this, 'id').domElement.style.pointerEvents = "none";
        this.propertiesFolder.add(this.position, 'x').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'y').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'z').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this, 'visible').onChange(()=>{
            if(!this.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this);
                }
            }
        });
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.material.color.set(this.color);
        });
        this.propertiesFolder.open();
    }

    activateSelection(attachTransformControls=true){
        this.selected = true;
        this.add(this.selectionHelper);
        if(attachTransformControls){
            this.transformControls.attach(this);
        }
    }

    deactivateSelection(detachTransformControls=true){
        this.selected = false;
        this.remove(this.selectionHelper);
        if(detachTransformControls){
            this.transformControls.detach();
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