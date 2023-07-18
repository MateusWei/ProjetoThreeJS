import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

import starsTexture from '../assets/stars.jpg';
import sunTexture from '../assets/sun.jpg';
import mercuryTexture from '../assets/mercury.jpg';
import venusTexture from '../assets/venus.jpg';
import earthTexture from '../assets/earth.jpg';
import marsTexture from '../assets/mars.jpg';
import jupiterTexture from '../assets/jupiter.jpg';
import saturnTexture from '../assets/saturn.jpg';
import saturnRingTexture from '../assets/saturn ring.png';
import uranusTexture from '../assets/uranus.jpg';
import uranusRingTexture from '../assets/uranus ring.png';
import neptuneTexture from '../assets/neptune.jpg';
import plutoTexture from '../assets/pluto.jpg';

import { VRButton } from 'three/addons/webxr/VRButton.js';
import { createPlanete } from './space';

let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto;
let canvas, center, renderer, camera, scene, controls;

const start = document.querySelector('#start');
start.addEventListener('click', function(){
	document.querySelector('#menu').style.display = 'none';
	main();
})

function main() {
	canvas = document.querySelector('#c');
	center = 350;

	//scene -----------------------------------------------------------------------------
	scene = new THREE.Scene();
	scene.background = new THREE.Color('black');

	//render -----------------------------------------------------------------------------
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);

	//vr
	document.body.appendChild(VRButton.createButton(renderer));
	renderer.xr.enabled = true;

	//camera -----------------------------------------------------------------------------
	const fov = 45;
	const aspect = 2;
	const near = 0.1;
	const far = 5000;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	const player = new THREE.Object3D();
	player.position.set(0, center, 150);
	player.add(camera);
	scene.add(player);
	//camera.position.set(0, center, center);

	

	//controls -----------------------------------------------------------------------------

	controls = new OrbitControls(camera, canvas);
	controls.target.set(0, center, 0);
	controls.update();

	//controls fly -----------------------------------------------------------------------------

	// controls = new FlyControls(player, canvas);
	// controls.movementSpeed = 0.01;
	// controls.domElement = canvas;
	// controls.rollSpeed = Math.PI / 15000;


	{ // cenario_mapa -----------------------------------------------------------------------------
		const cubeSize = 700;
		const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
		// const cubeMat = new THREE.MeshPhongMaterial({
		// 	color: '#CCC',
		// 	side: THREE.BackSide,
		// });
		const cubeMatStar = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(starsTexture),
			side: THREE.BackSide,
		});
		// const cubeMaterials = [
		// 	cubeMat,
		// 	cubeMat,
		// 	cubeMat,
		// 	cubeMat,
		// 	cubeMat,
		// 	cubeMat,
		// ];
		const cubeMaterials = [
			cubeMatStar,
			cubeMatStar,
			cubeMatStar,
			cubeMatStar,
			cubeMatStar,
			cubeMatStar,
		];
		const mesh = new THREE.Mesh(cubeGeo, cubeMaterials);
		mesh.receiveShadow = true;
		mesh.position.set(0, cubeSize / 2 - 0.1, 0);
		scene.add(mesh);

	}

	{ //cenario_objetos ------------------------------------------------------------------------------
		//sol
		const textureLoader = new THREE.TextureLoader();
		const sphereRadius = 16;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sunGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
		const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture), side: THREE.DoubleSide });
		sun = new THREE.Mesh(sunGeo, sunMat);

		sun.position.set(0, center, 0);
		scene.add(sun);

		mercury = createPlanete(scene, 3.2, mercuryTexture, new THREE.Vector3(-28, center - 28, -28));
		venus = createPlanete(scene, 5.8, venusTexture, new THREE.Vector3(-44, center - 44, -44));
		earth = createPlanete(scene, 6, earthTexture, new THREE.Vector3(62, center + 62, 62));
		mars = createPlanete(scene, 4, marsTexture, new THREE.Vector3(78, center + 78, 78));

		jupiter = createPlanete(scene, 12, jupiterTexture, new THREE.Vector3(-100, center - 100, -100));
		saturn = createPlanete(scene, 10, saturnTexture, new THREE.Vector3(-138, center - 138, -138), {
			innerRadius: 10,
			outerRadius: 20,
			texture: saturnRingTexture
		});
		uranus = createPlanete(scene, 7, uranusTexture, new THREE.Vector3(176, center + 176, 176), {
			innerRadius: 7,
			outerRadius: 12,
			texture: uranusRingTexture
		});
		neptune = createPlanete(scene, 7, neptuneTexture, new THREE.Vector3(-200, center - 200, -200));
		pluto = createPlanete(scene, 2.8, plutoTexture, new THREE.Vector3(-216, center - 216, -216));
	}


	{ // iluminacao -----------------------------------------------------------------------------
		const color = 0xFFFFFF;
		const intensity = 1;
		const distance = 1000;
		const light = new THREE.PointLight(color, intensity, distance);
		light.castShadow = true;
		sun.add(light);

		// const helper = new THREE.PointLightHelper(light, 20);
		// scene.add(helper);
	}

	// resize -----------------------------------------------------------------------------
	function resizeRendererToDisplaySize(renderer) {
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}


	// animacao -----------------------------------------------------------------------------
	renderer.setAnimationLoop(function () {
		resizeRendererToDisplaySize(renderer);

		{
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		//rotacao
		sun.rotateY(0.0004);
		mercury.mesh.rotateY(0.0012);
		venus.mesh.rotateY(0.002);
		earth.mesh.rotateY(0.002);
		mars.mesh.rotateY(0.0018);
		jupiter.mesh.rotateY(0.004);
		saturn.mesh.rotateY(0.0038);
		uranus.mesh.rotateY(0.003);
		neptune.mesh.rotateY(0.0032);
		pluto.mesh.rotateY(0.008);

		//translacao
		mercury.obj.rotateY(0.0004);
		venus.obj.rotateY(0.00015);
		earth.obj.rotateY(0.0001);
		mars.obj.rotateY(0.0008);
		jupiter.obj.rotateY(0.0002);
		saturn.obj.rotateY(0.0009);
		uranus.obj.rotateY(0.0004);
		neptune.obj.rotateY(0.0001);
		pluto.obj.rotateY(0.0007);

		renderer.render(scene, camera);
	});
}