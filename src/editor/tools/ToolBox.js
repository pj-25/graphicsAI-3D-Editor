

export default class ToolBox{
    
    static TOOLTYPE = {
        SELECTBOX: 0,
        CURSOR: 1,
        MOVE: 2,
        ROTATE: 3,
        SCALE: 4,
        MEASURE: 7,
        ADDCUBE: 8
    };

    constructor(domElement, viewport){
        this.activeTool = ToolBox.TOOLTYPE.MOVE;
        this.viewport = viewport;
        this.domElement = domElement;
        
    }

    activate(toolType){
        this.activeTool = toolType;
        
    }

    deactivate(){
        this.activeTool = ToolBox.TOOLTYPE.MOVE;
    }

    onSelect(event){
        this.activate(this.TOOLTYPE.SELECTBOX);
    }

    onCursor(event){
        this.activate(this.TOOLTYPE.CURSOR);
    }

    onMove(event){
        this.activate(this.TOOLTYPE.MOVE);
    }

    onRotate(event){
        this.activate(this.TOOLTYPE.ROTATE);
    }

    onScale(event){
        this.activate(this.TOOLTYPE.SCALE);

    }

    onMeasure(event){

    }

    onAddCube(event){

    }
}

