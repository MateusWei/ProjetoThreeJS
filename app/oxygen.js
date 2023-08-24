import * as THREE from 'three';

function createOxy(spheres, scene) {
    const sphereCount = 50;
    const sphereRadius = 1;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });

    for (let i = 0; i < sphereCount; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // Posição aleatória dentro do cubo
        const randomX = THREE.MathUtils.randInt(-350, 350);
        const randomY = THREE.MathUtils.randInt(0, 700);
        const randomZ = THREE.MathUtils.randInt(-350, 350);


        sphere.position.set(randomX, randomY, randomZ);

        spheres.push(sphere);
        scene.add(sphere);
    }
}

function updateOxy(scene, spheres, player, oxi, oxigenio) {
    const distanceThreshold = 10;

    for (let i = 0; i < spheres.length; i++) {
        const sphere = spheres[i];
        const distance = player.position.distanceTo(sphere.position);

        if (distance < distanceThreshold) {
            scene.remove(sphere);

            const sphereRadius = 5;
            const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
            const newSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // Posição aleatória dentro do cubo
            const randomX = THREE.MathUtils.randInt(-350, 350);
            const randomY = THREE.MathUtils.randInt(0, 700);
            const randomZ = THREE.MathUtils.randInt(-350, 350);

            newSphere.position.set(randomX, randomY, randomZ);

            spheres[i] = newSphere;
            scene.add(newSphere);

            oxi += 0.1;
            if (oxi > 0.5) {
                oxi = 0.5;
            }

            return oxi;
        }
    }
    return oxi;
}
export { createOxy, updateOxy }