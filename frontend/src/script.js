import {Bot, Player} from "./Character.js";
import {KeyManager} from "./KeyManager.js";

// Init the key manager property
KeyManager.init();

const player = new Player({x: window.innerWidth / 2, y: window.innerHeight / 2}, 25, 7);
export let bots = [];

for (let i = 0; i < 10; i++)
{
    // generate random pos within the window screen
    const pos = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    };
    let botType = undefined;
    const proba = Math.random();
    if (proba < 0.2)
        botType = "fat-bot";
    else if (proba < 0.4)
        botType = "speed-bot";


    const bot = new Bot(pos, botType);
    bots.push(bot);
}

