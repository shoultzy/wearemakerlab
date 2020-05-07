let scene3D;

function Scene3D() {
    this.assetLoaded = 0;
    this.postprocessing = {};
    this.assetLibrary =
        [
            "three/examples/js/loaders/GLTFLoader",
            "three/examples/js/controls/OrbitControls",

            //"three/examples/js/postprocessing/EffectComposer",
            //"three/examples/js/postprocessing/RenderPass",

            //"three/examples/js/postprocessing/ShaderPass",
            //"three/examples/js/postprocessing/BokehPass"

            "three/examples/js/shaders/CopyShader",
            "three/examples/js/shaders/BokehShader"

        ];

    this.sceneContainer = document.getElementById("canvas_container");
}

function scene3DInit() {
    scene3D = new Scene3D();

    requirejs(["./three/build/three"],
        function (e) {
            THREE = e;
            scene3D.initDependencies();
        });
}

Scene3D.prototype.initDependencies = function () {
    for (let i = 0; i < scene3D.assetLibrary.length; i++) {
        requirejs([scene3D.assetLibrary[i]],
            function (e) {
                scene3D.onDependencyLoaded();
            });
    }
}

Scene3D.prototype.onDependencyLoaded = function () {
    scene3D.assetLoaded++;
    if (scene3D.assetLoaded === scene3D.assetLibrary.length) scene3D.onDependencyCompleted();
}

Scene3D.prototype.onDependencyCompleted = function () {
    scene3D.init();
}

Scene3D.prototype.init = function () {
    scene = new THREE.Scene();
    scene3D.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    scene3D.camera.position.set( 0, 0, 500 );
    scene3D.renderer = new THREE.WebGLRenderer( {alpha: true} );
    scene3D.renderer.setPixelRatio(window.devicePixelRatio);
    scene3D.renderer.setSize(window.innerWidth, window.innerHeight);
    scene3D.controls = new THREE.OrbitControls( scene3D.camera, scene3D.renderer.domElement );
    scene3D.controls.minDistance = 10;
    scene3D.controls.maxDistance = 500;
    scene3D.controls.maxPolarAngle = 1.57;
    scene3D.controls.minPolarAngle = 0;
    scene3D.controls.update();

    scene3D.sceneContainer.appendChild(scene3D.renderer.domElement);

    scene3D.initLights();
};

Scene3D.prototype.initLights = function () {
    let ambient = new THREE.AmbientLight(0x404040);
    ambient.name = "light: ambient"
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.name = "light: directional"
    directionalLight.position.set(0, 1, 2).normalize();
    scene.add(directionalLight);

    scene3D.initElements();
}

Scene3D.prototype.initElements = function () {
    let loader = new THREE.GLTFLoader();

    loader.load('../3d/character/MakerLab_Avatar_Test_Animated.gltf', function (obj) {
        scene.add(obj.scene);
        console.log(obj.scene.children[0].children[1].children[0].material);
        obj.scene.children[0].children[1].children[0].material.color = new THREE.Color( 1, 0, 0 );
        obj.scene.scale.set(.01,.01,.01);
        scene3D.initScene();
    }, undefined, function (e) {
    });
}

Scene3D.prototype.initScene = function () {
    TweenMax.to(this.sceneContainer, 1, {opacity: 1});
    TweenMax.to(this.camera.position, 1, {z: 50});

    scene3D.initPostprocessing();
}

Scene3D.prototype.initPostprocessing = function () {

    /*let composer = new THREE.EffectComposer( scene3D.renderer );
    let renderPass = new THREE.RenderPass( scene, scene3D.camera );
    let bokehPass = new THREE.BokehPass( scene, scene3D.camera, {
        focus: 1.0,
        aperture: 0.025,
        maxblur: 1.0,
        width: window.innerWidth,
        height: window.innerHeight
    } );

    scene3D.postprocessing.composer = composer;
    scene3D.postprocessing.bokeh = bokehPass;

    console.log(renderPass);
    console.log(bokehPass);
    console.log(composer);*/

    scene3D.animateScene();
}

Scene3D.prototype.animateScene = function (e) {
    scene3D.render();
    scene3D.controls.update();

    window.requestAnimationFrame(scene3D.animateScene);
};

Scene3D.prototype.render = function () {
    scene3D.renderer.render( scene, scene3D.camera );
    //scene3D.postprocessing.composer.render( 0.1 );
}
