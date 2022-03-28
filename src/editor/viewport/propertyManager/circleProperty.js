import PropertyController from "./propertyController";

export default class CircleProperty extends PropertyController{
    constructor(interactiveMesh){
        super(interactiveMesh);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.circleFolder = this.propertiesPane.addFolder('Add Circle');
    }

    initCircleProperties(){
        this.circleFolder.add(this.geometryData,'radius').min(1).max(10).onChangs(this.regenerate);
        this.circleFolder.add(this.geometryData,'segments').min(1).max(10).onChange(this.regenerate);
        this.circleFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.circleFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.CircleGeometry(this.geometryData.radius, 
                                                    this.geometryData.segments, 
                                                    this.geometryData.thetaStart, 
                                                    this.geometryData.thetaLength);
        
        this.updateMesh(newGeometry);
    }
}