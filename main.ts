import { scene, renderer, camera, initScene} from './src/scene.ts';
import { createRaceTrack } from './src/racetrack.ts';
import { createCoffee, createConeLine, createConeSquare, createFourWalls, createHeartCones, createKart, createMultiplePowerUpsRandom, createPowerUp, createTrafficCone, createUSB, createWall } from './src/utils/initializers.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';
import { animate } from './src/utils/animation.ts';

initScene();
createRaceTrack();
//createObstacles();
setupControls();
//createWall();
createFourWalls();
createFourWalls(20, 10, false);
//createTrafficCone();
createKart();   
//createPowerUp();
//createShuriken();
createMultiplePowerUpsRandom(20);
//createConeLine(16, -13, 0, 4, 'x', true); // 10 conos a lo largo del eje X
//createConeLine(16, 13, 0, 4, 'x', false); // 10 conos a lo largo del eje X
createUSB();
createHeartCones();
createConeSquare(10, 0, 0, 60, 4);
createConeSquare(30, 0, 0, 125, 4);
createCoffee();
animate(performance.now());


