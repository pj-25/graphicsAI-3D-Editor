import { Color } from "three";
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";

export default class SpiralGalaxy extends Points {
    constructor(spiralGeometry, spiralMaterial, options) {
        super(spiralGeometry, spiralMaterial);
        this.options = options;
    }

    static generate(options) {
        let galaxyGeometry = SpiralGalaxy.generateGeometry(options);
        let galaxyMaterial = new PointsMaterial({ size: options.size, sizeAttenuation: true, vertexColors: true });
        return new SpiralGalaxy(galaxyGeometry, galaxyMaterial, options);
    }

    static generateGeometry(options) {
        let positions = new Float32Array(options.totalParticles * 3);
        let colors = new Float32Array(options.totalParticles * 3);
        for (let i = 0; i < options.totalParticles * 3; i += 3) {
            const randomRadius = Math.random() * options.radius;
            const branchValue = (i / 3) % options.branch;
            const theta = ((Math.PI * 2 / options.branch) * branchValue) + (randomRadius / options.radius) * options.curl;
            const y = Math.random() - 0.5;
            const alpha = Math.asin(y);
            //setting positions
            positions[i] = randomRadius * Math.cos(theta) * Math.cos(alpha);
            positions[i + 1] = y * options.width;
            positions[i + 2] = randomRadius * Math.sin(theta) * Math.cos(alpha);
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