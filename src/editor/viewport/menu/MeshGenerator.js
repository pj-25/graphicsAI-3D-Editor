import { Vector3 } from "three";
import BoxProperty from "../propertyManager/boxProperty";
import CircleProperty from "../propertyManager/circleProperty";
import ConeProperty from "../propertyManager/coneProperty";
import CylinderProperty from "../propertyManager/cylinderProperty";
import IcosahedronProperty from "../propertyManager/icosphereProperty";
import PlaneProperty from "../propertyManager/planeProperty";
import SphereProperty from "../propertyManager/sphereProperty";
import TorusProperty from "../propertyManager/torusProperty";


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
        var geometry, material, properties, mesh;
        material = new THREE.MeshBasicMaterial({color:0x8e9091});
        switch(objectType){
            case OBJECT_TYPE.MESH.PLANE:
                geometry = new THREE.PlaneGeometry(1, 1);
                material = new THREE.MeshBasicMaterial({color:0x8e9091 , side: THREE.DoubleSide});
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
        mesh = new InteractiveMesh(this.viewport, geometry, material);
        
        if(attachProperties){

            switch(objectType){
                
                case OBJECT_TYPE.MESH.PLANE:
                    properties = new PlaneProperty(mesh);
                    properties.initPlaneProperties();
                    break;
    
                case OBJECT_TYPE.MESH.CUBE:
                    properties = new BoxProperty(mesh);
                    properties.initCubeProperties();
                    break;
    
                case OBJECT_TYPE.MESH.CIRCLE:
                    properties = new CircleProperty(mesh);
                    properties.initCircleProperties();
                    break;
    
                case OBJECT_TYPE.MESH.UVSPHERE:
                    properties = new SphereProperty(mesh);
                    properties.initSphereProperties();
                    break;
    
                case OBJECT_TYPE.MESH.ICOSPHERE:
                    properties = new IcosahedronProperty(mesh);
                    properties.initIcosahedronProperties();
                    break; 
    
                case OBJECT_TYPE.MESH.CYLINDER:
                    properties = new CylinderProperty(mesh);
                    properties.initCylinderProperties();
                    break; 
                    
                case OBJECT_TYPE.MESH.CONE:
                    properties = new ConeProperty(mesh);
                    properties.initConeProperties();
                    break; 
    
                case OBJECT_TYPE.MESH.TORUS:
                    properties = new TorusProperty(mesh);
                    properties.iniTorusProperties();
                    break; 
    
                case OBJECT_TYPE.CAMERA:
                    break;
    
                case OBJECT_TYPE.LIGHT:
                    break; 
            }
            mesh.properties = properties;
        }
        return mesh; 
    }
}