
export default class PropertyController {

    constructor(interactiveObject, propertiesPane, name) {
        this.interactiveObject = interactiveObject;
        if (name == "")
            name = "Object"
        this.propertiesFolder = propertiesPane.addFolder(name + "-" + interactiveObject.id);
        this.dispose = () => { propertiesPane.removeFolder(this.propertiesFolder) };
    }

    initProperties() {
        // visibility
        this.propertiesFolder.add(this.interactiveObject, 'visible').onChange(() => {
            this.interactiveObject.onVisibleChange();
        });

        if (this.interactiveObject.helper.selectable) {
            // selection
            this.propertiesFolder.add(this.interactiveObject.helper, 'selected').listen().onChange(() => {
                this.interactiveObject.helper.onSelectionChange();
            });
            this.interactiveObject.helper.addEventListener('select', () => {
                this.propertiesFolder.open();
            });
            this.interactiveObject.helper.addEventListener('deselect', () => {
                this.propertiesFolder.close();
            });
        }

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveObject.helper, 'hasTransformControl').name('Transform control').listen().onChange(() => {
            this.interactiveObject.helper.onTransformControlsChange();
        });

        //delete button
        this.propertiesFolder.add(this.interactiveObject.helper, 'dispose').name('Delete');

        // transform
        this.transformPropertyFolder = this.propertiesFolder.addFolder('Transform');
        PropertyController.attachTranformProperties(this.interactiveObject, this.transformPropertyFolder);

    }

    static attachTranformProperties(interactiveObject, propertiesFolder) {
        propertiesFolder.add(interactiveObject.position, 'x').name('PositionX').min(-50).max(50).step(0.01).listen();
        propertiesFolder.add(interactiveObject.position, 'y').name('PositionY').min(-50).max(50).step(0.01).listen();
        propertiesFolder.add(interactiveObject.position, 'z').name('PositionZ').min(-50).max(50).step(0.01).listen();

        propertiesFolder.add(interactiveObject.rotation, 'x').name('RotateX').min(-3.14).max(3.14).step(0.01).listen();
        propertiesFolder.add(interactiveObject.rotation, 'y').name('RotateY').min(-3.14).max(3.14).step(0.01).listen();
        propertiesFolder.add(interactiveObject.rotation, 'z').name('RotateZ').min(-3.14).max(3.14).step(0.01).listen();

        propertiesFolder.add(interactiveObject.scale, 'x').name('ScaleX').min(-100).max(100).step(0.01).listen();
        propertiesFolder.add(interactiveObject.scale, 'y').name('ScaleY').min(-100).max(100).step(0.01).listen();
        propertiesFolder.add(interactiveObject.scale, 'z').name('ScaleZ').min(-100).max(100).step(0.01).listen();

    }

}