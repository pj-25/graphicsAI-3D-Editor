import { Vector3 } from 'three';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import ToolBox from './tools/ToolBox';
import CameraSelector from './viewport/CameraSelector';
import PropertiesPane from './viewport/PropertiesPane';
import MeshPropertyController from './viewport/propertyController/meshPropertyController/MeshPropertyController';
import ObjectGenerator from './viewport/utils/ObjectGenerator';
import Viewport from './viewport/Viewport';

export default class Editor {
    constructor(viewportCanvas, propertiesPaneContainer) {
        //TODO:add menubar

        //creating properties pane 
        this.propertiesPane = new PropertiesPane(propertiesPaneContainer);
        this.propertiesPane.open();

        //add viewport
        this.viewport = new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height);
        this.propertiesPane.bindRendererProperties(this.viewport.renderer, this.viewport);
        this.propertiesPane.bindControlledCameraProperties(this.viewport.controlledCamera);

        //add toolbar
        this.toolBox = new ToolBox(this.viewport);
        this.toolBox.bindProperties(this.propertiesPane);

        //add cameraSelector
        this.cameraSelector = new CameraSelector(this.viewport.controlledCamera.activeCamera,
            (camera) => {
                this.viewport.controlledCamera.changeCamera(camera);
            }
        );
        this.propertiesPane.bindCameraSelector(this.cameraSelector);

        //add scene outliner
        this.sceneOutliner = this.propertiesPane.addFolder('Scene Outliner');
        this.sceneOutliner.open();
        this.objectGenerator = new ObjectGenerator(this.viewport, this.sceneOutliner, this.cameraSelector);
        //add addMesh menu
        this.propertiesPane.bindObjectGenerator(this.objectGenerator);

        MeshPropertyController.assetsManager = this.objectGenerator.assetsManager;
        //add initial objects
        this.initObjects();

        //add render option
        this.renderMode = false;
        this.propertiesPane.add(this, 'renderMode').name('Render').onChange(() => {
            this.viewport.toggleHelpers()
            if (this.renderMode)
                this.propertiesPane.close();
        });

        //add export to obj option
        this.propertiesPane.add(this, 'exportToObj').name('Export(.obj)');
    }

    exportToObj() {
        let objExporter = new OBJExporter();
        //FIXME: export scene without helpers
        const data = objExporter.parse(this.viewport);
        this.downloadFile(data, "graphicsAI-exported.obj");
    }

    downloadFile(data, fileName) {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([data], { 'type': 'text/plain' }));
        downloadLink.download = fileName;
        downloadLink.click();
    }

    initObjects() {
        this.objectGenerator.addAmbientLight();
        this.objectGenerator.cursorPoint = new Vector3(-4, 3, 2);
        this.objectGenerator.addDirectionalLight();
        this.objectGenerator.cursorPoint = new Vector3(0, 0, 0);

        this.objectGenerator.addCube();
        const basePlane = this.objectGenerator.addPlane();
        basePlane.rotation.x = -Math.PI / 2;
        basePlane.position.y = -0.5;
        basePlane.scale.set(10, 10, 10);
    }
}