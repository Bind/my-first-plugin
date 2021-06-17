import { LocationId } from "@darkforest_eth/types";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
import {
  getUnconfirmedDepartingForces,
  planetCurrentPercentEnergy,
} from "../src/utils";

declare const df: GameManager;
declare const ui: GameUIManager;

interface Attack {
  srcId: LocationId;
  targetId: LocationId;
}

// I use `let` here to sidestep any weird execution env problems
let PERCENTAGE_TRIGGER = 75;
let PERCENTAGE_SEND = 45;

export class Repeater {
  public attacks: Attack[];
  intervalId: number;

  constructor() {
    if (typeof window.__CORELOOP__ == "undefined") {
      //setup append only interval id storage
      window.__CORELOOP__ = [];
    } else {
      //clear out old intervald
      console.log("KILLING PREVIOUS INTERVALS");
      window.__CORELOOP__.forEach((id) => window.clearInterval(id));
    }
    this.attacks = [];
    this.intervalId = window.setInterval(this.coreLoop.bind(this), 15000);
    window.__CORELOOP__.push(this.intervalId);
  }

  addAttack(srcId, targetId) {
    this.attacks.push({ srcId, targetId } as Attack);
  }
  removeAttack(position) {
    this.attacks.splice(position, 1);
  }

  coreLoop() {
    this?.attacks?.forEach((a) => {
      Attack(a.srcId, a.targetId);
    });
  }
}

export const Attack = (srcId: LocationId, targetId: LocationId) => {
  let srcPlanet = df.getPlanetWithId(srcId);
  if (!srcPlanet) {
    // Well shit
    return;
  }
  const unconfirmedDepartures = getUnconfirmedDepartingForces(srcPlanet);
  const TRIGGER_AMOUNT = Math.floor(
    (srcPlanet.energyCap * PERCENTAGE_TRIGGER) / 100
  );
  const FUZZY_ENERGY = Math.floor(srcPlanet.energy - unconfirmedDepartures); //Best estimate of how much energy is ready to send
  if (FUZZY_ENERGY > TRIGGER_AMOUNT) {
    const overflow_send =
      planetCurrentPercentEnergy(srcPlanet) -
      (PERCENTAGE_TRIGGER - PERCENTAGE_SEND);

    const FORCES = Math.floor((srcPlanet.energyCap * overflow_send) / 100);
    df.move(srcId, targetId, FORCES, 0);
  }
};
