import * as THREE from 'three';
import type { CollisionClassName } from '../models/colisionClass';

export class Colliding {
    private colisionObjects: CollisionClassName[] = [];
    private colisionDetected: CollisionClassName[] = [];

    public addColisionObject(object: CollisionClassName): void {
        this.colisionObjects.push(object);
    }

    public removeColisionObject(object: CollisionClassName): void {
        const index = this.colisionObjects.indexOf(object);
        if (index !== -1) {
            this.colisionObjects.splice(index, 1);
        }
    }
    
    public checkCollision(): void {
        for (let i = 0; i < this.colisionObjects.length; i++) {
            const objA = this.colisionObjects[i];
            objA.isColliding();

        }
    }


}

export const collisionObserver = new Colliding();