import PropertyController from "../PropertyController";


export default class MeshPropertyController extends PropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        this.geometryData = JSON.parse(JSON.stringify(interactiveMesh.geometry));
        this.color = interactiveMesh.material.color.getHex();
    }

    initProperties(){
        super.initProperties();
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.interactiveObject.material.color.setHex(this.color);
        });
    }
}