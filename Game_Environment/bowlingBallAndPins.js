import {
  Vector3,
  PhysicsAggregate,
  PhysicsShapeType,
  InstancedMesh,
} from "@babylonjs/core";
import config from "../config.json" assert { type: "json" };

//creating bowling ball and adding physics
export const createBowlingBall = (bowlingBallResult, scene) => {
  const bowling_ball = bowlingBallResult.meshes[1];
  bowling_ball.scaling = new Vector3(
    config.ball.scaling[0],
    config.ball.scaling[1],
    config.ball.scaling[2]
  );
  bowling_ball.position = new Vector3(
    config.ball.position[0],
    config.ball.position[1],
    config.ball.position[2]
  );

  const bowling_aggregator = new PhysicsAggregate(
    bowling_ball,
    PhysicsShapeType.SPHERE,
    {
      mass: config.ball.mass,
      restitution: config.ball.restitution,
      friction: config.ball.friction,
    },
    scene
  );
  bowling_aggregator.body.disablePreStep = false;
  bowling_aggregator.body.setCollisionCallbackEnabled(true);
  return [bowling_ball, bowling_aggregator];
};

//creating bowling pins and adding physics
export const createBowlingPins = (bowlingPinResult, scene) => {
  const bowlingPin = bowlingPinResult.meshes[1];
  bowlingPin.scaling = new Vector3(
    config.pin.scaling[0],
    config.pin.scaling[1],
    config.pin.scaling[2]
  );
  bowlingPin.isVisible = false;

  const pinPositions = [];

  for (const { x, y, z } of config.pin.positions) {
    const position = new Vector3(x, y, z);
    pinPositions.push(position);
  }

  const setPins = pinPositions.map(function (position, idx) {
    const pin = new InstancedMesh("pin-" + idx, bowlingPin);
    pin.position = position;
    const pinAggregate = new PhysicsAggregate(
      pin,
      PhysicsShapeType.CONVEX_HULL,
      {
        mass: config.pin.mass,
        restitution: config.pin.restitution,
        friction: config.pin.friction,
      },
      scene
    );
    pinAggregate.body.setCollisionCallbackEnabled(true);
    return pin;
  });
  return setPins;
};
