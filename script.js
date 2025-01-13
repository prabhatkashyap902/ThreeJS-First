import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './src/index.css'
import GUI from 'lil-gui'; 
import { metalness } from 'three/tsl';
import { RGBELoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { Font } from 'three/examples/jsm/loaders/FontLoader';
// import helvetikerFont from './src/assets/fonts/helvetiker_bold.typeface.json'
import helvetikerFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url'
import image from './src/assets/textures/matcaps/8.png'


const gui = new GUI();


const canvas=document.querySelector('canvas.webgl')
const scene= new THREE.Scene()

// const axesHelper=new THREE.AxesHelper()
// scene.add(axesHelper)

const size={
    width:window.innerWidth,
    height:window.innerHeight
}

const camera=new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.z=8
scene.add(camera)


// const texture = new THREE.TextureLoader().load('./src/assets/textures/door/normal.jpg')
const planeTexture = new THREE.TextureLoader().load(image)
const textMaterial=new THREE.MeshMatcapMaterial()
textMaterial.matcap=planeTexture

// material.map=texture

// const ambientLight=new THREE.AmbientLight(0xffffff,0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 300);
// pointLight.position.x=2
// pointLight.position.y=3
// pointLight.position.z=5

// scene.add(pointLight);

// const rgbeLoader=new RGBELoader()
// rgbeLoader.load('./src/assets/textures/environmentMap/2k.hdr',texture=>{
//     texture.mapping=THREE.EquirectangularReflectionMapping
//     scene.background=texture
//     scene.environment=texture
// })
const loader = new FontLoader();



loader.load(
    helvetikerFont,(font)=>{
        let word = { text: 'Prabhat Kashyap' }; // Initial text
        let textMesh;
        let textGeometry;
        let textMaterial = new THREE.MeshMatcapMaterial();
        textMaterial.matcap=planeTexture
        function createText(newText) {
            // Remove the old textMesh if it exists
            if (textMesh) {
                textGeometry.dispose(); // Free up memory
                scene.remove(textMesh);
            }
    
            // Create new TextGeometry
            textGeometry = new TextGeometry(newText, {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            });
    
            textGeometry.center(); // Center the geometry
            textMesh = new THREE.Mesh(textGeometry, textMaterial);
            scene.add(textMesh); // Add the updated text to the scene
        }
    
        // Create initial text
        createText(word.text);
        gui.add(word, 'text').name('Edit Text').onChange((value) => {
            createText(value); // Update text whenever the GUI input changes
        });
    })
    

const torus=new THREE.TorusGeometry(0.3,0.2,16,100)

for(let i=0;i<300;i++){
    const torusMesh=new THREE.Mesh(torus,textMaterial)

    torusMesh.position.x=(Math.random()-0.5)*20
    torusMesh.position.y=(Math.random()-0.5)*20
    torusMesh.position.z=(Math.random()-0.5)*20
    torusMesh.rotation.x=Math.random()*Math.PI
    torusMesh.rotation.y=Math.random()*Math.PI

    const scale=Math.random()
    torusMesh.scale.set(scale,scale,scale)

    scene.add(torusMesh)
}


const material=new THREE.MeshStandardMaterial({
    side:THREE.DoubleSide
})

const ambientLight=new THREE.AmbientLight(0xffffff,0.1)
scene.add(ambientLight)

const prop={
    metalness:'0.7',
    roughness:'0.2'
}

gui.add(material,'metalness',-1,1,0.01).name('Metalness').onChange((value)=>{
    material.metalness=value
})
gui.add(material,'roughness',0,1,0.01).name('Roughness').onChange((value)=>{
    material.roughness=value
})

// const sphereGeometry=new THREE.SphereGeometry(1,32,32)
// const sphere=new THREE.Mesh(sphereGeometry,material)
// sphere.position.x=-3

// const planeGeometry=new THREE.PlaneGeometry(1,1)
// const plane=new THREE.Mesh(planeGeometry,material)

// const torusGeometry=new THREE.TorusGeometry(1,0.3,16,100)
// const torus=new THREE.Mesh(torusGeometry,material)
// torus.position.x=3


// scene.add(sphere,plane,torus)





const control =new OrbitControls(camera,canvas)
// control.enabled=false
control.enableDamping=true

const renderer= new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width,size.height)
renderer.render(scene,camera)




const animate=()=>{
    requestAnimationFrame(animate)

    // sphere.rotation.x+=0.01
    // sphere.rotation.y+=0.01     

    // torus.rotation.x+=0.023
    // torus.rotation.y+=0.013 

    // plane.rotation.x+=0.01  
    // plane.rotation.y+=0.01

    camera.aspect=size.width/size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width,size.height)
    control.update()
    renderer.render(scene,camera)

}
animate()