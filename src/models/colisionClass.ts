import { PowerUp } from "../powerUps";
import { Shuriken } from "../shuriken";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";
import { Kart } from "../kart";

export type CollisionClassName = Kart | PowerUp | Shuriken | TrafficCone | Walls;
export type Proyectils = Shuriken;
export type ReflectObjects = Kart | Shuriken;
export type StaticObjects = Walls;