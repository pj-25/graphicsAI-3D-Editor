
export default class PropertyController{

    constructor(interactiveMesh, propertiesPane){
        this.interactiveMesh = interactiveMesh;
        this.propertiesFolder= propertiesPane.addFolder(interactiveMesh.geometry.type.replace('BufferGeometry', "") + "-" + interactiveMesh.id);
    }

    initPropertiesPane(){
        
        // transform
        this.transformPropertyFolder = this.propertiesFolder.addFolder('Transform');
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'x').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'y').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'z').min(-10).max(10).step(0.01).listen();
    
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'x').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'y').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'z').min(-360).max(360).step(0.01).listen();
        
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'x').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'y').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'z').min(-100).max(100).step(0.01).listen();
        
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
            this.interactiveMesh.onClick();
        })

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveMesh, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.interactiveMesh.onTransformControlsChange();
        });

    }

    updateMesh(newGeometry){
        this.interactiveMesh.geometry.dispose();
        this.interactiveMesh.geometry = newGeometry;
    }
}