import PropertyController from "./propertyController";

export default class IcosahedronProperty extends PropertyController{
    constructor(propertyPane, geometry){
        super(propertyPane);
        this.geometry = geometry;
        this.geometryData = this.geometry.parameters
        this.icosahedronFolder = this.propertiesPane.addFolder('Add Icosphere')
    }

    initIcosahedronProperties(){
        this.icosahedronFolder.add(this.this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.icosahedronFolder.add(this.this.geometryData,'detail').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.IcosahedronGeometry(this.geometryData.radius, this.geometryData.detail);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}