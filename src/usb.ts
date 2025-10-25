import * as THREE from 'three';
import { solidWithWire } from './utils/utils';
import { scene } from './scene';

export class USB {
    private usbMesh: THREE.Group = new THREE.Group();
    constructor() {
        const geometry = new THREE.BoxGeometry(2, 10, 1);
        const material_color = 0x0000ff;

        // Letra U
        let rightU = solidWithWire(geometry, material_color, false);
        rightU.position.y = 15;
        rightU.position.x = -8;
        this.usbMesh.add(rightU);

        let leftU = solidWithWire(geometry, material_color, false);
        leftU.position.y = 15;
        leftU.position.x = -14;
        this.usbMesh.add(leftU);

        const geometry1 = new THREE.BoxGeometry(6, 2, 1);
        let baseU = solidWithWire(geometry1, material_color, false);
        baseU.position.y = 10;
        baseU.position.x = -11;
        this.usbMesh.add(baseU);

        // Letra S
        const geometry2 = new THREE.BoxGeometry(9, 2, 1);
        let topS = solidWithWire(geometry2, material_color, false);
        topS.position.y = 19;
        topS.position.x = 0;
        this.usbMesh.add(topS);

        let middleS = solidWithWire(geometry2, material_color, false);
        middleS.position.y = 14.5;
        middleS.position.x = 0;
        this.usbMesh.add(middleS);

        let bottomS = solidWithWire(geometry2, material_color, false);
        bottomS.position.y = 10;
        bottomS.position.x = 0;
        this.usbMesh.add(bottomS);

        const geometry3 = new THREE.BoxGeometry(2, 5, 1);
        let leftS = solidWithWire(geometry3, material_color, false);
        leftS.position.y = 16.75;
        leftS.position.x = -4.5;
        this.usbMesh.add(leftS);

        let rightS = solidWithWire(geometry3, material_color, false);
        rightS.position.y = 12.25;
        rightS.position.x = 4.5;
        this.usbMesh.add(rightS);

        // Letra B

        const geometry4 = new THREE.BoxGeometry(2, 10, 1);
        let leftB = solidWithWire(geometry4, material_color, false);
        leftB.position.y = 14.5;
        leftB.position.x = 8;
        this.usbMesh.add(leftB);
        
        const geometry5 = new THREE.BoxGeometry(6, 2, 1);
        let topB = solidWithWire(geometry5, material_color, false);
        topB.position.y = 19;
        topB.position.x = 11;
        this.usbMesh.add(topB);

        let middleB = solidWithWire(geometry5, material_color, false);
        middleB.position.y = 14.5;
        middleB.position.x = 11;
        this.usbMesh.add(middleB);

        let bottomB = solidWithWire(geometry5, material_color, false);
        bottomB.position.y = 10;
        bottomB.position.x = 11;
        this.usbMesh.add(bottomB);

        const geometry6 = new THREE.BoxGeometry(1, 2.8, 1);
        let innerRightBTop= solidWithWire(geometry6, material_color, false);
        innerRightBTop.position.y = 18;
        innerRightBTop.position.x = 14;
        this.usbMesh.add(innerRightBTop);

        let innerRightBTopMiddle = solidWithWire(geometry6, material_color, false);
        innerRightBTopMiddle.position.y = 17;
        innerRightBTopMiddle.position.x = 15;
        this.usbMesh.add(innerRightBTopMiddle);

        let innerRightBTopBottom = solidWithWire(geometry6, material_color, false);
        innerRightBTopBottom.position.y = 16;
        innerRightBTopBottom.position.x = 14;
        this.usbMesh.add(innerRightBTopBottom);

        let innerLeftBTop = solidWithWire(geometry6, material_color, false);
        innerLeftBTop.position.y = 12.25;
        innerLeftBTop.position.x = 14;
        this.usbMesh.add(innerLeftBTop);

        let innerLeftBBottomMiddle = solidWithWire(geometry6, material_color, false);
        innerLeftBBottomMiddle.position.y = 11.5;
        innerLeftBBottomMiddle.position.x = 15;
        this.usbMesh.add(innerLeftBBottomMiddle);

        let innerLeftBBottom = solidWithWire(geometry6, material_color, false);
        innerLeftBBottom.position.y = 11;
        innerLeftBBottom.position.x = 14;
        this.usbMesh.add(innerLeftBBottom);



        scene.add(this.usbMesh);

        
    }

    public setPosition(x: number, y: number, z: number): void {
        this.usbMesh.position.set(x, y, z);
    }

    public getPosition(): THREE.Vector3 {
        return this.usbMesh.position;
    }

    public animate(): void {
      this.usbMesh.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 0.55;
      this.usbMesh.rotation.y += 0.001;
    }
}