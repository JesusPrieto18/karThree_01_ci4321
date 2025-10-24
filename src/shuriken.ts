import * as THREE from 'three';
import { scene } from './scene';
import { vertices, faces, colors } from './shurikenInfo';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { TrafficCone } from './trafficCone';
import { Walls } from './walls';
export class Shuriken {
  public mesh: THREE.Mesh;
  public name?: string;
  private direction: THREE.Vector3 = new THREE.Vector3(0, 0, -1);

  constructor(name?: string) {
    this.name = name;
    const geometry = this.buildGeometry();
    const material = new THREE.MeshStandardMaterial({ vertexColors: true });
    this.mesh = new THREE.Mesh(geometry, material);
    if (this.name) this.mesh.name = this.name;
    this.mesh.scale.set(0.1, 0.1, 0.1);
    scene.add(this.mesh);
    collisionObserver.addColisionObject(this);
  }

  public addScene(): void {
    scene.add(this.mesh);
  }

  public deleteScene(): void {
    scene.remove(this.mesh);
  }

  public  setDirection(object: THREE.Object3D): void {
      const shurikenDirection = new THREE.Vector3(0, 0, -1);
      object.getWorldDirection(shurikenDirection);
      
      const shurikenWorldPosition = new THREE.Vector3();
      object.getWorldPosition(shurikenWorldPosition);
      this.mesh.position.copy(shurikenWorldPosition);

      this.direction = shurikenDirection;
  }

  private buildGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(faces);
    geometry.computeVertexNormals();
    return geometry;
  }

  public getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }
  public setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  public setX(x: number): void {
    this.mesh.position.x = x;
  }

  public setY(y: number): void {
    this.mesh.position.y = y;
  }

  public setZ(z: number): void {
    this.mesh.position.z = z;
  }

  public moveX(delta: number): void {
    this.mesh.position.x += delta;
  }

  public moveY(delta: number): void {
    this.mesh.position.y += delta;
  }

  public moveZ(delta: number): void {
    this.mesh.position.z += delta;
  }
  
  public rotateY(angleRad: number): void {
    this.mesh.rotation.y += angleRad;
  };

  public moveForward(distance: number): void {
    this.mesh.position.addScaledVector(this.direction, distance);
  }

  public isColliding(target: CollisionClassName): void {
    if (target instanceof TrafficCone) {
      if (aabbIntersects(this.mesh, target.getTrafficCone())) {
        console.log("COLISION CON TRAFFIC CONE DESDE SHURIKEN");
        if (this.mesh.removeFromParent) {
          this.mesh.removeFromParent();
        } else if (this.mesh.parent) {
          this.mesh.parent.remove(this.mesh);
        }
        //scene
        collisionObserver.addObjectToRemove(this);
      }
    } else if (target instanceof Walls) {
      if (aabbIntersects(this.mesh, target.getWall())) {
        console.log("COLISION CON WALL");
        scene.remove(this.mesh);
        collisionObserver.addObjectToRemove(this);
      }
    } 
  }


}