import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { TextBlock } from "@babylonjs/gui";
import { Button3D } from "@babylonjs/gui";
import { Vector3, AbstractMesh } from "@babylonjs/core";
import { particles } from "../Game_Environment/particles";
import {
  currentRollScoreBoardDisplay,
  overallScoreBoardDisplay,
} from "./renderScoreBoard";
import config from "../config.json"


//updates the current roll and overall score after every roll for each player
export const updateGameScores = (game) => {
  const currentRollScore = game.gameScoreCalculation();
  const overallScore = game.totalScoreCalculation();
  currentRollScoreBoardDisplay.updateText(
    "Attempt - " + (game.currentFrameIndex + 1).toString()
  );
  //checks whether the player has hit all the pins -- if so '!!!Strike!!!' is displayed
  if (
    game.entireFrames[game.currentPlayerIndex][game.currentFrameIndex].bonus ===
    "strike"
  ) {
    particles(new Vector3(config.particles.position.x, config.particles.position.y, config.particles.position.z));
    particles(new Vector3(-config.particles.position.x, config.particles.position.y, config.particles.position.z));
    currentRollScoreBoardDisplay.appendText("\n!!!Strike!!!");
  }
  currentRollScoreBoardDisplay.appendText(
    "\nCurrent: " + currentRollScore.toString()
  );
  overallScoreBoardDisplay.updateText(
    game.players[game.currentPlayerIndex] +
      "\nOverall: " +
      overallScore.toString()
  );
};

export function scoreBoardGUI(scene, positionCoordinates, visibility, value) {
  let anchor = new AbstractMesh("anchor", scene);
  let manager = new GUI3DManager(scene);
  let display = new Button3D("reset");

  manager.addControl(display);
  display.linkToTransformNode(anchor);
  display.position = positionCoordinates;
  display.scaling = new Vector3(config.scorecard.scaling.x, config.scorecard.scaling.y, config.scorecard.scaling.z);
  display.isVisible = visibility;
  display.color = config.scorecard.color[0];

  let textContent = new TextBlock();
  textContent.text = value;
  textContent.color = config.scorecard.color[1];
  textContent.fontSize = config.scorecard.fontsize;
  display.content = textContent;

  //Helps to update the value of Display Dynamically
  display.updateText = function (newValue) {
    textContent.text = newValue;
  };
  //Helps to append the value with the existing Display value
  display.appendText = function (addValue) {
    textContent.text += addValue;
  };
  return display;
}
