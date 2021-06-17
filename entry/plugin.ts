import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
import { App } from "src/view";
import { html, render } from "htm/preact";

declare global {
  interface Window {
    __CORELOOP__: number[];
  }
}

declare const df: GameManager;
declare const ui: GameUIManager;

import { Repeater } from "../src/core";
class Plugin {
  repeater: Repeater;
  container: HTMLDivElement | undefined;
  root: void;
  stop() {
    window.__CORELOOP__.forEach((id) => window.clearInterval(id));
  }
  constructor() {
    this.repeater = new Repeater();
    this.root = undefined;
  }

  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container: HTMLDivElement) {
    this.container = container;
    container.style.width = "380px";
    this.root = render(html`<${App} repeater=${this.repeater} />`, container);
  }

  /**
   * Called when plugin modal is closed.
   */
  destroy() {
    window.__CORELOOP__.forEach((id) => window.clearInterval(id));
    if (this.container) render(html`<div></div>`, this.container);
  }
}

/**
 * And don't forget to export it!
 */
export default Plugin;
