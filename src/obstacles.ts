import * as THREE from 'three';
import { scene } from './scene';

export function createObstacles(): THREE.Mesh[] {
  const obstacles: THREE.Mesh[] = [];

  const obstacleGeometry = new THREE.BoxGeometry(2, 1, 2);
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: 0x3333aa
  });

  const positions = [
    { x: 5, y: 0.5, z: 0 },
    { x: 5,  y: 0.5, z: 20 },
    { x: 0,  y: 0.5, z: 30 }
  ];

  for (const pos of positions) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(pos.x, pos.y, pos.z);
    scene.add(obstacle);
    obstacles.push(obstacle);
  }

  return obstacles;
}
