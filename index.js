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
let TOWN;
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
let MOUSE = {};
const JSON_FILE_PATHS_TO_READ = {
    weapon: "./asset/data/data_weapon.json",
    player: "./asset/data/data_player.json",
    map: "./asset/data/data_map.json",
    npc: "./asset/data/data_npc.json",
    skill: "./asset/data/data_skill.json",
    shop: "./asset/data/data_shop.json",
};

start_game();

function start_game(){
    GAME.innerHTML = `
        <div id="start_game">
            <button>&#x25B6 RUN GAME</button
        </div>
    `;
}

function click_handle(){
    GAME.innerHTML = ``;
    parse_data();
    document.removeEventListener('click', click_handle);
}

document.getElementById("start_game").addEventListener('click', click_handle);

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

    for(const key in JSON_FILE_PATHS_TO_READ){
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
    initialise_scene_clases(json_data.map, json_data.npc, json_data.shop);
    initialise_helper_classes();

    animate();

    EVENT_MANAGER.addEventListenerGlobal();
}

function initialise_enums(){
    SKILL_NAME = {Teleport: 'Teleport', Heal: 'Heal',  Run: 'Run'};
    WEAPON_NAME = {Rifle: 'Rifle', SniperRifle: 'Sniper Rifle' , Pistol: 'Pistol', Flamethrower: 'Flamethrower', Projector: 'Projector'};
    WEAPON_TYPE = {Firearm: 'Firearm', Incendiary: 'Incendiary'};     
    WEAPON_MODIFIER = {Basic: 'Basic'};
    WEAPON_RELOAD_TYPE = {Charge: 'Charge', Standard: 'Standard'};     
    WEAPON_TRIGGER = {Manual: 'Manual', Automatic: 'Automatic'};     
    SCENES = {Arena: 'Arena', Town: 'Town'};         
}

function initialise_weapon_classes(data) {
    PISTOL = new Pistol(new Magazine(data.pistol.magazine), new FirearmMatrix(data.pistol.matrix), data.pistol.category)
    RIFLE = new Rifle(new Magazine(data.rifle.magazine), new FirearmMatrix(data.rifle.matrix), data.rifle.category)
    SNIPER = new Sniper(new Magazine(data.sniper.magazine), new FirearmMatrix(data.sniper.matrix), data.sniper.category)
    FLAMETHROWER = new Flamethrower(new Magazine(data.flamethrower.magazine), new IncendiaryMatrix(data.flamethrower.matrix), data.flamethrower.category);
}

function initialise_player_classes(dataPlayer, dataSkill) {
    INVENTORY = new Inventory([PISTOL,SNIPER,  RIFLE, FLAMETHROWER], dataPlayer.inventory);
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

function initialise_event_manager_class(){
    EVENT_MANAGER = new EvantManager({ player: PLAYER, camera: CAMERA }, CANVAS);
}

function initialise_scene_clases(dataMap, dataNpc, dataShop){
    ARENA = new Arena(
        dataMap.arena,
        { 
            player: PLAYER, 
            monsters: MONSTERS, 
            camera: CAMERA, 
            interface: INTERFACE_COMBAT, 
            event: EVENT_MANAGER 
        });
    TOWN = new Town(
        dataMap.town,
        {
            player: PLAYER,
            portal: new Portal(dataNpc.portal, PLAYER),
            shop: new Shop(dataNpc.shop, PLAYER, dataShop),
            event: EVENT_MANAGER,
            interface: INTERFACE_SAFE,
            camera: CAMERA
        });
    SCENE_MANAGER = new SceneManager({ [SCENES.Arena]: ARENA, [SCENES.Town]: TOWN });
}

function initialise_helper_classes(){
    UTILS = new Utils();
}