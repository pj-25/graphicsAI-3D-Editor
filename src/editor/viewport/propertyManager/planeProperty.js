import PropertyController from "./propertyController";

export default class PlaneProperty extends PropertyController{
    constructor(propertyPane, geometry){
        super(propertyPane);
        this.geometry = geometry;
        this.geometryData = this.geometry.parameters
        this.planeFolder = this.propertiesPane.addFolder('Add Plane')
    }

    initPlaneProperties(){
        this.planeFolder.add(this.this.geometryData,'width').min(1).max(10).onChange(this.regenerate);
        this.planeFolder.add(this.this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.planeFolder.add(this.this.geometryData,'widthSegments').min(1).max(10).onChange(this.regenerate);
        this.planeFolder.add(this.this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.PlaneGeometry(this.geometryData.width, this.geometryData.height, this.geometryData.widthSegments, this.geometryData.heightSegments);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}