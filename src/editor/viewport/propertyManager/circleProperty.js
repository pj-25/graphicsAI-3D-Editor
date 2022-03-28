import PropertyController from "./propertyController";

export default class CircleProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
    }

    initProperties(){
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'segments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.CircleGeometry(this.geometryData.radius, 
                                                    this.geometryData.segments, 
                                                    this.geometryData.thetaStart, 
                                                    this.geometryData.thetaLength);
        
        this.updateMesh(newGeometry);
    }
}