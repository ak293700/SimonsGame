import {Player} from "./Character.js";
import {Bullet} from "./Weapon.js"

const step = 10;
const player = new Player({x: window.innerWidth / 2, y: window.innerHeight / 2}, 50, 10);
// const bot = new Bot({x: 100, y: 100});

const bullet = new Bullet({x: 0, y: 0}, {x: 2, y: 2});
