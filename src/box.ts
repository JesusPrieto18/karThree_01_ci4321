import * as THREE from 'three';
export class Box {
    public mesh: THREE.Mesh;
    public name?: string; 
    
    constructor(name?: string) {
      this.name = name;
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.y = 0.5; // Para que esté sobre el suelo
      if (this.name) this.mesh.name = this.name;
    }   
    public setPosition(x: number, y: number, z: number): void {
      this.mesh.position.set(x, y, z);
    }   
}