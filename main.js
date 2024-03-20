


import { Engine, Scene, HavokPlugin, Vector3, UniversalCamera, SceneLoader, PointerEventTypes, KeyboardEventTypes} from "@babylonjs/core";
import "@babylonjs/loaders";

import { rollCollisionHandler } from "./Game_Logic/gameCollisionHandler";
import {
  pointerDown,
  pointerUp,
  pointerMove,
  ballMovement,
} from "./Game_Logic/ballMovementHandler";
import { shootBall, toggleTeleportation, angleToAim } from "./Game_Logic/motionControllerBallMovement";
import { createEnvironment } from "./Game_Environment/environment";
import {
  createLights,
  createGameMusic,
  createRollSound,
} from "./Game_Environment/lightsAndMusic";
import { createAnimations } from "./Game_Environment/animation";
import { createBowlingLane } from "./Game_Environment/bowlingLane";
import { createAim } from "./Game_Logic/aim";
import {
  createBowlingBall,
  createBowlingPins,
} from "./Game_Environment/bowlingBallAndPins";
import { renderScoreBoard } from "./Game_GUI/renderScoreBoard";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";
import config from "./config.json"
import { startMenuGUI } from "./Game_GUI/startMenuGUI";


const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas);

async function createScene() {
  const scene = new Scene(engine);
  

  const havokInstance = await HavokPhysics();
  const havokPlugin = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(new Vector3(config.gravity.x, config.gravity.y, config.gravity.z), havokPlugin);

  const camera = new UniversalCamera(
    "camera",
    new Vector3(config.camera.position.x, config.camera.position.y, config.camera.position.z)
  );
  camera.setTarget(Vector3.Zero());
  camera.inputs.clear();
  camera.attachControl();

  const bowlingPinResult = await SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb"
  );

  const bowlingBallResult = await SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_ball.glb"
  );

  const aim = createAim();
  aim.isVisible = false;
  let [bowling_ball, bowlingAggregate] = createBowlingBall(bowlingBallResult);
  aim.parent = bowling_ball;

  const ground=createEnvironment(scene);
  createLights();
  createGameMusic(scene);
  const lane = createBowlingLane();

  let setPins = createBowlingPins(bowlingPinResult);

  let ballMovementObjects = { bowling_ball, bowlingAggregate, setPins };
  let startingPoint;
  let currentMesh;

  const getPointerPosition = () => {
    const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
      return mesh == lane;
    });
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  };

  scene.onPointerObservable.add((pointerInfo) => {
    if (game.isGameStarted === true) {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
          if (
            pointerInfo.pickInfo.hit &&
            pointerInfo.pickInfo.pickedMesh == bowling_ball
          ) {
            aim.isVisible = true;
            [currentMesh, startingPoint] = pointerDown(
              pointerInfo.pickInfo.pickedMesh,
              getPointerPosition
            );
          }
          break;
        case PointerEventTypes.POINTERUP:
          aim.isVisible = false;
          [startingPoint, currentMesh] = pointerUp(
            startingPoint,
            aim,
            game,
            ballMovementObjects,
            bowlingPinResult,
            createBowlingPins,
            scene
          );
          break;
        case PointerEventTypes.POINTERMOVE:
          startingPoint = pointerMove(
            startingPoint,
            getPointerPosition,
            ballMovementObjects,
            aim,
            currentMesh
          );
          break;
      }
    }
  });

  // Create a new instance of StartGame with generalPins
  let game = new StartNewGame(setPins, config.game.players);
  // createAnimations(camera, scene, game);
  createRollSound();
  renderScoreBoard(scene);

  havokPlugin.onCollisionEndedObservable.add((ev) =>
    rollCollisionHandler(ev, scene, window, game)
  );

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case KeyboardEventTypes.KEYDOWN:
        ballMovement(bowling_ball, kbInfo.event.key);
    }
  });


  const xr = await scene.createDefaultXRExperienceAsync({
  
    floorMeshes: [ground] /* Array of meshes to be used as landing points */,
  });
  xr.teleportation.addFloorMesh(ground);



  function mapValue(value, fromMin, fromMax, toMin, toMax) {
    var normalizedValue = (value - fromMin) / (fromMax - fromMin);
    var mappedValue = normalizedValue * (toMax - toMin) + toMin;
    return mappedValue;
}

// xr.input.onControllerAddedObservable.add((controller) => {
//     controller.onMotionControllerInitObservable.add((motionController) => {
//         if (motionController.handness === 'right') {
//             let componentIds = motionController.getComponentIds();
//              let triggerComponent = motionController.getComponent("xr-standard-trigger");//xr-standard-trigger
//              let buttonComponent = motionController.getComponent("b-button");//y-button
//              let thumbStickComponent = motionController.getComponent("xr-standard-thumbstick");//xr-standard-thumbstick
//              let shootButtonComponent = motionController.getComponent("xr-standard-squeeze");//y-button
//              if(/* game.isGameStarted */ true){
//               buttonComponent.onButtonStateChangedObservable.add(()=>{
//                   if(buttonComponent.pressed){
//                     toggleTeleportation(xr);
//                   }
//               });
//               thumbStickComponent.onAxisValueChangedObservable.add((value)=>{
//                 if(!game.ballIsRolled) angleToAim(value, ballMovementObjects, aim, mapValue)
//               })
//               shootButtonComponent.onButtonStateChangedObservable.add(() => { 
//                 if(shootButtonComponent.pressed){
//                   if(!game.ballIsRolled){
//                       shootBall(
//                         aim,
//                         game,
//                         ballMovementObjects,
//                         bowlingPinResult,
//                         createBowlingPins,
//                         scene,
//                         triggerComponent,
//                         mapValue);
//                       }
//                     }
//               });
//             }
 
//         };
//     });
//   });

xr.input.onControllerAddedObservable.add((controller) => {
  controller.onMotionControllerInitObservable.add((motionController) => {
      const triggerComponent = motionController.getComponent("xr-standard-trigger");//xr-standard-trigger
      const thumbStickComponent = motionController.getComponent("xr-standard-thumbstick");//xr-standard-thumbstick
      const shootButtonComponent = motionController.getComponent("xr-standard-squeeze");//y-button
      const buttonComponent = motionController.getComponentOfType("button");//y-button
      console.log('game is started and started checking for controller events')
      buttonComponent.onButtonStateChangedObservable.add(()=>{
        if(buttonComponent.pressed){
          aim.isVisible = true;
          toggleTeleportation(xr);
          }
      });
      thumbStickComponent.onAxisValueChangedObservable.add((value)=>{
        if(!game.ballIsRolled) angleToAim(value, ballMovementObjects, aim, mapValue)
      })
      shootButtonComponent.onButtonStateChangedObservable.add(() => {
        if(shootButtonComponent.pressed && !game.ballIsRolled){
          aim.isVisible = false;
          shootBall(aim, game, ballMovementObjects, bowlingPinResult, createBowlingPins, scene,triggerComponent,mapValue);
        }
      });
  });
});

  startMenuGUI(scene, game);

  return scene;
}

createScene().then((scene) => {
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });
});
window.addEventListener("resize", function () {
  engine.resize();
});

