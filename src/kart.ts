import * as THREE from 'three';
import { scene } from './scene';
import { solidWithWire } from './utils/utils';
import { Shuriken } from './shuriken';

export class Kart {
  private kartChassis: THREE.Group;
  private wheelAxisGroup: THREE.Group;
  private wheelsFrontAxis: THREE.Group;
  private wheelsBackAxis: THREE.Group;

  private powerUps: number = -1;
  private isActivatePowerUps: boolean = false;
  private powerUpsList: THREE.Group = new THREE.Group();
  private proyectilesList: THREE.Group = new THREE.Group();
  private proyectilesDirection:THREE.Vector3[] = [];

  private kart = new THREE.Group();

  constructor() {
    const height = 1;
    const length = 1;
    const width = 2;
    const body = new THREE.BoxGeometry(length, height, width);
    body.translate(0, height / 3, 0);
    const material_color = 0xff0000;
    this.kartChassis = solidWithWire(body, material_color, false);
    this.kartChassis.name = "kartChassis";

    this.kart.add(this.kartChassis);
    this.kart.position.set(0, 0.5,-3)
    this.kart.add(new THREE.AxesHelper(3));

    this.wheelAxisGroup = new THREE.Group();
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const wheelPositionsFront = [
      [-1, -0.2, -0.8],
      [1, -0.2, -0.8]
    ];
    const wheelPositionsBack = [
      [-1, -0.2, 0.8],
      [1, -0.2, 0.8]
    ];
    this.wheelsFrontAxis = new THREE.Group();
    this.wheelsBackAxis = new THREE.Group();
    
    const bodyAxisFront = new THREE.BoxGeometry(2, 0.1, 0.1);
    const bodyAxisBack = new THREE.BoxGeometry(2, 0.1, 0.1);
    
    const frontAxis = solidWithWire(bodyAxisFront, 0x0000ff, false);
    const backAxis = solidWithWire(bodyAxisBack, 0x0000ff, false);
    
    frontAxis.position.set(0, -0.2, -0.8);
    backAxis.position.set(0, -0.2, 0.8);
    
    this.wheelsFrontAxis.add(frontAxis);
    this.wheelsBackAxis.add(backAxis);
    
    this.wheelAxisGroup.add(this.wheelsFrontAxis);
    this.wheelAxisGroup.add(this.wheelsBackAxis);

    wheelPositionsFront.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      this.wheelsFrontAxis.add(wheel);
    });

    wheelPositionsBack.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      this.wheelsBackAxis.add(wheel);
    });
    this.kart.add(this.wheelAxisGroup);
    scene.add(this.kart);

    scene.add(this.proyectilesList);
  };

  public getKart(): THREE.Group {
    return this.kart;
  };

  public getWheelsFrontAxis(): THREE.Group {
    return this.wheelsFrontAxis;
  };

  public getWheelsBackAxis(): THREE.Group {
    return this.wheelsBackAxis;
  };

  public getWheelAxisGroup(): THREE.Group {
    return this.wheelAxisGroup;
  };

  public setPowerUps(count: number): void {
    if (!this.isActivatePowerUps) {
      this.powerUps = count;
      this.isActivatePowerUps = true;

      this.powerUpsList.position.copy(this.kart.position);

      switch (this.powerUps) {
        case 0:
          // Activar un solo shuriken
          const shuriken1_case0 = new Shuriken();
          shuriken1_case0.setZ(
            this.powerUpsList.position.z 
          );
          this.powerUpsList.add(shuriken1_case0.mesh);
          break;
        case 1:
          // Activar dos shurikens
          const shuriken1_case1 = new Shuriken();
          const shuriken2_case1 = new Shuriken();

          shuriken1_case1.setX(-2);

          shuriken2_case1.setX(2);

          this.powerUpsList.add(shuriken1_case1.mesh, shuriken2_case1.mesh);

          break;
        case 2:
          // Activar 3 shurikens
          const shuriken1_case2 = new Shuriken();
          const shuriken2_case2 = new Shuriken();
          const shuriken3_case2 = new Shuriken();
          
          shuriken1_case2.setZ(-2);
          shuriken2_case2.setPosition(2,0,1);
          shuriken3_case2.setPosition(-2,0,1);

          this.powerUpsList.add(shuriken1_case2.mesh, shuriken2_case2.mesh, shuriken3_case2.mesh);
          break;
        case 3:
          // Activar bomba
          console.log("Bomba activada");
          break;
      }
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
      this.kart.getWorldDirection(shurikenDirection);
      
      const shurikenWorldPosition = new THREE.Vector3();
      this.kart.getWorldPosition(shurikenWorldPosition);
      shuriken!.position.copy(shurikenWorldPosition);
      
      this.proyectilesDirection.push(shurikenDirection);
      this.proyectilesList.add(shuriken!);

      console.log(this.powerUpsList.children.length);
    } else {
      this.isActivatePowerUps = false;
      this.powerUps = -1;
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
        this.powerUpsList.rotation.copy(this.kart.rotation);
        break;
      default:
        this.powerUpsList.rotation.y += 0.05;
        break;
    }

    this.powerUpsList.position.copy(this.kart.position);

    for (let i = 0; i < this.proyectilesDirection.length; i++) {
      const proyectil = this.proyectilesList.children[i];
      proyectil.position.addScaledVector(this.proyectilesDirection[i], 0.1);
      proyectil.rotation.y -= 0.1;
    };
  }
}

