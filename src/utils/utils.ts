import * as THREE from "three";
import { PowerUp } from "../powerUps";

// ---------- utilidades ----------
export function solidWithWire(
  geometry: THREE.BufferGeometry,
  color: number,
  transparent = true,
  wireColor = 0x111111,
): THREE.Group {
  const group = new THREE.Group();

  const solid = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, metalness: 0.1, roughness: 0.6 })
  );

  if (transparent) {

    // wireframe superpuesto (misma geometría, distinto material)
    const wire = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: wireColor, wireframe: true, depthTest: false })
    );
    wire.scale.set(1.001, 1.001, 1.001);
    group.add(solid, wire);

  } else {
    group.add(solid);
  }
  return group;
}

function ensureBoundingBox(mesh: THREE.Mesh) {
  if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
}

function worldAABB(mesh: THREE.Mesh): THREE.Box3 {
  ensureBoundingBox(mesh);
  // boundingBox es inmutable; hay que copiar y transformar
  return new THREE.Box3().copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);
}

export function aabbIntersects(a: THREE.Mesh, b: THREE.Mesh) {
  const boxA = worldAABB(a);
  const boxB = worldAABB(b);
  return boxA.intersectsBox(boxB);
}
// Initializacion

export function createPowerUp(): void {
  const pu = new PowerUp();

}