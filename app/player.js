import * as THREE from 'three';

function createPlayer(camera, life, oxi, combust) {
    const center = 350;
    const player = new THREE.Group();
    player.position.set(100, center, 100);

    const planeWidth = 1;
    const planeHeight = 1;

    const planeTop = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight),
        new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    );
    planeTop.receiveShadow = true;
    planeTop.rotation.x = Math.PI / 2;
    player.add(planeTop);

    const planeBottom = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight),
        new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    );
    planeBottom.receiveShadow = true;
    planeBottom.rotation.x = Math.PI / 2;
    player.add(planeBottom);

    const planeLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(planeHeight, planeWidth),
        new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
    );
    planeLeft.receiveShadow = true;
    planeLeft.rotation.y = Math.PI / 2;
    player.add(planeLeft);

    const planeRight = new THREE.Mesh(
        new THREE.PlaneGeometry(planeHeight, planeWidth),
        new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    );
    planeRight.receiveShadow = true;
    planeRight.rotation.y = -Math.PI / 2;
    player.add(planeRight);

    const planeBack = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight),
        new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    planeBack.receiveShadow = true;
    player.add(planeBack);

    const planeFrontUp = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 4),
        new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    planeFrontUp.receiveShadow = true;
    player.add(planeFrontUp);

    const planeFrontDown = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 1.3),
        new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
    );
    planeFrontDown.receiveShadow = true;
    player.add(planeFrontDown);

    const tableUp = new THREE.Mesh(
        new THREE.PlaneGeometry(planeWidth, planeHeight / 5),
        new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    tableUp.receiveShadow = true;
    tableUp.rotation.x = -Math.PI / 4;
    player.add(tableUp);

    const vida = new THREE.Mesh(
        new THREE.BoxGeometry(life, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    );
    vida.receiveShadow = true;
    vida.rotation.x = -Math.PI / 4;
    player.add(vida);

    const oxigenio = new THREE.Mesh(
        new THREE.BoxGeometry(oxi, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
    );
    oxigenio.receiveShadow = true;
    oxigenio.rotation.x = -Math.PI / 4;
    player.add(oxigenio);

    const combustivel = new THREE.Mesh(
        new THREE.BoxGeometry(combust, 0.03, 0.03),
        new THREE.MeshPhongMaterial({ color: 0xff9900, side: THREE.DoubleSide })
    );
    combustivel.receiveShadow = true;
    combustivel.rotation.x = -Math.PI / 4;
    player.add(combustivel);

    const pointLightTop = new THREE.PointLight(0xffffff, 0.5, 3);
    player.add(pointLightTop);

    pointLightTop.position.set(0, 1.7 + 0.2, 0);
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

export { createPlayer }