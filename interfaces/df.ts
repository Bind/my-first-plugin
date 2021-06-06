import {
  EthAddress,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedActivateArtifact,
  SpaceType,
  Planet,
  PlanetLevel,
  QueuedArrival,
  LocatablePlanet,
  LocationId,
  Upgrade,
  Player,
  ArtifactId,
  WorldCoords,
  Artifact,
  RevealedLocation,
  WorldLocation,
} from "@darkforest_eth/types";
import {
  Monomitter,
  ExploredChunkData,
  Radii,
  MiningPattern,
  Rectangle,
  RevealCountdownInfo,
  Wormhole,
  HashConfig,
} from "./utils";
import { EventEmitter } from "events";

/*
DOES NOT INCLUDE ALL METHODS
*/
export interface GameManager extends EventEmitter {
  terminal: any;
  account: any;
  players: Map<String, Player>;
  contractsAPI: any;
  persistentChunkStorage: any;
  snarkHelper: any;
  entityStore: any;
  useMockHash: boolean;
  contractConstants: any;
  endTimeSeconds: number; // jan 2022
  ethConnection: any;
  hashConfig: any;
  planetHashMimc: (...inputs: number[]) => BigInteger;
  uiStateStorageManager: any;
  balance: number;

  myBalance$: Monomitter<number>;
  balanceInterval: ReturnType<typeof setInterval>;
  minerManager?: any;
  hashRate: number;
  homeLocation: WorldLocation | undefined;
  worldRadius: number;
  gptCreditPriceEther: number;
  gptCreditPriceEtherEmitter$: Monomitter<number>;
  myGPTCredits: number;
  myGPTCredits$: Monomitter<number>;
  getEthConnection: () => any;
  create: Promise<GameManager>;
  destroy: () => void;
  hardRefreshPlayer: (address: EthAddress) => Promise<void>;
  hardRefreshPlanet: (locationId: LocationId) => Promise<void>;
  hardRefreshArtifact: (artifactId: ArtifactId) => Promise<void>;
  bulkHardRefreshPlanets: (planetIds: LocationId[]) => Promise<void>;
  refreshMyGPTCredits: () => Promise<void>;
  onTxIntentFail: (txIntent: any, e: Error) => void;
  setUIDataItem: (key: any, value: any) => void;
  getUIDataItem: (key: any) => any;
  getGptCreditPriceEmitter: () => Monomitter<number>;
  getGptCreditBalanceEmitter: () => Monomitter<number>;
  getAccount: () => EthAddress | undefined;
  getContractAddress: () => EthAddress;
  getTwitter: (address: EthAddress | undefined) => string | undefined;
  getEndTimeSeconds: () => number;
  getPlanetRarity: () => number;
  getEnergyCurveAtPercent: (planet: Planet, percent: number) => number;
  getSilverCurveAtPercent: (
    planet: Planet,
    percent: number
  ) => number | undefined;
  getUpgrade: (branch: number, level: number) => Upgrade;
  getAllPlayers: () => Player[];
  getExploredChunks: () => Iterable<ExploredChunkData>;
  getPlanetsInWorldRectangle: (
    worldX: number,
    worldY: number,
    worldWidth: number,
    worldHeight: number,
    levels: number[],
    planetLevelToRadii: Map<number, Radii>,
    updateIfStale: boolean
  ) => LocatablePlanet[];
  getWorldRadius: () => number;
  getWorldSilver: () => number;
  getUniverseTotalEnergy: () => number;
  getSilverOfPlayer: (player: EthAddress) => number;
  getEnergyOfPlayer: (player: EthAddress) => number;
  getWithdrawnSilverOfPlayer: (addr: EthAddress) => number;
  initMiningManager: (homeCoords: WorldCoords) => void;
  setMiningPattern: (pattern: MiningPattern) => void;
  getMiningPattern: () => MiningPattern | undefined;
  setMinerCores: (nCores: number) => void;
  isMining: () => boolean;
  setSnarkCacheSize: (size: number) => void;
  getCurrentlyExploringChunk: () => Rectangle | undefined;
  hasJoinedGame: () => boolean;
  getNextRevealCountdownInfo: () => RevealCountdownInfo;
  // Auto do these
  getMyArtifacts: () => Artifact[];
  getPlanetWithCoords: (coords: WorldCoords) => Planet | undefined;
  getPlanetWithId: (planetId: LocationId | undefined) => Planet | undefined;
  getStalePlanetWithId: (planetId: LocationId) => Planet | undefined;
  getMyScore: () => number;
  getArtifactWithId: (artifactId: ArtifactId) => Artifact | undefined;
  getArtifactsWithIds: (
    artifactIds: ArtifactId[]
  ) => Array<Artifact | undefined>;
  getPlanetLevel: (planetId: LocationId) => PlanetLevel | undefined;
  getLocationOfPlanet: (planetId: LocationId) => WorldLocation | undefined;
  getAllVoyages: () => QueuedArrival[];
  getAllPlanets: () => Iterable<Planet>;
  getAllOwnedPlanets: () => Planet[];
  getMyPlanets: () => Planet[];
  getRevealedLocations: () => Map<LocationId, RevealedLocation>;
  spaceTypeFromPerlin: (perlin: number) => SpaceType;
  getHashesPerSec: () => number;
  getSignedTwitter: (twitter: string) => Promise<string>;
  getPrivateKey: () => string;
  getMyBalance: () => number;
  getMyBalanceEmitter: () => Monomitter<number>;
  getUnconfirmedMoves: () => UnconfirmedMove[];
  getUnconfirmedUpgrades: () => UnconfirmedUpgrade[];
  getUnconfirmedWormholeActivations: () => UnconfirmedActivateArtifact[];
  getWormholes: () => Iterable<Wormhole>;
  getHomeCoords: () => WorldCoords | undefined;
  getHomeHash: () => LocationId | undefined;
  getHashConfig: () => HashConfig;
  hasMinedChunk: (chunkLocation: Rectangle) => boolean;
  getChunk: (chunkFootprint: Rectangle) => ExploredChunkData | undefined;
  getChunkStore: () => any;
  getPerlinThresholds: () => [number, number, number];
  startExplore: () => void;
  stopExplore: () => void;
  setRadius: (worldRadius: number) => void;
  checkGameHasEnded: () => boolean;
  getNextBroadcastAvailableTimestamp: () => number;
  revealLocation: (planetId: LocationId) => GameManager;
  joinGame: (beforeRetry: (e: Error) => Promise<boolean>) => GameManager;
  locationFromCoords: (coords: WorldCoords) => WorldLocation;
  addAccount: (coords: WorldCoords) => Promise<boolean>;
  getRandomHomePlanetCoords: () => Promise<WorldLocation>;
  prospectPlanet: (planetId: LocationId, bypassChecks: boolean) => any;
  findArtifact: (planetId: LocationId, bypassChecks: boolean) => GameManager;
  getContractConstants: () => any;
  depositArtifact: (
    locationId: LocationId,
    artifactId: ArtifactId,
    bypassChecks: boolean
  ) => GameManager;
  withdrawArtifact: (
    locationId: LocationId,
    artifactId: ArtifactId,
    bypassChecks: boolean
  ) => GameManager;
  activateArtifact: (
    locationId: LocationId,
    artifactId: ArtifactId,
    wormholeTo: LocationId | undefined,
    bypassChecks?: boolean
  ) => GameManager;
  withdrawSilver: (
    locationId: LocationId,
    amount: number,
    bypassChecks?: boolean
  ) => GameManager;
  move: (
    from: LocationId,
    to: LocationId,
    forces: number,
    silver: number,
    artifactMoved?: ArtifactId,
    bypassChecks?: boolean
  ) => GameManager;
  upgrade: (
    planetId: LocationId,
    branch: number,
    _bypassChecks: boolean
  ) => GameManager;
  transferOwnership: (
    planetId: LocationId,
    newOwner: EthAddress,
    bypassChecks: boolean
  ) => GameManager;
  buyGPTCredits: (amount: number) => GameManager;
  handleTxIntent: (txIntent: any) => void;
  addNewChunk: (chunk: ExploredChunkData) => GameManager;
  bulkAddNewChunks: (chunks: ExploredChunkData[]) => Promise<void>;
  getMaxMoveDist: (planetId: LocationId, sendingPercent: number) => number;
  getDist: (fromId: LocationId, toId: LocationId) => number;
  getDistCoords: (fromCoords: WorldCoords, toCoords: WorldCoords) => number;
  getPlanetsInRange: (planetId: LocationId, sendingPercent: number) => Planet[];
  getEnergyNeededForMove: (
    fromId: LocationId,
    toId: LocationId,
    arrivingEnergy: number
  ) => number;
  getEnergyArrivingForMove: (
    fromId: LocationId,
    toId: LocationId | undefined,
    distance: number | undefined,
    sentEnergy: number
  ) => number;
  getActiveArtifact: (planet: Planet) => Artifact | undefined;
  getWormholeFactors: (
    fromPlanet: Planet,
    toPlanet: Planet
  ) => { distanceFactor: number; speedFactor: number } | undefined;
  getTimeForMove: (fromId: LocationId, toId: LocationId) => number;
  getTemperature: (coords: WorldCoords) => number;
  isPlanetMineable: (p: Planet) => boolean;
  spaceTypePerlin: (coords: WorldCoords, floor: boolean) => number;
  biomebasePerlin: (coords: WorldCoords, floor: boolean) => number;
  getProcgenUtils: () => any;
  getUIEventEmitter: () => any;

  getNotificationsManager: () => any;

  /** Return a reference to the planet map */
  getPlanetMap: () => Map<LocationId, Planet>;

  /** Return a reference to the artifact map */
  getArtifactMap: () => Map<ArtifactId, Artifact>;

  /** Return a reference to the map of my planets */
  getMyPlanetMap: () => Map<LocationId, Planet>;

  /** Return a reference to the map of my artifacts */
  getMyArtifactMap: () => Map<ArtifactId, Artifact>;

  getPlanetUpdated$: () => Monomitter<LocationId>;

  getArtifactUpdated$: () => Monomitter<ArtifactId>;

  getMyPlanetsUpdated$: () => Monomitter<Map<LocationId, Planet>>;

  getMyArtifactsUpdated$: () => Monomitter<Map<ArtifactId, Artifact>>;
}
