import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';
import ObjectGenerator from './viewport/menu/ObjectGenerator';

export default class Editor{
    constructor(viewportCanvas, toolBarElement, propertiesPaneContainer){
        //TODO:add menubar

        //add viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height);

        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        this.propertiesPane.domElement.draggable = true;
        

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
        this.objectGenerator = new ObjectGenerator(this.viewport, this.sceneOutliner);
        this.bindAddOption();
        this.objectGenerator.addCube();
        
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
            if(this.viewport.controlledCamera.activeCamera.type === 'PerspectiveCamera'){
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
        addMeshFolder.add(this.objectGenerator, 'addPlane').name('Plane');
        addMeshFolder.add(this.objectGenerator, 'addCube').name('Cube');
        addMeshFolder.add(this.objectGenerator, 'addCircle').name('Circle');
        addMeshFolder.add(this.objectGenerator, 'addUVSphere').name('UVSphere');
        addMeshFolder.add(this.objectGenerator, 'addIcoSphere').name('IcoSphere');
        addMeshFolder.add(this.objectGenerator, 'addCylinder').name('Cylinder');
        addMeshFolder.add(this.objectGenerator, 'addCone').name('Cone');
        addMeshFolder.add(this.objectGenerator, 'addTorus').name('Torus');
        addMeshFolder.add(this.objectGenerator, 'addText').name('Text');
        this.loadHelicopter = ()=>{
            this.objectGenerator.addObj('./assets/editor/models/Seahawk.obj');
        };
        addOptionFolder.add(this, 'loadHelicopter').name('Helicopter');
        addOptionFolder.add(this.objectGenerator, 'addCamera').name('Camera');
        let addLightFolder = addOptionFolder.addFolder('Light');
        addLightFolder.add(this.objectGenerator, 'addAmbientLight').name('Ambient');
        addLightFolder.add(this.objectGenerator, 'addDirectionalLight').name('Directional');

        //import option
        const fileInputElement = document.createElement('input');
        fileInputElement.setAttribute('type', 'file');
        fileInputElement.setAttribute('accept', '.obj');
        console.log(fileInputElement);
        fileInputElement.onchange = ()=>{
            let fileReader = new FileReader();
            let file = fileInputElement.files[0];

            fileReader.onload = ()=>{
                this.objectGenerator.parseAndAddObj(fileReader.result);
            };
            if(file){
                fileReader.readAsBinaryString(file);
            }
        };
        this.importObj = ()=>{
            fileInputElement.click();
        }
        addOptionFolder.add(this, 'importObj').name('Import Obj');

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