import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';
import MeshGenerator from './viewport/menu/MeshGenerator';

export default class Editor{
    constructor(viewportCanvas, toolBarElement, propertiesPaneContainer){
        //add menubar

        //add viewport
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

        //add addMesh menu
        this.sceneOutliner = this.propertiesPane.addFolder('Scene Outliner');
        this.meshGenerator = new MeshGenerator(this.viewport, this.sceneOutliner);
        this.bindAddMeshOption();
        this.meshGenerator.addCube();
        
        
    }

    bindAddMeshOption(){
        
        const addMeshFolder = this.propertiesPane.addFolder('Add Mesh');
        addMeshFolder.add(this.meshGenerator, 'addPlane').name('Plane');
        addMeshFolder.add(this.meshGenerator, 'addCube').name('Cube');
        addMeshFolder.add(this.meshGenerator, 'addCircle').name('Circle');
        addMeshFolder.add(this.meshGenerator, 'addUVSphere').name('UVSphere');
        addMeshFolder.add(this.meshGenerator, 'addIcoSphere').name('IcoSphere');
        addMeshFolder.add(this.meshGenerator, 'addCylinder').name('Cylinder');
        addMeshFolder.add(this.meshGenerator, 'addCone').name('Cone');
        addMeshFolder.add(this.meshGenerator, 'addTorus').name('Torus');
        addMeshFolder.add(this.meshGenerator, 'addCamera').name('Camera');
        addMeshFolder.add(this.meshGenerator, 'addLight').name('Light');
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