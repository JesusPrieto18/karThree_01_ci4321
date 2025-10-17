import * as THREE from 'three';
import { solidWithWire } from './utils/utils';
import { scene } from './scene';

export let walls: THREE.Group;

export function createWalls(): void {

    const wallHeight = 2;
    const wallThickness = 0.05;
    const wallLength = 10;

    const wallGeometry1 = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
    const wallColor = 0x506468; // Color marrón para las paredes

    const wall1 = solidWithWire(wallGeometry1, wallColor, false);
    wall1.position.set(0, 0, -wallLength/2); // Pared trasera

    const wall2 = solidWithWire(wallGeometry1, wallColor, false);
    wall2.position.set(0, 0, wallLength/2); // Pared delantera

    const wall3 = solidWithWire(wallGeometry1, wallColor, false);
    wall3.position.set(wallLength/2, 0, 0); // Pared izquierda
    wall3.rotation.y = Math.PI / 2;

    const wall4 = solidWithWire(wallGeometry1, wallColor, false);
    wall4.position.set(-wallLength/2, 0, 0); // Pared derecha
    wall4.rotation.y = Math.PI / 2;

    walls = new THREE.Group();
    walls.add(wall1, wall2, wall3, wall4);
    walls.position.y = wallHeight / 2; // Elevar las paredes para que estén sobre el suelo
    scene.add(walls);
}