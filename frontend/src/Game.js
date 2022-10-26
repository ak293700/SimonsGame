import {Player} from "./Player.js";
import {KeyManager} from "./KeyManager.js";
import {Bot} from "./Bot.js";

export class Game
{
    static player;
    static bots;
    static botNumber;
    static overlay = document.querySelector("#overlay-msg");
    static wave = document.querySelector("#wave-number");
    static active = false;

    static init(botNumber)
    {
        Game.botNumber = botNumber;
        Game.player = new Player({x: window.innerWidth / 2, y: window.innerHeight / 2}, 25, 7, 10);
        // Init the key manager property
        KeyManager.init();

        Game.start();
    }

    static newWave(botNumber = Game.botNumber)
    {
        Game.updateWaveNumber();

        Game.botNumber = botNumber;
        Game.bots = [];

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
    }

    static finish()
    {
        Game.setActive(false);
        Game.bots.forEach(bot => bot.destroy(false));
        Game.bots = [];
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

        setTimeout(() => {
            Game.botNumber += 2;
            Game.start();
        }, 5000);
    }

    static lose()
    {
        Game.writeOnOverlay("You lose !");
        Game.finish();

        setTimeout(() => {
            Game.wave.innerText = "";
            Game.init(Game.botNumber / 2 + 1);
        }, 5000);
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
        Game.newWave();
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
        if (Game.wave.innerText === "")
            Game.wave.innerText = "1";
        else
            Game.wave.innerText = Number(Game.wave.innerText) + 1;
    }
}