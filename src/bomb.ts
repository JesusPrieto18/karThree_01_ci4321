import * as THREE from 'three';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { aabbIntersects } from './utils/utils';
import type { CollisionClassName } from './models/colisionClass';
import { TrafficCone } from './trafficCone';
import { Walls } from './walls';

export class Bomb {
  private mesh: THREE.Mesh;
  private fuse: THREE.Mesh;
  private name?: string;

  private direction: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
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

        // --- Mecha (fuse) ---
    const fuseGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.25, 8);
    const fuseMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff6600, emissiveIntensity: 1 });
    this.fuse = new THREE.Mesh(fuseGeometry, fuseMaterial);
    this.fuse.position.set(0, 0.6, 0); // encima de la bomba
    this.mesh.add(this.fuse);

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
  const dir = new THREE.Vector3(0, 1, 2);
  object.getWorldDirection(dir);

  const pos = new THREE.Vector3();
  object.getWorldPosition(pos);

  // 👉 Offset hacia adelante (ajusta el valor según el tamaño del kart)
  const offsetDistance = 2; // 1.2 metros o unidades hacia adelante
  const offset = dir.clone().multiplyScalar(offsetDistance);

  // Nueva posición: frente del kart
  const startPos = pos.clone().add(offset);
  this.mesh.position.copy(startPos);

  this.direction.copy(dir);
  console.log('getWorldDirection:', dir);
}


  public moveForward(distance: number): void {
  this.mesh.position.addScaledVector(this.direction, distance);
}

public rotateY(angleRad: number): void {
  this.mesh.rotation.y += angleRad;
}


  /** Asigna una velocidad inicial (por ejemplo, al lanzarla) */
  public setVelocity(initialVelocity: THREE.Vector3): void {
    this.velocity.copy(initialVelocity);
  }

    /** Animación de la mecha */
  private updateFuse(deltaTime: number): void {
    const fuseMat = this.fuse.material as THREE.MeshStandardMaterial;
    // Cambiar el color hacia rojo con el tiempo
    const t = Math.max(0, this.timer / 3); // normaliza 1 → 0
    fuseMat.color.setHSL(0.1 + (1 - t) * 0.1, 1, 0.5); // de naranja a rojo
    fuseMat.emissiveIntensity = 1 + (1 - t) * 4; // brilla más al final
    this.fuse.scale.y = t * 1; // se va acortando
  }

  /** Actualiza posición, gravedad y temporizador */
  public update(deltaTime: number): void {
    if (this.exploded) return;

    // Aplicar gravedad
    this.velocity.y -= this.gravity * deltaTime * 0.3;

    // Mover la bomba
    this.mesh.position.addScaledVector(this.velocity, deltaTime);
    //Mecha
    this.updateFuse(deltaTime);
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

    if (target instanceof TrafficCone && this.getLaunched()){ 
      if(aabbIntersects(this.mesh, target.getBody())){
        console.log('💣 Colisión con TrafficCone');
        this.explode();
      }
    }
    
    else if (target instanceof Walls && this.getLaunched() ) {

      if( aabbIntersects(this.mesh, target.getBody()) ){
        console.log('Colisión con pared');
        this.explode();
      };
    };
  }

  /** Métodos auxiliares */
  public getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }

  public setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }
}