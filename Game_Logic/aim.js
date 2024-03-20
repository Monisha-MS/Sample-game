import { MeshBuilder, Vector3, Color3, PBRMaterial, Mesh } from "@babylonjs/core"
import config from "../config.json"

//positions of the projection, arrow and aim respectively
const positions = [];
for (const { x, y, z } of config.aim.positions) {
  const position = new Vector3(x, y, z);
  positions.push(position);
}

export const createAim = (scene) => {
    const projection = MeshBuilder.CreateBox("projection", {height: config.aim.height, width: config.aim.width, depth: config.aim.depth});
    projection.position = positions[[0]];
    const pbrMaterial = new PBRMaterial("pbrMaterial", scene);
    pbrMaterial.albedoColor = new Color3(config.pbr.color.x, config.pbr.color.y, config.pbr.color.z); 
    // Set other PBR properties
    pbrMaterial.metallic = config.pbr.metallic; // Low metallicness
    pbrMaterial.roughness = config.pbr.roughness; // Low roughness
    pbrMaterial.alpha = config.pbr.alpha;
  
    const arrow = MeshBuilder.CreateCylinder("sphere", {height: config.aim.height, diameter: config.aim.diameter, tessellation: config.aim.tessellation}); //{height: 0.01, diameter: 0, diameterTop: 1, diameterBottom: 1, tessellation: 3}
    arrow.rotation.y = config.aim.rotation;
    arrow.position = positions[1];
  
    arrow.material = pbrMaterial;
  
    const Aim = Mesh.MergeMeshes([arrow, projection]);
  
    Aim.position = positions[2];
    return Aim;
  }
