import * as THREE from 'three';
import { scene } from './scene';
import {solidWithWire, reflectDirection } from './utils/utils';
import { Shuriken } from './shuriken';
import type {Proyectils, StaticObjects } from './models/colisionClass';
import { collisionObserver } from './utils/colliding';
import { Coffee } from './coffee';
import { Bomb } from './bomb';

export class Kart {
  private kart = new THREE.Group();

  private kartChassis: THREE.Group;
  private wheelAxisGroup: THREE.Group;
  private wheelsFrontAxis: THREE.Group;
  private wheelsBackAxis: THREE.Group;

  private powerUps: number = -1;
  private isActivatePowerUps: boolean = false;
  private powerUpsList: THREE.Group = new THREE.Group();
  private proyectilesList: Proyectils[] = [];
  private proyectilLaunched: Proyectils[] = []
  
  private crashed: boolean = false;
  private reboundVelocity: THREE.Vector3 = new THREE.Vector3();
  private damping: number = 10; // más bajo = rebote se corta rápido, más alto = desliza más
  private reboundStrength: number = 0.004;
  
  constructor() {
    const height = 1;
    const length = 2;
    const width = 4.5;
    const body = new THREE.BoxGeometry(length, height, width);
    body.translate(0, height / 3, 0);
    const material_color = 0xFFE900;
    this.kartChassis = solidWithWire(body, material_color, false);
    this.kartChassis.name = "kartChassis";

    let capo = new THREE.CylinderGeometry(6.3,9,4.3,4) // 6.3,8.5,4.3,4
    let material_capo = new THREE.MeshStandardMaterial({ color: material_color });
    let mesh_capo = new THREE.Mesh(capo, material_capo);
    mesh_capo.rotation.y = Math.PI / 4;
    mesh_capo.scale.set(0.15,0.15,0.15);
    mesh_capo.position.set(0,1.1,-0.7);
    this.kartChassis.add(mesh_capo);

    let tope = new THREE.BoxGeometry(0.6,0.2,1);
    let material_tope = new THREE.MeshStandardMaterial({ color: material_color });
    let mesh_tope = new THREE.Mesh(tope, material_tope);
    mesh_tope.position.set(0,0.8,0.8);
    mesh_tope.rotateX(Math.PI/16);
    this.kartChassis.add(mesh_tope);

    let color_ventana = 0x3F4444;
    let ventana_frontal = new THREE.CylinderGeometry(6.3,9,4.2,4) // 6.3,8.5,4.3,4
    let material_ventana = new THREE.MeshStandardMaterial({ color: color_ventana });
    let mesh_ventanaFrontal = new THREE.Mesh(ventana_frontal, material_ventana);
    mesh_ventanaFrontal.rotation.y = Math.PI / 4;
    mesh_ventanaFrontal.scale.set(0.125,0.125,0.125);
    mesh_ventanaFrontal.position.set(0,1.12,-0.55);
    this.kartChassis.add(mesh_ventanaFrontal);

    this.kart.add(this.kartChassis);
    this.kart.position.set(0, 0.6,-3)
    this.kart.add(new THREE.AxesHelper(3));

    this.wheelAxisGroup = new THREE.Group();
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const wheelPositionsFront = [
      [-1.3, -0.2, -1.2],
      [1.3, -0.2, -1.2]
    ];
    const wheelPositionsBack = [
      [-1.3, -0.2, 1.3],
      [1.3, -0.2, 1.3]
    ];
    this.wheelsFrontAxis = new THREE.Group();
    this.wheelsBackAxis = new THREE.Group();
    
    const bodyAxisFront = new THREE.BoxGeometry(3, 0.1, 0.1);
    const bodyAxisBack = new THREE.BoxGeometry(3, 0.1, 0.1);
    
    const frontAxis = solidWithWire(bodyAxisFront, 0x0000ff, false);
    const backAxis = solidWithWire(bodyAxisBack, 0x0000ff, false);
    
    frontAxis.position.set(0, -0.2, -1.2);
    backAxis.position.set(0, -0.2, 1.3);
    
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
    collisionObserver.addColisionObject(this);
    //scene.add(this.proyectilesList);
  };

  public getBody(): THREE.Group {
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

  public getPowerUpsList(): THREE.Group {
    return this.powerUpsList;
  };

  public setX(x: number): void {
    this.kart.position.x = x;
  }

  public setZ(z: number): void {
    this.kart.position.z = z;
  }

  public setRotation(x: number, y: number, z: number): void {
    this.kart.rotation.set(x, y, z);
  }
  public setPowerUps(count: number): void {
    if (!this.isActivatePowerUps) {
      this.powerUps = count;
      this.isActivatePowerUps = true;

      this.powerUpsList.position.copy(this.kart.position);
      console.log(this.powerUpsList.position);
      switch (this.powerUps) {
        case 0:
          // Activar un solo shuriken
          const shuriken1_case0 = new Shuriken();
          shuriken1_case0.setPosition(0,0,-3);

          // Guardar la instancia en el array de proyectiles y añadir su mesh a la lista de power ups
          this.proyectilesList.push(shuriken1_case0);
          this.powerUpsList.add(shuriken1_case0.getBody());
          break;
        case 1:
          // Activar dos shurikens
          const shuriken1_case1 = new Shuriken();
          const shuriken2_case1 = new Shuriken();

          shuriken1_case1.setX(-3);

          shuriken2_case1.setX(3);

          // Guardar instancias y añadir meshes
          this.proyectilesList.push(shuriken1_case1, shuriken2_case1);
          this.powerUpsList.add(shuriken1_case1.getBody(), shuriken2_case1.getBody());

          break;
        case 2:
          // Activar 3 shurikens
          const shuriken1_case2 = new Shuriken();
          const shuriken2_case2 = new Shuriken();
          const shuriken3_case2 = new Shuriken();
          
          shuriken1_case2.setZ(-4);
          shuriken2_case2.setPosition(3,0,1);
          shuriken3_case2.setPosition(-3,0,1);

          // Guardar instancias y añadir meshes
          this.proyectilesList.push(shuriken1_case2, shuriken2_case2, shuriken3_case2);
          this.powerUpsList.add(shuriken1_case2.getBody(), shuriken2_case2.getBody(), shuriken3_case2.getBody());
          break;
        case 3:
          // Activar bomba
          console.log("Bomba activada");
          const bomb = new Bomb();
          bomb.setPosition(0,0.1,-2);
          this.proyectilesList.push(bomb);
          this.powerUpsList.add(bomb.getBody());
          break;
        case 4:
          // Activar cafe
          console.log("Cafe activado");
          const coffee1_case4 = new Coffee();
          coffee1_case4.setPosition(0, 0, -3);
          this.powerUpsList.add(coffee1_case4.getBody());
          break;
        case 5:
          // Activar dos cafe
          console.log("Dos cafes activados");
          const coffee1_case5 = new Coffee();
          const coffee2_case5 = new Coffee();

          coffee1_case5.setX(-3);
          coffee2_case5.setX(3);

          this.powerUpsList.add(coffee1_case5.getBody(), coffee2_case5.getBody());
          break;
        case 6:
          // Activar tres cafe
          console.log("Tres cafes activados");
          const coffee1_case6 = new Coffee();
          const coffee2_case6 = new Coffee();
          const coffee3_case6 = new Coffee();
          
          coffee1_case6.setZ(-4);
          coffee2_case6.setPosition(3,0,1);
          coffee3_case6.setPosition(-3,0,1);

          this.powerUpsList.add(coffee1_case6.getBody(), coffee2_case6.getBody(), coffee3_case6.getBody());
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

    const powerUpMesh = this.powerUpsList.children.pop();
    const index = this.proyectilesList.findIndex((p) => p.getBody() === powerUpMesh);
    const proyectil = this.proyectilesList[index];

    proyectil.addScene();
    if(proyectil instanceof Shuriken){
      proyectil.setVelocity(this.kart);
    }
    proyectil.setLaunched(true);

    // Si es una bomba, le damos una velocidad inicial
    if (proyectil instanceof Bomb) {
      proyectil.setDirection(this.kart)
      proyectil.setVelocity(
        new THREE.Vector3(
          Math.sin(this.kart.rotation.y) * 5, // hacia adelante
          3,// ligeramente hacia arriba
          Math.cos(this.kart.rotation.y) * 5
        )
      );
    } else {
      proyectil.setVelocity(this.kart);
    }

    // Mover del array de lista a lanzados
    this.proyectilLaunched.push(this.proyectilesList.pop()!);
    
    console.log(this.powerUpsList.children.length);
  } else {
    this.isActivatePowerUps = false;
    this.powerUps = -1;
    console.log("No tienes power ups para lanzar");
  }
}


  public getCrashed(): boolean {
    return this.crashed;
  }
  public clearPowerUps(): void {
    this.powerUpsList.children.forEach((powerUp) => {
      this.powerUpsList.remove(powerUp);
    });
    this.proyectilesList = [];
    this.isActivatePowerUps = false;
    this.powerUps = -1;
    console.log("Power ups limpiados");
  }
  
  public setCrashed(staticObject: StaticObjects): void {
    this.reboundVelocity = reflectDirection(this, staticObject);

    // asigna velocidad inicial de rebote
    this.reboundVelocity.copy(this.reboundVelocity.multiplyScalar(this.reboundStrength));
    this.crashed = true;
  }

public animatePowerUps(deltaTime: number = 0.016): void {
  if (this.isActivatePowerUps) {
    this.powerUpsList.children.forEach((powerUp) => {
      powerUp.rotation.y -= 0.01;
    });
  }

    switch (this.powerUps) {
      case 0:
      case 4:
        this.powerUpsList.rotation.copy(this.kart.rotation);
        break;
      case 1:
      case 2:
      case 5:
      case 6:
        this.powerUpsList.rotation.y -= 0.01;
        break;
    case 3:
      this.powerUpsList.rotation.copy(this.kart.rotation);
      break;
      default:
        break;
    }

  this.powerUpsList.position.copy(this.kart.position);

  // Actualizar proyectiles lanzados
  for (let i = 0; i < this.proyectilLaunched.length; i++) {
    const proyectil = this.proyectilLaunched[i];

    if (proyectil instanceof Bomb) {
      proyectil.update(deltaTime); // gravedad, explosión, etc.
    } else {
      proyectil.moveForward(0.2);
      proyectil.rotateY(0.1);
    }
  }
}


  public animateCrash(): void {
    // Lógica de animación para el choque
    if (this.crashed) {
      if (this.reboundVelocity.lengthSq() > 0.0001) {
        // Mover el kart según la velocidad de rebote

        // 1. obtener posición global actual
        const worldPos = this.kart.getWorldPosition(new THREE.Vector3());

        // 2. aplicar la velocidad de rebote este frame
        worldPos.add(this.reboundVelocity);

        // 3. volver a local del padre
        const parent = this.kart.parent!;
        this.kart.position.copy(parent.worldToLocal(worldPos.clone()));

        // 4. frenar la velocidad para que el rebote muera suavemente
        
        this.reboundVelocity.multiplyScalar(this.damping);
        this.kart.rotation.y += Math.PI / 180 * 2; // rotar un poco al rebotar
      } else if (this.reboundVelocity.lengthSq() < 0.0001) {
        this.crashed = false;
        //this.reboundVelocity.set(0, 0, 0);
      }
    }
  }
}

