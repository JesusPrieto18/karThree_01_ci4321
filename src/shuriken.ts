import * as THREE from 'three';
import { scene } from './scene';
import { vertices, faces, colors } from './shurikenInfo';
import { collisionObserver } from './utils/colliding';
export class Shuriken {
  public mesh: THREE.Mesh;
  public name?: string;

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

  private buildGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(faces);
    geometry.computeVertexNormals();
    return geometry;
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
  }

   public isColliding(): boolean {
    return false;  
  }
}