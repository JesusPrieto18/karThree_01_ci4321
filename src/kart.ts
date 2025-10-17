import * as THREE from 'three';
import { scene } from './scene';
import { solidWithWire } from './utils/utils';

export let kart: THREE.Group;

export function createKart(): void {
  const height = 1;
  const length = 1;
  const width = 2;

  const geometry = new THREE.BoxGeometry(length, height, width);
  const material_color = 0xff0000;
  kart = solidWithWire(geometry, material_color, false);
  kart.position.set(2, 0.5, 2);
  kart.name = 'kart';
  scene.add(kart);

}
