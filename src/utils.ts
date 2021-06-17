import { Planet } from "@darkforest_eth/types";

export const getUnconfirmedDepartingForces = (planet: Planet): number => {
  return planet.unconfirmedDepartures.reduce((acc, dep) => {
    return acc + dep.forces;
  }, 0);
};

export function planetCurrentPercentEnergy(planet): number {
  const unconfirmedDepartures = planet.unconfirmedDepartures.reduce(
    (acc, dep) => {
      return acc + dep.forces;
    },
    0
  );
  const FUZZY_ENERGY = Math.floor(planet.energy - unconfirmedDepartures);
  return Math.floor((FUZZY_ENERGY / planet.energyCap) * 100);
}
