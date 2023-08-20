import * as THREE from 'three';

function createPlanete(scene, size, texture, position, ring) {
    const textureLoader = new THREE.TextureLoader();
    const geo = new THREE.SphereGeometry(size, 32, 16);
    const mat = new THREE.MeshPhongMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshPhongMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        //ringMesh.castShadow = true;
        ringMesh.receiveShadow = true;
        obj.add(ringMesh);
        ringMesh.position.set(position.x, position.y, position.z);
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.set(position.x, position.y, position.z);
    return { mesh, obj }
}


export { createPlanete }