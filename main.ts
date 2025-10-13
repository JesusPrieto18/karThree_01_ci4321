import { initScene, animate } from './src/scene.ts';
import { createKart } from './src/kart.ts';
import { createRaceTrack } from './src/racetrack.ts';

initScene();
createKart();
createRaceTrack();
animate();




//const renderer = new THREE.WebGLRenderer({ antialias: true });
//renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//document.body.appendChild(renderer.domElement);


// ---------- resize ----------
//window.addEventListener("resize", () => {
//  const w = window.innerWidth, h = window.innerHeight;
//  camera.aspect = w / h;
//  camera.updateProjectionMatrix();
//  renderer.setSize(w, h);
//});

