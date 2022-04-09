
export default class PropertyController{

    constructor(interactiveObject, propertiesPane, name){
        this.interactiveObject = interactiveObject;
        this.propertiesFolder= propertiesPane.addFolder(name + "-" + interactiveObject.id);
        this.dispose = ()=>{propertiesPane.removeFolder(this.propertiesFolder)};
    }

    initProperties(){  
        // visibility
        this.propertiesFolder.add(this.interactiveObject, 'visible').onChange(()=>{
            this.interactiveObject.onVisibleChange();
        });
        
        if(this.interactiveObject.helper.selectable){
            // selection
            this.propertiesFolder.add(this.interactiveObject.helper, 'selected').listen().onChange(()=>{
                this.interactiveObject.helper.onSelectionChange();
            });
        }

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveObject.helper, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.interactiveObject.helper.onTransformControlsChange();
        });

        //delete button
        this.propertiesFolder.add(this.interactiveObject.helper, 'dispose').name('Delete');

        // transform
        this.transformPropertyFolder = this.propertiesFolder.addFolder('Transform');
        this.transformPropertyFolder.add(this.interactiveObject.position, 'x').name('PositionX').min(-50).max(50).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.position, 'y').name('PositionY').min(-50).max(50).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.position, 'z').name('PositionZ').min(-50).max(50).step(0.01).listen();
    
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'x').name('RotateX').min(-3.14).max(3.14).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'y').name('RotateY').min(-3.14).max(3.14).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'z').name('RotateZ').min(-3.14).max(3.14).step(0.01).listen();
        
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'x').name('ScaleX').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'y').name('ScaleY').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'z').name('ScaleZ').min(-100).max(100).step(0.01).listen();
        
    }

    
}