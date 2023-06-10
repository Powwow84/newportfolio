// const objectsToUpdate = []

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// const boxMaterial = new THREE.MeshBasicMaterial({color : 'orange'})

// const createBox = (width, height, depth, position) => {
//   const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
//   mesh.scale.set(width, height, depth)
//   mesh.castShadow = true
//   mesh.position.copy(position)
//   wallGroup.add(mesh)
  
//   // const shape = new CANNON.Box(new CANNON.Vec3((width / 2 ), (height / 2), (depth / 2)))
//   // const body = new CANNON.Body({
//   //   mass: 0,
//   //   type: 2,
//   //   position: new CANNON.Vec3(0,0,0),
//   //   shape: shape,
//   //   material: new CANNON.Material()
//   // })
//   // body.position.copy(position)
//   // world.addBody(body)

//   objectsToUpdate.push({
//     mesh: mesh,
//     // mody: body
//   })
  
// }

// function createMaze() {
//   const numRows = museum.length
//   const numCols = museum[0].length

//   const cellSize = 1
//   const adjustedSpacing = (cellSize - 0.5) / 2
  
//   const startX = -((numCols -1) * cellSize) / 2 + adjustedSpacing
//   const startZ = -((numRows -1) * cellSize) / 2 + adjustedSpacing

//   for (let row = 0; row < numRows; row++) {
//     for(let col = 0; col < numCols; col++) {
//       if(museum[row][col] === 1) {
//         const positionX = startX + col * cellSize
//         const positionZ = startZ + row * cellSize
//         createBox(1,1,1, {x: positionX, y: -10, z: [positionZ]})
//       }
//     }
//   }
// }

// createMaze()

// gsap.to(wallGroup.position, {duration: 5 , delay: 6, y: 0} )