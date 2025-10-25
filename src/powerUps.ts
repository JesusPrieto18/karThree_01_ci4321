import * as THREE from 'three';
import { scene } from './scene';
import { Box } from './box';
import { aabbIntersects } from './utils/utils';
import { collisionObserver } from './utils/colliding';
import { kart } from './utils/initializers';
import type { CollisionClassName } from './models/colisionClass';
import { Kart } from './kart';

export class PowerUp {
    private powerUp = new THREE.Group();
    private box: Box;
    //private car?: THREE.Group = kart.getBody();
    constructor() {
        this.box = new Box();
        this.powerUp.add(this.box.getBody());
        scene.add(this.powerUp);
        collisionObserver.addColisionObject(this);
        //console.log(this.car);
    }

    public getBody(): THREE.Group {
        return this.powerUp;
    }
    
    public setPowerUp():void {
        const x = Math.round(Math.random() * 2);
        //const x = 3;
        kart.setPowerUps(x);
        console.log(x);
    } 

    public setPosition(x: number, y: number, z: number): void { 
        this.powerUp.position.set(x, y, z);
    }
    
    public animate(): void {
      //this.box.getBody().rotation.x += 0.01;
      this.box.getBody().position.y = Math.sin(Date.now() * 0.002) * 0.5 + 0.55;
      this.box.getBody().rotation.y += 0.01;
    }
    
    public isColliding(object: CollisionClassName): void {
        if (object instanceof Kart && aabbIntersects(object.getBody(), this.box.getBody())) {
            console.log("COLISION CON POWER UP");
            this.setPowerUp();
            scene.remove(this.powerUp);
            collisionObserver.removeColisionObject(this);
        }
    }

}
