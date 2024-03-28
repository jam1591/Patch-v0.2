//Game Div
let GAME = document.getElementById('game_container');

// Canvas
let CANVAS = document.getElementById('myCanvas');
let CTX = CANVAS.getContext('2d');
CANVAS.width = 1500;
CANVAS.height = 800;

const CANVAS_SIZE = {
    width: CANVAS.width,
    height: CANVAS.height
};

// Weapons
let PISTOL;
let RIFLE;
let SNIPER;
let FLAMETHROWER;
let PROJECTOR;

// Components
let INVENTORY;
let SKILLS;
let PLAYER;
let CAMERA;
let MONSTERS;
let INTERFACE_COMBAT;
let INTERFACE_SAFE;
let EVENT_MANAGER;

// Scenes
let ARENA;
let SCENE_MANAGER;

// Enums
let SKILL_NAME;
let WEAPON_NAME;
let WEAPON_TYPE;
let WEAPON_RELOAD_TYPE;
let WEAPON_TRIGGER;
let SCENES;

// Helper
let UTILS

// Misc
let MOUSE = {
    x: 420,
    y: 200
};

const JSON_FILE_PATHS_TO_READ = {
    weapon: "./asset/data/data_weapon.json",
    player: "./asset/data/data_player.json",
    map: "./asset/data/data_map.json",
    skill: "./asset/data/data_skill.json",
};

parse_data()

function animate() {
    CTX.save();
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.width);
    CTX.imageSmoothingEnabled = false;
    SCENE_MANAGER.update();
    SCENE_MANAGER.draw();
    CTX.restore();
    animationID = requestAnimationFrame(animate);
}

async function parse_data() {

    const json_data = {};

    for (const key in JSON_FILE_PATHS_TO_READ) {
        const response = await fetch(JSON_FILE_PATHS_TO_READ[key]);
        const data = await response.json();
        json_data[key] = data;
    }

    initialise_enums();
    initialise_weapon_classes(json_data.weapon);
    initialise_player_classes(json_data.player, json_data.skill);
    initialise_camera_calasses();
    initialise_monster_calasses();
    initialise_interface_calasses();
    initialise_event_manager_class();
    initialise_scene_clases(json_data.map);
    initialise_helper_classes();

    animate();

    EVENT_MANAGER.addEventListenerGlobal();

    simulation();
}

function initialise_enums() {
    SKILL_NAME = { Teleport: 'Teleport', Heal: 'Heal', Run: 'Run' };
    WEAPON_NAME = { Rifle: 'Rifle', SniperRifle: 'Sniper Rifle', Pistol: 'Pistol', Flamethrower: 'Flamethrower', Projector: 'Projector' };
    WEAPON_TYPE = { Firearm: 'Firearm', Incendiary: 'Incendiary' };
    WEAPON_RELOAD_TYPE = { Charge: 'Charge', Standard: 'Standard' };
    WEAPON_TRIGGER = { Manual: 'Manual', Automatic: 'Automatic' };
    SCENES = { Arena: 'Arena', Town: 'Town' };
}

function initialise_weapon_classes(data) {
    PISTOL = new Pistol(new Magazine(data.pistol.magazine), new FirearmMatrix(data.pistol.matrix), data.pistol.category)
    RIFLE = new Rifle(new Magazine(data.rifle.magazine), new FirearmMatrix(data.rifle.matrix), data.rifle.category)
    SNIPER = new Sniper(new Magazine(data.sniper.magazine), new FirearmMatrix(data.sniper.matrix), data.sniper.category)
    FLAMETHROWER = new Flamethrower(new Magazine(data.flamethrower.magazine), new IncendiaryMatrix(data.flamethrower.matrix), data.flamethrower.category);
}

function initialise_player_classes(dataPlayer, dataSkill) {
    INVENTORY = new Inventory([PISTOL, SNIPER, RIFLE, FLAMETHROWER], dataPlayer.inventory);
    SKILLS = new Skills(dataSkill);
    PLAYER = new Patch(SKILLS, INVENTORY, dataPlayer);
    SKILLS.setPlayer(PLAYER);
}

function initialise_camera_calasses() {
    CAMERA = new Camera(PLAYER, CANVAS_SIZE);
}

function initialise_interface_calasses() {
    INTERFACE_COMBAT = new Interface({ skill: true, health: true, weapon: true }, PLAYER, CANVAS_SIZE, CAMERA);
    INTERFACE_SAFE = new Interface({ skill: true, health: true, weapon: true }, PLAYER, CANVAS_SIZE, CAMERA);
}

function initialise_monster_calasses() {
    MONSTERS = new MonsterManager(PLAYER);
}

function initialise_event_manager_class() {
    EVENT_MANAGER = new EvantManager({ player: PLAYER, camera: CAMERA }, CANVAS);
}

function initialise_scene_clases(dataMap) {
    ARENA = new Arena(
        dataMap.arena,
        {
            player: PLAYER,
            monsters: MONSTERS,
            camera: CAMERA,
            interface: INTERFACE_COMBAT,
            event: EVENT_MANAGER
        });
    SCENE_MANAGER = new SceneManager({ [SCENES.Arena]: ARENA });
}

function initialise_helper_classes() {
    UTILS = new Utils();
}

function simulateEvent(value) {
    const eventKey1 = new KeyboardEvent('keydown', {
        key: `${value}`
    });

    document.dispatchEvent(eventKey1);

    setTimeout(() => {
        const eventKey2 = new KeyboardEvent('keyup', {
            key: `${value}`
        });
        document.dispatchEvent(eventKey2);
    }, 10);
}

async function simulation() {
    await delay(1000);
        simulateEvent("Enter");
        PLAYER.hp -= 10;

    await delay(1000);
        simulateEvent(" ");

    await delay(1000);
        simulateEvent("E");

    await delay(1000);
        simulateEvent("F");

    await delay(1000);
        if (LOG_COUNT == 14) {
            console.log(`SUCCESS: ${LOG_COUNT}/14`);
        } else {
            console.log(`FAIL: ${LOG_COUNT}/14`);
        }
        CANVAS.remove();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let LOG_COUNT = 0;

function customLog(message) {
    LOG_COUNT++;
    console.log(message);
}