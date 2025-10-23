import type { CollisionClassName } from '../models/colisionClass';
import { Kart } from '../kart';
import { PowerUp } from '../powerUps';

export class Colliding {
    private colisionObjects: CollisionClassName[] = [];
    private objectsRemove: Set<CollisionClassName> = new Set();

    public addColisionObject(object: CollisionClassName): void {
        this.colisionObjects.push(object);
    }
    
    public removeColisionObject(object: CollisionClassName): void {
        const index = this.colisionObjects.indexOf(object);
        if (index !== -1) {
            this.colisionObjects.splice(index, 1);
        }
    }
    public addObjectToRemove(object: CollisionClassName): void {
        this.objectsRemove.add(object);
    }

    public removeSelectedObjects(): void {
        for (const obj of this.objectsRemove) {
            this.removeColisionObject(obj);
        }
        this.objectsRemove.clear();
    }

    public checkCollision(): void {
        for (let i = 0; i < this.colisionObjects.length; i++) {
            const objA = this.colisionObjects[i];
            //console.log(objA)
            if (objA instanceof PowerUp) {
                    objA.isColliding();
                    continue;
            }

            for (let j = 0; j < this.colisionObjects.length; j++) {
                if (i === j) continue;

                if (objA instanceof Kart) {
                    continue;
                }
                
                const objB = this.colisionObjects[j];
                objA.isColliding(objB);
            
            }
        }
        //console.log("detectando")
        this.removeSelectedObjects();
    }


}

export const collisionObserver = new Colliding();