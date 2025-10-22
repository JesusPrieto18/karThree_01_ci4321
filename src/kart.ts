import * as THREE from 'three';
import { scene } from './scene';
import { solidWithWire } from './utils/utils';
import { Shuriken } from './shuriken';
export class Kart {
  private powerUps: number = -1;
  private isActivatePowerUps: boolean = false;
  private powerUpsList: THREE.Group = new THREE.Group();
  private proyectilesList: THREE.Group = new THREE.Group();
  private proyectilesDirection:THREE.Vector3[] = [];

  private full_kart = new THREE.Group();
  
  constructor() {
    const height = 1;
    const length = 1;
    const width = 2;

    const geometry = new THREE.BoxGeometry(length, height, width);
    const material_color = 0xff0000;
    const body = solidWithWire(geometry, material_color, false);
    body.name = 'body';
    
    this.full_kart.position.set(0, 0.5, 0);
    this.full_kart.add(body);
    this.full_kart.add(new THREE.AxesHelper(3));
    scene.add(this.full_kart);

    scene.add(this.proyectilesList);
  }

  public getFullKart(): THREE.Group {
    return this.full_kart;
  }

  public getBody(): THREE.Mesh {
    return this.full_kart.getObjectByName('body') as THREE.Mesh;
  }

  public setPowerUps(count: number): void {
    if (!this.isActivatePowerUps) {
      this.powerUps = count;
      this.isActivatePowerUps = true;
      this.powerUpsList.position.copy(this.full_kart.position);
      switch (this.powerUps) {
        case 0:
          // Activar un solo shuriken
          const shuriken1_case0 = new Shuriken();
          shuriken1_case0.setZ(
            this.powerUpsList.position.z - 2
          );
          this.powerUpsList.add(shuriken1_case0.mesh);
          break;
        case 1:
          // Activar dos shurikens
          const shuriken1_case1 = new Shuriken();
          const shuriken2_case1 = new Shuriken();

          shuriken1_case1.setX(
            this.powerUpsList.position.x - 2,
          );

          shuriken2_case1.setX(
            this.powerUpsList.position.x + 2,
          );
          this.powerUpsList.add(shuriken1_case1.mesh, shuriken2_case1.mesh);
          break;
        case 2:
          // Activar 3 shurikens
          const shuriken1_case2 = new Shuriken();
          const shuriken2_case2 = new Shuriken();
          const shuriken3_case2 = new Shuriken();
          
          shuriken1_case2.setZ(
            this.powerUpsList.position.z - 2,
          );
          shuriken2_case2.setPosition(
            this.powerUpsList.position.x + 2,
            this.powerUpsList.position.y,
            this.powerUpsList.position.z + 1
          );
          shuriken3_case2.setPosition(
            this.powerUpsList.position.x - 2,
            this.powerUpsList.position.y,
            this.powerUpsList.position.z + 1 
          );

          this.powerUpsList.add(shuriken1_case2.mesh, shuriken2_case2.mesh, shuriken3_case2.mesh);
          break;
        case 3:
          // Activar bomba
          console.log("Bomba activada");
          break;
      }
      this.powerUpsList.position.copy(this.full_kart.position);
      scene.add(this.powerUpsList);

    } else {
      console.log("Ya tienes un power up activo");
    }
  }

  public launchPowerUps(): void {
    if (this.isActivatePowerUps && this.powerUpsList.children.length > 0) {
      console.log("Lanzando power ups");
      const shuriken = this.powerUpsList.children.pop();

      const shurikenDirection = new THREE.Vector3(0, 0, -1);
      this.full_kart.getWorldDirection(shurikenDirection);
      
      const shurikenWorldPosition = new THREE.Vector3();
      this.full_kart.getWorldPosition(shurikenWorldPosition);
      shuriken!.position.copy(shurikenWorldPosition);
      
      this.proyectilesDirection.push(shurikenDirection);
      this.proyectilesList.add(shuriken!);

      console.log(this.powerUpsList.children.length);
    } else {
      console.log("No tienes power ups para lanzar");
    }
  }

  public animate(): void {
    if (this.isActivatePowerUps) {
      this.powerUpsList.children.forEach((powerUp) => {
        powerUp.rotation.y -= 0.1;
      });
    }

    switch (this.powerUps) {
      case 0:
        this.powerUpsList.rotation.copy(this.full_kart.rotation);
        break;
      default:
        this.powerUpsList.rotation.y += 0.05;
        break;
    }

    this.powerUpsList.position.copy(this.full_kart.position);

    for (let i = 0; i < this.proyectilesDirection.length; i++) {
      const proyectil = this.proyectilesList.children[i];
      proyectil.position.addScaledVector(this.proyectilesDirection[i], 0.1);
      proyectil.rotation.y -= 0.1;
    };
  }
}
