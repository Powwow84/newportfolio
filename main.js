
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import museum from './array'
import { TextureLoader } from 'three'




// Physics 

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

// renderer---------------------------------------

const renderer = new THREE.WebGLRenderer({antialias : true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Camera -----------------------------------------

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, .5, 3)


const cameraBody = new CANNON.Body({
  mass:1,
  shape: new CANNON.Box(new CANNON.Vec3(.1, .3 ,.1)),
  fixedRotation: true
})
world.addBody(cameraBody)
cameraBody.position.set(0, .4, 3)


// scene -----------------------------------------
const scene = new THREE.Scene()

// Orbit Controls 
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.update()




//  ------------------------------------------------

const textureLoader = new THREE.TextureLoader()

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
  'https://ucarecdn.com/d0269f89-0cdb-4433-b8e6-76b9e674648f/', //side3
  'https://ucarecdn.com/08d7d010-beda-49cd-b395-9f0992d17008/', //side1
  'https://ucarecdn.com/a8e0f013-b145-4e6e-811a-e129a57f1287/', //top
  'https://ucarecdn.com/ab8ae300-45c9-49f8-bd6a-a065a27b2d99/', //bottom
  'https://ucarecdn.com/07aca338-fd8d-4075-9632-b76cfd06d9ad/', //side4
  'https://ucarecdn.com/75808435-d003-4a96-8806-bbebdf8728b3/', //side2
])


// -------------------------------------------------

//  floor -----------------------

const floorTexture = textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685837643/Portfolio%20textures/AdobeStock_111425816_e8uy7v.jpg', function(texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
});
floorTexture.colorSpace = THREE.SRGBColorSpace;

const floorGeometry = new THREE.BoxGeometry(12.7, 14.6, 1)
const floorMaterial = new THREE.MeshBasicMaterial({ 
  map: floorTexture,
  // normalMap: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685832992/Portfolio%20textures/22f45db7a4965c2c9d6104aeb65a3db8_nm8h0x.jpg'),
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter
})
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
const textureA = textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685848718/Portfolio%20textures/Untitled_1240_900_px_2_ij7efe.png', function(texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
});
textureA.colorSpace = THREE.SRGBColorSpace;

const aboutGeometry = new THREE.BoxGeometry(2.2 , 1.59, .0001)
const aboutMaterial = new THREE.MeshBasicMaterial({
  map: textureA,
  transparent: true
})
const about = new THREE.Mesh(aboutGeometry, aboutMaterial)
openingGroup.add(about)
about.position.set( 0 , .4, 0)




// Skills cube

function onLoadTexture(texture) {
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
}

const skillMultiMaterial = [
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850176/Portfolio%20textures/4_rvore2.png', onLoadTexture), transparent: true}),
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850176/Portfolio%20textures/2_eitd62.png', onLoadTexture), transparent: true}),
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850176/Portfolio%20textures/5_vkzcul.png', onLoadTexture), transparent: true}),
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850176/Portfolio%20textures/6_x2uoss.png', onLoadTexture), transparent: true}),
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850176/Portfolio%20textures/3_bvqbto.png', onLoadTexture), transparent: true}),
  new THREE.MeshBasicMaterial({map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685850587/Portfolio%20textures/Untitled_design_ectmke.png', onLoadTexture), transparent: true}),
];

const skillGeometry = new THREE.BoxGeometry(.8,.8,.8)
// const skillMaterial = new THREE.MeshBasicMaterial({ color : 'Brown'})
const skill = new THREE.Mesh(skillGeometry, skillMultiMaterial)
openingGroup.add(skill)
skill.position.set(2.5, .4, -1)

// head sphere

const headGeometry = new THREE.BoxGeometry(2.2 , 1.59, .0001)
const headMaterial = new THREE.MeshBasicMaterial({ 
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685930264/Portfolio%20textures/Controls_2_xhzp7z.png', onLoadTexture),
  transparent: true,
})
const head = new THREE.Mesh(headGeometry, headMaterial)
openingGroup.add(head)
head.position.set(-2.3, 1, -1)

const head2Geometry = new THREE.BoxGeometry(2.2 , 1.59, .0001)
const head2Material = new THREE.MeshBasicMaterial({ 
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685931444/Portfolio%20textures/Controls_5_tidqll.png', onLoadTexture),
  transparent: true,
})
const head2 = new THREE.Mesh(head2Geometry, head2Material)
openingGroup.add(head2)
head2.position.set(-2.3, .15, -1)

// render button

// const startGeometry = new THREE.BoxGeometry(1,.25,.25)
// const startMaterial = new THREE.MeshBasicMaterial({ color : 'red'})
// const start = new THREE.Mesh( startGeometry, startMaterial)
// scene.add(start)
// start.position.set(0, 2, 0)

// const startBody = new CANNON.Body({
//   shape: new CANNON.Box(new CANNON.Vec3(.5, .125, .125)),
//   mass: .01
// })
// world.addBody(startBody)
// startBody.position.set(0, 1, 1)
// startBody.linearDamping = .5





// create room

const wallGroup = new THREE.Group()
scene.add(wallGroup)

const createRoom = () => {

const wallGeometry = new THREE.BoxGeometry(15, 5, 1)
const wallMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture
})

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall1)
wall1.position.set(0, 1, 8)

const wallBody1 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody1)
wallBody1.position.set(0, 1, 7)


const wall2 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall2)
wall2.position.set(-7, 1, 0)
wall2.rotation.y = Math.PI / 2


const wallBody2 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody2)
wallBody2.position.set(-6.5, 1, 0)
wallBody2.quaternion.setFromAxisAngle(
  new CANNON.Vec3( 0 , -1 , 0),
  Math.PI / 2
)

const wall3 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall3)
wall3.position.set(7, 1, 0)
wall3.rotation.y = Math.PI / 2

const wallBody3 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody3)
wallBody3.position.set(6.5, 1, 0)
wallBody3.quaternion.setFromAxisAngle(
  new CANNON.Vec3(0, 1, 0),
  Math.PI / 2
)

const wall4 = new THREE.Mesh(wallGeometry, wallMaterial)
wallGroup.add(wall4)
wall4.position.set(0, 1, -8)

const wallBody4 = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(7.5, 2.5, .5)),
  mass: 0
})
world.addBody(wallBody4)
wallBody4.position.set(0, 1, -7)
}
createRoom()



// projectViews

const projects = new THREE.Group()
scene.add(projects)

const projectViewGeometry = new THREE.BoxGeometry(2.2 , 1.59, .0001)
const projectViewMaterial = new THREE.MeshBasicMaterial({ color : 'white'})

const projectview1Mat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685853300/Portfolio%20textures/2_cfgnml.png', onLoadTexture), transparent: true
})
const projectview1 = new THREE.Mesh(projectViewGeometry, projectview1Mat)
projects.add(projectview1)
projectview1.position.set(0, -2, -.5)

const projectview2Mat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685853300/Portfolio%20textures/4_jfw1fy.png', onLoadTexture), transparent: true
})
const projectview2 = new THREE.Mesh(projectViewGeometry, projectview2Mat)
projects.add(projectview2)
projectview2.position.set(-1.9, -2, 0)
projectview2.rotation.y = Math.PI /6

const projectview3Mat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685853300/Portfolio%20textures/3_uqn63l.png', onLoadTexture), transparent: true
})
const projectview3 = new THREE.Mesh(projectViewGeometry, projectview3Mat)
projects.add(projectview3)
projectview3.position.set(1.9, -2, 0)
projectview3.rotation.y = Math.PI /-6


// Astroids
const rockMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685920298/Portfolio%20textures/Dh_moon_texture_mlmsgu.webp', onLoadTexture),
  normalmap: textureLoader.load('https://res.cloudinary.com/dpxbrpprt/image/upload/v1685920336/Portfolio%20textures/images_1_koxekx.jpg')
})
const rockGeo = new THREE.SphereGeometry(.5)

// const rock1 = new THREE.Mesh(rock1Geo, rockMat)
// scene.add(rock1)
// rock1.position.set(0, 1, -50)

function randomWithSign(max) {
  return (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * max);
}

let rocks = []
for (let i = 0; i < 20; i++) {
  let randomX = randomWithSign(10);
    let randomZ = randomWithSign(50);
    let randomY = Math.floor(Math.random() * 10);
    let random = Math.floor(Math.random() * 5);
  const rock = new THREE.Mesh(rockGeo, rockMat);
  rock.position.set(randomX, randomY , (-100) - randomZ
  );
  scene.add(rock);
  rocks.push(rock);
}

// utilities

const seeProfile = () => {
  gsap.to(openingGroup.position, {duration : 10, delay: 0 , z: 0, y: 0})
  gsap.to(projects.position, {duration: 5, delay: 0, y: -2})
  gsap.to(wallGroup.position, { duration : 5, delay: 0, y: .4})
  rocks.forEach(rock => {
  gsap.killTweensOf(rock.position)
  let randomX = randomWithSign(10);
  let randomZ = randomWithSign(50);
  let randomY = Math.floor(Math.random() * 10);
  rock.position.set(randomX, randomY , (-100) - randomZ
  );  
  });
}

const showProjects = () => {
  gsap.to(projects.position, {duration: 5, delay: 0, y: 2.5})
  gsap.to(openingGroup.position, { duration: 10, delay: 0, z: -8 , y: 7})
  gsap.to(wallGroup.position, { duration : 5, delay: 0, y: .4})
  rocks.forEach(rock => {
    gsap.killTweensOf(rock.position)
    let randomX = randomWithSign(10);
    let randomZ = randomWithSign(50);
    let randomY = Math.floor(Math.random() * 10);
    rock.position.set(randomX, randomY , (-100) - randomZ
    );  
  });
}

let gameOn= false
const playGame = () => {
  score = 0
  gameOn = true
  gameMusic.play()
  gameMusic.loop = true
  document.getElementById('score').textContent = 'Score: ' + score;
  gsap.to(projects.position, {duration: 5, delay: 0, y: -2})
  gsap.to(openingGroup.position, { duration: 10, delay: 0, z: -8 , y: 7})
  gsap.to(wallGroup.position, { duration : 5, delay: 0, y: -5})
  rocks.forEach(rock => {
    let random = Math.floor(Math.random() * 20)
    gsap.to(rock.position, {duration: 2+ random , delay: 2, x: random, y: 1, z: 75 + random, repeat: -1, yoyo: true, ease: 'power1.inOut'});
  });
  setTimeout(() => {
    gameOn = false
    gameMusic.pause()
    rocks.forEach(rock => {
      gsap.killTweensOf(rock.position);
      let randomX = randomWithSign(10);
      let randomZ = randomWithSign(50);
      let randomY = Math.floor(Math.random() * 10);
      rock.position.set(randomX, randomY, -100 - randomZ);
      gsap.to(wallGroup.position, { duration : 5, delay: 0, y: .4})
    });
  }, 60000);
}



const line1Geometry = new THREE.BufferGeometry()
line1Geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()])
const lineMaterial = new THREE.LineBasicMaterial({ color: 'red', linewidth: 5})

const line2Geometry = new THREE.BufferGeometry()
line2Geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()])

const line3Geometry = new THREE.BufferGeometry()
line3Geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()])

const line4Geometry = new THREE.BufferGeometry()
line4Geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()])


const line1 = new THREE.Line(line1Geometry, lineMaterial)
scene.add(line1)
line1.visible = false

const line2 = new THREE.Line(line2Geometry, lineMaterial)
scene.add(line2)
line2.visible = false

const line3 = new THREE.Line(line3Geometry, lineMaterial)
scene.add(line3)
line3.visible = false

const line4 = new THREE.Line(line4Geometry, lineMaterial)
scene.add(line4)
line4.visible = false


let score = 0
function increaseScore() {
  score++;
  document.getElementById('score').textContent = 'Score: ' + score;
}

const laserSFX = new Audio('https://res.cloudinary.com/dpxbrpprt/video/upload/v1685933548/Portfolio%20textures/505235__daleonfire__laser2_bxcgrp.wav')
const gameMusic = new Audio('https://res.cloudinary.com/dpxbrpprt/video/upload/v1685933400/Portfolio%20textures/320771__nsstudios__countdown60s_rt2rqa.wav')

let mouse = new THREE.Vector2();
renderer.domElement.addEventListener('mousemove', function (event) {
  // just update the mouse x and y here
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Set the line's start point as the camera's position and end point along the raycaster's direction
    const startPoint1 = new THREE.Vector3(-7 , -.4, -7.5);
    const startPoint2 = new THREE.Vector3(7 , -.4, -7.5);
    const startPoint3 = new THREE.Vector3(-7 , -.4, 7.5);
    const startPoint4 = new THREE.Vector3(7 , -.4, 7.5);
    const endPoint = raycaster.ray.direction.clone().multiplyScalar(10).add(camera.position);
    
    line1.geometry.setFromPoints([startPoint1, endPoint]);
    line1.geometry.needsUpdate = true; // This is required after changing the geometry
    line2.geometry.setFromPoints([startPoint2, endPoint]);
    line2.geometry.needsUpdate = true; // This is required after changing the geometry
    line3.geometry.setFromPoints([startPoint3, endPoint]);
    line3.geometry.needsUpdate = true; // This is required after changing the geometry
    line4.geometry.setFromPoints([startPoint4, endPoint]);
    line4.geometry.needsUpdate = true; // This is required after changing the geometry
    
    // Make the line visible
    if (gameOn) {
    line1.visible = true;
    line2.visible = true;
    line3.visible = true;
    line4.visible = true;
    laserSFX.play()
    }
    
    rocks.forEach(rock => {
      const intersects = raycaster.intersectObject(rock);
      if (intersects.length > 0) {
        gsap.killTweensOf(rock.position);
        increaseScore()
        let randomX = randomWithSign(20);
        let randomZ = randomWithSign(20);
        let randomY = Math.floor(Math.random() * 20);
        let random = Math.floor(Math.random() * 10);
        rock.position.set(randomX, randomY, -75 - random);
        gsap.to(rock.position, {duration: 2 + random , delay: 0, x: randomX, y: random, z: 75 + randomZ, repeat: -1, yoyo: true, ease: 'power1.inOut'});
      }
    });;
    
  }
});

// Listen for the 'mouseup' event and hide the line
window.addEventListener('keyup', function (event) {
  if (event.code === 'Space') {
    line1.visible = false;
    line2.visible = false;
    line3.visible = false;
    line4.visible = false;
  }
});


// renderer.domElement.addEventListener('mouseup', function(event) {
//   line.visible = false
// })

// video

// const video = document.createElement('video')
// video.src = 'public/tester.mp4'
// // video.load()

// let texture = new THREE.VideoTexture(video);
// let material = new THREE.MeshBasicMaterial({ map: texture });

// let geometry = new THREE.PlaneGeometry(2, 2);
// let mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// video.play()


const cannonDebugger = new CannonDebugger(scene, world)


// controls 

const controls = new PointerLockControls(camera, document.body);

// Event listener to start the pointer lock when user clicks the scene
document.body.addEventListener('click', () => {
  controls.lock();
});

// Event listener to handle mouse movements and update camera rotation
document.addEventListener('mousemove', (event) => {
  if (controls.isLocked) {
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

 
  }
});

document.addEventListener('pointerlockchange', () => {
  console.log(controls.isLocked)
  // controls.isLocked = document.pointerLockElement === renderer.domElement;
});

document.addEventListener('mozpointerlockchange', () => {
  // controls.isLocked = document.mozPointerLockElement === renderer.domElement;
});


// const keys = {w: false, a: false, s: false, d: false}

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
    case 'Digit3':
        showProjects()
        break;
    case 'Digit1':
        playGame()
        break;
    case 'Digit2':
        seeProfile()
        break;
  }
})


// document.addEventListener('keyup', function (event) {
//   switch (event.code) {
//     case 'KeyW':
//       keys['w'] = false
//       break;
//     case 'KeyS':
//       keys['s'] = false
//       break;
//     case 'KeyA':
//       keys['a'] = false
//       break;
//     case 'KeyD':
//       keys['d'] = false
//       break;
//   }
// })


// Animation --------------------


const clock = new THREE.Clock()
let oldElapsedTime = 0

function animate() {

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  world.step(1/60, deltaTime, 3 )

  const force = 600;

// if (keys['w'] && cameraBody.position.y <= 1) {
//   let input = new CANNON.Vec3(0, 0, -force * deltaTime);
//   const cameraRotation = controls.getObject().quaternion;
//   const cam = new CANNON.Quaternion();
//   cam.copy(cameraRotation);
//   let world = cam.vmult(input);
//   cameraBody.applyImpulse(world);
// } else if (keys['a'] && cameraBody.position.y <= 3) {
//   cameraBody.applyImpulse(new CANNON.Vec3(-force * deltaTime, 0, 0));
// } else if (keys['s'] && cameraBody.position.y <= 3) {
//   cameraBody.applyImpulse(new CANNON.Vec3(0, 0, force * deltaTime));
// } else if (keys['d'] && cameraBody.position.y <= 3) {
//   cameraBody.applyImpulse(new CANNON.Vec3(force * deltaTime, 0, 0));
// }

skill.rotation.y += .005
  camera.position.copy(cameraBody.position);
  // start.position.copy(startBody.position)
  // wall1.position.copy(wallBody1.position)
  // wall2.position.copy(wallBody2.position)
  // wall3.position.copy(wallBody3.position)
  // wall4.position.copy(wallBody4.position)
  requestAnimationFrame(animate)
  // world.step(timeStep)
  renderer.render(scene, camera)
  // cannonDebugger.update()

}

animate()

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})