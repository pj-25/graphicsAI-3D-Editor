import PropertyController from "../PropertyController";


export default class MeshPropertyController extends PropertyController{
    constructor(interactiveMesh, propertiesPane, name){
        super(interactiveMesh, propertiesPane, name);
        this.geometryData = JSON.parse(JSON.stringify(interactiveMesh.geometry));
        this.color = interactiveMesh.material.color.getHex();
    }

    initProperties(){
        super.initProperties();

        this.materialPropertyFolder = this.propertiesFolder.addFolder('Material');
        this.materialPropertyFolder.addColor(this, 'color').onChange(()=>{
            this.interactiveObject.material.color.setHex(this.color);
        });
        this.materialPropertyFolder.add(this.interactiveObject.material, 'wireframe');
        this.materialPropertyFolder.add(this.interactiveObject.material, 'opacity').min(0).max(1).step(0.0001).onChange(()=>this.interactiveObject.material.transparent = true);
        this.materialPropertyFolder.add(this.interactiveObject.material, 'metalness').min(0).max(1).step(0.0001);
        this.materialPropertyFolder.add(this.interactiveObject.material, 'roughness').min(0).max(1).step(0.0001);
        this.materialPropertyFolder.add(this.interactiveObject.material, 'flatShading');

        this.propertiesFolder.add(this.interactiveObject, 'dispose').name('Delete');
    }
}