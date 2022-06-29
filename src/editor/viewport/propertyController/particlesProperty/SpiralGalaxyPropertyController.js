import { Color } from "three";
import SpiralGalaxy from "../../interactiveObjects/SpiralGalaxy";
import PropertyController from "../PropertyController";

export default class SpiralGalaxyPropertyController {
    constructor(particleGalaxy, propertiesPane, name = "Spiral Galaxy - " + particleGalaxy.id) {
        this.particleGalaxy = particleGalaxy;
        this.propertiesPane = propertiesPane;
        this.name = name;
    }

    initProperties() {
        this.spiralProperties = this.propertiesPane.addFolder(this.name);
        let options = this.particleGalaxy.options;
        options.color = this.particleGalaxy.material.color.getHex();
        this.spiralProperties.add(this.particleGalaxy.material, 'size').min(0.1).max(2).step(0.001);
        this.spiralProperties.add(this.particleGalaxy.material, 'sizeAttenuation');
        this.spiralProperties.add(options, 'totalParticles').min(10).max(1000).step(1).onFinishChange(() => { this.regenerate() });
        this.spiralProperties.add(options, 'radius').min(1).max(500).step(0.1).onFinishChange(() => {
            this.regenerate();
        });
        this.spiralProperties.add(options, 'branch').min(1).max(12).step(1).onFinishChange(() => {
            this.regenerate();
        })
        this.spiralProperties.add(options, 'curl').min(0).max(15).step(0.01).onFinishChange(() => {
            this.regenerate();
        });
        this.spiralProperties.add(options, 'width').min(0).max(5).step(0.01).onFinishChange(() => {
            this.regenerate();
        });
        this.spiralProperties.addColor(options, 'centerColor').onChange(() => {
            this.regenerate();
        });
        this.spiralProperties.addColor(options, 'tipColor').onChange(() => {
            this.regenerate();
        });

        this.spiralTranformFolder = this.spiralProperties.addFolder('Transform');
        PropertyController.attachTranformProperties(this.particleGalaxy, this.spiralTranformFolder);
    }

    regenerate() {
        this.particleGalaxy.geometry.dispose();
        this.particleGalaxy.geometry = SpiralGalaxy.generateGeometry(this.particleGalaxy.options);
        // this.particleGalaxy.needsUpdate = true;
    }
}