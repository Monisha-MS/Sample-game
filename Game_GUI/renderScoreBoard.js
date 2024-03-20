import { Vector3 } from "@babylonjs/core";
import { scoreBoardGUI } from "./scoreBoard";
import config from "../config.json"

export let overallScoreBoardDisplay;
export let currentRollScoreBoardDisplay;

export function renderScoreBoard(scene) {
  let scoreBoardpositionCoordinates = new Vector3(-config.scorecard.position.x, config.scorecard.position.y, config.scorecard.position.z);
  overallScoreBoardDisplay = scoreBoardGUI(
    scene,
    scoreBoardpositionCoordinates,
    false,
    "ScoreBoard"
  );

  let scoreBoardValuepositionCoordinates = new Vector3(config.scorecard.position.x, config.scorecard.position.y, config.scorecard.position.z);
  currentRollScoreBoardDisplay = scoreBoardGUI(
    scene,
    scoreBoardValuepositionCoordinates,
    false,
    "Current Score"
  );
}
