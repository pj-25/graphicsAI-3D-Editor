import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";

export default class SpiralGalaxy extends Points {
    constructor(spiralGeometry, spiralMaterial, options) {
        super(spiralGeometry, spiralMaterial);
        this.options = options;
    }

    static generate(options) {
        let galaxyGeometry = SpiralGalaxy.generateGeometry(options);
        let galaxyMaterial = new PointsMaterial({ size: options.size, sizeAttenuation: true });
        return new SpiralGalaxy(galaxyGeometry, galaxyMaterial, options);
    }

    static generateGeometry(options) {
        let positions = new Float32Array(options.totalParticles * 3);
        for (let i = 0; i < options.totalParticles * 3; i += 3) {
            const randomRadius = Math.random() * options.radius;
            const branchValue = (i / 3) % options.branch;
            const theta = ((Math.PI * 2 / options.branch) * branchValue) + (randomRadius / options.radius) * options.curl;
            const y = Math.random() - 0.5;
            const alpha = Math.asin(y);
            positions[i] = randomRadius * Math.cos(theta) * Math.cos(alpha);
            positions[i + 1] = y * options.width;
            positions[i + 2] = randomRadius * Math.sin(theta) * Math.cos(alpha);
        }
        let galaxyGeometry = new BufferGeometry();
        galaxyGeometry.setAttribute('position', new BufferAttribute(positions, 3));
        return galaxyGeometry;
    }
}