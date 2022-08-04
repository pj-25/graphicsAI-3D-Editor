import { Mesh } from "three";
import InteractiveObjectHelper from "./InteractiveObjectHelper";
import interactiveObject from "./InteractiveObject";

export default class InteractiveMesh extends Mesh {
    constructor(viewport, geometry, material, selectionColor = 0xf49a34) {
        super(geometry, material);
        this.name = "InteractiveMesh";
        this.isInteractive = true;

        this.helper = new InteractiveObjectHelper(viewport, this, selectionColor);
    }

    updateGeometry(newGeometry) {
        this.geometry.dispose();
        this.geometry = newGeometry;
        this.helper.updateSelectionHelper();
    }
}

Object.assign(InteractiveMesh.prototype, interactiveObject)