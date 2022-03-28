
export default class PropertyController{

    constructor(interactiveMesh){
        this.interactiveMesh = interactiveMesh;
    }

    initPropertiesPane(){
        
        // transform
        this.propertiesFolder = this.propertiesPane.add('Transform');
        
        this.propertiesFolder.add(this.interactiveMesh.position, 'x').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.position, 'y').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.position, 'z').min(-10).max(10).step(0.01).listen();
    
        this.propertiesFolder.add(this.interactiveMesh.rotation, 'x').min(-360).max(360).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.rotation, 'y').min(-360).max(360).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.rotation, 'z').min(-360).max(360).step(0.01).listen();
        
        this.propertiesFolder.add(this.interactiveMesh.scale, 'x').min(-100).max(100).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.scale, 'y').min(-100).max(100).step(0.01).listen();
        this.propertiesFolder.add(this.interactiveMesh.scale, 'z').min(-100).max(100).step(0.01).listen();
        
        // visibility
        this.propertiesFolder.add(this.interactiveMesh, 'visible').onChange(()=>{
            onVisibleChange();
        });

        // color
        this.propertiesFolder.addColor(this.interactiveMesh, 'color').onChange(()=>{
            this.interactiveMesh.material.color.set(this.material.color.getHex());
        });

        // selection
        this.propertiesFolder.add(this.interactiveMesh, 'selected').onChange(()=>{
            if(!this.interactiveMesh.selected)
                this.interactiveMesh.activateSelection()
            else
                this.interactiveMesh.deactivateSelection()
        })

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveMesh, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.interactiveMesh.onTransformControlsChange();
        });

        // function onVisibleChange(){
        //     detachTransformControls();
        // }
    
        // function onTransformControlsChange(){
        //     if(this.interactiveMesh.hasTransformControl){
        //         attachTransformControls();
        //     }else{
        //         detachTransformControls();
        //     }
        // }
    
        // function attachTransformControls(){
        //     this.interactiveMesh.hasTransformControl = true;
        //     this.interactiveMesh.transformControls.attach(this);
        //     this.interactiveMesh.transformControls.addEventListener('mouseDown',this.viewport.disableOrbitControls);
        //     this.interactiveMesh.transformControls.addEventListener('mouseUp',this.viewport.enableOrbitControls);
        // }
    
        // function detachTransformControls(){
        //     this.interactiveMesh.hasTransformControl = false;
        //     this.interactiveMesh.transformControls.detach();
        //     this.interactiveMesh.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        //     this.interactiveMesh.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        // }
    
        // function activateSelection(attach=true){
        //     this.interactiveMesh.selected = true;
        //     this.interactiveMesh.add(this.interactiveMesh.selectionHelper);
        //     if(attach){
        //         attachTransformControls();
        //     }
        // }
    
        // function deactivateSelection(detach=true){
        //     this.interactiveMesh.selected = false;
        //     this.interactiveMesh.remove(this.interactiveMesh.selectionHelper);
        //     if(detach){
        //         detachTransformControls();
        //     }
        // }
    
    }

    updateMesh(newGeometry){
        this.interactiveMesh.geometry.dispose();
        this.interactiveMesh.geometry = newGeometry;
    }
}