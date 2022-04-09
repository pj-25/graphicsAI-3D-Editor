import LightPropertyController from "./LightPropertyController";

export default class PointLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='Point Light'){
        super(interactiveLight, propertiesPane, name);   
    }

    initProperties(){
        super.initProperties();

        this.propertiesFolder.add(this.interactiveObject, 'distance').min(0).max(100);
        this.propertiesFolder.add(this.interactiveObject, 'decay').min(0).max(1).step(0.01);

    }
}