
export default class PropertyController{

    constructor(propertiesPane, transformControls, material){
        this.propertiesPane = propertiesPane;
        this.transformControls = transformControls;
        this.material = material;
    }

    transform(){
        this.propertiesFolder = this.propertiesPane.add('Transform');
        
        this.propertiesFolder.add(this.position, 'x').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'y').min(-10).max(10).step(0.01).listen();
        this.propertiesFolder.add(this.position, 'z').min(-10).max(10).step(0.01).listen();

        this.propertiesFolder.add(this.rotation, 'x').min(-360).max(360).step(0.01).listen();
        this.propertiesFolder.add(this.rotation, 'y').min(-360).max(360).step(0.01).listen();
        this.propertiesFolder.add(this.rotation, 'z').min(-360).max(360).step(0.01).listen();
        
        this.propertiesFolder.add(this.scale, 'x').min(-100).max(100).step(0.01).listen();
        this.propertiesFolder.add(this.scale, 'y').min(-100).max(100).step(0.01).listen();
        this.propertiesFolder.add(this.scale, 'z').min(-100).max(100).step(0.01).listen();
    }

    visibility(){
        this.propertiesFolder.add(this, 'visible').onChange(()=>{
            if(!this.visible){
                this.transformControls.detach();
            }else{
                if(!this.transformControls.visible && this.selected){
                    this.transformControls.attach(this);
                }
            }
        });
    }

    color(){
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.material.color.set(this.color);
        });
    }
}