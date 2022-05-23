import PropertyController from "../PropertyController";

export default class LightPropertyController extends PropertyController {
    constructor(interactiveLight, propertiesPane, name) {
        super(interactiveLight.light, propertiesPane, name);
        this.interactiveLight = interactiveLight;

        this.color = interactiveLight.light.color.getHex();
    }

    initProperties() {
        super.initProperties();

        this.propertiesFolder.addColor(this, 'color').onChange(() => {
            this.interactiveLight.light.color.setHex(this.color);
            if (!this.interactiveObject.helper.selected) {
                this.interactiveLight.color.setHex(this.color);
                this.interactiveLight.update();
            }
        });
        this.propertiesFolder.add(this.interactiveLight.light, 'intensity').min(0).max(1).step(0.01);

        this.shadowPropertyFolder = this.propertiesFolder.addFolder("Shadow");
        this.shadowPropertyFolder.add(this.interactiveObject, 'castShadow').name('Cast Shadow');
        this.shadowPropertyFolder.add(this.interactiveObject, 'receiveShadow').name('Receive Shadow');
        if (this.interactiveObject.shadow)
            this.shadowPropertyFolder.add(this.interactiveObject.shadow, 'radius').min(0).max(20).step(0.01);
    }
}