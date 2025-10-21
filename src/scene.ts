import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;
export let controls: OrbitControls;

export function initScene(): void {
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202733);

  // camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(4, 3, 6); // 0,2,7

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // luces
  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(2,5,6);
  //dir.castShadow = false;
  scene.add(dir);

  // helpers
  scene.add(new THREE.AxesHelper(20));
  scene.add(new THREE.GridHelper(20, 20));
  const dirHelper = new THREE.DirectionalLightHelper(dir, 2, 0xff0000);
  scene.add(dirHelper);

  // controles
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

