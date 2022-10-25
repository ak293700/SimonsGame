import {areCollapsing, normalize} from "./utils.js";
import {Character} from "./Character.js";
import {Game} from "./Game.js";

export class Bot extends Character
{
    canHit = true;

    constructor(pos, botType)
    {
        let radius = 25;
        let speed = 5;
        let health = 100;
        let damage = 20;

        if (botType === "speed-bot")
        {
            radius = 15;
            speed = 10;
            health = 50;
            damage = 10;
        }
        else if (botType === "fat-bot")
        {
            radius = 35;
            speed = 3;
            health = 200;
            damage = 50;
        }

        super(pos, radius, speed, health, damage);

        this.entity.innerHTML = '<div class="eye"></div><div class="eye"></div>';
        this.entity.classList.add("bot")

        if (botType !== undefined)
            this.entity.classList.add(botType)

        this.intervalId = setInterval(() => {
            this.update()
        }, 30);
    }

    destroy(doThink = true)
    {
        super.destroy();
        if (!doThink)
            return;

        if (Game.bots.length === 0)
            Game.win();
    }

    takeDamage(damage)
    {
        const dead = super.takeDamage(damage);
        if (dead)
            this.destroy();

        // change the opacity
        this.entity.style.opacity = `.${Math.floor(this.health / this.maxHealth * 100)}`;

        return dead;
    }

    update()
    {
        if (!this.active || !this.canHit)
            return;

        const playerPos = Game.player.getPos();
        const pos = this.getPos();
        const dir = normalize({
            x: playerPos.x - pos.x,
            y: playerPos.y - pos.y
        });

        dir.x *= this.speed;
        dir.y *= this.speed;


        this.move(dir);

        if (areCollapsing(pos, this.radius, playerPos, Game.player.radius))
        {
            Game.player.takeDamage(this.damage);
            this.canHit = false;
            setTimeout(() => this.canHit = true, 1000);
        }
    }
}