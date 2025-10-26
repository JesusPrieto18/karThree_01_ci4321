# karThree_01_ci4321
Un pequeño prototipo 3D desarrollado con **Three.js** que simula un kart con físicas simples, colisiones, power-ups y proyectiles (como bombas y shurikens).  
Desarrollado por Jesús Prieto y Jesús Cuéllar **The Yisus Team** en la materia **CI4321 Computación Gráfica I** de la Universidad Simón Bólivar.

---

## Instalación y ejecución
Seguir las instrucciones y ejecutar el comando correspondiente.
### 1. Clonar el repositorio y entrar al directorio
- 1. Clonar el repositorio:
```bash
git clone https://github.com/JesusPrieto18/karThree_01_ci4321.git
cd karThree_01_ci4321
```
- 2. Entrar al directorio:
```bash
cd karThree_01_ci4321
```
- Instalar git (Linux);
```bash
sudo apt-get update
sudo apt-get install git
```
- Instalar git (Windows):
Otras alternativas en:
https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalación-de-Git

### 2. Instalar dependencias
Asegúrate de tener **Node.js v18** o superior. (Si no lo tienes, descárgalo desde: https://nodejs.org)

```bash
npm install
```

### 4. Hacer el build del proyecto 
```bash
npm run build
```

### 5. Ejecutar
Ya sea en modo desarollo o directo. 
Para modo desarrollo se debe hacer el build.
- **Desarrollo**  
```bash
npm run dev
```
- **Directo**
```bash
npx vite
```
### 6. Abrir en el navegador
Por defecto el servidor se abre en  
http://localhost:5173

## Power-Ups y proyectiles

- **Shuriken**: Gira y avanza en línea recta hasta colisionar.  
- **Bomb**: Se lanza, cae con gravedad, tiene una mecha visual y explota tras 3 segundos o al tocar el suelo, parades o conos.
- **Cafe**: Da energia y aumenta la aceleración del carro por aproximadamente 2 segundos. 

---

## Cámaras

El juego soporta **dos modos de cámara**:
1. **Tercera persona** (detrás del kart)
2. **Primera persona** (desde dentro del kart mirando el horizonte)

Se alternan con la tecla `C`.

---

## Controles

| Tecla | Acción |
|-------|--------|
| **Flecha arriba** | Acelerar |
| **Flecha abajo**| Retroceder |
| **Flecha izquierda** | Girar a la izquierda |
| **Flecha derecha** | Girar a la derecha |
| **C** | Cambiar cámara |
| **B** | Alternar con vista reversa |
| **Espacio** | Usar PowerUp|

---

### Controles Modo God

| Tecla | Acción |
|-------|--------|
| **G** | Activar/Desactivar Modo Dios |
| **0** | Shuriken |
| **1**| Shuriken Doble |
| **2** |Shuriken Triple|
| **3** | Bomba |
| **4** | Cafe |
| **5** | Cafe Doble |
| **6** | Cafe Triple |
|**Minus (-)**| Elimina el PowerUp Cargado para elegir otro |
---

## Sistema de colisiones

El proyecto usa un **Collision Observer** central que mantiene una lista de objetos registrables (`CollisionClassName`):

- Cada objeto (`Kart`, `Walls`, `Bomb`, etc.) implementa `isColliding(target)`.
- El observador compara todos los pares y llama el método respectivo si sus AABB se intersectan.
- Ejemplo:
  ```ts
  if (aabbIntersects(bomb, wall)) {
    bomb.explode()};
      
  ```

---
## Arquitectura

``` bash 
|── node_modules
src/
│
├── models/
│  ├── colisionClass #Contiene las Clases que colisionan 
├── utils/ #Diferentes utilidades para facilitar ciertos procesos
    ├── animation.ts
    ├── cameraControls.ts
    ├── colliding.ts #Aquí esta la logica para el patro Observer usado para colisones
    ├── initializers.ts
    ├── animation.ts
│ ├── bomb.ts # Clase Bomb → proyectil con gravedad y temporizador de explosión
│ ├── box.ts # Genera cajas u obstáculos simples en la pista
│ ├── coffee.ts # Power-up tipo “café” que otorga velocidad
│ ├── controls.ts # Manejo de teclas y controles del jugador (movimiento, disparo, cámara)
│ ├── kart.ts # Clase principal del Kart (posición, rotación, animación, lanzamiento de power-ups)
│ ├── obstacles.ts # Gestión de obstáculos en la pista
│ ├── powerUps.ts # Manejo de objetos recogibles y su lógica (activar, girar, lanzar)
│ ├── racetrack.ts # Crea la pista principal del juego
│ ├── RaceTrackClass.ts # Clase RaceTrack → encapsula la pista y sus interacciones (colisiones, suelo)
│ ├──  scene.ts # Configura la escena principal de Three.js (luz, cámara, render)
│ ├── shuriken.ts # Clase Shuriken → proyectil giratorio
│ ├── shurikenInfo.ts # Datos de geometría (vértices y colores) del shuriken
│ ├── trafficCone.ts # Clase TrafficCone → obstáculo tipo cono con colisión
│ ├── usb.ts 
│ ├── walls.ts # Clase Walls → muros y límites de la pista
│
|── .gitignore 
|── index.html 
|── LICENSE # Licencia Creativa Libre (MIT)
|── main.ts # Punto de entrada del juego (crea escena, inicia loop principal, renderiza)
|── package-lock.json 
|── package.json
|── README.md
|── style.css
|── tsconfig.json 
```
## Tecnologías usadas
- ThreeJS
- TypeScript
- Vite
- NodeJS