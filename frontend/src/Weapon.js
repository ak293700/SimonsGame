import {areCollapsing, normalize} from "./utils.js";
import {Game} from "./Game.js";

export class Weapon
{
    entity;
    bullets = [];
    damage;

    constructor(damage)
    {
        this.entity = document.createElement("div");
        this.entity.classList.add("weapon");
        this.damage = damage;
    }

    getPos()
    {
        return {
            x: Number(this.entity.style.left.slice(0, -2)),
            y: Number(this.entity.style.top.slice(0, -2))
        }
    }

    shoot(playerPos)
    {
        const dir = normalize({
            x: window.clientX - playerPos.x,
            y: window.clientY - playerPos.y
        });

        const bullet = new Bullet(this, playerPos, 4, dir, this.damage);
        this.bullets.push(bullet);
    }


}

export class Bullet
{
    entity;
    speed;
    speedVector;
    intervalFunction;
    parentWeapon;
    radius;
    damage;

    constructor(parentWeapon, pos, speed, speedVector, damage)
    {
        this.parentWeapon = parentWeapon;
        this.speed = speed;
        this.speedVector = speedVector;
        this.radius = 3;
        this.damage = damage;

        this.entity = document.createElement("div");
        this.entity.classList.add("bullet")

        document.body.appendChild(this.entity);

        this.setPos(pos);
        this.intervalFunction = setInterval(() => {
            this.update()
        }, 10)
    }

    getPos()
    {
        return {
            x: Number(this.entity.style.left.slice(0, -2)),
            y: Number(this.entity.style.top.slice(0, -2))
        }
    }

    setPos(pos)
    {
        this.entity.style.left = `${pos.x}px`;
        this.entity.style.top = `${pos.y}px`;

        return pos;
    }

    destroy()
    {
        clearInterval(this.intervalFunction);
        this.entity.remove();

        const index = this.parentWeapon.bullets.indexOf(this);
        this.parentWeapon.bullets.splice(index, 1);
    }

    update()
    {
        const pos = this.getPos();
        if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight)
            this.destroy();
        else
        {
            this.setPos({x: pos.x + this.speedVector.x * this.speed, y: pos.y + this.speedVector.y * this.speed});

            for (let i = 0; i < Game.bots.length; i++)
            {
                const bot = Game.bots[i];
                if (areCollapsing(pos, this.radius, bot.getPos(), bot.radius))
                {
                    const dead = bot.takeDamage(this.damage);
                    if (dead)
                    {
                        Game.bots.splice(i, 1);
                        bot.destroy()
                        this.destroy()

                        return;
                    }

                }
            }
        }
    }
}