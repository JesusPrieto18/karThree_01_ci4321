import * as THREE from 'three';
import { solidWithWire } from './utils/utils';
import { scene } from './scene';

export let raceTrack: THREE.Group;

export function createRaceTrack(): void {

    const raceTrackHeight = 150;
    const raceTrackLength = 150;

    const geometry = new THREE.PlaneGeometry(raceTrackHeight, raceTrackLength);
    const material_color = 0x6aa84f;

    raceTrack = solidWithWire(geometry, material_color);
    raceTrack.rotation.x = -Math.PI/2;
    scene.add(raceTrack);
}