import { PowerUp } from "../powerUps";
import { Shuriken } from "../shuriken";
import { TrafficCone } from "../trafficCone";
import { Walls } from "../walls";
import { Kart } from "../kart";
import { Bomb } from "../bomb";
import { Coffee } from "../coffee";
import type { RaceTrack } from "../RaceTrackClass";

export type CollisionClassName = Kart | PowerUp | Shuriken | TrafficCone | Walls | Bomb | RaceTrack;
export type Proyectils = Shuriken | Bomb;
export type ReflectObjects = Kart | Shuriken;
export type StaticObjects = Walls | TrafficCone;
export type Consumables = Coffee;