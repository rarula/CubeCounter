import { AmbientLight, Color, DirectionalLight, Mesh, MeshStandardMaterial, OrthographicCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

import { toRadians } from './utils';

const WIDTH = 700;
const HEIGHT = 700;

export function createCanvas(heightsList: number[][], zoom: number): HTMLCanvasElement {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);

    const scene = new Scene();
    scene.background = new Color(0xffffff);

    const camera = new OrthographicCamera(WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 0.1, 1000);
    camera.position.set(-500, 375, 500);
    camera.rotation.set(0, 0, 0);
    camera.rotateOnAxis(new Vector3(1, 0, 1), toRadians(-15));
    camera.rotateOnAxis(new Vector3(0, 1, 0), toRadians(-45));
    camera.zoom = zoom;
    camera.updateProjectionMatrix();

    const ambLight = new AmbientLight(0xffffff, 1.2);
    const dirLight = new DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(-0.6, 1, 0.25);

    const cubes: Mesh[] = [];
    for (let x = 0; x < heightsList.length; x++) {
        for (let z = 0; z < heightsList[x].length; z++) {
            for (let y = 0; y < heightsList[x][z]; y++) {
                const cube = createCube(x * -100, y * 100, z * 100, y % 2 == 0);
                cubes.push(cube);
            }
        }
    }

    scene.add(ambLight);
    scene.add(dirLight);
    scene.add(...cubes);

    renderer.render(scene, camera);
    return renderer.domElement;
}

function createCube(x: number, y: number, z: number, colored: boolean): Mesh {
    const geometry = new RoundedBoxGeometry(99, 99, 99, 2, 2.5);
    const material = new MeshStandardMaterial({ color: colored ? 0xcccccc : 0xffffff });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);

    return mesh;
}
