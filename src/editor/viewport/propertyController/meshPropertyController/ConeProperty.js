import MeshPropertyController from "./MeshPropertyController";

import * as THREE from 'three';

export default class ConeProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.ConeGeometry(this.geometryData.radius, 
                                                    this.geometryData.height, 
                                                    this.geometryData.radidalSegments, 
                                                    this.geometryData.heightSegments, 
                                                    this.geometryData.openEnded, 
                                                    this.geometryData.thetaStart, 
                                                    this.geometryDatathetaLength);
            
            this.interactiveObject.updateGeometry(newGeometry);
    
        };
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'height').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radialSegments').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'openEnded').onChange(this.regenerate);        
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(0).max(6.48).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(0).max(6.48).onChange(this.regenerate);

    }
    
    
}