import { scene, renderer, camera, initScene} from './src/scene.ts';
import { createRaceTrack } from './src/racetrack.ts';
import { createWalls } from './src/walls.ts';
import { createTrafficCone } from './src/trafficCone.ts';
import { createKart, createPowerUp } from './src/utils/initializers.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';
import { animate } from './src/utils/animation.ts';

initScene();
createRaceTrack();
//createObstacles();
setupControls();
//createWalls();
//createTrafficCone();
createKart();   
createPowerUp();
//createShuriken();

animate();


