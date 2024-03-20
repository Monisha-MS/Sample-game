import { MeshBuilder, Vector3, StandardMaterial, Texture, Mesh } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { startMenuGUI } from "./startMenuGUI";
import config from "../config.json"

//positions of information plane and close button plane respectively
const positions = [];
for (const { x, y, z } of config.infoplane.positions) {
  const position = new Vector3(x, y, z);
  positions.push(position);
}

//handling the close button click
const handleCloseButton = (informationPlane, buttonPlane, scene, game) => {
    informationPlane.dispose();
    buttonPlane.dispose();
    startMenuGUI(scene, game)
};

export function infoGUI(scene, game) {
    //creating a plane for displaying the rules and regulations
    const informationPlane = new MeshBuilder.CreatePlane("infoPlane",{
        height: config.infoplane.height[0],
        width: config.infoplane.width[0]
    });
    informationPlane.position = positions[0]

    const informationPlaneMat = new StandardMaterial();
    informationPlaneMat.diffuseTexture = new Texture("Images/Info.jpg");
    informationPlane.material = informationPlaneMat;

    //creating a gui plane for placing the close button
    const buttonPlane = new MeshBuilder.CreatePlane("buttonPlane",{
        height: config.infoplane.height[1],
        width: config.infoplane.width[1]
    });
    buttonPlane.position = positions[1]
    buttonPlane.billboardMode = Mesh.BILLBOARDMODE_ALL;
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(buttonPlane);

    const closeButton = Button.CreateSimpleButton("close-button", "CLOSE");
    closeButton.width = config.infoplane.width[1];
    closeButton.height = config.infoplane.height[1];
    closeButton.color = "white";
    closeButton.fontSize = config.infoplane.fontsize;
    closeButton.background = "red";
    closeButton.thickness = config.infoplane.thickness
    closeButton.onPointerUpObservable.add(function() {
        handleCloseButton(informationPlane, buttonPlane, scene, game);
    });
    advancedTexture.addControl(closeButton);
}
