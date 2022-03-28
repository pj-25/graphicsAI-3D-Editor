import PropertyController from "./propertyController";

export default class BoxProperty extends PropertyController{
    constructor(propertyPane, geometry){
        super(propertyPane);
        this.geometry = geometry;
        this.geometryData = this.geometry.parameters
        this.cubeFolder = this.propertiesPane.addFolder('Add Cube')
    }

    initCubeProperties(){
        this.cubeFolder.add(this.this.geometryData,'width').min(1).max(10).onChange(this.regenerate);
        this.cubeFolder.add(this.this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.cubeFolder.add(this.geometryData,'depth').min(1).max(10).onChange(this.regenerate);
        this.cubeFolder.add(this.this.geometryData,'widthSegments').min(1).max(10).onChange(this.regenerate);
        this.cubeFolder.add(this.this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.cubeFolder.add(this.geometryData,'depthSegments').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.BoxGeometry(this.geometryData.width, this.geometryData.height, this.geometryData.depth, this.geometryData.widthSegments, this.geometryData.heightSegments, this.geometryData.depthSegments);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}