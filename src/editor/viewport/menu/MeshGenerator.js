import { Vector3 } from "three";
import PlaneProperty from "../propertyManager/planeProperty";


export default class MeshGenerator{
    static OBJECT_TYPE = {
        MESH:{
            PLANE: 0,
            CUBE: 1,
            CIRCLE: 2,
            UVSPHERE: 3,
            ICOSPHERE: 4,
            CYLINDER: 5,
            CONE: 6,
            TORUS: 7
        },
        CAMERA: 8,
        LIGHT: 9
    };

    constructor(viewport, cursorPoint = new Vector3(0, 0, 0)){
        this.viewport = viewport;
        this.cursorPoint = cursorPoint;
    }

    create(objectType, attachProperties=true){
        var geometry, material, properties;
        material = new THREE.MeshBasicMaterial({color:0x8e9091});
        switch(objectType){
            case OBJECT_TYPE.MESH.PLANE:
                geometry = new THREE.PlaneGeometry(1, 1);
                material = new THREE.MeshBasicMaterial({color:0x8e9091 , side: THREE.DoubleSide});
                if(attachProperties)
                    properties = new PlaneProperty()
                break;
            case OBJECT_TYPE.MESH.CUBE:
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case OBJECT_TYPE.MESH.CIRCLE:
                geometry = new THREE.CircleGeometry(1, 10);
                break;
            case OBJECT_TYPE.MESH.UVSPHERE:
                geometry = new THREE.SphereGeometry(1, 30, 30);
                break;
            case OBJECT_TYPE.MESH.ICOSPHERE:
                geometry = new THREE.IcosahedronGeometry(1, 2);
                break; 
            case OBJECT_TYPE.MESH.CYLINDER:
                geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 10);
                break; 
            case OBJECT_TYPE.MESH.CONE:
                geometry = new THREE.ConeGeometry(1, 5, 10, 10);
                break; 
            case OBJECT_TYPE.MESH.TORUS:
                geometry = new THREE.TorusGeometry(10, 5, 10, 30);
                break; 
            case OBJECT_TYPE.CAMERA:
                geometry = new THREE.PerspectiveCamera(75, 1920/1200, 0.1, 1000);
                break;
            case OBJECT_TYPE.LIGHT:
                geometry = new THREE.Light();
                break; 
        }
        geometry.position.set(this.cursorPoint);
        return new InteractiveMesh(this.viewport, geometry, material);
    }
}