import { CameraHelper } from 'three';
import InteractiveObjectHelper from './InteractiveObjectHelper';

export default class InteractiveCamera extends CameraHelper{
    constructor(viewport, camera, selectionColor=0xf49a34){
        super(camera);
        this.type = "InteractiveCamera";

        this.helper = new InteractiveObjectHelper(viewport, this, selectionColor);
        this.helper.transformControls.addEventListener('change', ()=>{
            camera.updateProjectionMatrix();
            this.update();
        });
    }

    onVisibleChange(){
        this.helper.onVisibleChange();
    }

    updateGeometry(newGeometry){
        this.geometry.dispose();
        this.geometry = newGeometry;
        this.helper.updateSelectionHelper();
    }
}