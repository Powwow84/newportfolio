
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import museum from './array'




// Physics 

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

// renderer---------------------------------------

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Camera -----------------------------------------

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, .5, 3)

const cameraBody = new CANNON.Body({
  mass:1,
  shape: new CANNON.Box(new CANNON.Vec3(.1, .5 ,.1)),
  fixedRotation: true
})
world.addBody(cameraBody)
cameraBody.position.set(0, .5, 3)


// scene -----------------------------------------
const scene = new THREE.Scene()

// Orbit Controls 
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update()




//  ------------------------------------------------
// -------------------------------------------------

//  floor -----------------------

const floorGeometry = new THREE.BoxGeometry(12.7, 14.6, 1)
const floorMaterial = new THREE.MeshBasicMaterial({ color : 'grey'})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -0.5 * Math.PI
floor.position.set( 0, -1, 0)
scene.add(floor)

const floorBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3( 6.35, 7.3, 0.1)),
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


// gsap.to(openingGroup.position, { duration: 300, delay: 5, z: -300 })


// create room

const wallGroup = new THREE.Group()
scene.add(wallGroup)

const wallGeometry = new THREE.BoxGeometry(15, 5, 1)
const wallMaterial = new THREE.MeshBasicMaterial({color : 'orange'})

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall1)
wall1.position.set(0, -5, 8)

const wallBody1 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0,
  animate: false,
  animationStart: null,
  animationDuration: 5000,
})
world.addBody(wallBody1)
wallBody1.position.set(0, -5, 8)
wallBody1.startPosition = new CANNON.Vec3(0,0,0)
wallBody1.endPosition = new CANNON.Vec3(10, 0, 0)

const begin = () => {
  wallBody1.animate = true;
    wallBody1.animationStart = clock.getElapsedTime();
    wallBody1.startPosition.copy(wallBody1.position);
}



const wall2 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall2)
wall2.position.set(-7, -5, 0)
wall2.rotation.y = Math.PI / 2


const wallBody2 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody2)
wallBody2.position.set(-7, -5, 0)
wallBody2.quaternion.setFromAxisAngle(
  new CANNON.Vec3( 0 , -1 , 0),
  Math.PI / 2
)

const wall3 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall3)
wall3.position.set(7, -5, 0)
wall3.rotation.y = Math.PI / 2

const wallBody3 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody3)
wallBody3.position.set(7, -5, 0)
wallBody3.quaternion.setFromAxisAngle(
  new CANNON.Vec3(0, -1, 0),
  Math.PI / 2
)

const wall4 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall4)
wall4.position.set(0, -5, -8)

const wallBody4 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody4)
wallBody4.position.set(0, -5, -8)

// gsap.to(wallGroup.position, { duration : 5, delay: 5, y: 7})


// projectViews

const projects = new THREE.Group()
scene.add(projects)

const projectViewGeometry = new THREE.BoxGeometry(2 , 1.125, .1)
const projectViewMaterial = new THREE.MeshBasicMaterial({ color : 'white'})

const projectview1 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview1)
projectview1.position.set(0, -2, -.5)

const projectview2 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview2)
projectview2.position.set(-2, -2, 0)
projectview2.rotation.y = Math.PI /3.3

const projectview3 = new THREE.Mesh(projectViewGeometry, projectViewMaterial)
projects.add(projectview3)
projectview3.position.set(2, -2, 0)
projectview3.rotation.y = Math.PI /-3.3

// gsap.to(projects.position, {duration: 5, delay: 5, y: 2.5})


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


// controls 

// const controls = new PointerLockControls(camera, document.body);

// // Event listener to start the pointer lock when user clicks the scene
// document.body.addEventListener('click', () => {
//   controls.lock();
// });

// // Event listener to handle mouse movements and update camera rotation
// document.addEventListener('mousemove', (event) => {
//   if (controls.isLocked) {
//     const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
//     const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

 
//   }
// });

// document.addEventListener('pointerlockchange', () => {
//   console.log(controls.isLocked)
//   // controls.isLocked = document.pointerLockElement === renderer.domElement;
// });

// document.addEventListener('mozpointerlockchange', () => {
//   // controls.isLocked = document.mozPointerLockElement === renderer.domElement;
// });


const keys = {w: false, a: false, s: false, d: false}

document.addEventListener('keydown', function (event) {
  switch (event.code) {
    case 'KeyW':
      keys['w'] = true
      break;
    case 'KeyS':
      keys['s'] = true
      break;
    case 'KeyA':
      keys['a'] = true
      break;
    case 'KeyD':
      keys['d'] = true
      break;
  }
})


document.addEventListener('keyup', function (event) {
  switch (event.code) {
    case 'KeyW':
      keys['w'] = false
      break;
    case 'KeyS':
      keys['s'] = false
      break;
    case 'KeyA':
      keys['a'] = false
      break;
    case 'KeyD':
      keys['d'] = false
      break;
  }
})


const clock = new THREE.Clock()
let oldElapsedTime = 0

function animate() {

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  world.step(1/60, deltaTime, 3 )

  // sphereMesh.position.copy(sphereBody.position)
  const force = 600;

if (keys['w'] && cameraBody.position.y <= 1) {
  let input = new CANNON.Vec3(0, 0, -force * deltaTime);
  const cameraRotation = controls.getObject().quaternion;
  const cam = new CANNON.Quaternion();
  cam.copy(cameraRotation);
  let world = cam.vmult(input);
  cameraBody.applyImpulse(world);
} else if (keys['a'] && cameraBody.position.y <= 3) {
  cameraBody.applyImpulse(new CANNON.Vec3(-force * deltaTime, 0, 0));
} else if (keys['s'] && cameraBody.position.y <= 3) {
  cameraBody.applyImpulse(new CANNON.Vec3(0, 0, force * deltaTime));
} else if (keys['d'] && cameraBody.position.y <= 3) {
  cameraBody.applyImpulse(new CANNON.Vec3(force * deltaTime, 0, 0));
}

if (wallBody1.animate) {
  let elapsed = elapsedTime - wallBody1.animationStart;
  if (elapsed > wallBody1.animationDuration) {
      wallBody1.animate = false;
      wallBody1.position.copy(wallBody1.endPosition);
  } else {
      let t = elapsed / wallBody1.animationDuration;
      console.log(wallBody1.startPosition, wallBody1.endPosition, t)
      wallBody1.position.lerp(wallBody1.startPosition, wallBody1.endPosition, t);
  }
}


  // camera.position.copy(cameraBody.position);
  wall1.position.copy(wallBody1.position)
  wall2.position.copy(wallBody2.position)
  wall3.position.copy(wallBody3.position)
  wall4.position.copy(wallBody4.position)
  requestAnimationFrame(animate)
  // world.step(timeStep)
  renderer.render(scene, camera)
  cannonDebugger.update()

}

animate()

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

begin()