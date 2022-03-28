
export default class PropertyController{

    constructor(interactiveMesh){
        this.interactiveMesh = interactiveMesh;
        // this.propertiesPane = propertiesPane;
        // this.transformControls = transformControls;
        // this.material = material;
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
        this.propertiesFolder.add(this, 'visible').onChange(()=>{
            if(!this.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this);
                }
            }
        });

        // color
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.material.color.set(this.material.color.getHex());
        });

    }
}