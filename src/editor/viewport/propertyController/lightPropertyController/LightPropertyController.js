import PropertyController from "../PropertyController";

export default class LightPropertyController extends PropertyController{
    constructor(interactiveLight, propertiesPane, name){
        super(interactiveLight, propertiesPane, name);

        this.color = interactiveLight.light.color.getHex();
    }

    initProperties(){
        super.initProperties();

        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.interactiveObject.light.color.setHex(this.color);
        });
        this.propertiesFolder.add(this.interactiveObject.light, 'intensity').min(0).max(1).step(0.01);
        
    }
}