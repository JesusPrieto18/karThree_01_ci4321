import { PowerUp } from "../powerUps";
import { Kart } from "../kart";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";
import { collisionObserver } from "./colliding";
import { USB } from "../usb";
import { Coffee } from "../coffee";

// Initializacion
export let kart: Kart;
export let listPowerUps: PowerUp[] = [];
export let trafficCones: TrafficCone[] = []; // <-- nueva lista para conos
export let decorators: any[] = []; // <-- nueva lista para decoradores

export function createKart(): void {
  kart = new Kart();
  kart.setZ(25);
  kart.setRotation(0, Math.PI, 0);
}

export function createPowerUp(): void {
  const pu = new PowerUp();
  pu.setPosition(0, 0, 10);
  listPowerUps.push(pu);
}

export function createTrafficCone(): void {
  const tc = new TrafficCone();
  tc.setZ(5);
  trafficCones.push(tc);

}

export function createWall(): void {
  const walls = new Walls();
}

export function createFourWalls(wallLengthParam: number = 150, wallHeightParam: number = 10, inside: boolean = true): void {

  const wall1 = new Walls(wallLengthParam, wallHeightParam); // Pared de arriba
  const wall2 = new Walls(wallLengthParam, wallHeightParam); // Pared de abajo
  const wall3 = new Walls(wallLengthParam, wallHeightParam); // Pared derecha
  const wall4 = new Walls(wallLengthParam, wallHeightParam); // Pared izquierda
  if (inside) {
    wall1.setPosition(0,0, -wall1.getLength()/2);
    wall2.setPosition(0,0, wall2.getLength()/2);
    wall3.setPosition(wall3.getLength()/2,0,0);
    wall4.setPosition(-wall4.getLength()/2,0,0);
  } else {
    wall1.setPosition(0,0, wall1.getLength()/2);
    wall2.setPosition(0,0, -wall2.getLength()/2);
    wall3.setPosition(-wall3.getLength()/2,0,0);
    wall4.setPosition(wall4.getLength()/2,0,0);
  }

  wall2.setRotation(0, Math.PI, 0);
  wall3.setRotation(0, -Math.PI/2, 0)
  wall4.setRotation(0, Math.PI/2, 0);

}

/**
 * Crea `count` PowerUps en posiciones aleatorias no repetidas dentro de [25,125] en X y Z.
 * Ajusta la altura Y según necesites (aquí se usa 0.5).
 */
export function createMultiplePowerUpsRandom(count = 10): void {
  const positions = generateUniquePositions(count, -75, 75);
  for (const pos of positions) {
    const pu = new PowerUp();
    pu.setPosition(pos.x, 0.5, pos.z); // ajustar Y si es necesario
    listPowerUps.push(pu);
  }
}

/**
 * Genera `count` posiciones únicas aleatorias en el rango [min, max] para X y Z.
 * Devuelve un array de objetos { x, z }.
 */
function generateUniquePositions(count: number, min = 25, max = 125): { x: number; z: number }[] {
  const set = new Set<string>();
  const out: { x: number; z: number }[] = [];
  const range = max - min + 1;
  if (count > range * range) throw new Error('Rango demasiado pequeño para posiciones únicas solicitadas');

  while (out.length < count) {
    const x = Math.round(Math.random() * (max - min) + min);
    const z = Math.round(Math.random() * (max - min) + min);
    const key = `${x},${z}`;
    if (!set.has(key)) {
      set.add(key);
      out.push({ x, z });
    }
  }
  return out;
}

/**
 * Crea una línea de `count` conos empezando en (startX, startZ),
 * separados por `spacing`. `axis` puede ser 'x' o 'z' indicando la dirección de la línea.
 * Si `reverse` es true la línea se extiende en sentido negativo del eje.
 * Devuelve el array de TrafficCone creados.
 */
export function createConeLine(
  count: number = 10,
  startX: number = 0,
  startZ: number = 0,
  spacing: number = 5,
  axis: 'x' | 'z' = 'x',
  reverse: boolean = false
): void {
  const dir = reverse ? -1 : 1;

  for (let i = 0; i < count; i++) {
    const tc = new TrafficCone();
    const offset = dir * i * spacing;
    if (axis === 'x') {
      tc.setX(startX + offset);
      tc.setZ(startZ);
    } else {
      tc.setX(startX);
      tc.setZ(startZ + offset);
    }
    trafficCones.push(tc);
  }

}

export function createUSB(): void {
  let usb = new USB();
  decorators.push(usb);
}

/**
 * Crea una serie de TrafficCone alineados formando un corazón.
 * count: número de conos (más = más preciso)
 * centerX, centerZ: centro del corazón en el plano XZ
 * scale: escala del dibujo (ajusta tamaño)
 */
export function createHeartCones(
  count: number = 60,
  centerX: number = 0,
  centerZ: number = 0,
  scale: number = 0.6
): void {
  // Parametrización clásica del corazón (plano 2D). t ∈ [0, 2π]
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    // ecuación paramétrica: x = 16 sin^3 t, y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
    const sx = Math.sin(t);
    const cx = Math.cos(t);
    const xRaw = 16 * Math.pow(sx, 3);
    const zRaw = 13 * cx - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    const x = centerX + xRaw * scale;
    const z = centerZ + zRaw * scale;

    const tc = new TrafficCone(false); // No colisión para decoración
    tc.setPosition(x, 0, z);
    trafficCones.push(tc);
  }
}

/**
 * Crea un cuadrado de conos centrado en (centerX, centerZ).
 * countPerSide: conos por lado (mínimo 2, incluye esquinas sin duplicar).
 * sideLength: longitud del lado del cuadrado.
 * y: altura para colocar los conos (por ejemplo 0).
 */
export function createConeSquare(
  countPerSide: number = 8,
  centerX: number = 0,
  centerZ: number = 0,
  sideLength: number = 20,
  y: number = 0
): void {
  const n = Math.max(2, Math.floor(countPerSide));
  const half = sideLength / 2;
  const spacing = sideLength / (n - 1);

  // genera posiciones a lo largo de los 4 lados (sin duplicar esquinas)
  const positions: { x: number; z: number }[] = [];

  // lado superior (izquierda -> derecha)
  for (let i = 0; i < n; i++) {
    positions.push({ x: centerX - half + i * spacing, z: centerZ - half });
  }
  // lado derecho (arriba -> abajo) excluye esquina superior
  for (let i = 1; i < n; i++) {
    positions.push({ x: centerX + half, z: centerZ - half + i * spacing });
  }
  // lado inferior (derecha -> izquierda) excluye esquina inferior derecha
  for (let i = 1; i < n; i++) {
    positions.push({ x: centerX + half - i * spacing, z: centerZ + half });
  }
  // lado izquierdo (abajo -> arriba) excluye esquina inferior izquierda y superior izquierda
  for (let i = 1; i < n - 1; i++) {
    positions.push({ x: centerX - half, z: centerZ + half - i * spacing });
  }

  for (const pos of positions) {
    const tc = new TrafficCone();
    tc.setX(pos.x);
    tc.setZ(pos.z);
    trafficCones.push(tc);
  }
}

export function createCoffee() {
  const coffee = new Coffee();
  coffee.setPosition(0, 0, 0);
}