import * as THREE from 'three';
import { scene } from './scene';
import { Box } from './box';
import { aabbIntersects } from './utils/utils';
import { collisionObserver } from './utils/colliding';
import { kart } from './utils/initializers';

export class PowerUp {
    private powerUp = new THREE.Group();
    private box: Box;
    private car: THREE.Group = kart.getKart();
    constructor() {
        this.box = new Box();
        this.powerUp.add(this.box.mesh);
        scene.add(this.powerUp);
        collisionObserver.addColisionObject(this);
        console.log(this.car);
    }
    
    public setPowerUp():void {
        //const x = Math.round(Math.random() * 3);
        const x = 0;
        kart.setPowerUps(x);
        console.log(x);
    } 

    public isColliding(): void {
        if (aabbIntersects(this.car, this.box.mesh)) {
            console.log("COLISION CON POWER UP");
            this.setPowerUp();
            scene.remove(this.powerUp);
            collisionObserver.removeColisionObject(this);
        }
    }

}
