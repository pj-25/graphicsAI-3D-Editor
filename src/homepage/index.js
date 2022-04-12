import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { sRGBEncoding, Vector3 } from 'three'
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf5f5f5);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=>{
    // Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

window.addEventListener('dblclick', () =>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
    {        
        if(canvas.requestFullscreen())
            canvas.requestFullscreen()
        else if(canvas.webkitRequestFullscreen)
            canvas.webkitRequestFullscreen()
    }    
    else
    {    
        if(canvas.exitFullScreen)
            canvas.exitFullScreen()
        else if(canvas.webkitExitFullScreen)
            canvas.webkitExitFullScreen()
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
camera.position.copy(new THREE.Vector3(-0.025,4.1,1))
scene.add(camera)

gui.add(camera.position,'x').min(-100).max(100).step(0.01).name('CamX')
gui.add(camera.position,'y').min(-100).max(100).step(0.01).name('CamY')
gui.add(camera.position,'z').min(-100).max(100).step(0.01).name('CamZ')

let position = new Vector3(0,4,0)
gui.add(position,'x').min(-100).max(100).step(1).name('LookAt X')
gui.add(position,'y').min(-100).max(100).step(1).name('LookAt Y')
gui.add(position,'z').min(-100).max(100).step(1).name('LookAt Z')


// Camera Helper
const cameraHelper = new THREE.CameraHelper(camera)
scene.add(cameraHelper)

// Axes Helper
const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enabled = false
controls.minZoom = 1
controls.minDistance = 1
controls.maxDistance = 7.5
controls.minPolarAngle = Math.PI / 16
controls.maxPolarAngle = Math.PI / 2
controls.minAzimuthAngle = -Math.PI / 3 
controls.maxAzimuthAngle = Math.PI / 3
gui.add(controls.target, 'x').min(-100).max(100).step(0.001).name('Orb X')
gui.add(controls.target, 'y').min(-100).max(100).step(0.001).name('Orb Y')
gui.add(controls.target, 'z').min(-100).max(100).step(0.001).name('Orb Z')
// controls.target.copy(new Vector3(1,10,1))

// Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5 );
// directionalLight.position.set (controls.target.x + 5, controls.target.y+ 5, controls.target.z+ 5)
scene.add( directionalLight );
gui.add(directionalLight.position,'x').min(-100).max(100).step(0.1)
gui.add(directionalLight.position,'y').min(-100).max(100).step(0.1)
gui.add(directionalLight.position,'z').min(-100).max(100).step(0.1)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
// ambientLight.position.set(controls.target.x+ 5, controls.target.y+ 5, controls.target.z+ 5)
scene.add( ambientLight );
let mesh = null;

const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/ofiice/FullSceneTry/fullscene.gltf',
    (object)=>{
        console.log(object);
        mesh = object
        // scene.add(object.scene)
        while(object.scene.children.length){
            object.scene.children[0].position.setZ(object.scene.children[0].position.z+1.5) 
            object.scene.children[0].position.setX(object.scene.children[0].position.x-0.2) 
            scene.add(object.scene.children[0])
        }
    }
)


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // console.log(pointer);
}

let objects = []
scene.traverse((object)=>{
    if(object.isObject3D){
        console.log(object)
        objects.push(object)
    }
})
console.log(objects);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = sRGBEncoding

console.log(scene);

// Animation
const animationLoop = () =>{

    // control updates(necessary for damping)
    controls.update()

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera( pointer, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( objects );

    for ( let i = 0; i < intersects.length; i ++ ) {
        // console.log(intersects[i].object.parent);
        if(intersects[i].object.getObjectById === "9B86C4E7-4920-4CA1-BC9A-7A583CF070E7")
            console.log('Book selected');
        intersects[ i ].object.material.color.set( 0xff0000 );

    }

    camera.lookAt(position)
    controls.target = position

    renderer.render(scene, camera)

    window.requestAnimationFrame(animationLoop)
}
// Also get more control over it using GSAP
window.addEventListener( 'pointermove', onPointerMove );

animationLoop()