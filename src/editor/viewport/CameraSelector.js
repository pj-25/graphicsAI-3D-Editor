

export default class CameraSelector extends Map{
    constructor(defaultCamera, onCameraSwitch, onAddCamera, onDeleteCamera){
        super();
        this.currentCameraName = defaultCamera.name;
        this.set(this.currentCameraName, defaultCamera);
        this.onAddCamera = onAddCamera;
        this.onCameraSwitch = onCameraSwitch;
        this.onDeleteCamera = onDeleteCamera;
    }

    /**
     * 
     * @param {THREE.Camera} camera 
     */
    add(camera){
        this.set(camera.name, camera);
        camera.onDisposeCamera = ()=>{
            if(this.currentCameraName === camera.name){
                this.currentCameraName = 'Primary Camera';
                this.switchCamera();
            }
            this.delete(camera.name);
            this.onDeleteCamera(camera);
        };
        this.onAddCamera(camera);
    }

    switchCamera(){
        this.onCameraSwitch(this.get(this.currentCameraName));
    }
}