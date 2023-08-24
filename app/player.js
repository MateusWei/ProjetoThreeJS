import * as THREE from 'three';
import backTexture from '../assets/backTexture.jpg';
import sideTexture from '../assets/sideTexture.jpg';


function createPlayer(camera, life, oxi, combust) {
    const center = 350;
    const player = new THREE.Group();
    player.position.set(100, center, 100);

    const planeWidth = 1;
    const planeHeight = 1;
    const textureLoader = new THREE.TextureLoader();
    
    // TOP
    const planeTop = createPlane(backTexture, planeWidth, planeHeight);
    planeTop.rotation.x = Math.PI / 2;
    player.add(planeTop);

    // BOTTOM
    const planeBottom = createPlane(backTexture, planeWidth, planeHeight);
    planeBottom.rotation.x = Math.PI / 2;
    player.add(planeBottom);

    // LEFT
    const planeLeft = createPlane(sideTexture, planeWidth, planeHeight);
    planeLeft.rotation.y = Math.PI / 2;
    player.add(planeLeft);

    // RIGHT
    const planeRight = createPlane(sideTexture, planeWidth, planeHeight);
    planeRight.rotation.y = -Math.PI / 2;
    player.add(planeRight);

    // BACK
    const planeBack = createPlane(backTexture, planeWidth, planeHeight);
    player.add(planeBack);

    // FRONTUP
    const planeFrontUp = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 4),
        new THREE.MeshPhongMaterial({ map: textureLoader.load(backTexture), side: THREE.DoubleSide })
    );
    planeFrontUp.receiveShadow = true;
    player.add(planeFrontUp);
    
    // FRONTDOWN
    const planeFrontDown = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 1.3),
        new THREE.MeshPhongMaterial({ map: textureLoader.load(backTexture), side: THREE.DoubleSide })
    );
    planeFrontDown.receiveShadow = true;
    player.add(planeFrontDown);
    
    // TABLE
    const tableUp = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 5),
        new THREE.MeshPhongMaterial({ map: textureLoader.load(backTexture), side: THREE.DoubleSide })
    );
    tableUp.receiveShadow = true;
    tableUp.rotation.x = -Math.PI / 4;
    player.add(tableUp);
    
    // VIDA
    const vida = new THREE.Mesh(
        new THREE.BoxGeometry(life, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    );
    vida.receiveShadow = true;
    vida.rotation.x = -Math.PI / 4;
    player.add(vida);
    
    //OXI
    const oxigenio = new THREE.Mesh(
        new THREE.BoxGeometry(oxi, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
    );
    oxigenio.receiveShadow = true;
    oxigenio.rotation.x = -Math.PI / 4;
    player.add(oxigenio);
    
    //COMBS
    const combustivel = new THREE.Mesh(
        new THREE.BoxGeometry(combust, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0xff9900, side: THREE.DoubleSide })
    );
    combustivel.receiveShadow = true;
    combustivel.rotation.x = -Math.PI / 4;
    player.add(combustivel);

    const pointLightTop = new THREE.PointLight(0xffffff, 1, 2);
    player.add(pointLightTop);
    pointLightTop.position.set(0, 1.7, 0);

    vida.position.set(0, 1.49, -0.43);
    oxigenio.position.set(0, 1.46, -0.4);
    combustivel.position.set(0, 1.43, -0.37);
    tableUp.position.set(0, 1.45, -0.43);
    planeFrontUp.position.set(0, 1.7 + 0.5, -0.5);
    planeFrontDown.position.set(0, 1.7 - 0.5, -0.5);
    planeTop.position.set(0, 1.7 + 0.5, 0);
    planeBottom.position.set(0, 1.7 - 0.5, 0);
    planeLeft.position.set(-0.5, 1.7, 0);
    planeRight.position.set(0.5, 1.7, 0);
    planeBack.position.set(0, 1.7, 0.5);

    player.add(camera);

    return {player, vida, oxigenio, combustivel};
}

function createPlane(texture, planeWidth, planeHeight){
    const textureLoader = new THREE.TextureLoader();
    const geo = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const mat = new THREE.MeshPhongMaterial({
        map: textureLoader.load(texture),
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

export { createPlayer }