import * as THREE from 'three';
import { aabbIntersects, solidWithWire, resolvePenetrationKart, resolvePenetrationObstacles } from './utils/utils';
import { scene } from './scene';
import type { CollisionClassName } from './models/colisionClass';
import { Shuriken } from './shuriken';
import { collisionObserver } from './utils/colliding';
import { Kart } from './kart';

export let trafficCone: THREE.Group;

export class TrafficCone {
    private trafficCone = new THREE.Group();
    constructor(addColision: boolean = true) {
        this.buildTrafficCone(addColision);
    }

    private buildTrafficCone(addColision: boolean): void {
        // Cono de tráfico
        const coneHeight = 2;
        const coneRadius = 0.5;
        const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 8);
        const coneColor = 0xff0000;

        const cone = solidWithWire(coneGeometry, coneColor, false);
        
        this.trafficCone.add(cone);

        // Base negra
        const baseHeight = 0.2;
        const baseLength = 1.2;
        const baseThickness = 1.2;
        const baseGeometry = new THREE.BoxGeometry(baseLength, baseHeight, baseThickness);
        const baseColor = 0x000000;
        
        const base = solidWithWire(baseGeometry, baseColor, false);
        base.position.set(0, -1, 0);
        
        this.trafficCone.add(base);

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


        this.trafficCone.add(marker, marker2, marker3);
        scene.add(this.trafficCone);

        this.trafficCone.scale.set(0.5, 0.5, 0.5);
        this.trafficCone.position.set(0, (baseHeight + coneHeight)*0.5 / 2, 0);

        this.trafficCone.add(new THREE.AxesHelper(2));
        if (addColision){
            collisionObserver.addColisionObject(this);
        }
        //this.trafficCone.position.y = 0.5;
    }

    public getBody(): THREE.Group {
        return this.trafficCone;
    }
    public setPosition(x: number, y: number, z: number): void {
        this.trafficCone.position.set(x, y, z);
    }

    public setX(x: number): void {
        this.trafficCone.position.x = x;
    }

    public setY(y: number): void {
        this.trafficCone.position.y = y;
    }
    
    public setZ(z: number): void {
        this.trafficCone.position.z = z;
    }

    public isColliding(target: CollisionClassName): void {
        if (target instanceof Shuriken) {
          if (aabbIntersects(this.trafficCone, target.getBody())) {
            console.log("COLISION CON SHURIKEN DESDE TRAFFIC CONE");
            scene.remove(this.trafficCone);
            collisionObserver.addObjectToRemove(this);
          }
        } 

        if (target instanceof Kart) {
            if (aabbIntersects(this.trafficCone, target.getBody())) {
                console.log("COLISION CON KART DESDE TRAFFIC CONE");
                resolvePenetrationObstacles(target, this, 0.1);
                target.setCrashed(this);
            }
        }
    }

}