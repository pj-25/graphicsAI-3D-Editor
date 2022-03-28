import PropertyController from "./propertyController";

export default class ConeProperty extends PropertyController{
    constructor(propertyPane, geometry){
        super(propertyPane);
        this.geometry = geometry;
        this.this.geometryData = this.geometry.parameters
        this.circleFolder = this.propertiesPane.addFolder('Add Circle')
    }

    initCircleProperties(){
        this.circleFolder.add(this.this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.circleFolder.add(this.this.geometryData,'segments').min(1).max(10).onChange(this.regenerate);
        this.circleFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.circleFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.CircleGeometry(this.geometryData.radius, this.geometryData.widthSegments, this.geometryData.heightSegments);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}