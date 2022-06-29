import * as dat from 'dat.gui';
import { PCFShadowMap, PCFSoftShadowMap } from 'three';

export default class PropertiesPane extends dat.GUI {

    constructor(container) {
        super();
        this.container = container;

        this.domElement.draggable = true;    //TODO: add draggable actions
        this.domElement.style.marginRight = "0px";

        if (this.container) {
            this.container.appendChild(this.domElement);
        }
    }

    bindRendererProperties(renderer, scene) {
        this.rendererPropertyFolder = this.addFolder("Renderer");

        let updateShadowOnChilds = () => {
            scene.traverse((child) => {
                if (child.material && (child.castShadow || child.receiveShadow)) {
                    child.material.needsUpdate = true;
                }
            })
        }
        this.rendererPropertyFolder.add(renderer.shadowMap, 'enabled')
            .name("Shadow")
            .onChange(updateShadowOnChilds);
        this.rendererPropertyFolder.add(renderer.shadowMap, 'type', { "PCFShadowMap": PCFShadowMap, "PCFSoftShadowMap": PCFSoftShadowMap })
            .onChange(updateShadowOnChilds);

        return this.rendererPropertyFolder;
    }

    bindControlledCameraProperties(controlledCamera) {
        const pcameraFolder = this.addFolder('Viewport(Perspective)');
        pcameraFolder.add(controlledCamera.perspectiveCamera.position, 'x').min(-10).max(10).listen();
        pcameraFolder.add(controlledCamera.perspectiveCamera.position, 'y').min(-10).max(10).listen();
        pcameraFolder.add(controlledCamera.perspectiveCamera.position, 'z').min(-10).max(10).listen();
        pcameraFolder.add(controlledCamera.perspectiveCamera, 'fov').min(1).max(180).listen().onChange(() => controlledCamera.perspectiveCamera.updateProjectionMatrix());

        const ocameraFolder = this.addFolder('Viewport(Orthograhpic)');
        ocameraFolder.add(controlledCamera.orthographicCamera.position, 'x').min(-10).max(10).listen();
        ocameraFolder.add(controlledCamera.orthographicCamera.position, 'y').min(-10).max(10).listen();
        ocameraFolder.add(controlledCamera.orthographicCamera.position, 'z').min(-10).max(10).listen();
        ocameraFolder.add(controlledCamera.orthographicCamera, 'zoom').min(1).max(2000).listen().onChange(() => controlledCamera.orthographicCamera.updateProjectionMatrix());

        controlledCamera.onCameraSwitch = () => {
            if (controlledCamera.activeCamera.type === 'PerspectiveCamera') {
                pcameraFolder.domElement.hidden = false;
                ocameraFolder.domElement.hidden = true;
            } else {
                ocameraFolder.domElement.hidden = false;
                pcameraFolder.domElement.hidden = true;
            }
        };
        controlledCamera.onCameraSwitch();
    }

    bindCameraSelector(cameraSelector) {
        let cameraSwitchOption = this.add(cameraSelector, 'currentCameraName', Array.from(cameraSelector.keys()))
            .name('Camera')
            .listen()
            .onChange(() => {
                cameraSelector.switchCamera();
            });
        cameraSelector.onAddCamera = (camera) => {
            let option = document.createElement('option');
            option.value = camera.name;
            option.innerHTML = camera.name;
            cameraSwitchOption.__select.appendChild(option);
        };
        cameraSelector.onDeleteCamera = (camera) => {
            cameraSwitchOption.__select.querySelector('option[value="' + camera.name + '"]').remove();
        }
    }

    bindObjectGenerator(objectGenerator) {
        this.addObjectFolder = this.addFolder('Add');

        const addMeshFolder = this.addObjectFolder.addFolder('Mesh');
        let materialIdList = Array.from(objectGenerator.assetsManager.materials.keys());
        materialIdList.unshift(null);
        const materialIdSelect = addMeshFolder.add(objectGenerator, 'sharedMaterial', materialIdList).listen();
        objectGenerator.assetsManager.addEventListener("add-material", (event) => {
            const newMaterialOption = document.createElement("option");
            newMaterialOption.innerHTML = event.assetId;
            newMaterialOption.value = event.assetId;
            materialIdSelect.__select.appendChild(newMaterialOption);
        });
        objectGenerator.assetsManager.addEventListener("remove-material", (event) => {
            materialIdSelect.__select.querySelector("option[value='" + event.assetId + "']").remove();
        });
        addMeshFolder.add(objectGenerator, 'addPlane').name('Plane').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addCube').name('Cube').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addCircle').name('Circle').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addUVSphere').name('UVSphere').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addIcoSphere').name('IcoSphere').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addCylinder').name('Cylinder').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addCone').name('Cone').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addTorus').name('Torus').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        addMeshFolder.add(objectGenerator, 'addText').name('Text').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        this.loadHelicopter = () => {
            objectGenerator.addObj(
                './models/Seahawk.obj',
                true,
                'Helicopter',
                (helicopter) => {
                    helicopter.scale.x *= 0.1;
                    helicopter.scale.y *= 0.1;
                    helicopter.scale.z *= 0.1;
                }
            );
        };
        addMeshFolder.add(objectGenerator, 'addSpiralGalaxy').name('Spiral Galaxy');
        this.addObjectFolder.add(this, 'loadHelicopter').name('Helicopter');
        this.addObjectFolder.add(objectGenerator, 'addCamera').name('Camera');
        let addLightFolder = this.addObjectFolder.addFolder('Light');
        let ambientOption = addLightFolder.add(objectGenerator, 'addAmbientLight').name('Ambient').onChange(() => {
            addLightFolder.remove(ambientOption);
        });
        addLightFolder.add(objectGenerator, 'addDirectionalLight').name('Directional');
        addLightFolder.add(objectGenerator, 'addHemisphereLight').name('Hemisphere');
        addLightFolder.add(objectGenerator, 'addPointLight').name('Point');
        addLightFolder.add(objectGenerator, 'addRectAreaLight').name('RectArea')
        addLightFolder.add(objectGenerator, 'addSpotLight').name('Spot');

        //import .obj option
        this.addObjectFolder.add(objectGenerator, 'importModel').name('Import (.obj | .stl)');
    }
}