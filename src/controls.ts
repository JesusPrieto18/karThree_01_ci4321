import { kart } from './utils/initializers';
import { camera } from './scene';

const keys: Record<string, boolean> = {};
let speed = 0;
const maxSpeed = 0.2;
const turnSpeed = 0.04;

export function setupControls(): void {
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);
}

export function updateControls(): void {
  // Acelerar / frenar
  if (keys['ArrowUp']) speed = Math.min(maxSpeed, speed + 0.005);
  if (keys['ArrowDown']) speed = Math.max(-maxSpeed / 2, speed - 0.005);
  if (!keys['ArrowUp'] && !keys['ArrowDown']) speed *= 0.95;

  // Rotar sobre su eje
  if (keys['ArrowLeft']) kart.getFullKart().rotation.y += turnSpeed;
  if (keys['ArrowRight']) kart.getFullKart().rotation.y -= turnSpeed;

  kart.getFullKart().position.x += Math.sin(kart.getFullKart().rotation.y) * speed;
  kart.getFullKart().position.z += Math.cos(kart.getFullKart().rotation.y) * speed;

  /**
   
   
  // Actualizar cámara
  const distanceBehind = 5;
  const height = 2;

  camera.position.x = kart.position.x - Math.sin(kart.rotation.y) * distanceBehind;
  camera.position.z = kart.position.z - Math.cos(kart.rotation.y) * distanceBehind;
  camera.position.y = kart.position.y + height;

  camera.lookAt(kart.position);*/
}







