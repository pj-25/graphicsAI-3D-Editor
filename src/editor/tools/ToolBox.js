import SelectTool from "./SelectTool";
import TransformTool from "./TransformTool";


export default class ToolBox {

    static TOOLTYPE = {
        SELECTBOX: 0,
        CURSOR: 1,
        TRANSFORM: 2,
        MOVE: 3,
        ROTATE: 4,
        SCALE: 5,
        MEASURE: 7,
        ADDCUBE: 8,
        DELETE: 9
    };

    constructor(viewport) {
        this.activeTool = ToolBox.TOOLTYPE.SELECTBOX;
        this.viewport = viewport;

        this.toolMode = {
            select: true,
            translate: false,
            rotate: false,
            scale: false
        };

        this.selectTool = new SelectTool();
        this.transformTool = new TransformTool(viewport, viewport.controlledCamera, viewport.domElement);

        this.viewport.onIntersectedObject = (object) => {

            if (object.isInteractive) {

                switch (this.activeTool) {
                    case ToolBox.TOOLTYPE.SELECTBOX:
                        this.selectTool.add(object);
                        break;
                }
            } else {
                if (this.activeTool === ToolBox.TOOLTYPE.SELECTBOX) {
                    this.selectTool.deactivate();
                }
            }
        };


        this.viewport.domElement.addEventListener('keypress', event => {
            if (this.selectTool.selected.length > 0) {
                switch (event.code) {
                    case 'KeyB':
                        this.activate(ToolBox.TOOLTYPE.SELECTBOX);
                        break;
                    case 'KeyG':
                        this.activate(ToolBox.TOOLTYPE.MOVE);
                        break;
                    case 'KeyR':
                        this.activate(ToolBox.TOOLTYPE.ROTATE);
                        break;
                    case 'KeyS':
                        this.activate(ToolBox.TOOLTYPE.SCALE);
                        break;

                }
            }
        });
        this.viewport.domElement.addEventListener('keydown', (event) => {
            if (event.key === 'Delete' || event.keyCode === '8' || event.key == 'Backspace') {
                this.delete();
            }
        });
    }

    setMode(toolName) {
        for (let tool in this.toolMode) {
            this.toolMode[tool] = false;
        }
        this.toolMode[toolName] = true;
    }

    activate(toolType) {
        if (this.activeTool === toolType) {
            if (toolType === ToolBox.TOOLTYPE.SELECTBOX) {
                this.selectTool.deactivate();
            }
            return;
        }
        this.activeTool = toolType;
        switch (toolType) {
            case ToolBox.TOOLTYPE.SELECTBOX:
                this.setMode('select');
                this.deactivate();
                break;
            case ToolBox.TOOLTYPE.MOVE:
                this.activateTransformTool('translate');
                break;
            case ToolBox.TOOLTYPE.ROTATE:
                this.activateTransformTool('rotate');
                break;
            case ToolBox.TOOLTYPE.SCALE:
                this.activateTransformTool('scale');
                break;
            case ToolBox.TOOLTYPE.DELETE:
                this.delete();
                break;
        }
    }

    activateTransformTool(type) {
        this.setMode(type);
        if (this.transformTool.active) {
            this.transformTool.setMode(type);
            return;
        }
        if (this.selectTool.selected.length > 0) {
            this.transformTool.activate(this.selectTool.selected, type);
        } else if (this.transformTool.singleTransformObject) {
            this.transformTool.singleTransformObject.helper.detachTranformControls();
        }
    }

    deactivate() {
        if (this.transformTool.active) {
            this.activeTool = ToolBox.TOOLTYPE.SELECTBOX;
            this.transformTool.deactivate();
        }
    }

    delete() {
        if (this.activeTool === ToolBox.TOOLTYPE.SELECTBOX) {
            for (let obj of this.selectTool.selected) {
                obj.helper.dispose();
            }
            this.selectTool.selected = [];
        }
    }

    bindProperties(propertiesPane) {
        this.toolBar = propertiesPane.addFolder('Tool Bar');
        this.toolBar.add(this.toolMode, 'select').name('Select (B)').listen().onChange(() => {
            this.activate(ToolBox.TOOLTYPE.SELECTBOX);
        });
        this.toolBar.add(this.toolMode, 'translate').name('Move (G)').listen().onChange(() => {
            this.activate(ToolBox.TOOLTYPE.MOVE);
        });
        this.toolBar.add(this.toolMode, 'rotate').name('Rotate (R)').listen().onChange(() => {
            this.activate(ToolBox.TOOLTYPE.ROTATE);
        });
        this.toolBar.add(this.toolMode, 'scale').name('Scale (S)').listen().onChange(() => {
            this.activate(ToolBox.TOOLTYPE.SCALE);
        });
        this.toolBar.add(this, 'delete').name('Delete (del)');
    }
}

