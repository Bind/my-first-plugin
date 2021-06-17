import { html } from "htm/preact";
import { useState, useLayoutEffect, useEffect} from "preact/hooks"

import {Planet, LocationId} from "@darkforest_eth/types"
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
declare const df: GameManager;
declare const ui: GameUIManager;

let Spacing = {
  marginLeft: "12px",
  marginRight: "12px",
};
let VerticalSpacing = {
  marginBottom: "12px",
};
let HalfVerticalSpacing = {
  marginBottom: "6px",
};
let Clickable = {
  cursor: "pointer",
  textDecoration: "underline",
};
let ActionEntry = {
  marginBottom: "5px",
  display: "flex",
  justifyContent: "space-between",
  color: "",
};

function centerPlanet(id) {
  ui.centerLocationId(id);
}

function planetShort(locationId) {
  return locationId.substring(4, 9);
}

function Attack({ attack , onDelete }) {
  return html`
    <div  style=${ActionEntry}>
      <span>
        <span
          style=${{ ...Spacing, ...Clickable }}
          onClick=${() => centerPlanet(attack.srcId)}
          >${planetShort(attack.srcId)}</span
        >
        =>
        <span
          style=${{ ...Spacing, ...Clickable }}
          onClick=${() => centerPlanet(attack.targetId)}
          >${planetShort(attack.targetId)}</span
        ></span
      >
      <button onClick=${onDelete}>X</button>
    </div>
  `;
}

function AddAttack({ onCreate }) {
  let [planet, setPlanet] = useState<Planet| undefined>(ui.getSelectedPlanet());
  let [source, setSource] = useState<Planet| undefined>(undefined);
  let [target, setTarget] = useState<Planet| undefined>(undefined);
  useLayoutEffect(() => {
    let onClick = () => {
      setPlanet(ui.getSelectedPlanet());
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return html`
    <div style=${{ display: "flex" }}>
      <button style=${VerticalSpacing} onClick=${() => setSource(planet)}>
        Set Source
      </button>
      <span style=${{ ...Spacing, marginRight: "auto" }}
        >${source ? planetShort(source.locationId) : "?????"}</span
      >
      <button style=${VerticalSpacing} onClick=${() => setTarget(planet)}>
        Set Target
      </button>
      <span style=${{ ...Spacing, marginRight: "auto" }}
        >${target ? planetShort(target.locationId) : "?????"}</span
      >
      <button
        style=${VerticalSpacing}
        onClick=${() => target && source && onCreate(source.locationId, target.locationId)}
      >
        start
      </button>
    </div>
  `;
}

function AttackList({repeater}) {
  const [attacks, setAttacks] = useState(repeater.attacks);
  debugger;
  useEffect(() => {
    setAttacks(repeater.attacks);
  }, repeater.attacks.length);

  let actionList = {
    maxHeight: "70px",
    overflowX: "hidden",
    overflowY: "scroll",
  };

  let actionsChildren = attacks.map((action, index) => {
    return html`
      <${Attack}
        action=${action}
        onDelete=${() => {
          repeater.removeAttack(index);
        }}
      />
    `;
  });

  return html`
    <h1>Set-up a Recurring Attack</h1>
    <i style=${{ ...VerticalSpacing, display: "block" }}
      >Auto-attack when source planet >75% energy
    </i>
    <${AddAttack}
      onCreate=${(source: LocationId, target:LocationId) => repeater.addAttack(source, target)}
    />
    <h1 style=${HalfVerticalSpacing}>
      Recurring Attacks (${actionsChildren.length})
      <button
        style=${{ float: "right" }}
        onClick=${() => setAttacks([...repeater.attacks])}
      >
        refresh
      </button>
    </h1>
    <div style=${actionList}>
      ${actionsChildren.length ? actionsChildren : "No Actions."}
    </div>
  `;
}

export function App({repeater}) {
  return html`<${AttackList} repeater=${repeater} />`;
}
