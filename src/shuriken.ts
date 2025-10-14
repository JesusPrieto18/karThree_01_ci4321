import * as THREE from 'three';
import { scene } from './scene';

export let shuriken: THREE.Mesh;

export function createShuriken(): void {
    const vertices = new Float32Array([
        3, 1, 3,   // v0 |esquina inferior derecha C1
        -3, 1, 3,   // v1 |esquina inferior izquierda C1
        3, 1, -3,   // v2 |esquina superior derecha C1
        -3, 1, -3,   // v3 | esquina superior derecha C1

        2, 1, 2,   // v4 | esquina inferior derecha C2
         2, 1, -2,   // v5 | esquina superior derecha C2
        -2, 1, -2,   // v6 | esquina superior izquierda C2
        -2, 1, 2,   // v7 | esquina inferior izquierda C2

        3, 1, 2,   // v8 | Derecha de v4
        2, 1, 3,    // v9 | Abajo de v4
        3, 1, -2,   // v10 | Derecha de v5
        2, 1, -3,   // v11 | Arriba de v5
        -2, 1, -3,  // v12 | Arriba de v6
        -3, 1, -2,  // v13 | Izquierda de v6
        -3, 1, 2,   // v14 | Izquierda de v7
        -2, 1, 3,   // v15 | Abajo de v7

        1,1,1,   // v16 | Esquina inferior derecha C3
        1,1,-1,  // v17 | Esquina superior derecha C3
        -1,1,-1, // v18 | Esquina superior izquierda C3
        -1,1,1,   // v19 | Esquina inferior izquierda C3

        1.5,1,0, // v20 | Mediana entre V16 y V17
        0,1,1.5, // v21 | Mediana entre V16 y V19
        -1.5,1,0, // v22 | Mediana entre V18 y V19
        0,1,-1.5, // v23 | Mediana entre V17 y V18

        2, 1, 1,   // v24 | Arriba de v4
        1, 1, 2,   // v25 | Izquierda de v4
        2, 1, -1,  // v26 | Abajo de v5
        1, 1, -2,  // v27 | Izquierda de v5
        -1, 1, -2, // v28 | Derecha de v6
        -2, 1, -1, // v29 | Abajo de v6
        -2, 1, 1,  // v30 | Arriba de v7
        -1, 1, 2,  // v31 | Derecha de v7

        3,1,-6,  // v32 | Punta Arriba
        6,1,3,   // v33 | Punta Derecha
        -3,1,6,  // v34 | Punta Abajo
        -6,1,-3, // v35 | Punta Izquierda

        3,1,0,  // v36 | Centro Derecha
        0,1,3,  // v37 | Centro Abajo
        -3,1,0, // v38 | Centro Izquierda
        0,1,-3, // v39 | Centro Arriba
    ]);

    const faces = [
        9,8,0,    // C1
        4,8,9,       // C1

        1,14,15,  // C2
        14,7,15,   // C2    

        2,10,11,  // C3
        10,5,11,   // C3

        3,12,13,  // C4
        12,6,13,   // C4

        7,4,15, // R1-5
        15,4,9, // R1-5

        13,6,14, // R2-6
        14,6,7, // R2-6

        12,11,6, // R3-7
        6,11,5, // R3-7

        5,10,4, // R4-8
        4,10,8, // R4-8

        27,5,17, // C9
        17,5,26, // C9

        16,24,25, // C10
        25,24,4,  // C10

        30,19,7, // C11
        7,19,31, // C11

        6,28,29, // C12
        29,28,18, // C12

        29,22,30, // Estrella izquierda
        28,27,23, // Estrella arriba
        20,26,24, // Estrella derecha
        31,21,25, // Estrella abajo

        39,32,2, // Punta arriba
        36,33,0, // Punta derecha
        1,37,34, // Punta abajo
        35,3,38, // Punta izquierda        
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(faces);
    geometry.computeVertexNormals(); // para que reciba luz

    const material = new THREE.MeshStandardMaterial({ color: 0x33ffcc, side: THREE.DoubleSide });
    shuriken = new THREE.Mesh(geometry, material);
    scene.add(shuriken);

}