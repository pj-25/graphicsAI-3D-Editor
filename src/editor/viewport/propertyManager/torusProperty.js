import PropertyController from "./propertyController";

export default class TorusProperty extends PropertyController{
    constructor(interactiveMesh){
        super(interactiveMesh);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.torusFolder = this.propertiesPane.addFolder('Add Torus');
    }

    iniTorusProperties(){
        this.torusFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.geometryData,'tube').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.geometryData,'tubularSegments').min(1).max(10).onChange(this.regenerate);
        this.torusFolder.add(this.geometryData,'arc').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.TorusGeometry(this.geometryData.radius, 
                                                    this.geometryData.tube, 
                                                    this.geometryData.radialSegments, 
                                                    this.geometryData.tubularSegments, 
                                                    this.geometryData.arc);
        this.updateMesh(newGeometry);
    }
}