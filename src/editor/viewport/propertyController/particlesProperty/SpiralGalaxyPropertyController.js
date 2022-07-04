import MeshPropertyController from "../meshPropertyController/MeshPropertyController";

export default class SpiralGalaxyPropertyController extends MeshPropertyController {
    constructor(particleGalaxy, propertiesPane, name = "Spiral Galaxy") {
        super(particleGalaxy, propertiesPane, name);
        this.particleGalaxy = particleGalaxy;
        this.propertiesPane = propertiesPane;
    }

    initProperties() {
        super.initProperties();
        this.spiralProperties = this.propertiesFolder.addFolder("Options");
        let options = this.particleGalaxy.options;
        options.baseColor = this.particleGalaxy.material.color.getHex();
        this.spiralProperties.add(this.particleGalaxy.material, 'size').min(0.1).max(2).step(0.001);
        this.spiralProperties.add(this.particleGalaxy.material, 'sizeAttenuation');
        this.spiralProperties.add(options, 'totalParticles').min(10).max(10000).step(1).onFinishChange(() => { this.regenerate() });
        this.spiralProperties.add(options, 'radius').min(1).max(500).step(0.1).onFinishChange(() => {
            this.regenerate();
        });
        this.spiralProperties.add(options, 'branch').min(1).max(12).step(1).onFinishChange(() => {
            this.regenerate();
        })
        this.spiralProperties.add(options, 'curl').min(0).max(15).step(0.01).onFinishChange(() => {
            this.regenerate();
        });
        // this.spiralProperties.add(options, 'width').min(0).max(5).step(0.01).onFinishChange(() => {
        //     this.regenerate();
        // });
        this.spiralProperties.addColor(options, 'baseColor').onChange(() => {
            this.interactiveObject.material.color.setHex(options.baseColor);
        })
        this.spiralProperties.addColor(options, 'centerColor').onChange(() => {
            this.regenerate();
        });
        this.spiralProperties.addColor(options, 'tipColor').onChange(() => {
            this.regenerate();
        });
        this.spiralProperties.add(options, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => {
            this.regenerate();
        });
        this.spiralProperties.add(options, 'gravityPull').min(1).max(10).step(0.001).onFinishChange(() => {
            this.regenerate();
        });
    }

    regenerate() {
        this.particleGalaxy.updateGeometry();
        // this.particleGalaxy.needsUpdate = true;
    }
}