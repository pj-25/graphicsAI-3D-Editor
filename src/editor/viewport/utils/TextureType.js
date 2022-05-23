export default class TextureType {
    constructor(type, path, properties) {
        this.type = type;
        this.path = path;
        this.properties = properties;
    }

    static albedoTexture = new TextureType("normalMap");
}