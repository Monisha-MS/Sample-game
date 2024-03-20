import { Button } from "@babylonjs/gui";
import { MeshBuilder } from "@babylonjs/core";
import config from "../config.json"

export function createOwnPlane(scene, height, width, positionCoordinates) {
  let plane = MeshBuilder.CreatePlane(
    "plane",
    { height: height, width: width },
    scene
  );
  plane.position = positionCoordinates;
  return plane;
}

export function createButton(buttonName, color) {
  let button = Button.CreateSimpleButton("but1", buttonName);
  button.width = config.button.width;
  button.height = config.button.height[1];
  button.fontSize = config.button.fontsize;
  button.color = "white";
  button.background = color;
  return button;
}
