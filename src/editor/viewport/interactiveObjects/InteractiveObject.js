//mixin
let interactiveObject = {
    // must define this
    // updateGeometry() {

    // },
    onVisibleChange() {
        this.helper.onVisibleChange();
    },
    updateTexture(textureName) {
        this.material[textureName].needsUpdate = true;
        this.material.needsUpdate = true;
    },
    dispose() {
        if (this.properties)
            this.properties.dispose();
        this.geometry.dispose();
        this.material.dispose();
        this.parent.remove(this);
    }
}

export default interactiveObject;