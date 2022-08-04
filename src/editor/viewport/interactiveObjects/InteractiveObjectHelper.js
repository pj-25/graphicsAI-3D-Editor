import * as THREE from 'three';
import { EventDispatcher } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

export default class InteractiveObjectHelper extends EventDispatcher {
    constructor(viewport, interactiveObject, selectable = true, selectionColor = 0xf49a34) {
        super();
        this.viewport = viewport;
        this.interactiveObject = interactiveObject;
        this.hasTransformControl = false;
        this.name = "InteractiveObjectHelper";

        this.transformControls = new TransformControls(viewport.controlledCamera.activeCamera, viewport.domElement);

        if (selectable) {
            this.selectionColor = selectionColor;
            this.selectable = true;
            this.selected = false;
            this.selectionHelper = new THREE.BoxHelper(this.interactiveObject, selectionColor);
        }

        this.onKeypressTransformAction = (event) => {
            if (this.transformControls.visible) {
                switch (event.code) {
                    case 'KeyG':
                        this.setTransformMode('translate');
                        break;
                    case 'KeyR':
                        this.setTransformMode('rotate');
                        break;
                    case 'KeyS':
                        this.setTransformMode('scale');
                        break;
                }
            }
        };

        this.onKeypressDeleteAction = (event) => {
            if (this.selected && (event.key === 'Delete' || event.keyCode === '8' || event.key == 'Backspace')) {
                this.dispose();
            }
        }
    }

    setTransformMode(mode) {
        this.transformControls.setMode(mode);
        switch (mode) {
            case 'translate':
                this.viewport.domElement.style.cursor = 'move';
                break;
            case 'rotate':
                this.viewport.domElement.style.cursor = 'all-scroll';
                break;
            case 'scale':
                this.viewport.domElement.style.cursor = 'nwse-resize';
                break;
            default:
                break;
        }
    }


    updateSelectionHelper() {
        this.selectionHelper.update();
    }

    onVisibleChange() {
        if (this.hasTransformControl) {
            this.detachTransformControls();
        }
    }

    onTransformControlsChange() {
        if (this.hasTransformControl) {
            this.attachTransformControls();
        } else {
            this.detachTransformControls();
        }
    }

    attachTransformControls(mode = 'translate') {
        this.hasTransformControl = true;
        this.setTransformMode(mode);
        this.transformControls.attach(this.interactiveObject);
        this.transformControls.addEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.addEventListener('mouseUp', this.viewport.enableOrbitControls);
        this.viewport.domElement.addEventListener('keypress', this.onKeypressTransformAction);
        this.viewport.add(this.transformControls);
    }

    detachTransformControls() {
        this.hasTransformControl = false;
        this.transformControls.detach();
        this.transformControls.removeEventListener('mouseDown', this.viewport.disableOrbitControls);
        this.transformControls.removeEventListener('mouseUp', this.viewport.enableOrbitControls);
        this.viewport.domElement.removeEventListener('keypress', this.onKeypressTransformAction);
        this.viewport.remove(this.transformControls);
        this.viewport.domElement.style.cursor = 'default';
    }

    activateSelection(attach = true, bindDeleteAction = true) {
        if (this.selectable) {
            this.selected = true;
            this.interactiveObject.add(this.selectionHelper);
            if (bindDeleteAction)
                this.viewport.domElement.addEventListener('keydown', this.onKeypressDeleteAction);
            if (attach) {
                this.attachTransformControls();
            }
            this.dispatchEvent({ type: 'select' });
        }
    }

    deactivateSelection(detach = true) {
        if (this.selectable) {
            this.selected = false;
            this.interactiveObject.remove(this.selectionHelper);
            this.viewport.domElement.removeEventListener('keydown', this.onKeypressDeleteAction);
            if (detach) {
                this.detachTransformControls();
            }
            this.dispatchEvent({ type: 'deselect' });
        }
    }

    onSelectionChange(includeTransformControls = false) {
        if (this.selected) {
            this.activateSelection(includeTransformControls);
        } else {
            this.deactivateSelection(includeTransformControls);
        }
        this.dispatchEvent({ type: 'select-change' });
        console.log('select change');
    }

    onClick(includeTransformControls = true) {
        if (!this.selected) {
            this.activateSelection(includeTransformControls);
        } else {
            this.deactivateSelection(includeTransformControls);
        }
    }

    dispose() {
        if (this.selectable) {
            if (this.selected) {
                this.deactivateSelection();
            }
            if (this.edges) {
                this.edges.dispose();
                this.selectionMaterial.dispose();
            }
        }
        this.transformControls.dispose();
        if (this.hasTransformControl) {
            this.detachTransformControls();
        }
        this.interactiveObject.dispose();
    }
}