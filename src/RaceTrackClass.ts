import * as THREE from 'three';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { Bomb } from './bomb';

/**
 * RaceTrack
 *
 * Encapsulates a ground plane used as the racing track.
 * - Adds itself to the global scene.
 * - Registers with the global collision observer so collisions with projectiles
 *   or other objects can be detected.
 *
 * Constructor parameters:
 *  - width / length: size of the track plane.
 *  - color: base color of the track surface.
 */
export class RaceTrack {
  private mesh: THREE.Mesh;

  /**
   * Build a horizontal plane and register it in the scene + collision system.
   * @param width plane width (X axis)
   * @param length plane length (Z axis)
   * @param color material color for the track
   */
  constructor(width: number = 100, length: number = 100, color: number = 0x6aa84f) {
    const geometry = new THREE.PlaneGeometry(width, length);
    const material = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, material);
    // Rotate the plane to be horizontal (lay flat on the XZ plane)
    this.mesh.rotation.x = -Math.PI / 2;
    // Allow the plane to receive shadows from scene lights
    this.mesh.receiveShadow = true;

    // Add visual mesh to the global scene
    scene.add(this.mesh);
    // Register this object for collision checks
    collisionObserver.addColisionObject(this);
  }

  /**
   * getBody - return the underlying THREE.Mesh for external use (positioning, queries).
   */
  public getBody(): THREE.Mesh {
    return this.mesh;
  }

  /**
   * isColliding - called by the collision system when testing collisions.
   * Example behavior: if a launched Bomb intersects the track, trigger the bomb's explosion.
   *
   * @param target Candidate object to test against (expected to be types like Bomb).
   */
  public isColliding(target: CollisionClassName): void {
    // Only react to launched Bomb instances
    if (target instanceof Bomb && target.getLaunched()) {
      const bombBody = target.getBody();
      if (aabbIntersects(this.mesh, bombBody)) {
        console.log('Bomb touched the ground (RaceTrack)');
        // Call explode() if the bomb provides that method
        target['explode']?.();
      }
    }
  }

  /**
   * deleteScene - remove the track mesh from the scene and mark for collision cleanup.
   * Use this when you want to remove the track and unregister it from collisions.
   */
  public deleteScene(): void {
    scene.remove(this.mesh);
    // Mark for removal in the collision observer so it no longer participates in checks
    collisionObserver.addObjectToRemove(this);
  }
}
