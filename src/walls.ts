import * as THREE from 'three';
import { aabbIntersects, solidWithWire, resolvePenetrationKart } from './utils/utils';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { Kart } from './kart';
import type { CollisionClassName } from './models/colisionClass';

export class Walls { 
    private wall: THREE.Group;
    private wallThickness: number;
    private wallHeight: number;
    private wallLength: number;

    constructor(length: number = 10 , height: number = 2, thickness: number = 0.05) {
        this.wallHeight = height;
        this.wallThickness = thickness;
        this.wallLength = length;

        const wallGeometry1 = new THREE.BoxGeometry(this.wallLength, this.wallHeight, this.wallThickness);
        const wallColor = 0x506468; // Color marrón para las paredes
        this.wall = solidWithWire(wallGeometry1, wallColor, false);
        this.wall.add(new THREE.AxesHelper(3));

        scene.add(this.wall);
        collisionObserver.addColisionObject(this);
    }

    public setPosition(x: number, y: number, z: number): void {
        this.wall.position.set(x, y, z);
    }

    public getLength(): number {
        return this.wallLength;
    }

    public getHeight(): number {
        return this.wallHeight;
    }
    
    public getThickness(): number {
        return this.wallThickness;
    }

    public getBody(): THREE.Group {
        return this.wall;
    }

    public setRotation(x: number, y: number, z: number): void {
        this.wall.rotation.set(x, y, z);
    }

    public isColliding(target: CollisionClassName): void {
        if (target instanceof Kart) {
            if (aabbIntersects(this.wall, target.getBody())) {
                console.log("COLISION CON PARED");
                resolvePenetrationKart(target, this, 0.1);
                target.setCrashed(this);
                
            }
        
        }
    }
}
