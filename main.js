
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import gsap from 'gsap'
import { Group, PerspectiveCamera } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import museum from './array'






// renderer---------------------------------------

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Camera -----------------------------------------

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, .5, 3)


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
floor.position.set( 0, -1, 0)
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

const aboutGeometry = new THREE.PlaneGeometry(2 , 1)
const aboutMaterial = new THREE.MeshBasicMaterial({ color: 'yellow'})
const about = new THREE.Mesh(aboutGeometry, aboutMaterial)
openingGroup.add(about)
about.position.set( 0 , .5, 0)



// Skills cube

const skillGeometry = new THREE.BoxGeometry(.5,.5,.5)
const skillMaterial = new THREE.MeshBasicMaterial({ color : 'Brown'})
const skill = new THREE.Mesh(skillGeometry, skillMaterial)
openingGroup.add(skill)
skill.position.set(2.1, .8, -1)

// head sphere

const headGeometry = new THREE.SphereGeometry(.5)
const headMaterial = new THREE.MeshBasicMaterial({ color : 'green'})
const head = new THREE.Mesh(headGeometry, headMaterial)
openingGroup.add(head)
head.position.set(-2.2, .8, -1)

// render button

const startGeometry = new THREE.BoxGeometry(1,.25,.25)
const startMaterial = new THREE.MeshBasicMaterial({ color : 'red'})
const start = new THREE.Mesh( startGeometry, startMaterial)
openingGroup.add(start)
start.position.set(0, 0, 0)


gsap.to(openingGroup.position, { duration: 300, delay: 5, z: -300 })


// create room

const wallGroup = new THREE.Group()
scene.add(wallGroup)

const wallGeometry = new THREE.BoxGeometry(15, 5, 1)
const wallMaterial = new THREE.MeshBasicMaterial({color : 'grey'})

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall1)
wall1.position.set(0, -5, 8)

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall2)
wall2.position.set(-7, -5, 0)
wall2.rotation.y = Math.PI / 2

const wall3 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall3)
wall3.position.set(7, -5, 0)
wall3.rotation.y = Math.PI / 2

const wall4 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall4)
wall4.position.set(0, -5, -8)

gsap.to(wallGroup.position, { duration : 5, delay: 5, y: 7})


// projectViews

const projects = new THREE.Group()
scene.add(projects)

const projectViewGeometry = new THREE.BoxGeometry(2 , 1.125, .1)
const projectViewMaterial = new THREE.MeshBasicMaterial({ color : 'white'})

const projectview1 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview1)
projectview1.position.set(0, .5, -.5)

const projectview2 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview2)
projectview2.position.set(-2, .5, 0)
projectview2.rotation.y = Math.PI /3.3

const projectview3 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview3)
projectview3.position.set(2, .5, 0)
projectview3.rotation.y = Math.PI /-3.3




const video = document.createElement('video')
video.src = 'public/tester.mp4'
// video.load()

let texture = new THREE.VideoTexture(video);
let material = new THREE.MeshBasicMaterial({ map: texture });

let geometry = new THREE.PlaneGeometry(2, 2);
let mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// video.play()


const cannonDebugger = new CannonDebugger(scene, world)




function animate() {
  requestAnimationFrame(animate)
  // world.step(timeStep)
  renderer.render(scene, camera)
  cannonDebugger.update()

}

animate()