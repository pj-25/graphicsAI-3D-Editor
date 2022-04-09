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
import InteractiveLight from "../interactiveObjects/InteractiveLight";
import DirectionalLightProperty from "../propertyController/lightPropertyController/DirectionalLightProperty";
import { HemisphereLightHelper, PointLightHelper, SpotLightHelper } from "three";
import HemisphereLightProperty from "../propertyController/lightPropertyController/HemisphereLightProperty";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';
import RectAreaLightProperty from "../propertyController/lightPropertyController/RectAreaLightProperty";
import SpotLightProperty from "../propertyController/lightPropertyController/SpotLightProperty";
import PointLightProperty from "../propertyController/lightPropertyController/PointLightProperty";
import InteractiveModel from "../interactiveObjects/InteractiveModel";

export default class ObjectGenerator {
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
        LIGHT: {
            AMBIENT: 10,
            DIRECTIONAL:11,
            HEMISPHERE: 12,
            POINT: 13,
            RECTAREA: 14,
            SPOT:15
        },
        OBJ: 16
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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
        mesh.position.copy(this.cursorPoint);
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

    addText(text = 'graphicsAI',fontPath = './fonts/helvetiker_regular.typeface.json', attachProperties = true){
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
        this.viewport.add(object.camera);
        return object;
    }

    createCamera(attachProperties = true) {
        let camera = new THREE.PerspectiveCamera(50, 1920 / 1200, 0.1, 50);
        let interactiveCamera = new InteractiveCamera(this.viewport, camera);
        interactiveCamera.position.copy(this.cursorPoint);
        let properties;
        if(attachProperties){
            properties = new CameraPropertyController(interactiveCamera, this.propertiesPane);
            properties.initProperties();
        }
        interactiveCamera.properties = properties;
        return interactiveCamera;
    }

    createAmbientLight(attachProperties = true) {
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        if(attachProperties){
            //TODO: add color and intensity property
        }
        return light;
    }

    addAmbientLight(attachProperties = true){
        let object = this.createAmbientLight(attachProperties);
        this.viewport.add(object);
        return object;
    }

    addLight(createLight, attachProperties){
        let object = createLight.call(this, attachProperties);
        this.viewport.add(object);
        this.viewport.add(object.light);
        return object;
    }

    createLight(lightHelper, LightPropertyController, attachProperties=true){
        // lightHelper.light.position.copy(this.cursorPoint);
        let interactiveLight = Object.assign(lightHelper, new InteractiveLight(this.viewport, lightHelper));
        if(attachProperties){
            lightHelper.properties = new LightPropertyController(interactiveLight, this.propertiesPane);
            lightHelper.properties.initProperties();
        }
        return lightHelper;
    }

    createDirectionalLight(attachProperties=true){
        let light = new THREE.DirectionalLight(0xffffff, 0.5);
        return this.createLight(
            new THREE.DirectionalLightHelper(light),
            DirectionalLightProperty,
            attachProperties
        );
    }

    addDirectionalLight(attachProperties=true){
        return this.addLight(this.createDirectionalLight, attachProperties);
    }

    addHemisphereLight(attachProperties=true){
        return this.addLight(this.createHemisphereLight, attachProperties);
    }

    createHemisphereLight(attachProperties=true){
        let light = new THREE.HemisphereLight(0x99ccff, 0x663300, 0.5);
        return this.createLight(
            new HemisphereLightHelper(light),
            HemisphereLightProperty,
            attachProperties
        );
    }

    createPointLight(attachProperties=true){
        let light = new THREE.PointLight(0xffffff, 0.5);
        return this.createLight(
            new PointLightHelper(light),
            PointLightProperty,
            attachProperties
        );
    }

    addPointLight(attachProperties=true){
        return this.addLight(this.createPointLight, attachProperties);
    }

    createRectAreaLight(attachProperties=false){
        let light = new THREE.RectAreaLight(0xffffff, 0.5);
        return this.createLight(
            new RectAreaLightHelper(light),
            RectAreaLightProperty,
            attachProperties
        );
    }

    addRectAreaLight(attachProperties=true){
        return this.addLight(this.createRectAreaLight, attachProperties);
    }

    createSpotLight(attachProperties=true){
        let light = new THREE.SpotLight(0xffffff, 0.5);
        return this.createLight(
            new SpotLightHelper(light),
            SpotLightProperty,
            attachProperties
        );
    }

    addSpotLight(attachProperties=true){
        return this.addLight(this.createSpotLight, attachProperties);
    }

    attachPropertiesToObj(object, name='Obj'){
        new InteractiveModel(this.viewport, object);
        let properties = new PropertyController(object, this.propertiesPane, name);
        properties.initProperties();
        object.properties = properties;
        return object;
    }

    parseAndAddObj(objectData, attachProperties=true, name='Obj'){
        let object = this.objLoader.parse(objectData);
        if(attachProperties){
            this.attachPropertiesToObj(object);
        }
        this.viewport.add(object);
    }

    addObj(objFile, attachProperties = true, name='Obj'){
        this.objLoader.load(
            objFile,
            (object)=>{
                if(attachProperties){
                    this.attachPropertiesToObj(object, name);
                }
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

    importObj(){
        const fileInputElement = document.createElement('input');
        fileInputElement.setAttribute('type', 'file');
        fileInputElement.setAttribute('accept', '.obj');
        fileInputElement.onchange = () => {
            let fileReader = new FileReader();
            let file = fileInputElement.files[0];

            fileReader.onload = () => {
                this.parseAndAddObj(fileReader.result);
            };
            if (file) {
                fileReader.readAsBinaryString(file);
            }
        };
        fileInputElement.click();
    }
    
    create(objectType, attachProperties = true) {
        switch (objectType) {

            case ObjectGenerator.OBJECT_TYPE.MESH.PLANE:
                return this.createPlane(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.CUBE:
                return this.createCube(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.CIRCLE:
                return this.createCircle(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.UVSPHERE:
                return this.createUVSphere(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.ICOSPHERE:
                return this.createIcoSphere(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.CYLINDER:
                return this.createCylinder(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.CONE:
                return this.createCone(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.MESH.TORUS:
                return this.createTorus(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.CAMERA:
                return this.createCamera(attachProperties);

            case ObjectGenerator.OBJECT_TYPE.LIGHT.AMBIENT:
                return this.createAmbientLight(attachProperties);
            
            case ObjectGenerator.OBJECT_TYPE.LIGHT.DIRECTIONAL:
                return this.createDirectionalLight(attachProperties);
            
            case ObjectGenerator.OBJECT_TYPE.LIGHT.HEMISPHERE:
                return this.createHemisphereLight(attachProperties);
            
            case ObjectGenerator.OBJECT_TYPE.LIGHT.POINT:
                return this.createPointLight(attachProperties);
            
            case ObjectGenerator.OBJECT_TYPE.LIGHT.RECTAREA:
                return this.createRectAreaLight(attachProperties);
            
            case ObjectGenerator.OBJECT_TYPE.LIGHT.SPOT:
                return this.createSpotLight(attachProperties);
                
            default:
                break
        }
    }
}