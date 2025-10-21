import { updateControls } from '../controls';
import { scene, camera, renderer, controls } from '../scene';
import { collisionObserver } from './colliding';    

export function animate(): void {
  //controls.update();
  updateControls();
  collisionObserver.checkCollision();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}