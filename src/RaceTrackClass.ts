import * as THREE from 'three';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { Bomb } from './bomb';

export class RaceTrack {
  private mesh: THREE.Mesh;

  constructor(width: number = 100, length: number = 100, color: number = 0x6aa84f) {
    const geometry = new THREE.PlaneGeometry(width, length);
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2; // colocar horizontal
    this.mesh.receiveShadow = true;

    scene.add(this.mesh);
    collisionObserver.addColisionObject(this);
  }

  /** Retorna el mesh para otras operaciones */
  public getBody(): THREE.Mesh {
    return this.mesh;
  }

  /** Detecta colisiones con otros objetos */
  public isColliding(target: CollisionClassName): void {
    if (target instanceof Bomb && target.getLaunched()) {
      const bombBody = target.getBody();
      if (aabbIntersects(this.mesh, bombBody)) {
        console.log('La bomba tocó el suelo (RaceTrack)');
        target['explode']?.(); // Llama a su explosión si existe
      }
    }
  }

  /** Permite eliminar la pista de la escena */
  public deleteScene(): void {
    scene.remove(this.mesh);
    collisionObserver.addObjectToRemove(this);
  }
}
