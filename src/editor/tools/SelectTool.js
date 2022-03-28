import ToolBox from "./ToolBox";


export default class SelectTool{
    constructor(){
        this.type = ToolBox.TOOLTYPE.SELECTBOX;
        this.selected = [];
        this.active = false;
    }

    add(...objects){
        for(let obj of objects){
            if(obj.selected){
                obj.deactivateSelection(false);
                this.selected.splice(this.selected.indexOf(obj));
            }else{
                obj.activateSelection(false);
                this.selected.push(obj);
            }
        }
    }

    deactivate(){
        for(let obj of this.selected){
            obj.deactivateSelection(false);
        }
        this.selected = [];
    }
}