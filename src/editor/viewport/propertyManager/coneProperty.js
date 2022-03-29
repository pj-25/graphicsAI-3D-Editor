import PropertyController from "./propertyController";

import * as THREE from 'three';

export default class ConeProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'openEnded').onChange(onChange(()=>{
            if(!this.geometryData.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this.geometryData);
                }
            }
        }));        
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.ConeGeometry(this.geometryData.radius, 
                                                this.geometryData.height, 
                                                this.geometryData.radidalSegments, 
                                                this.geometryData.heightSegments, 
                                                this.geometryData.openEnded, 
                                                this.geometryData.thetaStart, 
                                                this.geometryDatathetaLength);
        
        this.updateMesh(newGeometry);

    }
}