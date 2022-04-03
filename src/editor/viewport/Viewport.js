import * as THREE from 'three';
import ControlledCamera from './ControlledCamera';

export default class Viewport extends THREE.Scene {

    constructor(domElement, width=window.innerWidth, height=window.innerHeight, cameraPosition = [1,2,3], clearColor=0x3a3a3a){
        super();

        this.mouse = {
            pointer: new THREE.Vector2(),
            clicked:false
        };
        let onMouseClick = (event)=>{
            this.mouse.clicked = true;
            this.mouse.pointer.x = ( event.clientX / this.width ) * 2 - 1;
            this.mouse.pointer.y = - ( event.clientY / this.height ) * 2 + 1;
        };
        domElement.addEventListener('click', onMouseClick);
        domElement.addEventListener('touchstart', (event)=>{
            onMouseClick(event);
            event.preventDefault();
        });

        this.domElement = domElement;
        this.width = width;
        this.height = height;
        
        //creating camera
        this.controlledCamera = new ControlledCamera(width, height, cameraPosition, domElement);
        this.add(this.controlledCamera.getActiveCamera());

        //creating renderer
        this.renderer = new THREE.WebGLRenderer({canvas:domElement, antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(clearColor);

        //handling screen resize
        this.onResizeEvent = (event)=>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            const aspectRatio = this.width/this.height;
            this.controlledCamera.getActiveCamera().aspect = aspectRatio;
            this.controlledCamera.getActiveCamera().updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        }
        this.addResizeListener();

        //creating helpers
        this.helper = {};
        this.helper.group = new THREE.Group();
        //add grid
        this.helper.grid = new THREE.GridHelper(50,100, 0x4a4a4a, 0x4a4a4a);
        this.helper.group.add(this.helper.grid);
        //add axes
        this.helper.axesGroup = new THREE.Group();
        const positiveAxes = new THREE.AxesHelper(100);
        this.helper.axesGroup.add(positiveAxes);
        const negativeAxes = new THREE.AxesHelper(-100);
        this.helper.axesGroup.add(negativeAxes);
        this.helper.group.add(this.helper.axesGroup);

        //creating light
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        this.directionalLight.position.copy(this.controlledCamera.activeCamera.position)
        //this.helper.group.add(this.directionalLight)
        this.add(this.directionalLight);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        // this.helper.group.add(this.ambientLight)
        this.add(this.ambientLight);

        this.add(this.helper.group);

        //create raycaster
        this.raycaster = new THREE.Raycaster();
        
        
        //perform rendering
        this.render = ()=>{
            //perform raycasting to detect selection
            if(this.mouse.clicked){
                this.raycaster.setFromCamera(this.mouse.pointer, this.controlledCamera.activeCamera);
                const intersects = this.raycaster.intersectObjects(this.children);
                for ( let i = 0; i < intersects.length; i ++ ) {
                    this.onIntersectedObject(intersects[i].object);
                }
                this.mouse.clicked = false;
            }

            this.renderer.render(this, this.controlledCamera.activeCamera);
            requestAnimationFrame(this.render);
        }

        this.enableOrbitControls = (event)=>{
            this.controlledCamera.orbitControls.enabled = true;
        };
        this.disableOrbitControls = (event) => {
            this.controlledCamera.orbitControls.enabled = false;
        };

    }

    // override this method to handle intersected object
    onIntersectedObject(object){
        console.log(object);
    }

    switchCamera(){
        this.remove(this.controlledCamera.getActiveCamera());
        this.controlledCamera.switchCamera();
        this.add(this.controlledCamera.getActiveCamera());
    }

    addResizeListener(){
        window.addEventListener('resize', this.onResizeEvent);
    }

    disableResizeListner(){
        window.removeEventListener('resize', this.onResizeEvent);
    }

    hideHelpers(){
        this.helper.group.visible = false;
    }

    showHelpers(){
        this.helper.group.visible = true;
    }

    toggleHelpers(){
        this.helper.group.visible = !this.helper.group.visible;
    }
}