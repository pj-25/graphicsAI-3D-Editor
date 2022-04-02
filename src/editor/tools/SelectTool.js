import ToolBox from "./ToolBox";


export default class SelectTool{
    constructor(){
        this.type = ToolBox.TOOLTYPE.SELECTBOX;
        this.selected = [];
        this.active = false;
    }

    add(...objects){
        for(let obj of objects){
            if(obj.helper.selected){
                obj.helper.deactivateSelection(false);
                this.selected.splice(this.selected.indexOf(obj));
            }else{
                obj.helper.activateSelection(false, false);
                this.selected.push(obj);
            }
        }
    }

    deactivate(){
        for(let obj of this.selected){
            obj.helper.deactivateSelection(false);
        }
        this.selected = [];
    }
}