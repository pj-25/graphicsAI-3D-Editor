import PropertyController from "./propertyController";
import * as THREE from 'three';

export default class BoxProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
 
        this.geometryPropertyFolder = this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.BoxGeometry(this.geometryData.width, this.geometryData.height, this.geometryData.depth, this.geometryData.widthSegments, this.geometryData.heightSegments, this.geometryData.depthSegments);  
            this.updateMesh(newGeometry);
        }
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'width').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'depth').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'widthSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'depthSegments').min(1).max(10).onChange(this.regenerate);
    }
    
}