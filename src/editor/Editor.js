import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';

export default class Editor{
    constructor(mouse, viewportCanvas, toolBarElement, propertiesPaneContainer){
        //add menubar

        //create viewport
        this.viewport = new Viewport(mouse, viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height); 
        
        //add toolbar
        this.toolBox = new ToolBox(toolBarElement, this.viewport);
        this.bindToolBox();

        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        this.propertiesPane.domElement.style.marginTop = "5px";
        propertiesPaneContainer.appendChild(this.propertiesPane.domElement);
        this.propertiesPane.open();
    }

    bindToolBox(){
        
    }

}