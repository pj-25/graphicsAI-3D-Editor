import PropertyController from "./propertyController";

export default class CylinderProperty extends PropertyController{
    constructor(interactiveMesh){
        super(interactiveMesh);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.cylinderFolder = this.propertiesPane.addFolder('Add Cylinder');
    }

    initCylinderProperties(){
        this.cylinderFolder.add(this.geometryData,'radiusTop').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'radiusBottom').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'openEnded').onChange(onChange(()=>{
            if(!this.geometryData.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this.geometryData);
                }
            }
        }));
        this.cylinderFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.cylinderFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);
    }
    
    regenerate(){
        let newGeometry = new THREE.CylinderGeometry(this.geometryData.radiusTop,
                                                    this.geometryData.radiusBottom, 
                                                    this.geometryData.height, 
                                                    this.geometryData.radialSegments, 
                                                    this.geometryData.heightSegments, 
                                                    this.geometryData.openEnded,
                                                    this.geometryData.thetaStart, 
                                                    this.geometryData.thetaLength);

        this.updateMesh(newGeometry);
    }
}