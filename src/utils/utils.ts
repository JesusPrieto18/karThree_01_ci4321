import * as THREE from "three";

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

// Colisiones AABB

const localBoxCache = new WeakMap<THREE.BufferGeometry, THREE.Box3>();

function getLocalBox(mesh: THREE.Mesh): THREE.Box3 {
  const geo = mesh.geometry as THREE.BufferGeometry;
  let box = localBoxCache.get(geo);
  if (!box) {
    if (!geo.boundingBox) geo.computeBoundingBox();
    // guarda una copia inmutable de la caja local
    box = geo.boundingBox!.clone();
    localBoxCache.set(geo, box);
  }
  return box;
}

// Llamar si CAMBIAS vertices (attributes.position) de esa geometría:
function invalidateLocalBox(mesh: THREE.Mesh) {
  const geo = mesh.geometry as THREE.BufferGeometry;
  geo.computeBoundingBox();
  localBoxCache.set(geo, geo.boundingBox!.clone());
}

function worldAABB_Mesh(mesh: THREE.Mesh): THREE.Box3 {
  // copiar local y transformar al mundo
  return getLocalBox(mesh).clone().applyMatrix4(mesh.matrixWorld);
}

function worldAABB_Group(group: THREE.Group): THREE.Box3 {
  const out = new THREE.Box3();
  let hasAny = false;
  group.traverse(obj => {
    if ((obj as any).isMesh) {
      const w = worldAABB_Mesh(obj as THREE.Mesh);
      out.union(w);
      hasAny = true;
    }
  });
  return hasAny ? out : out.makeEmpty();
}

export function aabbIntersects(a: THREE.Object3D, b: THREE.Object3D) {
  // asegúrate de tener matrices al día
  a.updateMatrixWorld(true);
  b.updateMatrixWorld(true);

  const boxA = (a as any).isMesh ? worldAABB_Mesh(a as THREE.Mesh)
                                 : worldAABB_Group(a as THREE.Group);
  const boxB = (b as any).isMesh ? worldAABB_Mesh(b as THREE.Mesh)
                                 : worldAABB_Group(b as THREE.Group);

  return boxA.intersectsBox(boxB);
}

