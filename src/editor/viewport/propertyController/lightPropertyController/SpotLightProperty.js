import LightPropertyController from "./LightPropertyController";

export default class SpotLightProperty extends LightPropertyController{
    constructor(interactiveLight, propertiesPane, name='Spot Light'){
        super(interactiveLight, propertiesPane, name);   

        this.interactiveObject.helper.transformControls.addEventListener('objectChange', (event)=>{
            window.requestAnimationFrame(()=>{
                this.interactiveLight.update();
            });
        });
    }

    initProperties(){
        super.initProperties();

        this.propertiesFolder.add(this.interactiveObject, 'distance').min(0).max(1000);
        this.propertiesFolder.add(this.interactiveObject, 'angle').min(0).max(90).step(1);
        this.propertiesFolder.add(this.interactiveObject, 'penumbra').min(0).max(1).step(0.01);
        this.propertiesFolder.add(this.interactiveObject, 'decay').min(0).max(1).step(0.01);
    }
}