import * as THREE from "three";
import BoxProperty from "../propertyController/boxProperty";
import CircleProperty from "../propertyController/circleProperty";
import ConeProperty from "../propertyController/coneProperty";
import CylinderProperty from "../propertyController/cylinderProperty";
import IcosahedronProperty from "../propertyController/icosphereProperty";
import PlaneProperty from "../propertyController/planeProperty";
import SphereProperty from "../propertyController/sphereProperty";
import TorusProperty from "../propertyController/torusProperty";

import InteractiveMesh from "../InteractiveMesh";

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
            TORUS: 7
        },
        CAMERA: 8,
        LIGHT: 9
    };

    constructor(viewport, propertiesPane, cursorPoint = new THREE.Vector3(0, 0, 0)) {
        this.viewport = viewport;
        this.cursorPoint = cursorPoint;
        this.propertiesPane = propertiesPane;
    }

    addPlane(attachProperties = true){
        this.viewport.add(this.createPlane(attachProperties));
    }

    createPlane(attachProperties = true) {
        let properties;
        let geometry = new THREE.PlaneGeometry(1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091, side: THREE.DoubleSide });
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
        this.viewport.add(this.createCube(attachProperties));
    }

    createCube(attachProperties = true) {
        let properties;
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createCircle(attachProperties));
    }

    createCircle(attachProperties = true) {
        let properties;
        let geometry = new THREE.CircleGeometry(1, 10);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createUVSphere(attachProperties));
    }

    createUVSphere(attachProperties = true) {
        let properties;
        let geometry = new THREE.SphereGeometry(1, 30, 30);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createIcoSphere(attachProperties));
    }

    createIcoSphere(attachProperties = true) {
        let properties;
        let geometry = new THREE.IcosahedronGeometry(1, 2);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createCylinder(attachProperties));
    }

    createCylinder(attachProperties = true) {
        let properties;
        let geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 10);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createCone(attachProperties));
    }

    createCone(attachProperties = true) {
        let properties;
        let geometry = new THREE.ConeGeometry(1, 5, 10, 10);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
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
        this.viewport.add(this.createTorus(attachProperties));
    }

    createTorus(attachProperties = true) {
        let properties;
        let geometry = new THREE.TorusGeometry(10, 5, 10, 30);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        if (attachProperties) {
            properties = new TorusProperty(mesh, this.propertiesPane);
            properties.initProperties();
        }
        
        mesh.properties = properties;
        return mesh;
    }

    addCamera(attachProperties = true){
        this.viewport.add(this.createCamera(attachProperties));
    }

    createCamera() {
        let geometry = new THREE.PerspectiveCamera(75, 1920 / 1200, 0.1, 1000);
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        
        return mesh;
    }

    addLight(attachProperties = true){
        this.viewport.add(this.createLight(attachProperties));
    }

    createLight() {
        let geometry = new THREE.Light();
        
        let material = new THREE.MeshBasicMaterial({ color: 0x8e9091 });
        let mesh = new InteractiveMesh(this.viewport, geometry, material);
        mesh.position.set(this.cursorPoint.x, this.cursorPoint.y, this.cursorPoint.z);
        
        return mesh;
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