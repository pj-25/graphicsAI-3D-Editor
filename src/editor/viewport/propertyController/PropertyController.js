
export default class PropertyController{

    constructor(interactiveObject, propertiesPane){
        this.interactiveObject = interactiveObject;
        this.propertiesFolder= propertiesPane.addFolder(interactiveObject.geometry.type.replace('BufferGeometry', "") + "-" + interactiveObject.id);
    }

    initProperties(){  
        // transform
        this.transformPropertyFolder = this.propertiesFolder.addFolder('Transform');
        this.transformPropertyFolder.add(this.interactiveObject.position, 'x').name('PositionX').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.position, 'y').name('PositionY').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.position, 'z').name('PositionZ').min(-10).max(10).step(0.01).listen();
    
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'x').name('RotateX').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'y').name('RotateY').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.rotation, 'z').name('RotateZ').min(-360).max(360).step(0.01).listen();
        
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'x').name('ScaleX').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'y').name('ScaleY').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveObject.scale, 'z').name('ScaleZ').min(-100).max(100).step(0.01).listen();
    
        // visibility
        this.propertiesFolder.add(this.interactiveObject, 'visible').onChange(()=>{
            this.interactiveObject.onVisibleChange();
        });
        
        // selection
        this.propertiesFolder.add(this.interactiveObject.helper, 'selected').listen().onChange(()=>{
            this.interactiveObject.helper.onSelectionChange();
        });

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveObject.helper, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.interactiveObject.helper.onTransformControlsChange();
        });
    }

    
}