import { PowerUp } from "../powerUps";
import { Kart } from "../kart";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";
import { collisionObserver } from "./colliding";

// Initializacion
export let kart: Kart;
 
export function createKart(): void {
  kart = new Kart();

}

export function createPowerUp(): void {
  const pu = new PowerUp();

}

export function createTrafficCone(): void {
  const tc = new TrafficCone();
  tc.setZ(10)

}

export function createWall(): void {
  const walls = new Walls();
}

export function createFourWalls() {
  const wall1 = new Walls() // Pared de arriba
  const wall2 = new Walls() // Pared de abajo 
  const wall3 = new Walls() // Pared derecha
  const wall4 = new Walls() // Pared izquierda

  wall1.setPosition(0,0, -wall1.getLength()/2);
  wall2.setPosition(0,0, wall2.getLength()/2);
  wall3.setPosition(wall3.getLength()/2,0,0);
  wall4.setPosition(-wall4.getLength()/2,0,0);

  wall2.setRotation(0, Math.PI, 0);
  wall3.setRotation(0, -Math.PI/2, 0)
  wall4.setRotation(0, Math.PI/2, 0);

}