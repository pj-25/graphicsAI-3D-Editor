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
import PropertyController from "../propertyController/PropertyController";
import TextProperty from "../propertyController/meshPropertyController/TextProperty";
import InteractiveLight from "../interactiveObjects/InteractiveLight";
import DirectionalLightProperty from "../propertyController/lightPropertyController/DirectionalLightProperty";
import { HemisphereLightHelper, PointLightHelper, SpotLightHelper } from "three";
import HemisphereLightProperty from "../propertyController/lightPropertyController/HemisphereLightProperty";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import RectAreaLightProperty from "../propertyController/lightPropertyController/RectAreaLightProperty";
import SpotLightProperty from "../propertyController/lightPropertyController/SpotLightProperty";
import PointLightProperty from "../propertyController/lightPropertyController/PointLightProperty";
import InteractiveModel from "../interactiveObjects/InteractiveModel";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import AssetsManager from "./AssetsManager";
import MeshPropertyController from "../propertyController/meshPropertyController/MeshPropertyController";
import InteractiveSpiralGalaxy from "../interactiveObjects/InteractiveSpiralGalaxy";
import SpiralGalaxyPropertyController from "../propertyController/particlesProperty/SpiralGalaxyPropertyController";

export default class ObjectGenerator {
    static OBJECT_TYPE = {
        MESH: {
            PLANE: "Plane",
            CUBE: "Cube",
            CIRCLE: "Circle",
            UVSPHERE: "UVSphere",
            ICOSPHERE: "IcoSphere",
            CYLINDER: "Cyclinder",
            CONE: "Cone",
            TORUS: "Torus",
            TEXT: "Text"
        },
        CAMERA: "Camera",
        LIGHT: {
            AMBIENT: "AmbientLight",
            DIRECTIONAL: "DirectionalLight",
            HEMISPHERE: "HemisphereLight",
            POINT: "PointLight",
            RECTAREA: "RectAreaLight",
            SPOT: "SpotLight"
        },
        OBJ: "Obj"
    };

    constructor(viewport, propertiesPane, cameraSelector, cursorPoint = new THREE.Vector3(0, 0, 0)) {
        this.viewport = viewport;
        this.cursorPoint = cursorPoint;
        this.propertiesPane = propertiesPane;
        this.cameraSelector = cameraSelector;

        this.sharedMaterial = null;

        this.assetsManager = new AssetsManager(this.loadingManager);
    }

    /**
     * @param material if passed as string, will consider it as material Id
     */
    createInteractiveObject(geometry, material, attachProperties, PropertyController, InteractiveObject = InteractiveMesh, options) {
        if (typeof (material) == "string") {
            material = this.assetsManager.getMaterial(material) || this.assetsManager.createNewMaterial();
        }
        let object = new InteractiveObject(this.viewport, geometry, material, options);
        object.position.copy(this.cursorPoint);
        if (attachProperties) {
            object.properties = new PropertyController(object, this.propertiesPane);
            object.properties.initProperties();
        }
        return object;
    }

    getMaterial(defaultType = AssetsManager.MATERIAL_TYPE.MESH_STANDARD_MATERIAL) {
        if (this.sharedMaterial) {
            return this.sharedMaterial;
        }
        return this.assetsManager.createNewMaterial(defaultType);
    }

    setSharedMaterial(material) {
        this.sharedMaterial = material;
    }

    unsetSharedMaterial() {
        this.sharedMaterial = null;
    }

    addPlane(material = this.getMaterial(), attachProperties = true) {
        let object = this.createPlane(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createPlane(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.PlaneGeometry(1, 1);
        material.side = THREE.DoubleSide;
        return this.createInteractiveObject(geometry, material, attachProperties, PlaneProperty);
    }

    addCube(material = this.getMaterial(), attachProperties = true) {
        let object = this.createCube(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCube(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        return this.createInteractiveObject(geometry, material, attachProperties, BoxProperty);
    }

    addCircle(material = this.getMaterial(), attachProperties = true) {
        let object = this.createCircle(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCircle(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.CircleGeometry(1, 10);
        return this.createInteractiveObject(geometry, material, attachProperties, CircleProperty);
    }

    addUVSphere(material = this.getMaterial(), attachProperties = true) {
        let object = this.createUVSphere(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createUVSphere(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.SphereGeometry(1, 30, 30);
        return this.createInteractiveObject(geometry, material, attachProperties, SphereProperty);
    }

    addIcoSphere(material = this.getMaterial(), attachProperties = true) {
        let object = this.createIcoSphere(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createIcoSphere(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.IcosahedronGeometry(1, 2);
        return this.createInteractiveObject(geometry, material, attachProperties, IcosahedronProperty);
    }

    addCylinder(material = this.getMaterial(), attachProperties = true) {
        let object = this.createCylinder(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCylinder(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.CylinderGeometry(1, 1, 1, 20, 20);
        return this.createInteractiveObject(geometry, material, attachProperties, CylinderProperty);
    }

    addCone(material = this.getMaterial(), attachProperties = true) {
        let object = this.createCone(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createCone(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.ConeGeometry(1, 2, 10, 10);
        return this.createInteractiveObject(geometry, material, attachProperties, ConeProperty);
    }

    addTorus(material = this.getMaterial(), attachProperties = true) {
        let object = this.createTorus(material, attachProperties);
        this.viewport.add(object);
        return object;
    }

    createTorus(material = this.getMaterial(), attachProperties = true) {
        let geometry = new THREE.TorusGeometry(.5, 0.1, 10, 50);
        return this.createInteractiveObject(geometry, material, attachProperties, TorusProperty);
    }

    createText(text = 'graphicsAI', textGeometryOptions, material = this.getMaterial(), attachProperties = true) {
        let geometry = new TextGeometry(text, textGeometryOptions);
        geometry.parameters.text = text;
        geometry.center();
        return this.createInteractiveObject(geometry, material, attachProperties, TextProperty);
    }

    addText(text = 'graphicsAI', onAfterAdd = (t) => { }, material = this.getMaterial(), textGeometryOptions = {
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
    }, fontPath = './fonts/helvetiker_regular.typeface.json', attachProperties = true) {
        this.assetsManager.loadFont(
            fontPath,
            (font) => {
                let textObj = this.createText(text, { font, ...textGeometryOptions }, material, attachProperties);
                this.viewport.add(textObj);
                onAfterAdd(textObj);
            }
        );
    }

    createSpiralGalaxy(options, material = this.getMaterial(AssetsManager.MATERIAL_TYPE.POINTS_MATERIAL), attachProperties = true) {
        material = this.assetsManager.createNewMaterial(AssetsManager.MATERIAL_TYPE.POINTS_MATERIAL);
        material.size = options.size;
        material.color.setHex(0xffffff);
        material.sizeAttenuation = true;
        material.vertexColors = true;
        material.transparent = true;
        material.depthWrite = false;
        // material.blending = THREE.AdditiveBlending;
        return this.createInteractiveObject(InteractiveSpiralGalaxy.generateGeometry(options), material, attachProperties, SpiralGalaxyPropertyController, InteractiveSpiralGalaxy, options);
    }

    addSpiralGalaxy(options = { size: 0.1, totalParticles: 3000, radius: 5, branch: 3, curl: 6, width: 0, centerColor: 0xd0de64, tipColor: 0x8f56cd, randomness: 0.5, gravityPull: 5 }, attachProperties = true) {
        this.viewport.add(this.createSpiralGalaxy(options, attachProperties))
    }

    addCamera(attachProperties = true) {
        let object = this.createCamera(attachProperties);
        this.viewport.add(object);
        this.viewport.add(object.camera);
        this.cameraSelector.add(object.camera);
        return object;
    }

    createCamera(attachProperties = true) {
        let camera = new THREE.PerspectiveCamera(50, 1920 / 1200, 0.1, 50);
        let interactiveCamera = new InteractiveCamera(this.viewport, camera);
        interactiveCamera.position.copy(this.cursorPoint);
        let properties;
        if (attachProperties) {
            properties = new CameraPropertyController(interactiveCamera, this.propertiesPane);
            properties.initProperties();
        }
        interactiveCamera.properties = properties;
        return interactiveCamera;
    }

    createAmbientLight(attachProperties = true) {
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        if (attachProperties) {
            //TODO: add color and intensity property
        }
        return light;
    }

    addAmbientLight(attachProperties = true) {
        let object = this.createAmbientLight(attachProperties);
        this.viewport.add(object);
        return object;
    }

    addLight(createLight, attachProperties) {
        let object = createLight.call(this, attachProperties);
        this.viewport.add(object);
        this.viewport.add(object.light);
        return object;
    }

    createLight(lightHelper, LightPropertyController, attachProperties = true) {
        lightHelper.light.position.copy(this.cursorPoint);
        let interactiveLight = Object.assign(lightHelper, new InteractiveLight(this.viewport, lightHelper));
        if (attachProperties) {
            lightHelper.properties = new LightPropertyController(interactiveLight, this.propertiesPane);
            lightHelper.properties.initProperties();
        }
        return lightHelper;
    }

    createDirectionalLight(attachProperties = true) {
        let light = new THREE.DirectionalLight(0xffffff, 0.5);
        return this.createLight(
            new THREE.DirectionalLightHelper(light),
            DirectionalLightProperty,
            attachProperties
        );
    }

    addDirectionalLight(attachProperties = true) {
        return this.addLight(this.createDirectionalLight, attachProperties);
    }

    addHemisphereLight(attachProperties = true) {
        return this.addLight(this.createHemisphereLight, attachProperties);
    }

    createHemisphereLight(attachProperties = true) {
        let light = new THREE.HemisphereLight(0x99ccff, 0x663300, 0.5);
        return this.createLight(
            new HemisphereLightHelper(light),
            HemisphereLightProperty,
            attachProperties
        );
    }

    createPointLight(attachProperties = true) {
        let light = new THREE.PointLight(0xffffff, 0.5);
        return this.createLight(
            new PointLightHelper(light),
            PointLightProperty,
            attachProperties
        );
    }

    addPointLight(attachProperties = true) {
        return this.addLight(this.createPointLight, attachProperties);
    }

    createRectAreaLight(attachProperties = false) {
        let light = new THREE.RectAreaLight(0xffffff, 0.5);
        return this.createLight(
            new RectAreaLightHelper(light),
            RectAreaLightProperty,
            attachProperties
        );
    }

    addRectAreaLight(attachProperties = true) {
        return this.addLight(this.createRectAreaLight, attachProperties);
    }

    createSpotLight(attachProperties = true) {
        let light = new THREE.SpotLight(0xffffff, 0.5);
        return this.createLight(
            new SpotLightHelper(light),
            SpotLightProperty,
            attachProperties
        );
    }

    addSpotLight(attachProperties = true) {
        return this.addLight(this.createSpotLight, attachProperties);
    }

    attachPropertiesToModel(object, name = 'Model') {
        new InteractiveModel(this.viewport, object);
        let properties = new PropertyController(object, this.propertiesPane, name);
        properties.initProperties();
        object.properties = properties;
        return object;
    }

    parseAndAddObj(objectData, attachProperties = true) {
        let obj = this.parseOBJ(objectData);
        if (attachProperties) {
            this.attachPropertiesToModel(obj, "Obj");
        }
        this.viewport.add(obj);
        return obj;
    }

    parseOBJ(objectData) {
        return this.assetsManager.parseModel(objectData);
    }

    parseSTL(objectData, material = this.getMaterial(), attachProperties = true) {
        return this.createInteractiveObject(this.assetsManager.parseModel(objectData, AssetsManager.MODEL_LOADER.STLLOADER), material, attachProperties, MeshPropertyController);
    }

    addModel(model, attachProperties = false, name = 'Model') {
        if (attachProperties) {
            this.attachPropertiesToModel(model, name);
        }
        this.viewport.add(model);
    }

    addObj(objFile, attachProperties = true, name = 'Model', onAfterAdd) {
        this.assetsManager.loadObj(objFile, (object) => {
            if (attachProperties) {
                this.attachPropertiesToModel(object, name);
            }
            this.viewport.add(object);
            onAfterAdd(object);
        });
    }

    importModel() {
        const fileInputElement = document.createElement('input');
        fileInputElement.setAttribute('type', 'file');
        fileInputElement.setAttribute('accept', '.obj,.stl');
        fileInputElement.onchange = () => {
            let fileReader = new FileReader();
            let file = fileInputElement.files[0];

            fileReader.onload = () => {
                switch (file.name.split('.').pop()) {
                    case "obj":
                        this.parseAndAddObj(fileReader.result);
                        break;
                    case "stl":
                        this.addModel(this.parseSTL(fileReader.result));
                        break;
                    default:
                        alert("Invalid file! File should be of .obj or .stl");
                }
            };
            if (file) {
                fileReader.readAsBinaryString(file);
            }
        };
        fileInputElement.click();
    }

    createSpiralGalaxy(options, attachProperties = true) {
        let spiralGalaxy = SpiralGalaxy.generate(options);
        if (attachProperties) {
            spiralGalaxy.properties = new SpiralGalaxyPropertyController(spiralGalaxy, this.propertiesPane);
            spiralGalaxy.properties.initProperties();
        }
        return spiralGalaxy;
    }

    addSpiralGalaxy(options = { size: 0.1, totalParticles: 300, radius: 5, branch: 3, curl: 6, width: 0, centerColor: 0xd0de64, tipColor: 0x8f56cd }, attachProperties = true) {
        this.viewport.add(this.createSpiralGalaxy(options, attachProperties))
    }

    create(objectType, attachProperties = true) {
        return this["create" + objectType](attachProperties);
    }

    add(objectType, attachProperties = true) {
        return this["add" + objectType](attachProperties);
    }
}