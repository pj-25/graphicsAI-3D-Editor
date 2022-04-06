import { Color, DirectionalLightHelper, Vector3 } from "three";
import InteractiveObjectHelper from "../InteractiveObjectHelper";

export default class InteractiveDirectionalLight extends DirectionalLightHelper{
    constructor(viewport, light, size, color, selectionColor=0xf49a34){
        super(light, size, color);
        
        this.type = 'InteractiveDirectionalLight';
        this.isInteractive = true;

        light.geometry = this.lightPlane.geometry;
        this.helper = new InteractiveObjectHelper(viewport, light, false, selectionColor);
        this.helper.transformControls.addEventListener('change', ()=>{
            this.light.lookAt(new Vector3(0,0,0));
            this.update();
        });

        //add select option
        this.helper.selectionColor = selectionColor;
        this.helper.selectable = true;
        this.helper.selected = false;
        this.helper.activateSelection = ((attach=true, bindDeleteAction = true)=>{
            console.log(this);
            if(this.helper.selectable){
                this.helper.selected = true;
                this.color.setHex(selectionColor);
                if(bindDeleteAction){
                    this.helper.viewport.domElement.addEventListener('keydown', this.helper.onKeypressDeleteAction);
                }
                if(attach){
                    this.helper.attachTransformControls();
                }
            }
        });
        this.helper.deactivateSelection = ((detach=true)=>{
            if(this.helper.selectable){
                this.helper.selected = false;
                this.color.setHex('');
                if(detach){
                    this.helper.detachTransformControls();
                }
            }
        });
    }

    onVisibleChange(){
        this.helper.onVisibleChange();
    }

    dispose(){
        super.dispose();
        if(this.properties){
            this.properties.dispose();
        }
        this.light.parent.remove(this.light);
        this.parent.remove(this);
    }
}