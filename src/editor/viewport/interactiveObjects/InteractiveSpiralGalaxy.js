import { Color } from "three";
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";
import interactiveObject from "./InteractiveObject";
import InteractiveObjectHelper from "./InteractiveObjectHelper";

export default class InteractiveSpiralGalaxy extends Points {
    constructor(viewport, spiralGeometry, spiralMaterial, options) {
        super(spiralGeometry, spiralMaterial);
        this.options = options;
        this.isInteractive = true;

        this.helper = new InteractiveObjectHelper(viewport, this);
    }

    updateGeometry() {
        this.geometry.dispose();
        this.geometry = InteractiveSpiralGalaxy.generateGeometry(this.options);
        this.helper.updateSelectionHelper();
    }

    static generate(viewport, options) {
        let galaxyGeometry = InteractiveSpiralGalaxy.generateGeometry(viewport, options);
        let galaxyMaterial = new PointsMaterial({ size: options.size, sizeAttenuation: true, vertexColors: true });
        galaxyMaterial.transparent = true;
        galaxyMaterial.depthWrite = false;
        return new InteractiveSpiralGalaxy(galaxyGeometry, galaxyMaterial, options);
    }

    static generateGeometry(options) {
        let positions = new Float32Array(options.totalParticles * 3);
        let colors = new Float32Array(options.totalParticles * 3);
        for (let i = 0; i < options.totalParticles * 3; i += 3) {
            const randomRadius = Math.random() * options.radius;
            const branchValue = (i / 3) % options.branch;
            const theta = ((Math.PI * 2 / options.branch) * branchValue) + (randomRadius / options.radius) * options.curl;
            // const y = Math.random() - 0.5;
            // const alpha = Math.asin(y);
            // //setting positions
            // positions[i] = randomRadius * Math.cos(theta) * Math.cos(alpha);
            // positions[i + 1] = y * options.width;
            // positions[i + 2] = randomRadius * Math.sin(theta) * Math.cos(alpha);
            const randomX = Math.pow(Math.random(), options.gravityPull) * (Math.random() < 0.5 ? 1 : -1) * options.randomness;
            const randomY = Math.pow(Math.random(), options.gravityPull) * (Math.random() < 0.5 ? 1 : -1) * options.randomness;
            const randomZ = Math.pow(Math.random(), options.gravityPull) * (Math.random() < 0.5 ? 1 : -1) * options.randomness;
            positions[i] = randomRadius * Math.cos(theta) + randomX;
            positions[i + 1] = randomY;
            positions[i + 2] = randomRadius * Math.sin(theta) + randomZ;
            //setting colors
            const color = new Color(options.centerColor);
            color.lerp(new Color(options.tipColor), randomRadius / options.radius);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        let galaxyGeometry = new BufferGeometry();
        galaxyGeometry.setAttribute('position', new BufferAttribute(positions, 3));
        galaxyGeometry.setAttribute('color', new BufferAttribute(colors, 3));
        return galaxyGeometry;
    }
}

Object.assign(InteractiveSpiralGalaxy.prototype, interactiveObject);