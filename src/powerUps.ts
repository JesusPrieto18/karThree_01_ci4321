import * as THREE from 'three';
import { scene } from './scene';
import { Shuriken } from './shuriken';
import { Box } from './box';
import { aabbIntersects } from './utils/utils';
export class PowerUp {
    private powerUp = new THREE.Group();
    private box: Box;
    private shuriken?: Shuriken;
    private shuriken2?: Shuriken;
    private shuriken3?: Shuriken;
    private bomb?: undefined;
    private car: THREE.Mesh ;

    constructor() {
        this.box = new Box();
        this.powerUp.add(this.box.mesh);
        scene.add(this.powerUp);
        this.car = scene.getObjectByName('kart') as THREE.Mesh;
        //console.log("Estoy en caja:" + this.car.position.x);
    }
    
    public oneShuriken():void {
      
    } 

    public twoShurikens():void {
         
    }
    
    public threeShurikens():void {
    }

    public bombPowerUp():void {
       
    }

    public isColliding(): boolean {
        if (aabbIntersects(this.car, this.box.mesh)) {
            console.log("COLISION CON POWER UP");
            return true;
        }
        return false;
    }

}
