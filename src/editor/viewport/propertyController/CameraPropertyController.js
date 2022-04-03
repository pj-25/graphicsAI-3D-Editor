import PropertyController from "./PropertyController";

class MinMaxPropertyHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min;  // this will call the min setter
    }
}


export default class CameraPropertyController extends PropertyController{
    constructor(interactiveMesh, propertiesPane, name){
        super(interactiveMesh, propertiesPane, name);
    
        this.updateCamera = ()=>{
            this.interactiveObject.camera.updateProjectionMatrix();
        }
    }

    initProperties(){
        super.initProperties();
        
        //FIXME: controller not working 
        let minMaxHelper = new MinMaxPropertyHelper(this.interactiveObject.camera, 'near', 'far', 0.1);
        this.propertiesFolder.add(this.interactiveObject.camera, 'fov').min(1).max(180);
        this.propertiesFolder.add(minMaxHelper, 'min', 0.1, 50, 0.1).name('near').onChange(this.updateCamera);
        this.propertiesFolder.add(minMaxHelper, 'max', 0.1, 50, 0.1).name('far').onChange(this.updateCamera);
    }
    
}