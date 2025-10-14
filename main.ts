import { scene, renderer, camera, initScene,} from './src/scene.ts';
import { createCameraControls } from './src/utils/controls_camera.ts';
import { createKart } from './src/kart.ts';

function animate(): void {
  requestAnimationFrame(animate);
  const controls = createCameraControls(camera, renderer);
  controls.update();
  renderer.render(scene, camera);
}

initScene();
createKart();
animate();
