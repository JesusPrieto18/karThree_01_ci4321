import { scene, renderer, camera, initScene, animate} from './src/scene.ts';
import { createKart } from './src/kart.ts';
import { createRaceTrack } from './src/racetrack.ts';
import { createWalls } from './src/walls.ts';
import { createTrafficCone } from './src/trafficCone.ts';
import { createPowerUp } from './src/utils/utils.ts';
import { setupControls, updateControls} from './src/controls.ts';
import { createObstacles } from './src/obstacles.ts';

initScene();
createKart();
createRaceTrack();
//createObstacles();
setupControls();
createWalls();
//createTrafficCone();
createPowerUp();
//createShuriken();

animate();
