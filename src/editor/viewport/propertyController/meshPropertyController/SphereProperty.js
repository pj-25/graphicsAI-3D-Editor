import MeshPropertyController from "./MeshPropertyController";

import * as THREE from 'three';

export default class SphereProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.SphereBufferGeometry(this.geometryData.radius, 
                                                        this.geometryData.widthSegments, 
                                                        this.geometryData.heightSegments, 
                                                        this.geometryData.phiStart, 
                                                        this.geometryData.phiLength, 
                                                        this.geometryData.thetaStart, 
                                                        this.geometryData.thetaLength);
            
            this.interactiveObject.updateGeometry(newGeometry);
        }
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'widthSegments').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'phiStart').min(0).max(6.28).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'phiLength').min(0).max(6.28).onChange(this.regenerate);       
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(0).max(6.28).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(0).max(6.28).onChange(this.regenerate);

    }
    
    
}