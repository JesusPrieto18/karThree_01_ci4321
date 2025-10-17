import * as THREE from 'three';

export class Colliding {
    public box: THREE.Box3;

    constructor(mesh: THREE.Mesh) {
        this.box = new THREE.Box3().setFromObject(mesh);
    }

    public update(mesh: THREE.Mesh): void {
        this.box.setFromObject(mesh);
    }
}
