import * as THREE from "./build/three.module"

let camera, scene, renderer;


init()

function init(){
    //camera
    camera = new THREE.PerspectiveCamera(40,
        window.innerWidth / window.innerHeight,
        1,
        15000
    );
    camera.position.z = 250;

    //scene
    scene = new THREE.Scene();

    //geometry
    const size = 250;
    const geometry = new THREE.BoxGeometry(size,size,size);
    const material = THREE.MeshPhongMaterial({
        color: 0xfffff,
        specutlar: 0xfffff,
        shininness: 50, //輝度
      });

    for(let i = 0; i < 2500; i++){
      const mesh = new THREE.mesh(geometry.material);

      mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
      mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

      //回転度合いをランダムにきめる。
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      scene.add(mesh);
    }

    //平行光源
    const dirLigth = new THREE.DirectionalLight(0xfffff, 0.03);
    scene.add(dirLigth);

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
}
