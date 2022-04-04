import * as THREE from "three";
import BoxProperty from "../propertyController/meshPropertyController/BoxProperty";
import CircleProperty from "../propertyController/meshPropertyController/CircleProperty";
import ConeProperty from "../propertyController/meshPropertyController/ConeProperty";
import CylinderProperty from "../propertyController/meshPropertyController/CylinderProperty";
import IcosahedronProperty from "../propertyController/meshPropertyController/IcosphereProperty";
import PlaneProperty from "../propertyController/meshPropertyController/PlaneProperty";
import SphereProperty from "../propertyController/meshPropertyController/SphereProperty";
import TorusProperty from "../propertyController/meshPropertyController/TorusProperty";

import InteractiveMesh from "../interactiveObjects/InteractiveMesh";
import InteractiveCamera from "../interactiveObjects/InteractiveCamera";
import CameraPropertyController from "../propertyController/CameraPropertyController";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import PropertyController from "../propertyController/PropertyController";
import InteractiveObjectHelper from "../interactiveObjects/InteractiveObjectHelper";
import TextProperty from "../propertyController/meshPropertyController/TextProperty";

export default class MeshGenerator {
    static OBJECT_TYPE = {
        MESH: {
            PLANE: 0,
            CUBE: 1,
            CIRCLE: 2,
            UVSPHERE: 3,
            ICOSPHERE: 4,
            CYLINDER: 5,
            CONE: 6,
            TORUS: 7,
            TEXT: 8
        },
        CAMERA: 9,
        LIGHT: 10,
        OBJ: 11
    };

    constructor(viewport, propertiesPane, cursorPoint = new THREE.Vector3(0, 0, 0)) {
        this.viewport = viewport;
        this.cursorPoint = cursorPoint;
        this.propertiesPane = propertiesPane;

        this.loadingManager = new THREE.LoadingManager();
        this.objLoader = new OBJLoader(this.loadingManager);
        this.fontLoader = new THREE.FontLoader(this.loadingManager);
        
    }

    addPlane(attachProperties = true){
        let object = this.createPlane(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createPlane(attachProperties = true) {
        let properties;
        let geometry = new THREE.PlaneBufferGeometry(1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091, side: THREE.DoubleSide });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new PlaneProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        mesh.properties = properties;
        
        return mesh;
    }

    addCube(attachProperties = true){
        let object = this.createCube(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCube(attachProperties = true) {
        let properties;
        let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new BoxProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        mesh.properties = properties;
        
        return mesh;
    }

    addCircle(attachProperties = true){
        let object = this.createCircle(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCircle(attachProperties = true) {
        let properties;
        let geometry = new THREE.CircleBufferGeometry(1, 10);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new CircleProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        mesh.properties = properties;
        
        return mesh;
    }

    addUVSphere(attachProperties = true){
        let object = this.createUVSphere(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createUVSphere(attachProperties = true) {
        let properties;
        let geometry = new THREE.SphereBufferGeometry(1, 30, 30);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new SphereProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    addIcoSphere(attachProperties = true){
        let object = this.createIcoSphere(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createIcoSphere(attachProperties = true) {
        let properties;
        let geometry = new THREE.IcosahedronBufferGeometry(1, 2);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new IcosahedronProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    addCylinder(attachProperties = true){
        let object = this.createCylinder(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCylinder(attachProperties = true) {
        let properties;
        let geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 20, 20);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new CylinderProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    addCone(attachProperties = true){
        let object = this.createCone(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCone(attachProperties = true) {
        let properties;
        let geometry = new THREE.ConeBufferGeometry(1, 2, 10, 10);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new ConeProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    addTorus(attachProperties = true){
        let object = this.createTorus(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createTorus(attachProperties = true) {
        let properties;
        let geometry = new THREE.TorusBufferGeometry(.5, 0.1, 10, 50);
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new TorusProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    createText(text='graphicsAI', font, attachProperties = true){
        let geometry = new THREE.TextBufferGeometry(text, {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        });
        geometry.parameters.text = text;
        geometry.center();
        let material  = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        if(attachProperties){
            mesh.properties = new TextProperty(mesh, this.propertiesPane);
            mesh.properties.initProperties();
        }
        return mesh;
    }

    addText(text = 'graphicsAI',fontPath = '/fonts/helvetiker_regular.typeface.json', attachProperties = true){
        this.fontLoader.load(
            fontPath,
            (font)=>{
                this.viewport.add(this.createText(text, font, attachProperties));
            }
        );
    }

    addCamera(attachProperties = true){
        let object = this.createCamera(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCamera(attachProperties = true) {
        let camera = new THREE.PerspectiveCamera(50, 1920 / 1200, 0.1, 1000);
        let interactiveCamera = new InteractiveCamera(this.viewport, camera);
        interactiveCamera.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        let properties;
        if(attachProperties){
            properties = new CameraPropertyController(interactiveCamera, this.propertiesPane);
            properties.initProperties();
        }
        interactiveCamera.properties = properties;
        return interactiveCamera;
    }

    addLight(attachProperties = true){
        let object = this.createLight(attachProperties);
        this.viewport.add(object);
        return object;
    }

    createLight() {
        let light = new THREE.Light();
        
        let material = new THREE.MeshStandardMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, light, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        
        return mesh;
    }

    addObj(objFile, attachProperties = true){
        this.objLoader.load(
            objFile,
            (object)=>{
                if(attachProperties){
                    object.helper = new InteractiveObjectHelper(this.viewport, object, false);
                    object.onVisibleChange = ()=>{};
                    let properties = new PropertyController(object, this.propertiesPane, objFile);
                    properties.initProperties();
                    object.properties = properties;
                }
                object.scale.x /= 16;
                object.scale.y /= 16;
                object.scale.z /= 16;
                this.viewport.add(object);
            },
            (xhr)=>{
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            (error)=>{
                console.log('Enable to load from'+objFile);
                console.log(error);
            }
        );
    }

    create(objectType, attachProperties = true) {
        switch (objectType) {

            case OBJECT_TYPE.MESH.PLANE:
                return this.createPlane(attachProperties);

            case OBJECT_TYPE.MESH.CUBE:
                return this.createCube(attachProperties);

            case OBJECT_TYPE.MESH.CIRCLE:
                return this.createCircle(attachProperties);

            case OBJECT_TYPE.MESH.UVSPHERE:
                return this.createUVSphere(attachProperties);

            case OBJECT_TYPE.MESH.ICOSPHERE:
                return this.createIcoSphere(attachProperties);

            case OBJECT_TYPE.MESH.CYLINDER:
                return this.createCylinder(attachProperties);

            case OBJECT_TYPE.MESH.CONE:
                return this.createCone(attachProperties);

            case OBJECT_TYPE.MESH.TORUS:
                return this.createTorus(attachProperties);

            case OBJECT_TYPE.CAMERA:
                return this.createCamera(attachProperties);

            case OBJECT_TYPE.LIGHT:
                return this.createLight(attachProperties);
        }
    }
}