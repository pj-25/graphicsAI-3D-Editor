import LightPropertyController from "./LightPropertyController";

export default class RectAreaLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='RectArea Light'){
        super(interactiveLight, propertiesPane, name); 
        this.interactiveObject.helper.transformControls.addEventListener('objectChange', (event)=>{
            window.requestAnimationFrame(()=>{
                this.interactiveLight.lightHelper.position.copy(this.interactiveObject.position);
                this.interactiveLight.lightHelper.quaternion.copy(this.interactiveObject.quaternion);
                this.interactiveLight.update();
            });
        });
    }

    initProperties(){
        super.initProperties();
    }
}