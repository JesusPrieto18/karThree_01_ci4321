import { scene, renderer, camera, initScene,} from './src/scene.ts';
import { createKart } from './src/kart.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';
function animate(): void {
  requestAnimationFrame(animate);
  updateControls();
  renderer.render(scene, camera);
}
initScene();
createKart();
createObstacles();
setupControls();
animate();
