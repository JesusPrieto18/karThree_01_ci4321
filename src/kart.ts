import * as THREE from 'three';
import { scene } from './scene';
import { solidWithWire } from './utils';

export let kart: THREE.Group;

export function createKart(): void {
  const geometry = new THREE.BoxGeometry(1, 1, 2);
  const material_color = 0xff0000;

  kart = solidWithWire(geometry, material_color, false);
  kart.position.set(2, 0.5, 2);
  scene.add(kart);

}
