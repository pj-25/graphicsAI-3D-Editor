import PropertyController from "./propertyController";

import * as THREE from 'three';

export default class TorusProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
    
        this.regenerate = ()=>{
            let newGeometry = new THREE.TorusGeometry(this.geometryData.radius, 
                                                        this.geometryData.tube, 
                                                        this.geometryData.radialSegments, 
                                                        this.geometryData.tubularSegments, 
                                                        this.geometryData.arc);
            this.updateMesh(newGeometry);
        }
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'tube').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'tubularSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'arc').min(1).max(10).onChange(this.regenerate);
    }
    
    
}