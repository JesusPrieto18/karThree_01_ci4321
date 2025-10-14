import * as THREE from 'three';
import { scene } from './scene';

export let kart: THREE.Mesh;

export function createKart(): void {
  const geometry = new THREE.BoxGeometry(1, 1, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  kart = new THREE.Mesh(geometry, material);
  kart.position.set(0, 0.5, 0);
  scene.add(kart);
}
