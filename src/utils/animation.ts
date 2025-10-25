import { updateControls } from '../controls';
import { scene, camera, renderer, controls } from '../scene';
import { collisionObserver } from './colliding';    
import { kart } from './initializers';
export function animate(): void {
  //controls.update();
  //updateControls();
  //kart.animatePowerUps();
  //kart.animateCrash();
  //collisionObserver.checkCollision();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}