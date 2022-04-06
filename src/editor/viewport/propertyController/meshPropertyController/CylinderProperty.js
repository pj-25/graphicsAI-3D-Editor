import MeshPropertyController from "./MeshPropertyController";

import * as THREE from 'three';

export default class CylinderProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.CylinderBufferGeometry(this.geometryData.radiusTop,
                                                        this.geometryData.radiusBottom, 
                                                        this.geometryData.height, 
                                                        this.geometryData.radialSegments, 
                                                        this.geometryData.heightSegments, 
                                                        this.geometryData.openEnded,
                                                        this.geometryData.thetaStart, 
                                                        this.geometryData.thetaLength);
    
            this.interactiveObject.updateGeometry(newGeometry);
        }
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radiusTop').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radiusBottom').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radialSegments').min(6).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(50).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'openEnded').onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(0).max(6.28).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(0).max(6.28).onChange(this.regenerate);
    }
    
    
}