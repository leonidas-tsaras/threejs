// run animation loop
var step = -0.04;
var animate = function () {
    requestAnimationFrame( animate );

    //step = 0.75 * clock.getDelta();
    //step = Date.now()/700;

    //sphere_mesh.position.x = (10*(Math.cos(step)));
    //sphere_mesh.position.y = (10*(Math.sin(step)));  
    //sphere_mesh.position.z = (10*(Math.sin(step)));  

    //group.rotation.x += 0.05;

    //scene.getObjectByName("torus").rotation.x += 0.05;

    //scene.getObjectByName("cube").rotation.x += 0.05;
    //scene.getObjectByName("cube").rotation.y += 0.02;
    //scene.getObjectByName("cube").rotation.z += 0.01;

    //if(scene.getObjectByName("sphere").position.y >= 1) {
        //scene.getObjectByName("sphere").position.y -= 0.02;
    //}

    /*
    var sphere = scene.getObjectByName("sphere");
    sphere.translateY(step);
    if(sphere.position.y <= 1) step = -step;
    if(sphere.position.y == 3) step = -step;
    */

    let earth = scene.getObjectByName("earth");
    earth.rotation.y += 0.01;

    //let moon = scene.getObjectByName("moon");

    //earth.rotaion.y += 0.05;
    //moon.rotation.z += 0.05;

    controls.update();
    renderer.render(scene, camera);
};

var plane_mesh, sphere_mesh;
var group, mesh1, mesh2;
function project() {
    //geometries
    var geometry = new THREE.PlaneGeometry(7, 7, 32);
    var sphere = new THREE.SphereGeometry(1, 16, 16);
    var mesh1_geometry = new THREE.BoxGeometry(2, 2, 2);
    var mesh2_geometry = new THREE.TorusGeometry(3, 1, 16, 100);;

    //materials
    var mat1 = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe:true});
    var mat2 = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe:true });
    var mat3 = new THREE.MeshBasicMaterial({color: 0x555500, side: THREE.DoubleSide});
    var mat4 = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});
    var mat5 = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide});
    var mat6 = new THREE.MeshLambertMaterial({color: 0x00ff00, side: THREE.DoubleSide});
    let earthMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    var faceMaterial = getFaceMaterial();
    var textureMaterial = getTexture();

    //create texture
    let earthTexture = getTexture("textures/planets/earth_atmos_2048.jpg");



    //create meshes
    plane_mesh = new THREE.Mesh(geometry, mat3);
    plane_mesh.rotation.x = Math.PI/2;
    plane_mesh.receiveShadow = true;

    //mesh1 =  new THREE.Mesh(mesh1_geometry, faceMaterial);
    mesh1 =  new THREE.Mesh(mesh1_geometry, textureMaterial);
    mesh1.name = 'cube';

    mesh2 =  new THREE.Mesh(mesh2_geometry, mat6);
    mesh2.name = "torus";

    sphere_mesh = new THREE.Mesh(sphere, mat6);
    sphere_mesh.name = "sphere";
    sphere_mesh.position.y = 3;
    sphere_mesh.castShadow = true;

    let earth = new THREE.Mesh(sphere, earthTexture);
    earth.name = "earth";

    let moon = new THREE.Mesh(sphere, mat6);
    moon.name = "moon";

    // create Group
    group = new THREE.Group();
    group.add(mesh1);
    group.add(mesh2);
    group.position.x = 5;

    //add meshes to scene
    //scene.add(plane_mesh);
    scene.add(earth);
    //scene.add(mesh1);
    //scene.add(mesh2);
    //scene.add(group);
}


function getFaceMaterial() {
    let matArray = [];
    matArray.push(new THREE.MeshBasicMaterial({color: 0x009e60}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xffd500}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xffffff}));
    let faceMaterial = new THREE.MeshFaceMaterial(matArray);
    return faceMaterial;
 }

 function getTexture(imageFile) {
    var texture = new THREE.TextureLoader().load(imageFile);
    var material = new THREE.MeshPhongMaterial();
    material.map = texture;
    return material;
}

function getBumpMaterial(material, imageFile) {
    let bump = THREE.ImageUtils.loadTexture(imageFile);
    material.bumpMap = bump;
    return material;
}
