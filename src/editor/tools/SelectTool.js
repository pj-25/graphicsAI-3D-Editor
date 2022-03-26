

export default class SelectTool{
    constructor(){
        this.selected = [];
        this.active = false;
        this.type = 'SelectTool';

    }

    add(...objects){
        for(let obj of objects){
            obj.onClick();
        }
    }
}