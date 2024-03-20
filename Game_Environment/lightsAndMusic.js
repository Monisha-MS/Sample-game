import { Vector3, HemisphericLight, PointLight, Sound } from "@babylonjs/core";
import config from "../config.json";

//positions of the light
const positions = [];
for (const { x, y, z } of config.light.positions) {
  const position = new Vector3(x, y, z);
  positions.push(position);
}

export const createLights = () => {
  const light = new HemisphericLight("light", positions[0]);
  light.intensity = config.light.intensity[0];

  const roofLight = new PointLight("roofLight", positions[1]);
  roofLight.intensity = config.light.intensity[1];
};
//Adding scene music
export const createGameMusic = (scene) => {
  const music = new Sound("Music", "./Audio/stranger_things.mp3", scene, null, {
    loop: true,
    autoplay: true,
  });
};
//Adding roll and hit music
export const createRollSound = () => {
  window.globalShootmusic = new Sound(
    "rollMusic",
    "./Audio/rollingball.mp3",
    null,
    {
      loop: false,
      autoplay: false,
    }
  );
  window.globalHitMusic = new Sound("hitMusic", "./Audio/hit.mp3", null, {
    loop: false,
    autoplay: false,
  });
};
