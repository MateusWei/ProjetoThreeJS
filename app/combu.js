import * as THREE from 'three';

function createCombu(combusts, scene){
    const sphereCount = 50;
    const sphereRadius = 1;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff8800, side: THREE.DoubleSide });

    for (let i = 0; i < sphereCount; i++) {
        const combust = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // Posição aleatória dentro do cubo
        const randomX = THREE.MathUtils.randInt(-350, 350);
        const randomY = THREE.MathUtils.randInt(0, 700);
        const randomZ = THREE.MathUtils.randInt(-350, 350);


        combust.position.set(randomX, randomY, randomZ);

        combusts.push(combust);
        scene.add(combust);
    }
}

function updateCombu(scene, combusts, player, combust, combustivel) {
    const distanceThreshold = 10;

    for (let i = 0; i < combusts.length; i++) {
        const sphere = combusts[i];
        const distance = player.position.distanceTo(sphere.position);

        if (distance < distanceThreshold) {
            scene.remove(sphere);

            const sphereRadius = 5;
            const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
            const newSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // Posição aleatória dentro do cubo
            const randomX = THREE.MathUtils.randInt(-350, 350);
            const randomY = THREE.MathUtils.randInt(0, 700);
            const randomZ = THREE.MathUtils.randInt(-350, 350);


            newSphere.position.set(randomX, randomY, randomZ);

            combusts[i] = newSphere;
            scene.add(newSphere);
        
            combust += 0.1;
            if(combust > 0.5){
                combust = 0.5;
            }
            combustivel.geometry = new THREE.BoxGeometry(combust, 0.03, 0.03);
            return combust;
        }
    }
    return combust;
}

export { createCombu, updateCombu }