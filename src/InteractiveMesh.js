import * as THREE from 'three';

export default class InteractiveMesh extends THREE.Mesh{
    constructor(geometry, material, propertiesPane){
        super(geometry, material);
        this.initPropertiesPane(propertiesPane);
        this.properties = {color:material.color};
        this.transformControls = null;
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
                if(!this.transformControls.visible){
                    this.transformControls.attach(this);
                }
            }
        });
        const cubeProperties = {color:0x8e9091};
        this.propertiesFolder.addColor(cubeProperties, 'color').onChange(()=>{
            this.material.color.set(cubeProperties.color);
        });
    }
}