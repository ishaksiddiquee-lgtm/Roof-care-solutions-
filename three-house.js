/* ═══════════════════════════════════════════════════════════════
   Roof Care Solution — Realistic 3D Building (Pakistani Architecture)
   Three.js r160  |  ACESFilmic tone-mapping  |  PBR materials
   ═══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    const canvas = document.getElementById('houseCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    /* ─── scene globals ─── */
    let scene, camera, renderer, clock;
    let buildingGroup;
    let wallsMesh, roofMesh, tankMesh;
    let raycaster, mouse;
    let particleSystems = {};
    let activeEffects   = {};
    let hoveredMesh     = null;
    let autoRotating    = true;
    let idleTimer       = null;
    const interactives  = [];

    /* ─── material palette (muted, real-world colors) ─── */
    const M = {
        wall:     () => mat(0xECE4D2, 0.80, 0.00),          // warm cream plaster
        wall2:    () => mat(0xE4DCC8, 0.82, 0.00),          // slightly darker second floor
        concrete: () => mat(0xC4BCAC, 0.92, 0.02),          // grey roof/slab
        parapet:  () => mat(0xBCB2A0, 0.90, 0.02),          // parapet top cap
        floor_band:() => mat(0xD0C8B8, 0.88, 0.02),         // between floors
        door:     () => mat(0x3A2010, 0.42, 0.06),          // dark mahogany
        door_frame:() => mat(0xF0EAE0, 0.75, 0.02),         // door frame cream
        window:   () => mat(0x7AAABB, 0.04, 0.28, true, 0.52), // glass
        win_frame:() => mat(0xF2ECE2, 0.72, 0.02),          // window frame
        metal:    () => mat(0x8A8A8A, 0.38, 0.80),          // AC, gutter metal
        tank:     () => mat(0x1A2632, 0.32, 0.78),          // black overhead tank
        tank_cap: () => mat(0x141E28, 0.28, 0.82),          // tank cap
        pipe:     () => mat(0x666666, 0.45, 0.75),          // pipes
        railing:  () => mat(0x787878, 0.48, 0.72),          // balcony railing
        balcony:  () => mat(0xCCC4B4, 0.86, 0.02),          // balcony slab
        boundary: () => mat(0xE4DCC8, 0.84, 0.00),          // compound wall
        road:     () => mat(0x585250, 0.95, 0.00),          // driveway asphalt
        grass:    () => mat(0x253E1A, 1.00, 0.00),          // lawn
        tree_dark:() => mat(0x1A3A12, 1.00, 0.00),          // palm/tree
        tree_mid: () => mat(0x224A18, 0.98, 0.00),
        knob:     () => mat(0xD4AA30, 0.20, 0.90),          // door knob brass
        ac_white: () => mat(0xDDDAD6, 0.65, 0.08),          // AC unit body
    };

    function mat(color, roughness = 0.8, metalness = 0, transparent = false, opacity = 1) {
        const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
        if (transparent) { m.transparent = true; m.opacity = opacity; }
        return m;
    }

    /* ─── init ─── */
    function init() {
        const W = canvas.parentElement.offsetWidth || 580;
        const H = 400;
        canvas.width  = W;
        canvas.height = H;

        scene = new THREE.Scene();
        clock = new THREE.Clock();

        /* realistic renderer */
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
        renderer.toneMapping          = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure  = 1.18;
        renderer.outputColorSpace     = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);

        /* camera — nice 3/4 architectural view */
        camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 120);
        camera.position.set(10, 8.5, 12);
        camera.lookAt(0, 3.2, 0);

        buildLights();
        buildEnvironment();
        buildBuilding();
        buildParticles();

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2(-10, -10);

        canvas.addEventListener('mousemove',  onMouseMove);
        canvas.addEventListener('click',      onClick);
        canvas.addEventListener('touchstart', onTouch, { passive: true });
        canvas.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('resize',     onResize);

        animate();
    }

    /* ─────────────────────────────── LIGHTS ─── */
    function buildLights() {
        /* sky-ground hemisphere — natural outdoor feel */
        const hemi = new THREE.HemisphereLight(0x9AB8D0, 0x70583A, 1.0);
        scene.add(hemi);

        /* main sun — strong, warm, casts shadows */
        const sun = new THREE.DirectionalLight(0xFFF8F0, 2.6);
        sun.position.set(7, 16, 10);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        sun.shadow.camera.left  = -14; sun.shadow.camera.right  = 14;
        sun.shadow.camera.top   =  14; sun.shadow.camera.bottom = -14;
        sun.shadow.camera.far   = 50;
        sun.shadow.bias = -0.0005;
        scene.add(sun);

        /* sky-side fill (soft blue bounce) */
        const fill = new THREE.DirectionalLight(0x5878A8, 0.55);
        fill.position.set(-9, 10, -6);
        scene.add(fill);

        /* subtle back-rim */
        const rim = new THREE.DirectionalLight(0x304870, 0.28);
        rim.position.set(0, 4, -14);
        scene.add(rim);

        /* warm interior window glow — ground floor */
        const winGlow1 = new THREE.PointLight(0xFFCC88, 0.9, 5.5);
        winGlow1.position.set(-0.8, 1.6, 3.0);
        scene.add(winGlow1);

        /* warm interior glow — upper floor */
        const winGlow2 = new THREE.PointLight(0xFFCC88, 0.7, 4.5);
        winGlow2.position.set(0.8, 4.6, 3.0);
        scene.add(winGlow2);
    }

    /* ─────────────────────────────── GROUND / ENV ─── */
    function buildEnvironment() {
        /* ground plane */
        const groundGeo = new THREE.PlaneGeometry(28, 28);
        const ground = new THREE.Mesh(groundGeo, M.road());
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        /* compound lawn (green patches) */
        addBox(scene, 14, 0.04, 4.5, [-3.5, 0.02, 8.5],  M.grass(), false, true);
        addBox(scene,  4.5, 0.04, 8, [8, 0.02, 0],       M.grass(), false, true);
        addBox(scene,  4.5, 0.04, 8, [-9.5, 0.02, 0],    M.grass(), false, true);

        /* driveway path in front */
        addBox(scene, 5, 0.05, 4, [-0.5, 0.025, 7], M.road(), false, true);

        /* compound boundary wall — front */
        addBox(scene, 18, 1.1, 0.25, [-0.5, 0.55, 10.5], M.boundary(), false, true);
        /* gate posts */
        addBox(scene, 0.5, 1.8, 0.5, [-2.8, 0.9, 10.5],  M.floor_band(), true,  true);
        addBox(scene, 0.5, 1.8, 0.5, [1.8,  0.9, 10.5],  M.floor_band(), true,  true);
        /* gate post caps */
        addBox(scene, 0.7, 0.2, 0.7, [-2.8, 1.9, 10.5],  M.concrete(), false, false);
        addBox(scene, 0.7, 0.2, 0.7, [1.8,  1.9, 10.5],  M.concrete(), false, false);

        /* palm trees */
        buildPalmTree( 8.5, 0, -2.5);
        buildPalmTree(-9.5, 0,  2.0);
        buildPalmTree( 7.0, 0,  7.5);
        buildPalmTree(-8.5, 0,  6.0);

        /* street lamp near gate */
        buildLamp(4.5, 0, 9.8);
    }

    function buildPalmTree(x, y, z) {
        const grp = new THREE.Group();
        grp.position.set(x, y, z);
        /* trunk (slightly tapered) */
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.18, 4.5, 7),
            M.tree_dark()
        );
        trunk.position.y = 2.25;
        trunk.castShadow = true;
        grp.add(trunk);
        /* fronds — stacked cones at slight angles */
        const frondMat = M.tree_mid();
        for (let i = 0; i < 7; i++) {
            const frond = new THREE.Mesh(
                new THREE.ConeGeometry(1.6, 1.2, 5),
                frondMat
            );
            frond.position.y = 4.9;
            frond.rotation.z = 0.55;
            frond.rotation.y = (Math.PI * 2 / 7) * i;
            frond.castShadow = true;
            grp.add(frond);
        }
        /* top crown */
        const crown = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 7, 5),
            M.tree_mid()
        );
        crown.position.y = 5.2;
        crown.scale.y = 0.65;
        crown.castShadow = true;
        grp.add(crown);
        scene.add(grp);
    }

    function buildLamp(x, y, z) {
        const grp = new THREE.Group();
        grp.position.set(x, y, z);
        /* pole */
        addBox(grp, 0.1, 5.5, 0.1, [0, 2.75, 0], M.metal(), true);
        /* arm */
        addBox(grp, 1.0, 0.08, 0.08, [-0.5, 5.5, 0], M.metal());
        /* lamp head */
        const lamp = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.16, 0.28, 10),
            M.metal()
        );
        lamp.position.set(-1.0, 5.35, 0);
        grp.add(lamp);
        scene.add(grp);
    }

    /* ─────────────────────────────── BUILDING ─── */
    function buildBuilding() {
        buildingGroup = new THREE.Group();
        buildingGroup.position.set(-0.5, 0, 0);

        /* ── dimensions ── */
        const BW = 7.4;    // building width
        const BD = 5.0;    // building depth
        const GH = 3.2;    // ground floor height
        const FH = 2.95;   // first floor height
        const TH = GH + FH; // total wall height = 6.15
        const PH = 0.72;   // parapet height
        const PT = 0.22;   // parapet thickness
        const SLB = 0.22;  // slab thickness

        /* ── ground floor walls ── */
        const gfWall = new THREE.Mesh(
            new THREE.BoxGeometry(BW, GH, BD),
            M.wall()
        );
        gfWall.position.y = GH / 2;
        gfWall.castShadow = true;
        gfWall.receiveShadow = true;
        gfWall.userData = {
            name: 'walls', service: 'Waterproofing',
            desc: 'Chemical barrier applied to all wall surfaces', baseColor: 0xECE4D2
        };
        buildingGroup.add(gfWall);
        interactives.push(gfWall);
        wallsMesh = gfWall;

        /* ── floor band / lintel band between floors ── */
        addBox(buildingGroup, BW + 0.12, 0.30, BD + 0.12, [0, GH, 0], M.floor_band());

        /* ── upper floor walls ── */
        const ufWall = new THREE.Mesh(
            new THREE.BoxGeometry(BW, FH, BD),
            M.wall2()
        );
        ufWall.position.y = GH + FH / 2;
        ufWall.castShadow = true;
        ufWall.receiveShadow = true;
        ufWall.userData = {
            name: 'walls_upper', service: 'Waterproofing',
            desc: 'Protective coat on all exterior surfaces', baseColor: 0xE4DCC8
        };
        buildingGroup.add(ufWall);

        /* ── roof slab (flat concrete) ── */
        const roofSlab = new THREE.Mesh(
            new THREE.BoxGeometry(BW + 0.16, SLB, BD + 0.16),
            M.concrete()
        );
        roofSlab.position.y = TH + SLB / 2;
        roofSlab.castShadow = true;
        roofSlab.receiveShadow = true;
        roofSlab.userData = {
            name: 'roof', service: 'Heat Proofing',
            desc: 'Reflective coating reduces temp by 15°C', baseColor: 0xC4BCAC
        };
        buildingGroup.add(roofSlab);
        interactives.push(roofSlab);
        roofMesh = roofSlab;

        /* ── parapet walls (4 sides) ── */
        const pTop = TH + SLB + PH / 2;
        const pMat = M.parapet();
        addBoxM(buildingGroup, BW + PT * 2, PH, PT, [0,          pTop,  BD / 2 + PT / 2], pMat, true); // front
        addBoxM(buildingGroup, BW + PT * 2, PH, PT, [0,          pTop, -BD / 2 - PT / 2], pMat, true); // back
        addBoxM(buildingGroup, PT, PH, BD,          [-BW / 2 - PT / 2, pTop, 0],          pMat, true); // left
        addBoxM(buildingGroup, PT, PH, BD,          [ BW / 2 + PT / 2, pTop, 0],          pMat, true); // right
        /* parapet cap top */
        const capY = TH + SLB + PH + 0.06;
        const capMat = M.concrete();
        addBoxM(buildingGroup, BW + PT * 2 + 0.1, 0.10, PT + 0.1, [0,         capY,  BD/2+PT/2], capMat);
        addBoxM(buildingGroup, BW + PT * 2 + 0.1, 0.10, PT + 0.1, [0,         capY, -BD/2-PT/2], capMat);
        addBoxM(buildingGroup, PT + 0.1, 0.10, BD + 0.1, [-BW/2-PT/2, capY, 0], capMat);
        addBoxM(buildingGroup, PT + 0.1, 0.10, BD + 0.1, [ BW/2+PT/2, capY, 0], capMat);

        /* ── foundation / plinth ── */
        addBox(buildingGroup, BW + 0.6, 0.40, BD + 0.6, [0, 0.2, 0], M.concrete(), false, true);

        /* ── FRONT FACADE ── */
        buildFrontFacade(buildingGroup, BW, BD, GH, FH);

        /* ── SIDE WINDOWS ── */
        buildSideWindows(buildingGroup, BW, GH, FH);

        /* ── BALCONY ── */
        buildBalcony(buildingGroup, BW, BD, GH);

        /* ── WATER TANK (on roof) ── */
        buildWaterTank(buildingGroup, BW, BD, TH, SLB);

        /* ── ROOF FIXTURES ── */
        buildRoofFixtures(buildingGroup, BW, BD, TH, SLB);

        buildingGroup.position.y = 0;
        scene.add(buildingGroup);
    }

    function buildFrontFacade(grp, BW, BD, GH, FH) {
        const fz = BD / 2 + 0.04; // front face z

        /* ── Ground floor: main door ── */
        /* door recess (slightly inset) */
        addBox(grp, 1.32, 2.72, 0.22, [0, 1.36, fz - 0.05],
               new THREE.MeshStandardMaterial({ color: 0x2A180A, roughness: 0.55 }));
        /* door panels */
        const doorMat = M.door();
        addBoxM(grp, 0.60, 2.45, 0.10, [-0.35, 1.225, fz + 0.01], doorMat, true);
        addBoxM(grp, 0.60, 2.45, 0.10, [ 0.35, 1.225, fz + 0.01], doorMat, true);
        /* door frame */
        addBoxM(grp, 1.32, 0.14, 0.12, [0, 2.52, fz + 0.02], M.door_frame());
        addBoxM(grp, 0.10, 2.45, 0.12, [-0.71, 1.225, fz + 0.02], M.door_frame());
        addBoxM(grp, 0.10, 2.45, 0.12, [ 0.71, 1.225, fz + 0.02], M.door_frame());
        /* door handles */
        addBox(grp, 0.06, 0.26, 0.06, [-0.10, 1.2, fz + 0.08], M.knob());
        addBox(grp, 0.06, 0.26, 0.06, [ 0.10, 1.2, fz + 0.08], M.knob());
        /* arch above door */
        const archGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.12, 10, 1, false, 0, Math.PI);
        const arch = new THREE.Mesh(archGeo, M.door_frame());
        arch.position.set(0, 2.59, fz + 0.01);
        arch.rotation.z = Math.PI / 2;
        arch.rotation.y = Math.PI / 2;
        grp.add(arch);

        /* ── Ground floor: 2 windows ── */
        buildWindow(grp, [-2.4, 1.5, fz], false);
        buildWindow(grp, [ 2.4, 1.5, fz], false);

        /* ── Upper floor: 3 windows ── */
        buildWindow(grp, [-2.5, GH + FH * 0.45, fz], false);
        buildWindow(grp, [ 0.0, GH + FH * 0.45, fz], false);
        buildWindow(grp, [ 2.5, GH + FH * 0.45, fz], false);

        /* ── Lintel bands above windows ── */
        [[- 2.4, 2.28, fz], [2.4, 2.28, fz],
         [-2.5, GH + FH*0.80, fz], [0, GH + FH*0.80, fz], [2.5, GH + FH*0.80, fz]
        ].forEach(pos => {
            addBox(grp, 1.4, 0.10, 0.14, pos, M.concrete());
        });

        /* ── Window sills ── */
        [[-2.4, 0.96, fz], [2.4, 0.96, fz],
         [-2.5, GH + FH*0.1, fz], [0, GH + FH*0.1, fz], [2.5, GH + FH*0.1, fz]
        ].forEach(pos => {
            addBox(grp, 1.42, 0.10, 0.22, pos, M.concrete());
        });
    }

    function buildWindow(grp, [x, y, z], isSide) {
        const W = isSide ? 0.08 : 1.22;
        const H = 1.26;
        const D = isSide ? 1.22 : 0.08;
        /* frame */
        addBoxM(grp, W + 0.14, H + 0.14, D + 0.14, [x, y, z], M.win_frame());
        /* glass */
        addBoxM(grp, W, H, D, [x, y, z], M.window());
        /* mullion (center divider) */
        if (!isSide) {
            addBox(grp, 0.06, H, 0.10, [x, y, z], M.win_frame());
            addBox(grp, W, 0.06, 0.10, [x, y, z + 0.01], M.win_frame());
        }
    }

    function buildSideWindows(grp, BW, GH, FH) {
        const lx = -(BW / 2 + 0.04);
        const rx =  (BW / 2 + 0.04);
        [lx, rx].forEach(x => {
            buildWindow(grp, [x, 1.5,       -1.0], true);
            buildWindow(grp, [x, GH + FH * 0.45, -0.8], true);
            buildWindow(grp, [x, GH + FH * 0.45,  1.2], true);
        });
    }

    function buildBalcony(grp, BW, BD, GH) {
        const bz = BD / 2;
        const by = GH + 0.15;
        /* balcony slab */
        const bslab = new THREE.Mesh(
            new THREE.BoxGeometry(BW - 1.0, 0.18, 1.1),
            M.balcony()
        );
        bslab.position.set(0, by, bz + 0.55);
        bslab.castShadow = true;
        bslab.receiveShadow = true;
        grp.add(bslab);

        /* soffit under balcony */
        addBox(grp, BW - 1.0, 0.06, 1.1, [0, by - 0.09, bz + 0.55], M.concrete(), false, true);

        /* railing posts */
        const postMat = M.railing();
        const rCount  = 10;
        const rW      = BW - 1.0;
        for (let i = 0; i <= rCount; i++) {
            const px = -rW / 2 + (rW / rCount) * i;
            addBoxM(grp, 0.07, 0.80, 0.07, [px, by + 0.58, bz + 0.55], postMat, true);
        }
        /* top rail */
        addBoxM(grp, rW + 0.08, 0.08, 0.10, [0, by + 0.96, bz + 0.55], postMat);
        /* bottom rail */
        addBoxM(grp, rW + 0.08, 0.06, 0.08, [0, by + 0.18, bz + 0.55], postMat);

        /* end posts (thicker) */
        addBoxM(grp, 0.14, 0.92, 0.14, [-rW / 2 + 0.07, by + 0.56, bz + 0.55], postMat, true);
        addBoxM(grp, 0.14, 0.92, 0.14, [ rW / 2 - 0.07, by + 0.56, bz + 0.55], postMat, true);
    }

    function buildWaterTank(grp, BW, BD, TH, SLB) {
        const tx =  2.2;
        const tz = -1.5;
        const ty =  TH + SLB;

        /* tank support legs (4) */
        const legH = 0.8;
        const legMat = M.metal();
        [[-0.55,-0.55],[0.55,-0.55],[-0.55,0.55],[0.55,0.55]].forEach(([lx,lz]) => {
            addBoxM(grp, 0.10, legH, 0.10, [tx + lx, ty + legH / 2, tz + lz], legMat, true);
        });
        /* support cross braces */
        addBox(grp, 1.2, 0.06, 0.06, [tx, ty + legH * 0.5, tz - 0.55], legMat);
        addBox(grp, 1.2, 0.06, 0.06, [tx, ty + legH * 0.5, tz + 0.55], legMat);
        addBox(grp, 0.06, 0.06, 1.2, [tx - 0.55, ty + legH * 0.5, tz], legMat);
        addBox(grp, 0.06, 0.06, 1.2, [tx + 0.55, ty + legH * 0.5, tz], legMat);
        /* support platform */
        addBoxM(grp, 1.4, 0.10, 1.4, [tx, ty + legH + 0.05, tz], M.concrete());

        /* ── tank body ── */
        const tankGeo = new THREE.CylinderGeometry(0.82, 0.82, 1.60, 24);
        tankMesh = new THREE.Mesh(tankGeo, M.tank());
        tankMesh.position.set(tx, ty + legH + 0.10 + 0.80, tz);
        tankMesh.castShadow = true;
        tankMesh.userData = {
            name: 'tank', service: 'Tank Leakage Repair',
            desc: 'Food-grade sealant — permanently watertight', baseColor: 0x1A2632
        };
        grp.add(tankMesh);
        interactives.push(tankMesh);

        /* tank dome cap */
        const capGeo = new THREE.SphereGeometry(0.84, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2.4);
        const cap = new THREE.Mesh(capGeo, M.tank_cap());
        cap.position.set(tx, ty + legH + 0.10 + 1.60 + 0.50, tz);
        cap.castShadow = true;
        grp.add(cap);

        /* inlet pipe */
        addBox(grp, 0.08, 1.10, 0.08, [tx - 0.60, ty + legH + 0.90, tz], M.pipe(), true);
        /* outlet pipe */
        addBox(grp, 0.08, 0.60, 0.08, [tx + 0.60, ty + legH + 0.40, tz + 0.30], M.pipe(), true);
        /* overflow pipe (horizontal) */
        addBox(grp, 0.08, 0.08, 0.80, [tx - 0.60, ty + legH + 1.45, tz], M.pipe());

        /* second smaller tank */
        const t2Geo = new THREE.CylinderGeometry(0.48, 0.48, 1.00, 18);
        const tank2 = new THREE.Mesh(t2Geo, M.tank());
        tank2.position.set(tx - 1.8, ty + legH * 0.8 + 0.50, tz + 0.6);
        tank2.castShadow = true;
        grp.add(tank2);
        const cap2Geo = new THREE.SphereGeometry(0.5, 14, 6, 0, Math.PI*2, 0, Math.PI/2.2);
        const cap2 = new THREE.Mesh(cap2Geo, M.tank_cap());
        cap2.position.set(tx - 1.8, ty + legH * 0.8 + 0.50 + 0.98, tz + 0.6);
        grp.add(cap2);
    }

    function buildRoofFixtures(grp, BW, BD, TH, SLB) {
        const ry = TH + SLB;

        /* AC outdoor unit — upper floor */
        const acMat = M.ac_white();
        const acGeo = new THREE.BoxGeometry(0.90, 0.60, 0.42);
        const ac1 = new THREE.Mesh(acGeo, acMat);
        ac1.position.set(-3.2, GHaprox() + 2.2, BD/2 + 0.04);
        ac1.castShadow = true;
        grp.add(ac1);
        /* AC grille lines */
        addBox(grp, 0.88, 0.04, 0.08, [-3.2, GHaprox() + 2.35, BD/2+0.25], M.metal());
        addBox(grp, 0.88, 0.04, 0.08, [-3.2, GHaprox() + 2.20, BD/2+0.25], M.metal());
        addBox(grp, 0.88, 0.04, 0.08, [-3.2, GHaprox() + 2.05, BD/2+0.25], M.metal());

        /* AC 2 (front, ground floor) */
        const ac2 = new THREE.Mesh(acGeo, acMat);
        ac2.position.set( 3.0, 1.75, BD/2 + 0.04);
        grp.add(ac2);

        /* TV antenna */
        addBox(grp, 0.04, 1.6,  0.04, [-2.5, ry + 0.80, 1.2], M.metal(), true);
        addBox(grp, 1.2,  0.04, 0.04, [-2.5, ry + 1.55, 1.2], M.metal());
        addBox(grp, 0.04, 0.04, 0.90, [-2.5, ry + 1.35, 1.2], M.metal());

        /* solar water heater (thin tank + panel) */
        const solarGeo = new THREE.CylinderGeometry(0.20, 0.20, 1.5, 12);
        const solar = new THREE.Mesh(solarGeo, M.metal());
        solar.rotation.z = Math.PI / 2;
        solar.position.set(-0.5, ry + 0.35, 1.5);
        solar.castShadow = true;
        grp.add(solar);

        /* safety/parapet light posts */
        for (let i = -1; i <= 1; i += 2) {
            addBox(grp, 0.06, 0.45, 0.06, [i * (BW/2), ry + TH*0 + 0.72 + 0.23, 0], M.metal(), true);
        }
    }

    function GHaprox() { return 3.2; }

    /* ─────────────────────────────── PARTICLE SYSTEMS ─── */
    function buildParticles() {
        particleSystems.heat     = makeParticles(260, initHeatPart,   0xFF5500, 0.11);
        particleSystems.cool     = makeParticles(180, initCoolPart,   0x22BBFF, 0.10);
        particleSystems.water    = makeParticles(220, initWaterPart,  0x0088CC, 0.09);
        particleSystems.drip     = makeParticles(90,  initDripPart,   0x0077BB, 0.10);
        particleSystems.seal     = makeParticles(70,  initSealPart,   0x00EE88, 0.11);
    }

    function makeParticles(count, initFn, color, size) {
        const geo  = new THREE.BufferGeometry();
        const pos  = new Float32Array(count * 3);
        const vel  = new Float32Array(count * 3);
        const ph   = new Float32Array(count);
        for (let i = 0; i < count; i++) initFn(pos, vel, ph, i);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat  = new THREE.PointsMaterial({
            size, color, transparent: true, opacity: 0.88,
            blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const pts  = new THREE.Points(geo, mat);
        pts.visible = false;
        pts.userData = { vel, ph };
        scene.add(pts);
        return pts;
    }

    /* ── particle init functions ── */
    const bx = buildingGroup ? buildingGroup.position.x : -0.5;

    function initHeatPart(pos, vel, ph, i) {
        pos[i*3]   = -0.5 + (Math.random() - 0.5) * 8.0;
        pos[i*3+1] = 6.4 + Math.random() * 3.8;
        pos[i*3+2] = (Math.random() - 0.5) * 5.5;
        vel[i*3]   = (Math.random() - 0.5) * 0.35;
        vel[i*3+1] = 0.55 + Math.random() * 0.85;
        vel[i*3+2] = (Math.random() - 0.5) * 0.35;
        ph[i]      = Math.random() * Math.PI * 2;
    }
    function initCoolPart(pos, vel, ph, i) {
        pos[i*3]   = -0.5 + (Math.random() - 0.5) * 7.5;
        pos[i*3+1] = 7.5 + Math.random() * 2.5;
        pos[i*3+2] = (Math.random() - 0.5) * 5.5;
        vel[i*3]   = (Math.random() - 0.5) * 0.22;
        vel[i*3+1] = -(0.28 + Math.random() * 0.45);
        vel[i*3+2] = (Math.random() - 0.5) * 0.22;
        ph[i]      = Math.random() * Math.PI * 2;
    }
    function initWaterPart(pos, vel, ph, i) {
        const side = Math.random() > 0.5 ? 1 : -1;
        pos[i*3]   = -0.5 + side * 4.0;
        pos[i*3+1] = 6.0 - Math.random() * 5.8;
        pos[i*3+2] = (Math.random() - 0.5) * 5.5;
        vel[i*3]   = 0;
        vel[i*3+1] = -(0.38 + Math.random() * 0.55);
        vel[i*3+2] = 0;
        ph[i]      = Math.random() * Math.PI * 2;
    }
    function initDripPart(pos, vel, ph, i) {
        pos[i*3]   = -0.5 + 2.2 + (Math.random() - 0.5) * 1.8;
        pos[i*3+1] = 5.0 - Math.random() * 0.8;
        pos[i*3+2] = -1.5 + (Math.random() - 0.5) * 1.8;
        vel[i*3]   = (Math.random() - 0.5) * 0.12;
        vel[i*3+1] = -(0.5 + Math.random() * 0.6);
        vel[i*3+2] = (Math.random() - 0.5) * 0.12;
        ph[i]      = Math.random() * Math.PI * 2;
    }
    function initSealPart(pos, vel, ph, i) {
        const theta = Math.random() * Math.PI * 2;
        const r     = 0.85 + Math.random() * 0.5;
        pos[i*3]   = -0.5 + 2.2 + Math.cos(theta) * r;
        pos[i*3+1] = 5.8 + Math.random() * 1.5;
        pos[i*3+2] = -1.5 + Math.sin(theta) * r;
        vel[i*3]   = Math.cos(theta) * 0.28;
        vel[i*3+1] = 0.28 + Math.random() * 0.4;
        vel[i*3+2] = Math.sin(theta) * 0.28;
        ph[i]      = Math.random() * Math.PI * 2;
    }

    /* ─────────────────────────────── PARTICLE UPDATE ─── */
    function updateParticles(dt) {
        const time = clock.getElapsedTime();

        if (particleSystems.heat.visible) {
            const p = particleSystems.heat.geometry.attributes.position.array;
            const { vel: v, ph } = particleSystems.heat.userData;
            for (let i = 0; i < p.length/3; i++) {
                p[i*3]   += Math.sin(time * 1.6 + ph[i]) * 0.014 * dt * 60;
                p[i*3+1] += v[i*3+1] * dt;
                if (p[i*3+1] > 14) { initHeatPart(p, v, ph, i); }
            }
            particleSystems.heat.geometry.attributes.position.needsUpdate = true;
        }

        if (particleSystems.cool.visible) {
            const p = particleSystems.cool.geometry.attributes.position.array;
            const { vel: v, ph } = particleSystems.cool.userData;
            for (let i = 0; i < p.length/3; i++) {
                p[i*3+1] += v[i*3+1] * dt;
                if (p[i*3+1] < 6.0) { initCoolPart(p, v, ph, i); }
            }
            particleSystems.cool.geometry.attributes.position.needsUpdate = true;
        }

        if (particleSystems.water.visible) {
            const p = particleSystems.water.geometry.attributes.position.array;
            const { vel: v } = particleSystems.water.userData;
            for (let i = 0; i < p.length/3; i++) {
                p[i*3+1] += v[i*3+1] * dt;
                if (p[i*3+1] < 0.1) { initWaterPart(p, v, particleSystems.water.userData.ph, i); }
            }
            particleSystems.water.geometry.attributes.position.needsUpdate = true;
        }

        if (particleSystems.drip.visible) {
            const p = particleSystems.drip.geometry.attributes.position.array;
            const { vel: v } = particleSystems.drip.userData;
            for (let i = 0; i < p.length/3; i++) {
                p[i*3+1] += v[i*3+1] * dt;
                if (p[i*3+1] < 0) { initDripPart(p, v, particleSystems.drip.userData.ph, i); }
            }
            particleSystems.drip.geometry.attributes.position.needsUpdate = true;
        }

        if (particleSystems.seal.visible) {
            const p = particleSystems.seal.geometry.attributes.position.array;
            const { vel: v, ph } = particleSystems.seal.userData;
            for (let i = 0; i < p.length/3; i++) {
                p[i*3]   += v[i*3]   * dt * 0.55;
                p[i*3+1] += v[i*3+1] * dt;
                p[i*3+2] += v[i*3+2] * dt * 0.55;
                const dx = p[i*3] - (-0.5 + 2.2);
                const dz = p[i*3+2] - (-1.5);
                if (Math.sqrt(dx*dx + dz*dz) > 3.5 || p[i*3+1] > 9) {
                    initSealPart(p, v, ph, i);
                }
            }
            particleSystems.seal.geometry.attributes.position.needsUpdate = true;
        }
    }

    /* ─────────────────────────────── INTERACTION ─── */
    function onMouseMove(e) {
        setMouse(e);
        autoRotating = false;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { autoRotating = true; }, 3500);
        doHover();
    }
    function onMouseLeave() {
        mouse.set(-10, -10);
        setHover(null);
    }
    function onTouch(e) {
        if (e.touches.length > 0) {
            setMouse({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
            doHover();
            handleClick();
        }
    }
    function onClick() { handleClick(); }

    function setMouse(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    }

    function doHover() {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactives);
        setHover(hits.length ? hits[0].object : null);
    }

    function setHover(mesh) {
        if (hoveredMesh === mesh) return;
        if (hoveredMesh && !activeEffects[hoveredMesh.userData.name]) {
            hoveredMesh.material.emissive?.set(0x000000);
            if (hoveredMesh.material.emissiveIntensity !== undefined)
                hoveredMesh.material.emissiveIntensity = 0;
        }
        hoveredMesh = mesh;
        if (mesh) {
            mesh.material.emissive = new THREE.Color(0x222A33);
            mesh.material.emissiveIntensity = 0.35;
            showTooltip(mesh.userData);
            canvas.style.cursor = 'pointer';
        } else {
            hideTooltip();
            canvas.style.cursor = 'default';
        }
    }

    function handleClick() {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactives);
        if (!hits.length) return;
        toggle(hits[0].object.userData.name);
    }

    function toggle(name) {
        const on = !activeEffects[name];
        activeEffects[name] = on;

        if (name === 'roof') {
            particleSystems.heat.visible = on;
            particleSystems.cool.visible = on;
            setEmissive(roofMesh, on, 0x0D0500);
            toggleLegend('hlRoof', on);
        }
        if (name === 'walls' || name === 'walls_upper') {
            activeEffects['walls'] = on;
            activeEffects['walls_upper'] = on;
            particleSystems.water.visible = on;
            setEmissive(wallsMesh, on, 0x001025);
            toggleLegend('hlWall', on);
        }
        if (name === 'tank') {
            particleSystems.drip.visible  = on;
            particleSystems.seal.visible  = on;
            setEmissive(tankMesh, on, 0x002A12);
            toggleLegend('hlTank', on);
        }
    }

    function setEmissive(mesh, on, color) {
        if (!mesh) return;
        mesh.material.emissive = new THREE.Color(on ? color : 0x000000);
        mesh.material.emissiveIntensity = on ? 0.4 : 0;
    }
    function toggleLegend(id, on) {
        document.getElementById(id)?.classList.toggle('active', on);
    }

    /* ─────────────────────────────── TOOLTIP ─── */
    const tooltip = document.getElementById('houseTooltip');
    const htIcon  = document.getElementById('htIcon');
    const htTitle = document.getElementById('htTitle');
    const htDesc  = document.getElementById('htDesc');
    const iconMap = { roof: '🔥', walls: '💧', walls_upper: '💧', tank: '🔧' };

    function showTooltip(ud) {
        if (!tooltip || !ud.service) return;
        htIcon.textContent  = iconMap[ud.name] || '✨';
        htTitle.textContent = ud.service;
        htDesc.textContent  = ud.desc;
        tooltip.classList.add('visible');
    }
    function hideTooltip() { tooltip?.classList.remove('visible'); }

    /* legend click pass-through */
    document.getElementById('hlRoof')?.addEventListener('click', () => toggle('roof'));
    document.getElementById('hlWall')?.addEventListener('click', () => toggle('walls'));
    document.getElementById('hlTank')?.addEventListener('click', () => toggle('tank'));

    /* ─────────────────────────────── ANIMATION LOOP ─── */
    let rotAngle = 0;
    function animate() {
        requestAnimationFrame(animate);
        const dt   = Math.min(clock.getDelta(), 0.05);
        const time = clock.getElapsedTime();

        if (autoRotating) {
            rotAngle += dt * 0.14;
            /* gentle pendulum — stay mostly front-facing */
            buildingGroup.rotation.y = Math.sin(rotAngle * 0.45) * 0.22;
        } else {
            buildingGroup.rotation.y += (0 - buildingGroup.rotation.y) * dt * 1.8;
        }

        /* subtle vertical float */
        buildingGroup.position.y = Math.sin(time * 0.4) * 0.03;

        updateParticles(dt);
        renderer.render(scene, camera);
    }

    /* ─────────────────────────────── HELPERS ─── */
    function addBox(parent, w, h, d, [px, py, pz], material, castShadow = false, receiveShadow = false) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
        m.position.set(px, py, pz);
        m.castShadow    = castShadow;
        m.receiveShadow = receiveShadow;
        parent.add(m);
        return m;
    }

    /* variant that always castShadow */
    function addBoxM(parent, w, h, d, [px, py, pz], material, castShadow = false) {
        return addBox(parent, w, h, d, [px, py, pz], material, castShadow, false);
    }

    /* ─────────────────────────────── RESIZE ─── */
    function onResize() {
        const W = canvas.parentElement.offsetWidth || 580;
        const H = 400;
        canvas.width  = W;
        canvas.height = H;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    }

    /* ─────────────────────────────── BOOT ─── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
