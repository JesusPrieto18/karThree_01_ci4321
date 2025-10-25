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
      plane1.position.set(0, 1.1, 0);
      plane1.rotation.x = Math.PI / 2;
      //plane1.add(new THREE.AxesHelper(2));
      this.body.add(plane1); // Arriba

      let gemetriP2 = new THREE.PlaneGeometry(1, 1);
      let materialP2 = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
      let plane2 = new THREE.Mesh(gemetriP2, materialP2);
      plane2.position.set(0, 0.1, 0);
      plane2.rotation.x = Math.PI / 2;
      //plane2.add(new THREE.AxesHelper(2));
      this.body.add(plane2); // Abajo

      let gemetriP3 = new THREE.PlaneGeometry(1, 1);
      let materialP3 = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
      let plane3 = new THREE.Mesh(gemetriP3, materialP3);
      plane3.position.set(0.5, 0.6, 0);
      plane3.rotation.y = Math.PI / 2;
      //plane3.add(new THREE.AxesHelper(2));
      this.body.add(plane3); // Derecha

      let gemetriP4 = new THREE.PlaneGeometry(1, 1);
      let materialP4 = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
      let plane4 = new THREE.Mesh(gemetriP4, materialP4);
      plane4.position.set(-0.5, 0.6, 0);
      plane4.rotation.y = -Math.PI/2;
      //plane4.add(new THREE.AxesHelper(2));
      this.body.add(plane4); // Izquierda
      //this.body.add(mesh);
      
      let gemetriP5 = new THREE.PlaneGeometry(1, 1);
      let materialP5 = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
      let plane5 = new THREE.Mesh(gemetriP5, materialP5);
      plane5.position.set(0, 0.6, 0.5);
      plane5.rotation.y = 0;
      //plane5.add(new THREE.AxesHelper(2));
      this.body.add(plane5); // frente

      let gemetriP6 = new THREE.PlaneGeometry(1, 1);
      let materialP6 = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
      let plane6 = new THREE.Mesh(gemetriP6, materialP6);
      plane6.position.set(0, 0.6, -0.5);
      plane6.rotation.y = Math.PI;
      //plane6.add(new THREE.AxesHelper(2));
      this.body.add(plane6); // atras
      
      
      // Crear el color para las barras
      let colorBar = 0x9D432C;

    
      let gemetriC1 = new THREE.BoxGeometry(0.2, 1.2, 0.2);
      let materialC1 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube1 = new THREE.Mesh(gemetriC1, materialC1);
      cube1.position.set(0.5, 0.6, 0.5);
      this.body.add(cube1); // esquina delantera derecha
      
      let gemetriC2 = new THREE.BoxGeometry(0.2, 1.2, 0.2);
      let materialC2 = new THREE.MeshStandardMaterial({ color: colorBar});
      let cube2 = new THREE.Mesh(gemetriC2, materialC2);
      cube2.position.set(-0.5, 0.6, 0.5);
      this.body.add(cube2); // esquina delantera izquierda

      let gemetriC3 = new THREE.BoxGeometry(0.2, 1.2, 0.2);
      let materialC3 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube3 = new THREE.Mesh(gemetriC3, materialC3);
      cube3.position.set(0.5, 0.6, -0.5);
      this.body.add(cube3); // esquina trasera derecha

      let gemetriC4 = new THREE.BoxGeometry(0.2, 1.2, 0.2);
      let materialC4 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube4 = new THREE.Mesh(gemetriC4, materialC4);
      cube4.position.set(-0.5, 0.6, -0.5);
      this.body.add(cube4); // esquina trasera izquierda

      let gemetriC5 = new THREE.BoxGeometry(1.2, 0.2, 0.2);
      let materialC5 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube5 = new THREE.Mesh(gemetriC5, materialC5);
      cube5.position.set(0, 1.1, 0.5);
      this.body.add(cube5); // arriba frente

      let gemetriC6 = new THREE.BoxGeometry(1.2, 0.2, 0.2);
      let materialC6 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube6 = new THREE.Mesh(gemetriC6, materialC6);
      cube6.position.set(0, 1.1, -0.5);
      this.body.add(cube6); // arriba atras
      
      let gemetriC7 = new THREE.BoxGeometry(0.2, 0.2, 1.2);
      let materialC7 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube7 = new THREE.Mesh(gemetriC7, materialC7);
      cube7.position.set(0.5, 1.1, 0);
      this.body.add(cube7); // arriba derecha
      
      let gemetriC8 = new THREE.BoxGeometry(0.2, 0.2, 1.2);
      let materialC8 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube8 = new THREE.Mesh(gemetriC8, materialC8);
      cube8.position.set(-0.5, 1.1, 0);
      this.body.add(cube8); // arriba izquierda

      let gemetriC9 = new THREE.BoxGeometry(1.2, 0.2, 0.2);
      let materialC9 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube9 = new THREE.Mesh(gemetriC9, materialC9);
      cube9.position.set(0, 0.1, 0.5);
      this.body.add(cube9); // abajo frente

      let gemetriC10 = new THREE.BoxGeometry(1.2, 0.2, 0.2);
      let materialC10 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube10 = new THREE.Mesh(gemetriC10, materialC10);
      cube10.position.set(0, 0.1, -0.5);
      this.body.add(cube10); // abajo atras

      let gemetriC11 = new THREE.BoxGeometry(0.2, 0.2, 1.2);
      let materialC11 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube11 = new THREE.Mesh(gemetriC11, materialC11);
      cube11.position.set(0.5, 0.1, 0);
      this.body.add(cube11); // abajo derecha

      let gemetriC12 = new THREE.BoxGeometry(0.2, 0.2, 1.2);
      let materialC12 = new THREE.MeshStandardMaterial({ color: colorBar });
      let cube12 = new THREE.Mesh(gemetriC12, materialC12);
      cube12.position.set(-0.5, 0.1, 0);
      this.body.add(cube12); // abajo izquierda

      let colorCruz = 0xff7f50;

      let gemetriX1 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX1 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX1 = new THREE.Mesh(gemetriX1, materialX1);
      cubeX1.position.set(0.5, 0.6, 0);
      cubeX1.rotateX(Math.PI/4);
      this.body.add(cubeX1); // lado derecho

      let gemetriX1_2 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX1_2 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX1_2 = new THREE.Mesh(gemetriX1_2, materialX1_2);
      cubeX1_2.position.set(0.5, 0.6, 0);
      cubeX1_2.rotateX(-Math.PI/4);
      this.body.add(cubeX1_2); // lado derecho

      let gemetriX2 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX2 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX2 = new THREE.Mesh(gemetriX2, materialX2);
      cubeX2.position.set(-0.5, 0.6, 0);
      cubeX2.rotateX(Math.PI/4);
      this.body.add(cubeX2); // lado izquierdo

      let gemetriX2_2 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX2_2 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX2_2 = new THREE.Mesh(gemetriX2_2, materialX2_2);
      cubeX2_2.position.set(-0.5, 0.6, 0);
      cubeX2_2.rotateX(-Math.PI/4);
      this.body.add(cubeX2_2); // lado izquierdo

      let gemetriX3 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX3 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX3 = new THREE.Mesh(gemetriX3, materialX3);
      cubeX3.position.set(0, 0.6, 0.5);
      cubeX3.rotateZ(Math.PI/4);
      this.body.add(cubeX3); // lado delantero

      let gemetriX3_2 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX3_2 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX3_2 = new THREE.Mesh(gemetriX3_2, materialX3_2);
      cubeX3_2.position.set(0, 0.6, 0.5);
      cubeX3_2.rotateZ(-Math.PI/4);
      this.body.add(cubeX3_2); // lado delantero

      let gemetriX4 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX4 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX4 = new THREE.Mesh(gemetriX4, materialX4);
      cubeX4.position.set(0, 0.6, -0.5);
      cubeX4.rotateZ(Math.PI/4);
      this.body.add(cubeX4); // lado trasero

      let gemetriX4_2 = new THREE.BoxGeometry(0.1, 1.2, 0.1);
      let materialX4_2 = new THREE.MeshStandardMaterial({ color: colorCruz });
      let cubeX4_2 = new THREE.Mesh(gemetriX4_2, materialX4_2);
      cubeX4_2.position.set(0, 0.6, -0.5);
      cubeX4_2.rotateZ(-Math.PI/4);
      this.body.add(cubeX4_2); // lado trasero

      this.body.position.y += 0.2
      this.body.scale.set(0.9, 0.9, 0.9);
    }

    public getBody(): THREE.Group {
      return this.body;
    }
    public setPosition(x: number, y: number, z: number): void {
      this.body.position.set(x, y, z);
    }   


}