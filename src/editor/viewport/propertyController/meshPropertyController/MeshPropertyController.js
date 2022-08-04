import { BackSide, ClampToEdgeWrapping, DoubleSide, FrontSide, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, MirroredRepeatWrapping, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, RepeatWrapping } from "three";
import AssetsManager from "../../utils/AssetsManager";
import PropertyController from "../PropertyController";


export default class MeshPropertyController extends PropertyController {

    static magFilterTypes = { "NearestFilter": NearestFilter, "LinearFilter": LinearFilter };
    static minFilterTypes = { ...MeshPropertyController.magFilterTypes, "NearestMipmapNearestFilter": NearestMipmapNearestFilter, "NearestMipmapLinearFilter": NearestMipmapLinearFilter, "LinearFilter": LinearFilter, "LinearMipmapNearestFilter": LinearMipmapNearestFilter, "LinearMipmapLinearFilter": LinearMipmapLinearFilter };
    static wrapTypes = { "RepeatWrapping": RepeatWrapping, "ClampToEdgeWrapping": ClampToEdgeWrapping, "MirroredRepeatWrapping": MirroredRepeatWrapping };

    static maps = {
        "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_COL_2K.jpg",
        "Minecraft": "./textures/minecraft/minecraft.png",
        "Door": "./textures/door/color.jpg"
    }
    static normalMaps = {
        "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_NRM_2K.jpg",
        "Door": "./textures/door/normal.jpg"
    }
    static aoMaps = {
        "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_AO_2K.jpg",
        "Door": "./textures/door/ambientOcclusion.jpg"
    }
    static displacementMaps = {
        "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_DISP_2K.jpg",
        "Door": "./textures/door/height.jpg"
    }
    static roughnessMaps = {
        "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_GLOSS_2K.jpg",
        "Door": "./textures/door/roughness.jpg"
    }
    static bumpMaps = { "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_BUMP_2K.jpg" }
    static lightMaps = { "Ground-CobbleStone": "./textures/GroundCobblestone001/GroundCobblestone001_REFL_2K.jpg" }
    static alphaMaps = { "Door": "./textures/door/alpha.jpg", "Smoke": "./textures/particles/smoke_01.png", "Star1": "./textures/particles/star_01.png", "Star2": "./textures/particles/star_06.png", "Star3": "./textures/particles/star_07.png" }
    static emissiveMaps = {}
    static environmentMaps = {}
    static metalnessMaps = { "Door": "./textures/door/metalness.jpg" }

    constructor(mesh, propertiesPane, name = mesh.geometry.type.replace('BufferGeometry', "")) {
        super(mesh, propertiesPane, name);
        this.geometryData = JSON.parse(JSON.stringify(mesh.geometry));
    }

    initProperties() {
        super.initProperties();

        this.addMaterialPropertyFolder();
    }

    addMaterialPropertyFolder() {
        this.materialPropertyFolder = this.propertiesFolder.addFolder('Material');
        if (this.interactiveObject.material.color)
            this.color = this.interactiveObject.material.color.getHex();
        this.interactiveObject.assetId = this.interactiveObject.material.assetId;
        this.assetIdProperty = this.materialPropertyFolder.add(this.interactiveObject, 'assetId', Array.from(MeshPropertyController.assetsManager.materials.keys())).name("Material").onChange(() => {
            this.updateMaterial(MeshPropertyController.assetsManager.getMaterial(this.interactiveObject.assetId));
            this.materialPropertyFolder.open();
        });
        MeshPropertyController.assetsManager.addEventListener("add-material", this.onAddMaterial.bind(this));
        MeshPropertyController.assetsManager.addEventListener("remove-material", this.onRemoveMaterial.bind(this));
        this.interactiveObject.materialType = this.interactiveObject.material.constructor.name;
        this.materialPropertyFolder.add(this.interactiveObject, 'materialType', AssetsManager.MATERIAL_TYPE).onChange(() => {
            this.updateMaterial(MeshPropertyController.assetsManager.createNewMaterial(this.interactiveObject.materialType));
        });
        if (this.color)
            this.materialPropertyFolder.addColor(this, 'color').onChange(() => {
                this.interactiveObject.material.color.setHex(this.color);
            });
        //FIXME: changes side only once
        this.materialPropertyFolder.add(this.interactiveObject.material, "side", { "Front": FrontSide, "Back": BackSide, "Double": DoubleSide }).listen().onChange(() => {
            this.interactiveObject.material.needsUpdate = true;
        });

        if (this.interactiveObject.material.wireframe)
            this.materialPropertyFolder.add(this.interactiveObject.material, 'wireframe');
        this.materialPropertyFolder.add(this.interactiveObject.material, 'opacity').min(0).max(1).step(0.0001).onChange(() => {
            this.interactiveObject.material.transparent = true
        });
        if (this.interactiveObject.material.metalness)
            this.materialPropertyFolder.add(this.interactiveObject.material, 'metalness').min(0).max(1).step(0.0001);
        if (this.interactiveObject.material.roughness)
            this.materialPropertyFolder.add(this.interactiveObject.material, 'roughness').min(0).max(1).step(0.0001);
        //FIXME: flatShadding not working
        if (this.interactiveObject.material.flatShadding)
            this.materialPropertyFolder.add(this.interactiveObject.material, 'flatShading').onChange(() => {
                this.interactiveObject.material.needsUpdate = true;
            });
        this.shadowPropertyFolder = this.materialPropertyFolder.addFolder("Shadow");
        this.shadowPropertyFolder.add(this.interactiveObject, 'castShadow').name('Cast Shadow');
        this.shadowPropertyFolder.add(this.interactiveObject, 'receiveShadow').name('Receive Shadow');

        this.textureSelection = "Select a texture";
        this.materialPropertyFolder
            .add(this, "textureSelection", AssetsManager.textureTypes)
            .name("Add Texture").listen()
            .listen()
            .onChange(() => {
                this.addTexturePropertyFolder(this.textureSelection);
                this.textureSelection = "Select a texture";
            });
    }

    updateMaterial(material) {
        this.interactiveObject.material = material;
        this.updateMaterialPropertyFolder()
    }

    onAddMaterial(event) {
        let option = document.createElement("option");
        option.value = event.assetId;
        option.innerHTML = event.assetId;
        this.assetIdProperty.__select.appendChild(option);
    }

    onRemoveMaterial(event) {
        this.assetIdProperty.__select.querySelector('option[value="' + event.assetId + '"]').remove();
    }

    updateMaterialPropertyFolder() {
        //FIXME: not sure about the callback reference without bind
        MeshPropertyController.assetsManager.removeEventListener("add-material", this.onAddMaterial);
        MeshPropertyController.assetsManager.removeEventListener("remove-material", this.onRemoveMaterial);
        this.texturePropertyFolder = null;
        this.propertiesFolder.removeFolder(this.materialPropertyFolder);
        this.addMaterialPropertyFolder();
        //TODO: update texture property folder
    }

    addTexturePropertyFolder(textureName) {
        if (!this.texturePropertyFolder) {
            this.texturePropertyFolder = this.materialPropertyFolder.addFolder("Texture");
        }

        const texturePropertyFolderName = textureName + "PropertyFolder";
        this[texturePropertyFolderName] = this.texturePropertyFolder.addFolder(textureName);
        this.interactiveObject.material[textureName + "Path"] = ""
        this[texturePropertyFolderName].add(this.interactiveObject.material, textureName + "Path", MeshPropertyController[textureName + "s"])
            .name(textureName)
            .onChange(() => {
                const texture = MeshPropertyController.assetsManager.applyTexture(this.interactiveObject, textureName, this.interactiveObject.material[textureName + "Path"]);
                this.addTextureProperty(this[texturePropertyFolderName], textureName, texture);
            });
    }

    addTextureProperty(textureProperty, textureName, texture) {
        textureProperty.add(texture, "generateMipmaps");
        //FIXME: update texture not working 
        textureProperty.add(texture, "wrapS", MeshPropertyController.wrapTypes).onChange(() => {
            this.interactiveObject.updateTexture(textureName)
        });
        textureProperty.add(texture, "wrapT", MeshPropertyController.wrapTypes).onChange(() => {
            this.interactiveObject.updateTexture(textureName)
        });
        textureProperty.add(texture, "minFilter", MeshPropertyController.minFilterTypes).onChange(() => {
            this.interactiveObject.updateTexture(textureName)
        });
        textureProperty.add(texture, "magFilter", MeshPropertyController.magFilterTypes).onChange(() => {
            this.interactiveObject.updateTexture(textureName)
        });
        texture.delete = () => {
            this.interactiveObject.material[textureName] = null;
            this.interactiveObject.material.needsUpdate = true;
            texture.dispose();
            this.texturePropertyFolder.removeFolder(textureProperty);
        }
        textureProperty.add(texture, "delete");
    }

}