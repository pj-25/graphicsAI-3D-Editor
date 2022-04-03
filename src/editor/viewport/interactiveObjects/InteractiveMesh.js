import { Mesh } from "three";
import InteractiveObjectHelper from "./InteractiveObjectHelper";


export default class InteractiveMesh extends Mesh{
    constructor(viewport, geometry, material, selectionColor=0xf49a34){
        super(geometry, material);
        this.type = "InteractiveMesh";
        this.isInteractive = true;
        
        this.helper = new InteractiveObjectHelper(viewport, this, selectionColor);
    }

    onVisibleChange(){
        this.helper.onVisibleChange();
    }

    updateGeometry(newGeometry){
        this.geometry.dispose();
        this.geometry = newGeometry;
        this.helper.updateSelectionHelper();
    }

    dispose(){
        if(this.properties)
            this.properties.dispose();
        this.geometry.dispose();
        this.material.dispose();
        this.helper.dispose();
        this.parent.remove(this);
    }
}