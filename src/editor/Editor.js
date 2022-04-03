import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';
import MeshGenerator from './viewport/menu/ObjectGenerator';

export default class Editor{
    constructor(viewportCanvas, toolBarElement, propertiesPaneContainer){
        //TODO:add menubar

        //add viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height);

        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        if(this.propertiesPaneContainer){
            this.propertiesPane.domElement.style.marginTop = "5px";
            propertiesPaneContainer.appendChild(this.propertiesPane.domElement);
        }
        this.propertiesPane.open();
        this.bindCameraProperties();
    
        //add toolbar
        this.toolBarElement = toolBarElement;
        this.toolBox = new ToolBox(this.viewport);
        this.bindToolBox();

        //add addMesh menu
        this.sceneOutliner = this.propertiesPane.addFolder('Scene Outliner');
        this.meshGenerator = new MeshGenerator(this.viewport, this.sceneOutliner);
        this.bindAddOption();
        this.meshGenerator.addCube();
        
        //add render option
        this.renderMode = false;
        this.propertiesPane.add(this, 'renderMode').name('Render').onChange(()=>{
            this.viewport.toggleHelpers()
            if(this.renderMode)
                this.propertiesPane.close();
        });
    }

    bindCameraProperties(){
        const pcameraFolder = this.propertiesPane.addFolder('Viewport(Perspective)');
        pcameraFolder.add(this.viewport.controlledCamera.perspectiveCamera.position, 'x').min(-10).max(10).listen();
        pcameraFolder.add(this.viewport.controlledCamera.perspectiveCamera.position, 'y').min(-10).max(10).listen();
        pcameraFolder.add(this.viewport.controlledCamera.perspectiveCamera.position, 'z').min(-10).max(10).listen();
        pcameraFolder.add(this.viewport.controlledCamera.perspectiveCamera, 'fov').min(1).max(180).listen().onChange(()=>this.viewport.controlledCamera.perspectiveCamera.updateProjectionMatrix());
        
        const ocameraFolder = this.propertiesPane.addFolder('Viewport(Orthograhpic)');
        ocameraFolder.add(this.viewport.controlledCamera.orthographicCamera.position, 'x').min(-10).max(10).listen();
        ocameraFolder.add(this.viewport.controlledCamera.orthographicCamera.position, 'y').min(-10).max(10).listen();
        ocameraFolder.add(this.viewport.controlledCamera.orthographicCamera.position, 'z').min(-10).max(10).listen();
        ocameraFolder.add(this.viewport.controlledCamera.orthographicCamera, 'zoom').min(1).max(2000).listen().onChange(()=>this.viewport.controlledCamera.orthographicCamera.updateProjectionMatrix());

        this.viewport.controlledCamera.onCameraSwitch = ()=>{
            if(this.viewport.controlledCamera.activeCamera.type == 'PerspectiveCamera'){
                pcameraFolder.domElement.hidden = false;
                ocameraFolder.domElement.hidden = true;
            }else{
                ocameraFolder.domElement.hidden = false;
                pcameraFolder.domElement.hidden = true;
            }
        };
        this.viewport.controlledCamera.onCameraSwitch();
    }

    bindAddOption(){
        const addOptionFolder = this.propertiesPane.addFolder('Add');
        
        const addMeshFolder = addOptionFolder.addFolder('Mesh');
        addMeshFolder.add(this.meshGenerator, 'addPlane').name('Plane');
        addMeshFolder.add(this.meshGenerator, 'addCube').name('Cube');
        addMeshFolder.add(this.meshGenerator, 'addCircle').name('Circle');
        addMeshFolder.add(this.meshGenerator, 'addUVSphere').name('UVSphere');
        addMeshFolder.add(this.meshGenerator, 'addIcoSphere').name('IcoSphere');
        addMeshFolder.add(this.meshGenerator, 'addCylinder').name('Cylinder');
        addMeshFolder.add(this.meshGenerator, 'addCone').name('Cone');
        addMeshFolder.add(this.meshGenerator, 'addTorus').name('Torus');

        addOptionFolder.add(this.meshGenerator, 'addCamera').name('Camera');
        addOptionFolder.add(this.meshGenerator, 'addLight').name('Light');
    }


    bindToolBox(){
        this.toolBox.toolBar = this.propertiesPane.addFolder('Tool Bar');
        this.toolBox.toolBar.open();
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'select').name('Select (B)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.SELECTBOX);
        });
        this.toolBox.toolBar.add(this.toolBox.toolProperties, 'translate').name('Move (G)').listen().onChange(()=>{
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