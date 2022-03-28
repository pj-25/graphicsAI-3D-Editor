import PropertyController from "./propertyController";

export default class IcosahedronProperty extends PropertyController{
    constructor(interactiveMesh){
        super(interactiveMesh);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.icosahedronFolder = this.propertiesPane.addFolder('Add Icosphere');
    }

    initIcosahedronProperties(){
        this.icosahedronFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.icosahedronFolder.add(this.geometryData,'detail').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.IcosahedronGeometry(this.geometryData.radius, 
                                                        this.geometryData.detail);

        this.updateMesh(newGeometry);
    }
}