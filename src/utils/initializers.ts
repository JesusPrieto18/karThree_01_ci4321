import { PowerUp } from "../powerUps";
import { Kart } from "../kart";
// Initializacion
export let kart: Kart; 
export function createKart(): void {
  kart = new Kart();

}

export function createPowerUp(): void {
  const pu = new PowerUp();

}
