import * as THREE from 'three';

export function rotateAroundX(step, radius) {
    let y = Math.cos(step*Math.PI/180) * radius;
    let z = Math.sin(step*Math.PI/180) * radius;
    return new THREE.Vector3(0, y, z);
}

export function rotateAroundY(step, radius) {
    let x = Math.cos(step*Math.PI/180) * radius;
    let z = Math.sin(step*Math.PI/180) * radius;
    return new THREE.Vector3(x, 0, z);
}     

export function rotateAroundZ(step, radius) {
    let x = Math.cos(step*Math.PI/180) * radius;
    let y = Math.sin(step*Math.PI/180) * radius;
    return new THREE.Vector3(x, y, 0);
} 

//loader
const loader = new THREE.TextureLoader();
export function loadImageTexture( path ) {
    const texture = loader.load( path );
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
} 

export function onResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}