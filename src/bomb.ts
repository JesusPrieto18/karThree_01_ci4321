import * as THREE from 'three';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { TrafficCone } from './trafficCone';
import { Walls } from './walls';

export class Bomb {
  private mesh: THREE.Mesh;
  private name?: string;

  private direction: THREE.Vector3 = new THREE.Vector3(0, 0, -1);
  private velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private gravity: number = 9.8; // gravedad simulada
  private timer: number = 3; // segundos antes de explotar
  private exploded: boolean = false;
  private launched: boolean = false;

  constructor(name?: string) {
    this.name = name;

    // Cuerpo principal de la bomba
    const geometry = new THREE.SphereGeometry(0.5,16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6, roughness: 0.4 });
    this.mesh = new THREE.Mesh(geometry, material);

    if (this.name) this.mesh.name = this.name;

    scene.add(this.mesh);
    collisionObserver.addColisionObject(this);
  }

  public addScene(): void {
    scene.add(this.mesh);
  }

  public deleteScene(): void {
    scene.remove(this.mesh);
  }

  public getBody(): THREE.Mesh {
    return this.mesh;
  }

  public setLaunched(launched: boolean): void {
    this.launched = launched;
  }

  public getLaunched(): boolean {
    return this.launched;
  }

  /** Define la dirección en base a un objeto (ej: el kart o jugador) */
  public setDirection(object: THREE.Object3D): void {
    const dir = new THREE.Vector3(0, 0, -1);
    object.getWorldDirection(dir);

    const pos = new THREE.Vector3();
    object.getWorldPosition(pos);

    this.mesh.position.copy(pos);
    this.direction.copy(dir);
  }

  /** Asigna una velocidad inicial (por ejemplo, al lanzarla) */
  public setVelocity(initialVelocity: THREE.Vector3): void {
    this.velocity.copy(initialVelocity);
  }

  /** Actualiza posición, gravedad y temporizador */
  public update(deltaTime: number): void {
    if (this.exploded) return;

    // Aplicar gravedad
    this.velocity.y -= this.gravity * deltaTime * 0.3;

    // Mover la bomba
    this.mesh.position.addScaledVector(this.velocity, deltaTime);

    // Contador regresivo
    this.timer -= deltaTime;
    if (this.timer <= 0) {
      this.explode();
    }
  }

  /** Lógica de explosión */
  private explode(): void {
    if (this.exploded) return;
    this.exploded = true;

    // Efecto visual: cambio de color + pequeña expansión
    const mat = this.mesh.material as THREE.MeshStandardMaterial;
    mat.color.set(0xff4400);

    const explosion = new THREE.Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);

    // Pequeño efecto visual (puedes animarlo luego)
    this.mesh.scale.set(1.5, 1.5, 1.5);

    console.log('Bomba explotó en:', explosion);

    // Eliminar tras un breve tiempo
    setTimeout(() => {
      scene.remove(this.mesh);
      collisionObserver.addObjectToRemove(this);
    }, 300);
  }

  /** Verifica colisiones con otros objetos */
  public isColliding(target: CollisionClassName): void {
    if (this.exploded) return;

    if (target instanceof TrafficCone && aabbIntersects(this.mesh, target.getBody())) {
      console.log('💣 Colisión con TrafficCone');
      this.explode();
    }

    if (target instanceof Walls && aabbIntersects(this.mesh, target.getBody())) {
      console.log('Colisión con pared');
      this.explode();
    }
  }

  /** Métodos auxiliares */
  public getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }

  public setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }
}