import { scene, renderer, camera, initScene} from './src/scene.ts';
import { createRaceTrack } from './src/racetrack.ts';
import { createFourWalls, createKart, createPowerUp, createTrafficCone, createWall } from './src/utils/initializers.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';
import { animate } from './src/utils/animation.ts';

initScene();
createRaceTrack();
//createObstacles();
setupControls();
//createWall();
createFourWalls();
//createTrafficCone();
createKart();   
//createPowerUp();
//createShuriken();

animate();


