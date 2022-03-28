import PropertyController from "./propertyController";

export default class CylinderProperty extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        this.geometryData = this.interactiveMesh.geometry.parameters;
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
    }

    initProperties(){
        this.geometryPropertyFolder.add(this.geometryData,'radiusTop').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radiusBottom').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'radialSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'heightSegments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'height').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'openEnded').onChange(onChange(()=>{
            if(!this.geometryData.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this.geometryData);
                }
            }
        }));
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);
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