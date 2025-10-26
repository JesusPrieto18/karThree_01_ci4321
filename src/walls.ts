import * as THREE from 'three';
import { aabbIntersects, solidWithWire, resolvePenetrationKart } from './utils/utils';
import { scene } from './scene';
import { collisionObserver } from './utils/colliding';
import { Kart } from './kart';
import type { CollisionClassName } from './models/colisionClass';

/**
 * Walls - simple rectangular wall obstacle used in the scene.
 *
 * Responsibilities / workflow:
 *  - Construct a thin box-shaped wall mesh and add it to the scene.
 *  - Register itself in the global collision observer so other objects (Kart, projectiles)
 *    can be tested against it each frame.
 *  - Expose helpers for positioning, sizing and reacting to collisions.
 *
 * Implementation notes:
 *  - The wall is built as a THREE.Group returned by solidWithWire for consistent styling.
 *  - When a Kart collides with the wall, penetration is resolved and the kart receives
 *    a speed penalty and a 'crashed' notification.
 */
export class Walls { 
    // Root group that represents the wall in the scene
    private wall: THREE.Group;
    // Wall dimensions and thickness
    private wallThickness: number;
    private wallHeight: number;
    private wallLength: number;

    /**
     * Constructor - create wall geometry and register for collisions.
     * @param length wall length along X axis
     * @param height wall height (Y)
     * @param thickness wall thickness (Z)
     */
    constructor(length: number = 10 , height: number = 2, thickness: number = 0.05) {
        this.wallHeight = height;
        this.wallThickness = thickness;
        this.wallLength = length;

        // Build a thin box geometry to represent the wall
        const wallGeometry1 = new THREE.BoxGeometry(this.wallLength, this.wallHeight, this.wallThickness);
        const wallColor = 0x506468; // neutral color for walls (was Spanish comment)
        this.wall = solidWithWire(wallGeometry1, wallColor, false);
        // Add a small axes helper to visualize orientation during debugging
        //this.wall.add(new THREE.AxesHelper(3));

        // Add the wall to the scene and register it for collision checks
        scene.add(this.wall);
        collisionObserver.addColisionObject(this);
    }

    /** setPosition - set the world position of the wall group */
    public setPosition(x: number, y: number, z: number): void {
        this.wall.position.set(x, y, z);
    }

    /** getLength - returns configured wall length */
    public getLength(): number {
        return this.wallLength;
    }

    /** getHeight - returns configured wall height */
    public getHeight(): number {
        return this.wallHeight;
    }
    
    /** getThickness - returns configured wall thickness */
    public getThickness(): number {
        return this.wallThickness;
    }

    /** getBody - return the THREE.Group used for collision/scene operations */
    public getBody(): THREE.Group {
        return this.wall;
    }

    /** setRotation - set the wall orientation in world space */
    public setRotation(x: number, y: number, z: number): void {
        this.wall.rotation.set(x, y, z);
    }

    /**
     * isColliding - collision callback used by the collision system.
     *
     * Behavior:
     *  - When a Kart collides with the wall, resolve penetration so the kart is not stuck,
     *    apply a speed penalty and mark the kart as crashed by this obstacle.
     *
     * @param target object being tested against this wall (expected Kart or other types)
     */
    public isColliding(target: CollisionClassName): void {
        if (target instanceof Kart) {
            if (aabbIntersects(this.wall, target.getBody())) {
                console.log("COLLISION WITH WALL");
                // Resolve overlap between the kart and the wall to prevent sticking.
                resolvePenetrationKart(target, this, 0.01);
                // Apply a speed penalty to the kart (use decimal point, not comma)
                target.speed *= 0.5;
            }
        }
    }
}