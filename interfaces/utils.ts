import {
  LocationId,
  ArtifactId,
  EthAddress,
  Player,
  Artifact,
  Planet,
  LocatablePlanet,
  PlanetLevel,
  UpgradeBranchName,
  WorldLocation,
  WorldCoords,
  Biome,
  SpaceType,
  PlanetType,
  QueuedArrival,
  Upgrade,
  Conversation,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedActivateArtifact,
} from "@darkforest_eth/types";
export interface RevealCountdownInfo {
  myLastRevealTimestamp?: number; // if undefined, never revealed before
  currentlyRevealing: boolean; // true iff player has an unconfirmedReveal currently being processed
  revealCooldownTime: number; // in seconds
}
export type HashConfig = {
  planetHashKey: number;
  spaceTypeKey: number;
  biomebaseKey: number;
  perlinLengthScale: number; // power of two up to 8192
  perlinMirrorX: boolean;
  perlinMirrorY: boolean;
};

export enum MiningPatternType {
  Home,
  Target,
  Spiral,
  Cone,
  Grid,
  ETH,
  SwissCheese,
}
export type Wormhole = {
  from: LocationId;
  to: LocationId;
};

export interface MiningPattern {
  type: MiningPatternType;
  fromChunk: Rectangle;
  nextChunk: (prevLoc: Rectangle) => Rectangle;
}

export type Callback<T> = (o: T) => void;

export type Subscription = {
  unsubscribe: () => void;
};
export interface Radii {
  radiusWorld: number;
  radiusPixels: number;
}

export interface Rectangle {
  bottomLeft: WorldCoords;
  sideLength: number;
}
export class ExploredChunkData {
  chunkFootprint: Rectangle;
  planetLocations: WorldLocation[];
  perlin: number; // approximate avg perlin value. used for rendering
}

export type Monomitter<T> = {
  publish: (o: T) => void;
  subscribe: (cb: Callback<T>) => Subscription;
  clear: () => void;
};
