import Viewport from './viewport/Viewport';
import * as dat from 'dat.gui';
import ToolBox from './tools/ToolBox';
import ObjectGenerator from './viewport/utils/ObjectGenerator';
import {OBJExporter} from 'three/examples/jsm/exporters/OBJExporter';
import CameraSelector from './viewport/CameraSelector';
import { Vector3 } from 'three';

export default class Editor{
    constructor(viewportCanvas, toolBarElement, propertiesPaneContainer){
        //TODO:add menubar

        //add viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height);

        //creating properties pane 
        this.propertiesPane = new dat.GUI();
        this.propertiesPane.domElement.draggable = true;
        this.propertiesPane.domElement.style.marginRight = "5px";

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

        //add cameraSelector
        this.cameraSelector = new CameraSelector(this.viewport.controlledCamera.activeCamera, 
            (camera)=>{
                this.viewport.controlledCamera.changeCamera(camera);
            }
        );
        let cameraSwitchOption = this.propertiesPane.add(this.cameraSelector, 'currentCameraName', Array.from(this.cameraSelector.keys()))
            .name('Camera')
            .listen()
            .onChange(()=>{ 
               this.cameraSelector.switchCamera();
            });
        this.cameraSelector.onAddCamera = (camera)=>{
            let option= document.createElement('option');
            option.value = camera.name;
            option.innerHTML = camera.name;
            cameraSwitchOption.__select.appendChild(option);
        };
        this.cameraSelector.onDeleteCamera = (camera)=>{
            cameraSwitchOption.__select.querySelector('option[value="'+camera.name+'"]').remove();
        }

        //add addMesh menu
        this.sceneOutliner = this.propertiesPane.addFolder('Scene Outliner');
        this.sceneOutliner.open();
        this.objectGenerator = new ObjectGenerator(this.viewport, this.sceneOutliner, this.cameraSelector);
        this.bindAddOption();
    
        //add initial objects
        this.initObjects();

        //add render option
        this.renderMode = false;
        this.propertiesPane.add(this, 'renderMode').name('Render').onChange(()=>{
            this.viewport.toggleHelpers()
            if(this.renderMode)
                this.propertiesPane.close();
        });

        //add export to obj option
        this.propertiesPane.add(this, 'exportToObj').name('Export(.obj)');
    }

    exportToObj(){
        let objExporter = new OBJExporter();
        //FIXME: export scene without helpers
        const data = objExporter.parse(this.viewport);
        this.downloadFile(data, "graphicsAI-exported.obj");
    }

    downloadFile(data, fileName){
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([data], {'type':'text/plain'}));
        downloadLink.download = fileName;
        downloadLink.click();
    }

    initObjects(){
        this.objectGenerator.addCube();
        this.objectGenerator.addAmbientLight();
        this.objectGenerator.cursorPoint = new Vector3(-4,3,2);
        this.objectGenerator.addDirectionalLight();
        this.objectGenerator.cursorPoint = new Vector3(0,0,0);
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
        this.loadHelicopter = () => {
            this.objectGenerator.addObj(
                './assets/editor/models/Seahawk.obj',
                true,
                'Helicopter',
                (helicopter) => {
                    helicopter.scale.x *= 0.1;
                    helicopter.scale.y *= 0.1;
                    helicopter.scale.z *= 0.1;
                }
            );
        };
        addOptionFolder.add(this, 'loadHelicopter').name('Helicopter');
        addOptionFolder.add(this.objectGenerator, 'addCamera').name('Camera');
        let addLightFolder = addOptionFolder.addFolder('Light');
        let ambientOption = addLightFolder.add(this.objectGenerator, 'addAmbientLight').name('Ambient').onChange(()=>{
            addLightFolder.remove(ambientOption);
        });
        addLightFolder.add(this.objectGenerator, 'addDirectionalLight').name('Directional');
        addLightFolder.add(this.objectGenerator, 'addHemisphereLight').name('Hemisphere');
        addLightFolder.add(this.objectGenerator, 'addPointLight').name('Point');
        addLightFolder.add(this.objectGenerator, 'addRectAreaLight').name('RectArea')
        addLightFolder.add(this.objectGenerator, 'addSpotLight').name('Spot');

        //import .obj option
        addOptionFolder.add(this.objectGenerator, 'importObj').name('Import Obj');
        
    }


    bindToolBox(){
        this.toolBox.toolBar = this.propertiesPane.addFolder('Tool Bar');
        this.toolBox.toolBar.add(this.toolBox.toolMode, 'select').name('Select (B)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.SELECTBOX);
        });
        this.toolBox.toolBar.add(this.toolBox.toolMode, 'translate').name('Move (G)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.MOVE);
        });
        this.toolBox.toolBar.add(this.toolBox.toolMode, 'rotate').name('Rotate (R)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.ROTATE);
        });
        this.toolBox.toolBar.add(this.toolBox.toolMode, 'scale').name('Scale (S)').listen().onChange(()=>{
            this.toolBox.activate(ToolBox.TOOLTYPE.SCALE);
        });
    }

}