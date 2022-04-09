import { Vector3, Color } from "three";
import InteractiveObjectHelper from "./InteractiveObjectHelper";

export default class InteractiveLight{
    constructor(viewport, lightHelper, selectionColor = 0xf49a34) {
        this.lightHelper = lightHelper;

        this.type = 'InteractiveLight';
        this.lightHelper.light.isInteractive = true;

        this.lightHelper.light.helper = new InteractiveObjectHelper(viewport, lightHelper.light, false, selectionColor);
        
        //add select option
        this.lightHelper.light.helper.selectionColor = selectionColor;
        this.lightHelper.light.helper.selectable = true;
        this.lightHelper.light.helper.selected = false;
        this.lightHelper.color = new Color(0xffffff);
        this.lightHelper.light.helper.activateSelection = ((attach = true, bindDeleteAction = true) => {
            if (this.lightHelper.light.helper.selectable) {
                this.lightHelper.light.helper.selected = true;
                this.lightHelper.color.setHex(selectionColor);
                this.lightHelper.update();
                if (bindDeleteAction) {
                    this.lightHelper.light.helper.viewport.domElement.addEventListener('keydown', this.lightHelper.light.helper.onKeypressDeleteAction);
                }
                if (attach) {
                    this.lightHelper.light.helper.attachTransformControls();
                }
            }
        });
        this.lightHelper.light.helper.deactivateSelection = ((detach = true) => {
            if (this.lightHelper.light.helper.selectable) {
                this.lightHelper.light.helper.selected = false;
                this.lightHelper.color.copy(lightHelper.light.color);
                this.lightHelper.update();
                if (detach) {
                    this.lightHelper.light.helper.detachTransformControls();
                }
            }
        });

        this.lightHelper.light.onVisibleChange = () => {
            this.lightHelper.light.helper.onVisibleChange();
        }

        this.lightHelper.light.dispose = () => {
            if (this.lightHelper.properties) {
                this.lightHelper.properties.dispose();
            }
            this.lightHelper.light.parent.remove(this.lightHelper.light);
            this.lightHelper.parent.remove(this.lightHelper);
            this.lightHelper.dispose();
        }
    }

}