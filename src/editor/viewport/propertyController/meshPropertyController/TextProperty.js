import MeshPropertyController from "./MeshPropertyController";
import * as THREE from 'three';

export default class TextProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);

        this.geometryPropertyFolder = this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.TextGeometry(this.geometryData.text, this.geometryData.options);
            newGeometry.center();
            this.interactiveObject.updateGeometry(newGeometry);
        }
        this.geometryData.options.font = interactiveMesh.geometry.parameters.options.font;
    }

    initProperties(){
        super.initProperties();

        this.geometryPropertyFolder.add(this.geometryData, 'text').onFinishChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'size').min(0.1).max(100).step(0.01).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'height').min(0.1).max(100).step(0.01).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'curveSegments').min(1).max(15).step(1).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'bevelEnabled').onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'bevelThickness').min(0.01).max(1).step(0.001).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'bevelSize').min(0.01).max(1).step(0.01).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData.options, 'bevelSegments').min(1).max(6).step(1).onChange(this.regenerate);       
    }
}