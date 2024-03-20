import {
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Texture,
  PhysicsAggregate,
  PhysicsShapeType,
} from "@babylonjs/core";
import config from "../config.json";

//defining the position of main lane, side lanes and protecting lanes
const positions = [];
for (const { x, y, z } of config.lane.positions) {
  const position = new Vector3(x, y, z);
  positions.push(position);
}

//bowling lane creation

export const createBowlingLane = () => {
  //main lane creation and physics
  const lane = MeshBuilder.CreateBox("lane", {
    width: config.lane.width[0],
    height: config.lane.height[0],
    depth: config.lane.depth,
  });
  lane.position = positions[0];
  const laneMat = new StandardMaterial("lane-material");
  laneMat.diffuseTexture = new Texture("Images/Neon-bowling-floor.jpg");
  lane.material = laneMat;

  const laneAggregate = new PhysicsAggregate(lane, PhysicsShapeType.BOX, {
    mass: config.lane.mass,
  });

  //creating side lanes
  const laneLeft = MeshBuilder.CreateBox("sideLane", {
    width: config.lane.width[1],
    height: config.lane.height[1],
    depth: config.lane.depth,
  });

  laneLeft.position = positions[1];

  const laneLeftMat = new StandardMaterial("lane-material");
  laneLeftMat.diffuseTexture = new Texture("Images/Neon-floor.jpg");
  laneLeft.material = laneLeftMat;

  const laneRight = MeshBuilder.CreateBox("sideLane", {
    width: config.lane.width[1],
    height: config.lane.height[1],
    depth: config.lane.depth,
  });

  laneRight.position = positions[2];

  const laneRightMat = new StandardMaterial("lane-material");
  laneRightMat.diffuseTexture = new Texture("Images/Neon-floor.jpg");
  laneRight.material = laneRightMat;

  //Adding invisible planes at the sides of bowling lane to prevent pins and balls from leaving the lane.
  const laneProtector1 = new MeshBuilder.CreatePlane("laneProtector", {
    height: config.lane.height[2],
    width: config.lane.width[2],
  });
  laneProtector1.position = positions[3];
  laneProtector1.rotation.y = -config.lane.rotation;
  laneProtector1.isVisible = false;

  const laneProtector1Agg = new PhysicsAggregate(
    laneProtector1,
    PhysicsShapeType.BOX,
    {
      mass: config.lane.mass,
      restitution: config.lane.restitution,
    }
  );

  const laneProtector2 = new MeshBuilder.CreatePlane("laneProtector", {
    height: config.lane.height[2],
    width: config.lane.width[2],
  });
  laneProtector2.position = positions[4];
  laneProtector2.rotation.y = config.lane.rotation;
  laneProtector2.isVisible = false;

  const laneProtector2Agg = new PhysicsAggregate(
    laneProtector2,
    PhysicsShapeType.BOX,
    {
      mass: config.lane.mass,
      restitution: config.lane.restitution,
    }
  );

  return lane;
};
