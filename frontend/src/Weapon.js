import {normalize} from "./utils.js";

export class Weapon
{
    entity;

    constructor()
    {
        this.entity = document.createElement("div");
        this.entity.classList.add("weapon");
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
            x: window.screenX - playerPos.x,
            y: window.screenY - playerPos.y
        });

        new Bullet(playerPos, 4, dir);
    }
}

export class Bullet
{
    entity;
    pos;
    speed;
    speedVector;
    intervalFunction;

    constructor(pos, speed, speedVector)
    {
        this.speed = speed;
        this.speedVector = speedVector;

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
    }

    update()
    {
        const pos = this.getPos();
        if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight)
            this.destroy();

        this.setPos({x: pos.x + this.speedVector.x * this.speed, y: pos.y + this.speedVector.y * this.speed});
    }
}