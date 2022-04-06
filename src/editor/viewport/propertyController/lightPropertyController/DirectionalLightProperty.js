import LightPropertyController from "./LightPropertyController";

export default class DirectionalLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='Directional Light'){
        super(interactiveLight, propertiesPane, name);   
    }
}