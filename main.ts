import { scene, renderer, camera, initScene} from './src/scene.ts';
import { createConeLine, createConeSquare, createFourWalls, createHeartCones, 
         createKart, createMultiplePowerUpsRandom, createPowerUp, createTrafficCone, 
         createUSB, createRaceTrack } from './src/utils/initializers.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';
import { animate } from './src/utils/animation.ts';

initScene();
createRaceTrack();
setupControls();
createFourWalls();
createFourWalls(20, 10, false);
createKart();   
createMultiplePowerUpsRandom(20);
createUSB();
createHeartCones();
createConeSquare(10, 0, 0, 60, 4);
createConeSquare(30, 0, 0, 125, 4);
animate(performance.now());


