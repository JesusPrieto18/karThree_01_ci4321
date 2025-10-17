import * as THREE from 'three';
import { solidWithWire } from './utils/utils';
import { scene } from './scene';

export let trafficCone: THREE.Group;

export function createTrafficCone(): void {
    // Cono de tráfico
    const coneHeight = 2;
    const coneRadius = 0.5;
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 8);
    const coneColor = 0xff0000;
    
    trafficCone = solidWithWire(coneGeometry, coneColor, false);

    // Base negra
    const baseHeight = 0.2;
    const baseLength = 1.2;
    const baseThickness = 1.2;
    const baseGeometry = new THREE.BoxGeometry(baseLength, baseHeight, baseThickness);
    const baseColor = 0x000000;
    
    const base = solidWithWire(baseGeometry, baseColor, false);
    base.position.set(0, -1, 0);
    
    trafficCone.add(base);

    // Franja blanca de abajo
    const markerHeight = 0.3;
    const markerGeometry = new THREE.CylinderGeometry(0.35, 0.42, markerHeight, 8);
    const markerColor = 0xffffff;

    const marker = solidWithWire(markerGeometry, markerColor, false);
    marker.position.set(0, -0.5, 0);
    
    // Franja blanca del medio
    const markerGeometry2 = new THREE.CylinderGeometry(0.22, 0.31, markerHeight, 8);
    const marker2 = solidWithWire(markerGeometry2, markerColor, false);
    marker2.position.set(0, 0, 0);

    // Franja blanca de arriba
    const markerGeometry3 = new THREE.CylinderGeometry(0.09, 0.19, markerHeight, 8);
    const marker3 = solidWithWire(markerGeometry3, markerColor, false);
    marker3.position.set(0, 0.5, 0);


    trafficCone.add(marker, marker2, marker3);
    trafficCone.position.set(0, (baseHeight + coneHeight) / 2, 0);
    scene.add(trafficCone);
}