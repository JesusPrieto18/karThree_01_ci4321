import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Global scene objects exported for use across the app.
 * - scene: main THREE.Scene instance
 * - camera: perspective camera used to view the scene
 * - renderer: WebGL renderer that draws the scene into the document
 * - controls: optional OrbitControls instance (may be initialized later)
 */
export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;
export let controls: OrbitControls;

/**
 * initScene - initialize the Three.js scene, camera, renderer, lights and helpers.
 *
 * Steps performed:
 * 1. Create a Scene and set a sky-like background color.
 * 2. Create a PerspectiveCamera with a reasonable FOV and near/far planes.
 * 3. Create a WebGLRenderer, size it to the window and append its canvas to the document.
 * 4. Add a directional light to illuminate the scene (and an optional helper).
 * 5. Add visual helpers (axes and grid) useful for debugging and layout.
 * 6. Register a window 'resize' handler to keep camera aspect and renderer size in sync.
 *
 * This function should be called once at application startup before creating scene content.
 */
export function initScene(): void {
  // 1) Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // sky blue background

  // 2) Camera - perspective camera positioned above and behind the origin
  camera = new THREE.PerspectiveCamera(
    75,                                  // field of view in degrees
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1,                                 // near clipping plane
    1000                                 // far clipping plane
  );
  camera.position.set(0, 50, 60); // place camera high and back for an overview

  // 3) Renderer - create and attach the canvas to the document body
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 4) Lights - directional light to simulate sunlight
  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(2, 5, 6);
  // dir.castShadow = false; // toggle shadows if needed
  scene.add(dir);

  // Optional helper to visualize the directional light (disabled by default)
  //const dirHelper = new THREE.DirectionalLightHelper(dir, 2, 0xff0000);
  // scene.add(dirHelper);

  // 5) Helpers - axes and grid help during development and debugging
  //scene.add(new THREE.AxesHelper(20));
  //scene.add(new THREE.GridHelper(20, 20));

  // 6) Controls - OrbitControls creation is optional; left commented intentionally.
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;

  // 7) Resize handler - keeps camera aspect and renderer size correct on window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
