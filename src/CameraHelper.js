import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import { Vector3 } from "three";

export default class CameraHelper {
    constructor(width, height, cameraPosition=[1,2,3], domElement){
        this.perspectiveCamera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        this.perspectiveCamera.position.set(...cameraPosition);
        this.perspectiveCamera.lookAt(new Vector3(0,0,0));
    
        this.orthographicCamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
        this.orthographicCamera.position.set(...cameraPosition);
        this.orthographicCamera.lookAt(new Vector3(0,0,0));
        this.orthographicCamera.zoom = 100;
        this.orthographicCamera.updateProjectionMatrix();

        this.activeCamera = this.perspectiveCamera;
        this.otherCamera = this.orthographicCamera;
        this.orbitControls = new OrbitControls(this.activeCamera, domElement);
    }

    getCurrentCamera(){
        return this.activeCamera;
    }

    getCurrentOrbitControls(){
        return this.orbitControls;
    }

    switchCamera(){
        this.otherCamera.position.copy(this.activeCamera.position);
        this.otherCamera.lookAt(this.orbitControls.target);
        this.otherCamera.updateProjectionMatrix();

        console.log(this.otherCamera);

        this.orbitControls.object = this.otherCamera;
        this.orbitControls.update();
        
        const tmpCamera = this.activeCamera;
        this.activeCamera = this.otherCamera;
        this.otherCamera = tmpCamera;
    }

}