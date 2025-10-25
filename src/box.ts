import * as THREE from 'three';
export class Box {
    private body: THREE.Group = new THREE.Group();
    private name?: string; 
    
    constructor(name?: string) {
      this.name = name;

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0.5; // Para que esté sobre el suelo

      let gemetriP1 = new THREE.PlaneGeometry(1, 1);
      let materialP1 = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
      let plane1 = new THREE.Mesh(gemetriP1, materialP1);
      plane1.position.set(0, 1, 0);
      plane1.rotation.x = Math.PI / 2;
      this.body.add(plane1);
      //this.body.add(mesh);


    }   

    public getBody(): THREE.Group {
      return this.body;
    }
    public setPosition(x: number, y: number, z: number): void {
      this.body.position.set(x, y, z);
    }   
}