
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import gsap from 'gsap'
import { PerspectiveCamera } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'






// renderer---------------------------------------

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Camera -----------------------------------------

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 10, 30)

// scene -----------------------------------------
const scene = new THREE.Scene()

// Orbit Controls 
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update()


// Physics 

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

//  ------------------------------------------------
// -------------------------------------------------

const floorBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3( 10, 10, 0.1)),
  mass: 0
})
floorBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3( -1, 0, 0),
  Math.PI * .5
)
world.addBody(floorBody)

const cannonDebugger = new CannonDebugger(scene, world)




function animate() {
  requestAnimationFrame(animate)
  // world.step(timeStep)
  cannonDebugger.update()
renderer.render(scene, camera)

}

animate()