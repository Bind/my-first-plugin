import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;
/**
 * Remember, you have access these globals:
 * 1. df - Just like the df object in your console.
 * 2. ui - For interacting with the game's user interface.
 *
 * Let's log these to the console when you run your plugin!
 */

console.log(df, ui);

class Plugin {
  constructor() {}

  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container) {}

  /**
   * Called when plugin modal is closed.
   */
  destroy() {}
}

/**
 * And don't forget to export it!
 */
export default Plugin;
