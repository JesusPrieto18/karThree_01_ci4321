import * as THREE from "three";
import type { CollisionClassName, ReflectObjects, StaticObjects } from "../models/colisionClass";
import { Shuriken } from "../shuriken";

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

// Rotación de las ruedas según velocidad y radio
export function calculateWheelRotation(speed: number, radius: number, direction: number): number {
    return (speed / (radius * Math.PI * 2)) * direction;
}

export function getMovementDirectionWorld(obj: ReflectObjects): THREE.Vector3 {
  // Caso 1: el objeto tiene velocidad propia (proyectil)
  if (obj instanceof Shuriken) {
    const vel = obj.getVelocity(); // mundo
    if (vel.lengthSq() > 0.000001) {
      return vel.normalize();
    }
  }

  // Caso 2: fallback estilo kart (usa +Z del cuerpo)
  const body = obj.getBody();
  const forwardLocal = new THREE.Vector3(0, 0, 1);
  const qWorld = body.getWorldQuaternion(new THREE.Quaternion());
  return forwardLocal.applyQuaternion(qWorld).normalize();
}

export function getObjectForwardWorld(object: CollisionClassName): THREE.Vector3 {
  const body = object.getBody();
  const forwardLocal = new THREE.Vector3(0, 0, 1); // frente del kart
  const qWorld = body.getWorldQuaternion(new THREE.Quaternion());
  return forwardLocal.applyQuaternion(qWorld).normalize();
}

export function reflectDirection(reflectObject: ReflectObjects, staticObject: StaticObjects): THREE.Vector3 {
  
  const v = getMovementDirectionWorld(reflectObject).clone(); // dirección del que se mueve
  let n = getObjectForwardWorld(staticObject).clone();    // normal "frontal" de la pared

  // Asegurar que la normal esté enfrentando al objeto que llega.
  // Si la normal apunta más o menos en la MISMA dirección que v (dot > 0),
  // invertimos la normal, porque desde ese lado es la cara trasera de la pared.
  if (v.dot(n) > 0) {
    n.multiplyScalar(-1);
  }

  // Reflexión
  const dot = v.dot(n);
  return v.sub(n.multiplyScalar(2 * dot)).normalize();  
}

export function resolvePenetrationKart(reflect: ReflectObjects, staticObject: StaticObjects, strength = 0.05) {
  const staticNormalWorld = getObjectForwardWorld(staticObject); // la normal de la pared en mundo
  // posición mundial actual del objecto
  const worldPos = reflect.getBody().getWorldPosition(new THREE.Vector3());
  // empuja un poquito fuera
  worldPos.addScaledVector(staticNormalWorld, strength);
  // regresar a local del padre
  const parent = reflect.getBody().parent!;
  reflect.getBody().position.copy(parent.worldToLocal(worldPos.clone()));

}

export function resolvePenetrationProyectil(
  reflect: ReflectObjects,
  staticObject: StaticObjects,
  strength = 0.05
) {
  const body = reflect.getBody();

  // dirección de llegada real, no la rotación visual
  const v = getMovementDirectionWorld(reflect).clone();

  // normal de la pared
  let n = getObjectForwardWorld(staticObject).clone();

  // si la normal y el movimiento miran más o menos al mismo lado,
  // invertimos la normal para usar la cara adecuada
  if (v.dot(n) > 0) {
    n.multiplyScalar(-1);
  }

  // empuja ligeramente fuera
  const worldPos = body.getWorldPosition(new THREE.Vector3());
  worldPos.addScaledVector(n, strength);

  // volver a coords locales del padre
  const parent = body.parent!;
  body.position.copy(parent.worldToLocal(worldPos.clone()));
}
