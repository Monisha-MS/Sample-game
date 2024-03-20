export const rollCollisionHandler = (ev, scene, window, game) => {
    const collidedAgainstMesh = ev.collidedAgainst.transformNode;
    const colliderMesh = ev.collider.transformNode;
    const collidedAgainstMeshName = collidedAgainstMesh.name;
    const colliderMeshName = colliderMesh.name;
    //collision sound is played every time ball collides with pin
    if(colliderMeshName === 'bowlingBall' && collidedAgainstMeshName.slice(0,3) === 'pin'){
        window.globalHitMusic.play();
    }
    //check whether the colliding against mesh or collider mesh is a pin
    //if so, set those pins as fallen
    if(collidedAgainstMeshName.slice(0,3) == "pin"){
        game.pinsArray[collidedAgainstMeshName[4]].isHit = true;
    }

    if( colliderMeshName.slice(0,3) == "pin"){
        game.pinsArray[colliderMeshName[4]].isHit = true;
    }
}