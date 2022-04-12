import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';

export default class ControlledCamera {
    constructor(width, height, cameraPosition=[1,2,3], domElement){
        this.setZoom = ()=>{
            const distance = this.orthographicCamera.position.distanceTo(this.orbitControls.target);
            this.orthographicCamera.zoom = (this.orthographicCamera.right - this.orthographicCamera.left) / (2 * distance * Math.tan(this.perspectiveCamera.fov * Math.PI/360));
        };
        this.active = false;

        this.perspectiveCamera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        this.perspectiveCamera.position.set(...cameraPosition);
        this.perspectiveCamera.lookAt(new THREE.Vector3(0,0,0));
        this.orbitControls = new OrbitControls(this.perspectiveCamera, domElement);
        this.activeCamera = this.perspectiveCamera;
        this.activeCamera.name = 'Primary Camera';

        this.orthographicCamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
        this.orthographicCamera.position.set(...cameraPosition);
        this.orthographicCamera.lookAt(new THREE.Vector3(0,0,0));
        this.otherCamera = this.orthographicCamera;
        this.setZoom();
        this.orthographicCamera.updateProjectionMatrix();

        this.angle = 0
        this.lastOperation = null;
    }

    onKeyPress(event){
        if ((event.key >= 0 && event.key <=9) || event.key === '/') {   //numpad
            this.performOperation(event.key)
        } 
    }

    getActiveCamera(){
        return this.activeCamera;
    }

    getOrbitControls(){
        return this.orbitControls;
    }

    turnOn(){
        this.active = true;
        this.orbitControls.domElement.addEventListener('keypress', this.onKeyPress.bind(this));
    }

    turnOff(){
        this.active = false;
        this.orbitControls.removeEventListener('keypress', this.onKeyPress);
    }

    //override this method to perform actions on camera switch event
    onCameraSwitch(){
        
    }

    changeCamera(newCamera){
        if(this.activeCamera.type === 'PerspectiveCamera'){
            newCamera.aspect = this.activeCamera.aspect;
            newCamera.updateProjectionMatrix();
            this.activeCamera = newCamera;
            if(newCamera.name === 'Primary Camera'){
                this.orbitControls.enabled = true;
            }else{
                this.orbitControls.enabled = false;
            }
        }
    }

    switchCamera(){
        this.otherCamera.position.copy(this.activeCamera.position);
        this.otherCamera.lookAt(this.orbitControls.target);
        if(this.otherCamera.type === 'OrthographicCamera'){
            this.setZoom();
        }else{
            //FIXME: update zooming of perspective camera
        }
        this.otherCamera.updateProjectionMatrix();
        this.orbitControls.object = this.otherCamera;
        this.orbitControls.update();
        
        const tmpCamera = this.activeCamera;
        this.activeCamera = this.otherCamera;
        this.otherCamera = tmpCamera;

        this.onCameraSwitch();
    }

    performOperation(operation){
        switch(operation){
            case "1":
                this.focusFront();
                break;
            case "2":
                this.moveDown();
                break;
            case "3":
                this.focusSide();
                break;
            case "4":
                this.moveLeft();
                break;
            case "5":
                this.switchCamera();
                break;
            case "6":
                this.moveRight();
                break;
            case "7":
                this.focusTop();
                break;
            case "8":
                this.moveUp();
                break;
            case "9":
                this.flipView();
                break;
            case '/':
                this.focusCenter();
                break;
        }
    }

    focusFront(){
        this.lastOperation = 1;
        if(this.activeCamera.type === 'PerspectiveCamera'){
            this.switchCamera()
        }
        this.setCamPosition(new THREE.Vector3(0, -this.activeCamera.position.distanceTo(this.orbitControls.target), 0))
    }

    focusSide(){
        this.lastOperation = 3;
        if(this.activeCamera.type === 'PerspectiveCamera')
            this.switchCamera()
        
        this.setCamPosition(new THREE.Vector3(this.activeCamera.position.distanceTo(this.orbitControls.target), 0, 0))
    }
    
    focusTop(){
        this.lastOperation = 7;
        if(this.activeCamera.type === 'PerspectiveCamera')
            this.switchCamera()
            
        this.setCamPosition(new THREE.Vector3(0, 0, this.activeCamera.position.distanceTo(this.orbitControls.target)))
    }

    moveLeft(){
        this.angle-=(Math.PI / 16)
        let camPos = new THREE.Vector3(this.activeCamera.position.x, this.activeCamera.position.y, this.activeCamera.position.z)
        if(this.activeCamera.type === 'OrthographicCamera' && (camPos.equals(new THREE.Vector3(0, 1, 0)) || camPos.equals(new THREE.Vector3(0, -1, 0)))){
            // Gimbal lock
            this.activeCamera.rotation.z += Math.PI / 16
        }else {
            let rotVec = this.getHorizontalCoordinates();
            this.setCamPosition(rotVec);
        }

        // TODO Fix for after orbital contro panning; getting wierd results
    }

    moveRight(){
        this.angle+=(Math.PI / 16)

        let camPos = new THREE.Vector3(this.activeCamera.position.x, this.activeCamera.position.y, this.activeCamera.position.z)
        
        if(this.activeCamera.type === 'OrthographicCamera' && (camPos.equals(new THREE.Vector3(0, 1, 0)) || camPos.equals(new THREE.Vector3(0, -1, 0)))){
            this.activeCamera.rotation.z = this.angle
        } else {
            let rotVec = this.getHorizontalCoordinates();
            this.setCamPosition(rotVec);
        }
    }

    moveUp(){
        this.lastOperation = 8
        this.angle+=(Math.PI / 16)

        let rotVec = this.getVerticalCoordinates();
        this.setCamPosition(rotVec);
    }

    moveDown(){
        this.lastOperation = 2
        this.angle-=(Math.PI / 16)
        
        let rotVec = this.getVerticalCoordinates();
        this.setCamPosition(rotVec);
    }

    focusCenter(){
        this.activeCamera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    flipView(){
        this.activeCamera.position.multiplyScalar(-1)
        this.setCamPosition(this.activeCamera.position)
    }

    setCamPosition(position){
        this.activeCamera.position.set(position.x, position.y, position.z)
        this.activeCamera.lookAt(this.orbitControls.target)
        // this.orbitControls.update();
    }

    getVerticalCoordinates(){
        let radius = this.activeCamera.position.distanceTo(new THREE.Vector3(0, 0, 0));

        let coord = [];
        coord[0] = radius * Math.cos(this.orbitControls.getAzimuthalAngle() / (Math.PI * 2) + this.angle) * Math.cos(this.orbitControls.getPolarAngle());
        coord[1] = radius * Math.sin(this.orbitControls.getAzimuthalAngle() / (Math.PI * 2) + this.angle)
        coord[2] = radius * Math.cos(this.orbitControls.getAzimuthalAngle() / (Math.PI * 2) + this.angle) * Math.sin(this.orbitControls.getPolarAngle());

        return new THREE.Vector3(coord[0], coord[1], coord[2]);
    }

    getHorizontalCoordinates(){
        let rotVec = new THREE.Vector3();
        if(this.lastOperation === 3 || this.lastOperation === 7){
            if(this.activeCamera.type === 'OrthographicCamera')
                this.switchCamera()
            rotVec.set( this.activeCamera.position.distanceTo(this.orbitControls.target) * Math.sin(this.angle / 2 * Math.PI), 
                                     0,   this.activeCamera.position.distanceTo(this.orbitControls.target) * Math.cos(this.angle / 2 * Math.PI))
        } else{
            rotVec.set(this.activeCamera.position.y * Math.sin(this.angle / 2 * Math.PI), 
                        this.activeCamera.position.y,    
                        this.activeCamera.position.y * Math.cos(this.angle / 2 * Math.PI))
        }
        return rotVec;
    }
}