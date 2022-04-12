import LightPropertyController from "./LightPropertyController";

export default class HemisphereLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='Hemisphere Light'){
        super(interactiveLight, propertiesPane, name);   
        this.groundColor = this.interactiveObject.groundColor.getHex();
    }

    initProperties(){
        super.initProperties();
        this.propertiesFolder.addColor(this, 'groundColor').onChange(()=>{
            this.interactiveObject.groundColor.setHex(this.groundColor);
        });
    }
}