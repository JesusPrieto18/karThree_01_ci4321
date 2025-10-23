import { PowerUp } from "../powerUps";
import { Kart } from "../kart";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";

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

}

export function createWalls(): void {
  const walls = new Walls();
}