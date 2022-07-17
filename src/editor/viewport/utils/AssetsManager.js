import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

export default class AssetsManager extends THREE.EventDispatcher {

    static MATERIAL_TYPE = {
        MESH_STANDARD_MATERIAL: "MeshStandardMaterial",
        MESH_BASIC_MATERIAL: "MeshBasicMaterial",
        MESH_NORMAL_MATERIAL: "MeshNormalMaterial",
        MESH_PHONG_MATERIAL: "MeshPhongMaterial",
        MESH_TOON_MATERIAL: "MeshToonMaterial",
        MESH_LAMBERT_MATERIAL: "MeshLambertMaterial",
        MESH_MATCAP_MATERIAL: "MeshMatcapMaterial",
        POINTS_MATERIAL: "PointsMaterial"
    }

    static textureTypes = {
        "Albedo": "map",
        "Normal": "normalMap",
        "Displacement": "displacementMap",
        "Roughness": "roughnessMap",
        "Metalness": "metalnessMap",
        "Ambient Occlusion": "aoMap",
        "Bump": "bumpMap", "Alpha": "alphaMap",
        "Environment": "envMap",
        "Emissive": "emissiveMap",
        "Light": "lightMap"
    };

    static MODEL_LOADER = {
        OBJLOADER: "objLoader",
        STLLOADER: "stlLoader"
    }

    constructor(loadingManager = new THREE.LoadingManager()) {
        super();
        this.loadingManager = loadingManager;

        this.objLoader = new OBJLoader(this.loadingManager);
        this.stlLoader = new STLLoader(this.loadingManager);

        this.fontLoader = new FontLoader(this.loadingManager);
        this.fonts = new Map();

        this.materials = new Map();

        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        this.textures = new Map();
    }

    getNewTextureId() {
        return "texture-" + this.textures.size;
    }

    applyTexture(object, textureName, texturePath) {
        let texture = this.createNewTexture(texturePath);
        texture.magFilter = THREE.NearestFilter;
        object.material[textureName] = texture;
        if (textureName == 'aoMap') {
            object.material.transparent = true;
            object.geometry.setAttribute("uv2", object.geometry.attributes.uv.clone());
        }
        object.material.needsUpdate = true;
        return texture;
    }

    createNewTexture(texturePath) {
        let texture = this.textureLoader.load(texturePath);
        this.addTexture(texture);
        return texture;
    }

    addTexture(texture) {
        texture.assetId = this.getNewMaterialId();
        this.textures.set(texture.assetId, texture);
        return texture;
    }

    getTexture(textureId = "texture-0") {
        return this.textures.get(textureId);
    }

    removeTexture(textureId) {
        return this.textures.delete(textureId);
    }

    getNewMaterialId() {
        return "material-" + this.materials.size;
    }

    addMaterial(material) {
        material.assetId = this.getNewMaterialId();
        this.materials.set(material.assetId, material);
        this.dispatchEvent({ type: 'add-material', assetId: material.assetId });
        return material.assetId;
    }

    createNewMaterial(materialType = AssetsManager.MATERIAL_TYPE.MESH_STANDARD_MATERIAL) {
        let material = new THREE[materialType]({ color: 0x8e9091, transparent: true });
        this.addMaterial(material);
        return material;
    }

    getMaterial(materialId = "material-0") {
        return this.materials.get(materialId);
    }

    removeMaterial(materialId) {
        if (this.materials.delete(materialId)) {
            this.dispatchEvent({ type: "remove-material", assetId: materialId });
        }
    }

    loadObj(objFile, onLoad) {
        this.objLoader.load(
            objFile,
            onLoad,
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log('Enable to load from' + objFile);
                console.log(error);
            }
        );
    }

    parseModel(modelData, modelLoader = AssetsManager.MODEL_LOADER.OBJLOADER) {
        return this[modelLoader].parse(modelData);
    }

    getNewFontId() {
        return "font-" + this.fonts.size;
    }

    addFont(font) {
        font.assetId = this.getNewFontId();
        this.fonts.set(font.assetId, font);
        return font;
    }

    getFont(fontId) {
        return this.fonts.get(fontId);
    }

    loadFont(fontPath, onLoad) {
        this.fontLoader.load(
            fontPath,
            (font) => {
                this.addFont(font);
                onLoad(font);
            }
        );
    }


}