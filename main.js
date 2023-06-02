
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import gsap from 'gsap'
import { Group, PerspectiveCamera } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'






// renderer---------------------------------------

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Camera -----------------------------------------

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1, 2)

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

//  floor -----------------------

const floorGeometry = new THREE.BoxGeometry(100, 100, 1)
const floorMaterial = new THREE.MeshBasicMaterial({ color : 'grey'})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -0.5 * Math.PI
scene.add(floor)

const floorBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3( 50, 50, 0.1)),
  mass: 0
})
floorBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3( -1, 0, 0),
  Math.PI * .5
)
world.addBody(floorBody)

// Opening Group ----------------------
const openingGroup = new THREE.Group()
scene.add(openingGroup)


// About me ---------------------------

const aboutGeometry = new THREE.PlaneGeometry(4 , 2)
const aboutMaterial = new THREE.MeshBasicMaterial({ color: 'yellow'})
const about = new THREE.Mesh(aboutGeometry, aboutMaterial)
openingGroup.add(about)
about.position.set( 0 , 2, 0)


// Skills cube

const skillGeometry = new THREE.BoxGeometry
const skillMaterial = new THREE.MeshBasicMaterial({ color : 'Brown'})
const skill = new THREE.Mesh(skillGeometry, skillMaterial)
openingGroup.add(skill)
skill.position.set(3, 2, 0)

// head sphere

const headGeometry = new THREE.SphereGeometry(.7)
const headMaterial = new THREE.MeshBasicMaterial({ color : 'green'})
const head = new THREE.Mesh(headGeometry, headMaterial)
openingGroup.add(head)
head.position.set(-3, 2, 0)

// render button

const startGeometry = new THREE.BoxGeometry(2,.5,.5)
const startMaterial = new THREE.MeshBasicMaterial({ color : 'red'})
const start = new THREE.Mesh( startGeometry, startMaterial)
openingGroup.add(start)
start.position.set(0, 1, 1)


// gsap.to(openingGroup.position, { duration: 300, delay: 5, z: -300 })


const cannonDebugger = new CannonDebugger(scene, world)




function animate() {
  requestAnimationFrame(animate)
  // world.step(timeStep)
  cannonDebugger.update()
renderer.render(scene, camera)

}

animate()