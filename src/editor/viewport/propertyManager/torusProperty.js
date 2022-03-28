import PropertyController from "./propertyController";

export default class TorusProperty extends PropertyController{
    constructor(propertyPane, geometry){
        super(propertyPane);
        this.geometry = geometry;
        this.this.geometryData = this.geometry.parameters
        this.torusFolder = this.propertiesPane.addFolder('Add Torus')
    }

    iniTtorusProperties(){
        this.torusFolder.add(this.this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.this.geometryData,'tube').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.this.geometryData,'tubularSegments').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.geometryData,'arc').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.TorusGeometry(this.geometryData.radius, this.geometryData.tube, this.geometryData.radialSegments, this.geometryData.tubularSegments, this.geometryData.arc);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}