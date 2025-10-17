import * as THREE from 'three';
import { scene } from './scene';
import { Shuriken } from './shuriken';
import { Box } from './box';

export class PowerUp {
    private powerUp = new THREE.Group();
    private box?: Box;
    private shuriken?: Shuriken;
    private shuriken2?: Shuriken;
    private shuriken3?: Shuriken;
    private bomb?: undefined;
    //private player?: THREE.Mesh ;

    constructor() {
        this.box = new Box();
        this.powerUp.add(this.box.mesh);
        scene.add(this.powerUp);
    }

    public oneShuriken():void {
      
    } 

    public twoShurikens():void {
         
    }
    
    public threeShurikens():void {
    }

    public bombPowerUp():void {
       
    }

    
}
