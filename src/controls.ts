import { kart } from './utils/initializers';
import { calculateWheelRotation} from './utils/utils';
import { camera } from './scene.ts';

const keys: Record<string, boolean> = {};
let speed = 0;
const maxSpeed = 0.1;
const turnSpeed = 0.04;
let steeringAngle = 0;
const maxSteering = 0.185// límite de giro
const steeringSpeed = 0.03; // velocidad de giro 
let cameraMode: number = 0;
let rMode: number = 0; // 0: tercera persona, 1: primera persona
let godMode: boolean = false;

export function setupControls(): void {
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);
  window.addEventListener('keypress', function (e) {
    if (e.key === 'c' || e.key === 'C') {
      cameraMode = (cameraMode + 1) % 2; // Alternar entre 0 y 1
      changeCameraPosition(cameraMode, rMode);
    }
  });
  window.addEventListener('keypress', e => {
    if (e.key === 'b' || e.key === 'B') {
      rMode = (rMode + 1) % 2; // Alternar entre 0 y 1
      changeCameraPosition(cameraMode, rMode);
    }
  });
  window.addEventListener('keypress', e => {
    if (e.key === 'g' || e.key === 'G') {
      console.log("Tecla G presionada");
      if (godMode) {
        console.log("GodMode desactivado");
      } else {
        console.log("GodMode activado");
      }
      godMode = !godMode;
    }
  });
}


export function updateControls(): void {
  // Acelerar / frenar
  if (keys['ArrowDown']) speed = Math.max(-maxSpeed/2, speed - 0.005);
  if (keys['ArrowUp']) speed = Math.min(maxSpeed, speed + 0.005);
  if (!keys['ArrowUp'] && !keys['ArrowDown']) speed *= 0.95;
  // Rotar sobre su eje
  if (keys['ArrowRight']) {steeringAngle = Math.max(steeringAngle - steeringSpeed, -maxSteering)
    if (keys['ArrowUp'] || keys['ArrowDown']) {
      kart.getBody().rotation.y -= turnSpeed * (speed / maxSpeed);
    }
  }
  if (keys['ArrowLeft']) {steeringAngle = Math.min(steeringAngle + steeringSpeed, maxSteering)
    if (keys['ArrowUp'] || keys['ArrowDown']) {
      kart.getBody().rotation.y += turnSpeed * (speed / maxSpeed);
    }
  }
  if (!keys['ArrowLeft'] && !keys['ArrowRight']) {
    steeringAngle *= 0.8; // Volver al centro gradualmente
  }

  // Lanzar shuriken
  if (keys[' ']) {
    kart.launchPowerUps();
    keys[' '] = false;
  }
  // GodMode - Lanzar shuriken sin límite
  if (godMode) {
    if (keys['0']) {
      kart.setPowerUps(0);
      keys['0'] = false;
    }
    if (keys['1']) {
      kart.setPowerUps(1);
      keys['1'] = false;
    }
    if (keys['2']) {
      kart.setPowerUps(2);
      keys['2'] = false;
    } 
    if (keys['3']) {
      kart.setPowerUps(3);
      keys['3'] = false;
    }

    if (keys['4']) {
      kart.setPowerUps(4);
      keys['4'] = false;
    }
    if (keys['5']) {
      kart.setPowerUps(5);
      keys['5'] = false;
    }
    if (keys['6']) {
      kart.setPowerUps(6);
      keys['6'] = false;
    }
    
    if (keys['-']) {
      kart.clearPowerUps();
    }
  }
  kart.getBody().position.x += Math.sin(kart.getBody().rotation.y) * speed;
  kart.getBody().position.z += Math.cos(kart.getBody().rotation.y) * speed;
  //console.log("MOVIENDO KART");
  
  
  kart.getWheelsFrontAxis().children.forEach((wheel) => {
    const rotationDirection = 1;
    const radius = wheel.userData.radius ?? 0.3; // Default to 0.3 if not set
    wheel.rotation.x += calculateWheelRotation(speed, radius, rotationDirection); // radius es el radio de la rueda
  });
  kart.getWheelsBackAxis().children.forEach((wheel) => {
    const rotationDirection = 1;
    const radius = wheel.userData.radius ?? 0.3; // Default to 0.3 if not set
    wheel.rotation.x += calculateWheelRotation(speed, radius, rotationDirection); // radius es el radio de la rueda
  });
  // Girar las ruedas delanteras, se llaman back porque se usa de referencia las coordenadas de la pantalla
  kart.getWheelsBackAxis().rotation.y = steeringAngle;
  /** 
  // Actualizar la posición de la cámara según el modo seleccionado
  changeCameraPosition(cameraMode, rMode);
  if (cameraMode === 0) {
    camera.lookAt(kart.getKart().position);
  }
  */
}

const changeCameraPosition = (cameraMode: number | undefined, rMode: number | undefined) => {
  if (cameraMode === 0) {
    // Vista tercera persona (detrás del kart.getKart())
    const distanceBehind = 3;
    const height = 2;
    if (rMode === 0) {
      camera.position.x = kart.getBody().position.x - Math.sin(kart.getBody().rotation.y) * distanceBehind;
      camera.position.z = kart.getBody().position.z - Math.cos(kart.getBody().rotation.y) * distanceBehind;
      camera.position.y = kart.getBody().position.y + height;
    }else if (rMode === 1) {
      camera.position.x = kart.getBody().position.x + Math.sin(kart.getBody().rotation.y) * distanceBehind ;
      camera.position.z = kart.getBody().position.z + Math.cos(kart.getBody().rotation.y) * distanceBehind ;
      camera.position.y = kart.getBody().position.y + height;
    }
  } else if (cameraMode === 1) {
    const height = 1.5;
    const forwardOffset = 0.2;
    camera.position.x = kart.getBody().position.x + Math.sin(kart.getBody().rotation.y) * forwardOffset;
    camera.position.z = kart.getBody().position.z + Math.cos(kart.getBody().rotation.y) * forwardOffset;
    camera.position.y = kart.getBody().position.y + height;
    if (rMode === 0) {
      // Vista primera persona (dentro del kart.getKart())
      camera.rotation.y = kart.getBody().rotation.y + Math.PI;
    }else if (rMode === 1) {
      camera.rotation.y = kart.getBody().rotation.y;
    }
    // Interpolación de rotación - paralela al kart.getKart()
    camera.rotation.x = 0;
    camera.rotation.z = 0;
  }
}










