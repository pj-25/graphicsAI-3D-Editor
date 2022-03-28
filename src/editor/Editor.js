import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';
import MeshGenerator from './viewport/menu/MeshGenerator';

export default class Editor{
    constructor(viewportCanvas, toolBarElement, propertiesPaneContainer){
        //add menubar

        //create viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height);
        
        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        this.propertiesPane.domElement.style.marginTop = "5px";
        propertiesPaneContainer.appendChild(this.propertiesPane.domElement);
        this.propertiesPane.open();
    
        //add toolbar
        this.toolBarElement = toolBarElement;
        this.toolBox = new ToolBox(this.viewport);
        this.bindToolBox();

        //create addMesh menu
        this.meshGenerator = new MeshGenerator(this.viewport, this.propertiesPane);
        const addMeshFolder = this.propertiesPane.addFolder('Add mesh');
        addMeshFolder.add(this.meshGenerator, 'createPlane').name('Plane');
        addMeshFolder.add(this.meshGenerator, 'createCube').name('Cube');
        addMeshFolder.add(this.meshGenerator, 'createCircle').name('Circle');
        addMeshFolder.add(this.meshGenerator, 'createUVSphere').name('UVSphere');
        addMeshFolder.add(this.meshGenerator, 'createIcoSphere').name('IcoSphere');
        addMeshFolder.add(this.meshGenerator, 'createCylinder').name('Cylinder');
        addMeshFolder.add(this.meshGenerator, 'createCone').name('Cone');
        addMeshFolder.add(this.meshGenerator, 'createTorus').name('Torus');
        addMeshFolder.add(this.meshGenerator, 'createCamera').name('Camera');
        addMeshFolder.add(this.meshGenerator, 'createLight').name('Light');

        let getSceneBtn = {get:()=>{
            console.log(this.viewport.toJSON());
        }};
        this.propertiesPane.add(getSceneBtn, 'get').name('GET(Scene)');
    }


    bindToolBox(){
        this.toolBox.toolBar = this.propertiesPane.addFolder('Tool Bar');
        this.toolBox.toolBar.open();
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'select').name('Select (B)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.SELECTBOX);
        });
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'move').name('Move (G)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.MOVE);
        });
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'rotate').name('Rotate (R)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.ROTATE);

        });
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'scale').name('Scale (S)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.SCALE);
        });
    }

}