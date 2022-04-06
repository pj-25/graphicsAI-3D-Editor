import MeshPropertyController from "./MeshPropertyController";

import * as THREE from 'three';

export default class IcosahedronProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.IcosahedronBufferGeometry(this.geometryData.radius, 
                                                            this.geometryData.detail);
    
            this.interactiveObject.updateGeometry(newGeometry);
        }
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'detail').min(1).max(50).step(1).onChange(this.regenerate);
    }
    
    
}