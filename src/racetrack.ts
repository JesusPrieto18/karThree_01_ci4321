import * as THREE from 'three';
import { solidWithWire } from './utils';
import { scene } from './scene';

export let raceTrack: THREE.Group;

export function createRaceTrack(): void {
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material_color = 0x6aa84f;

    const base = solidWithWire(geometry, material_color);
    base.rotation.x = -Math.PI/2;

    scene.add(base);
}