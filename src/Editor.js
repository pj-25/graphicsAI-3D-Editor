import Viewport from './Viewport';
import * as dat from 'dat.gui';

export default class Editor{
    constructor(viewportCanvas, propertiesPaneContainer){
        //create viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height); 
        
        //add toolbar


        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        this.propertiesPane.domElement.style.marginTop = "5px";
        propertiesPaneContainer.appendChild(this.propertiesPane.domElement);
    }

}