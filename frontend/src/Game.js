import {Player} from "./Player.js";
import {KeyManager} from "./KeyManager.js";
import {Bot} from "./Bot.js";

export class Game
{
    static player;
    static bots;
    static botsNumber;
    static overlay = document.querySelector("#overlay-msg");
    static wave = document.querySelector("#wave-number");
    static active = false;

    static init(botNumber)
    {
        Game.start();

        Game.player = new Player({x: window.innerWidth / 2, y: window.innerHeight / 2}, 25, 7, 10);
        Game.bots = [];
        Game.botsNumber = botNumber;

        for (let i = 0; i < botNumber; i++)
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
            Game.bots.push(bot);
        }

        // Init the key manager property
        KeyManager.init();
    }

    static finish()
    {
        Game.player.destroy(false);
        Game.bots.forEach(bot => bot.destroy(false));

        setTimeout(() => {
            Game.init(Game.botsNumber + 1);
        }, 5000);
    }

    static writeOnOverlay(text)
    {
        Game.overlay.innerText = text;
        Game.overlay.style.padding = text === "" ? "0" : "15px";
    }

    static win()
    {
        Game.writeOnOverlay("You win !");
        Game.finish();
    }

    static lose()
    {
        Game.writeOnOverlay("You lose !");

        console.log(Game.botsNumber);
        Game.botsNumber /= 2;
        console.log(Game.botsNumber);
        Game.wave.innerText = "";
        Game.finish();
    }

    static setActive(active)
    {
        Game.active = active;
        Game.player.active = active;
        for (const bot of Game.bots)
            bot.active = active;
    }

    static start()
    {
        Game.updateWaveNumber()
        Game.writeOnOverlay("3");
        setTimeout(() => {
            Game.writeOnOverlay("2");
            setTimeout(() => {
                Game.writeOnOverlay("1");
                setTimeout(() => {
                    Game.writeOnOverlay("");
                    Game.setActive(true);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    static updateWaveNumber()
    {
        console.log(Game.wave.innerText);
        if (Game.wave.innerText === "")
            Game.wave.innerText = "1";
        else
            Game.wave.innerText = Number(Game.wave.innerText) + 1;
    }
}