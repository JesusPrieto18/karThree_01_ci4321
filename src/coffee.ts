import * as THREE from 'three';
import { solidWithWire } from './utils/utils';
import { scene } from './scene';

export class Coffee {   
    private coffeeMesh: THREE.Group = new THREE.Group();
    constructor() {
        const cupGeometry = new THREE.CylinderGeometry(1, 1, 1.5, 32);
        const cupColor = 0xffffff;
        const cup = solidWithWire(cupGeometry, cupColor, false);
        cup.position.y = 1.5 / 2;

        const handleGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 100, Math.PI);
        const handle = solidWithWire(handleGeometry, cupColor, false);
        handle.position.set(1, 1.5 / 2, 0);
        handle.rotation.z = -Math.PI / 2;

        const coffeeGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 32);
        const coffeeColor = 0x6f4e37; // Brown color for coffee
        const coffee = solidWithWire(coffeeGeometry, coffeeColor, false);
        coffee.position.y = 1.41; // Slightly below the top of the cup

        this.coffeeMesh.add(cup);
        this.coffeeMesh.add(handle);
        this.coffeeMesh.add(coffee);
        
        this.coffeeMesh.scale.set(0.35, 0.35, 0.35); // Scale up the coffee cup
        scene.add(this.coffeeMesh);
    }

    public getBody(): THREE.Group {
        return this.coffeeMesh;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.coffeeMesh.position.set(x, y, z);
    }

    public setX(x: number): void {
        this.coffeeMesh.position.x = x;
    }

    public setY(y: number): void {
        this.coffeeMesh.position.y = y;
    }
    
    public setZ(z: number): void {
        this.coffeeMesh.position.z = z;
    }
}