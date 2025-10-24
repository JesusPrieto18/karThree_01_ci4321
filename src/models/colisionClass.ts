import { PowerUp } from "../powerUps";
import { Shuriken } from "../shuriken";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";
import { Kart } from "../kart";
import { Bomb } from "../bomb";

export type CollisionClassName = Kart | PowerUp | Shuriken | TrafficCone | Walls | Bomb;
export type Proyectils = Shuriken | Bomb;
export type ReflectObjects = Kart | Shuriken;
export type StaticObjects = Walls;