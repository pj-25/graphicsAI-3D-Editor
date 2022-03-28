import PropertyController from "./propertyController";

export default class SphereProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
    }

    initProperties(){
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'widthSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'phiStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'phiLength').min(1).max(10).onChange(this.regenerate);       
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.SphereGeometry(this.geometryData.radius, 
                                                    this.geometryData.widthSegments, 
                                                    this.geometryData.heightSegments, 
                                                    this.geometryData.phiStart, 
                                                    this.geometryData.phiLength, 
                                                    this.geometryData.thetaStart, 
                                                    this.geometryData.thetaLength);
        
        this.updateMesh(newGeometry);
    }
}