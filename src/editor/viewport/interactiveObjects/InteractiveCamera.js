import { CameraHelper } from 'three';
import InteractiveObjectHelper from './InteractiveObjectHelper';

export default class InteractiveCamera extends CameraHelper {
    constructor(viewport, camera, selectionColor = 0xf49a34) {
        super(camera);
        this.type = "InteractiveCamera";
        this.camera.name = 'Camera-' + this.id;

        this.camera.helper = new InteractiveObjectHelper(viewport, this.camera, false, selectionColor);
        this.camera.onVisibleChange = () => {
            this.camera.helper.onVisibleChange();
        };
        this.camera.dispose = () => {
            if (this.properties)
                this.properties.dispose();
            this.camera.onDisposeCamera();
            this.camera.parent.remove(this.camera);
            this.parent.remove(this);
        };


        //override this method to perform actions on deletion
        this.camera.onDisposeCamera = null;
    }
}