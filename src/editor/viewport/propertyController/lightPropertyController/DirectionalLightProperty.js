import LightPropertyController from "./LightPropertyController";
import { Vector3 } from "three";

export default class DirectionalLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='Directional Light'){
        super(interactiveLight, propertiesPane, name); 
        
        this.interactiveObject.helper.transformControls.addEventListener('objectChange', () => {
            this.interactiveObject.lookAt(new Vector3(0, 0, 0));
            this.interactiveLight.lightHelper.update();
        });
    }
}