import PropertyController from "../PropertyController";

export default class LightPropertyController extends PropertyController{
    constructor(interactiveLight, propertiesPane, name){
        super(interactiveLight.light, propertiesPane, name);
        this.interactiveLight = interactiveLight;

        this.color = interactiveLight.light.color.getHex();
    }

    initProperties(){
        super.initProperties();

        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.interactiveLight.light.color.setHex(this.color);
            if(!this.interactiveObject.helper.selected){
                this.interactiveLight.color.setHex(this.color);
                this.interactiveLight.update();
            }
        });
        this.propertiesFolder.add(this.interactiveLight.light, 'intensity').min(0).max(1).step(0.01);
        
    }
}