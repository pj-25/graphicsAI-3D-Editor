import InteractiveObjectHelper from "./InteractiveObjectHelper";


export default class InteractiveModel {
    constructor(viewport, object, selectionColor=0xf49a34){
        this.object = object;
        this.name = 'InteractiveModel';
        this.object.isInteractive = true;

        this.object.helper = new InteractiveObjectHelper(viewport, object, false, selectionColor);
        //TODO: add selection helper
        this.object.onVisibleChange = ()=>{
            this.object.helper.onVisibleChange();
        }
        this.object.dispose = ()=>{
            if(this.object.properties)
                this.object.properties.dispose();
            this.object.parent.remove(this.object);
        }
    }
}