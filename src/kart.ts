import * as THREE from 'three';
import { scene } from './scene';
import { solidWithWire } from './utils/utils';

export class Kart {
  private powerUps: number = 0;
  private activatePowerUps: boolean = false;
  private full_kart = new THREE.Group();

  constructor() {
    const height = 1;
    const length = 1;
    const width = 2;

    const geometry = new THREE.BoxGeometry(length, height, width);
    const material_color = 0xff0000;
    const body = solidWithWire(geometry, material_color, false);
    body.name = 'body';
    
    this.full_kart.position.set(2, 0.5, 2);
    this.full_kart.add(body);
    scene.add(this.full_kart);
  }

  public getFullKart(): THREE.Group {
    return this.full_kart;
  }

  public getBody(): THREE.Mesh {
    return this.full_kart.getObjectByName('body') as THREE.Mesh;
  }
}
