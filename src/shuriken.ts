import * as THREE from 'three';
import { scene } from './scene';
import { vertices, faces, colors } from './shurikenInfo';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects, reflectDirection, resolvePenetrationProyectil } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { TrafficCone } from './trafficCone';
import { Walls } from './walls';
import { kart } from './utils/initializers';
import type { Kart } from './kart';
export class Shuriken {
  private mesh: THREE.Mesh;
  private name?: string;
  private velocity: THREE.Vector3 = new THREE.Vector3(0, 0, -1);
  private crashed: boolean = false;
  private launched: boolean = false;
  private bounces: number = 0;
  public parent: Kart | undefined = undefined;

  constructor(name?: string) {
    this.name = name;
    const geometry = this.buildGeometry();
    const material = new THREE.MeshStandardMaterial({ vertexColors: true });
    this.mesh = new THREE.Mesh(geometry, material);
    if (this.name) this.mesh.name = this.name;
    this.mesh.scale.set(0.1, 0.1, 0.1);
    scene.add(this.mesh);
    collisionObserver.addColisionObject(this);
    this.mesh.add(new THREE.AxesHelper(3));
  }

  public getBody(): THREE.Mesh {
    return this.mesh;
  }
  public addScene(): void {
    scene.add(this.mesh);
  }

  public deleteScene(): void {
    scene.remove(this.mesh);
  }
  public getVelocity(): THREE.Vector3 {
    return this.velocity.clone();
  }

  public setVelocity(object: THREE.Object3D): void {
      const shurikenDirection = new THREE.Vector3(0, 0, -1);
      object.getWorldDirection(shurikenDirection);
      
      const shurikenWorldPosition = new THREE.Vector3();
      object.getWorldPosition(shurikenWorldPosition);
      this.mesh.position.copy(shurikenWorldPosition);

      this.velocity = shurikenDirection;
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
    this.mesh.position.addScaledVector(this.velocity, distance);
  }

  public setCrashed(): boolean {
    return this.crashed;
  }

  public setLaunched(launched: boolean): void {
    console.log("Shuriken lanzado:", launched);
    this.launched = launched;
  }
  
  public getLaunched(): boolean {
    return this.launched;
  }

  public getBounces(): number {
    return this.bounces;
  }
  
  public isColliding(target: CollisionClassName): void {
    if (target instanceof TrafficCone) {
      if (aabbIntersects(this.mesh, target.getBody())) {
        console.log("COLISION CON TRAFFIC CONE DESDE SHURIKEN");
        if (this.mesh.parent) {
          let index = this.mesh.parent.children.indexOf(this.mesh);
          this.parent?.removeProyectilFromList(index);
          this.mesh.parent.remove(this.mesh);
        }
        collisionObserver.addObjectToRemove(this);
      }
    } else if (target instanceof Walls && this.getLaunched()) {
      if (aabbIntersects(this.mesh, target.getBody())) {
        console.log("COLISION CON WALL");

        resolvePenetrationProyectil(this, target);
        const speed = this.velocity.length(); // magnitud actual (por ejemplo, 0.5 o 1)
        const reflectedDir = reflectDirection(this, target); // vector unitario con la nueva dirección
        this.velocity.copy(reflectedDir.multiplyScalar(speed * 0.8)); // 0.8 = pérdida de energía
        this.bounces += 1;

        if (this.bounces > 2) {
          scene.remove(this.mesh);
          collisionObserver.addObjectToRemove(this);
        }
      }
    } 
  }

}