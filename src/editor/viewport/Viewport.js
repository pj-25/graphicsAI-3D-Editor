import * as THREE from 'three';
import ControlledCamera from './ControlledCamera';

export default class Viewport {

    constructor(mouse, domElement, width=window.innerWidth*0.75, height=window.innerHeight, cameraPosition = [1,2,3], clearColor=0x3a3a3a){
        this.mouse = mouse;
        this.domElement = domElement;
        this.width = width;
        this.height = height;
        
        //creating scene
        this.scene = new THREE.Scene();

        //creating camera
        this.controlledCamera = new ControlledCamera(width, height, cameraPosition, domElement);
        this.scene.add(this.controlledCamera.getActiveCamera());

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
        this.scene.add(this.helper.group);

        //create raycaster
        this.raycaster = new THREE.Raycaster();
        
        //perform rendering
        this.render = ()=>{
            //perform raycasting to detect selection
            if(this.mouse.clicked){
                this.raycaster.setFromCamera(this.mouse.pointer, this.controlledCamera.activeCamera);
                const intersects = this.raycaster.intersectObjects(this.scene.children);
                for ( let i = 0; i < intersects.length; i ++ ) {
                    if(intersects[i].object.type = 'InteractiveMesh'){
                        intersects[i].object.onClick();
                    }        
                }
                this.mouse.clicked = false;
            }

            this.renderer.render(this.scene, this.controlledCamera.activeCamera);
            requestAnimationFrame(this.render);
        }


        //TODO: use loader manager :(
        //create obj loader
        // this.objLoader = new OBJLoader();
    }

    add(object){
        object.transformControls.addEventListener('mouseDown',(event)=>{
            this.controlledCamera.getOrbitControls().enabled = false;
        });
        object.transformControls.addEventListener('mouseUp',(event)=>{
            this.controlledCamera.getOrbitControls().enabled = true;
        });
        window.addEventListener('keypress', (event)=>{
            console.log(event.key);
            
            if ((event.key >= 0 && event.key <=9) || event.key == '/') {   //numpad
                this.controlledCamera.performOperation(event.key)
            }else{
                switch(event.code){
                    case 'KeyG':
                        object.transformControls.setMode('translate');
                        break;
                    case 'KeyR':
                        object.transformControls.setMode('rotate');
                        break;
                    case 'KeyS':
                        object.transformControls.setMode('scale');
                        break;
                }
            } 
        });
        this.scene.add(object);
    }

    //******under construction 
    loadFromObj(objFile){
        this.objLoader.load(
            objFile,
            (object)=>{
                this.add(object);
            },
            (xhr)=>{
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            (error)=>{
                console.log('Enable to load from'+objFile);
            }
        );
    }

    switchCamera(){
        this.scene.remove(this.controlledCamera.getActiveCamera());
        this.controlledCamera.switchCamera();
        this.scene.add(this.controlledCamera.getActiveCamera());
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
}