import { Color4, Vector3, ParticleSystem, Texture } from "@babylonjs/core";
import config from "../config.json";

//importing colors and directional vectors from config
const colors = [];
for (const { r, g, b, a } of config.particles.colors) {
  const color = new Color4(r, g, b, a);
  colors.push(color);
}

const vectors = [];
for (const { x, y, z } of config.particles.dirVectors) {
  const vector = new Vector3(x, y, z);
  vectors.push(vector);
}

export const particles = (position) => {
  const particleSystem = new ParticleSystem(
    "particles",
    config.particles.capacity
  );

  particleSystem.particleTexture = new Texture("Images/flare.png");

  particleSystem.color1 = colors[0];
  particleSystem.color2 = colors[1];
  particleSystem.colorDead = colors[2];
  particleSystem.minSize = config.particles.size[0];
  particleSystem.maxSize = config.particles.size[1];
  particleSystem.minLifeTime = config.particles.lifetime[0];
  particleSystem.maxLifeTime = config.particles.lifetime[1];
  particleSystem.emitRate = config.particles.emitrate;
  particleSystem.gravity = vectors[0];
  particleSystem.direction1 = vectors[1];
  particleSystem.direction2 = vectors[2];
  particleSystem.minAngularSpeed = config.particles.angularspeed[0];
  particleSystem.maxAngularSpeed = config.particles.angularspeed[1];
  particleSystem.minEmitPower = config.particles.emitpower[0];
  particleSystem.maxEmitPower = config.particles.emitpower[0];
  particleSystem.updateSpeed = config.particles.updatespeed;
  particleSystem.emitter = position;

  particleSystem.start();

  particleSystem.targetStopDuration = 0.6;

  return particleSystem;
};
