import { updateCameraRig, updateControls } from '../controls';
import { scene, camera, renderer, controls } from '../scene';
import { collisionObserver } from './colliding';    
import { kart, listPowerUps, decorators } from './initializers';

export function animate(now: number): void {
  scene.updateMatrixWorld(true);
  
  kart.updateBoost(now)
  updateCameraRig()
  updateControls();
  kart.animatePowerUps();
  for (const pu of listPowerUps) {
    pu.animate();
  };
  for (const dec of decorators) {
    dec.animate();
  }
  collisionObserver.checkCollision();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}