import PropertyController from "./propertyController";

export default class SphereProperty extends PropertyController{
    constructor(propertyPane, geometry, material){
        super(propertyPane);
        this.geometry = geometry;
        this.material = material;
        this.geometryData = this.geometry.parameters
        this.sphereFolder = this.propertiesPane.addFolder('Add Sphere')
    }

    initSphereProperties(){
        this.sphereFolder.add(this.this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.sphereFolder.add(this.this.geometryData,'widthSegments').min(1).max(10).onChange(this.regenerate);
        this.sphereFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.sphereFolder.add(this.geometryData,'phiStart').min(1).max(10).onChange(this.regenerate);
        this.sphereFolder.add(this.geometryData,'phiLength').min(1).max(10).onChange(this.regenerate);       
        this.sphereFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.sphereFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    regenerate(){
        let newGeometry = new THREE.SphereGeometry(this.geometryData.radius, this.geometryData.widthSegments, this.geometryData.heightSegments, this.geometryData.phiStart, this.geometryData.phiLength, this.geometryData.thetaStart, this.geometryData.thetaLength);
        // TODO update mesh
        // mesh.geometry.dispose();
        // mesh.geometry = newGeometry;
    }
}