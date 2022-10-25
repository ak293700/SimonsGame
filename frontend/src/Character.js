import {computeAngle} from "./utils.js";
import {Weapon} from "./Weapon.js"
import {KeyManager} from "./KeyManager.js";

export class Character
{
    entity; // the entity in the html
    radius;
    speed;
    health;

    constructor(pos, radius, speed, health)
    {
        this.radius = radius;
        this.speed = speed;
        this.health = health;

        this.entity = document.createElement("div");
        this.entity.classList.add("character");

        // On rajoute le caractère dans la page
        document.body.appendChild(this.entity);

        this.setPos(pos);
    }

    getPos(){
        return {
            x: Number(this.entity.style.left.slice(0, -2)),
            y: Number(this.entity.style.top.slice(0, -2))
        }
    }

    setPos(newPos)
    {
        if (newPos.x < this.radius)
            newPos.x = this.radius;
        else if (newPos.x > window.innerWidth - this.radius)
            newPos.x = window.innerWidth - this.radius;

        if (newPos.y < this.radius)
            newPos.y = this.radius;
        else if (newPos.y > window.innerHeight - this.radius)
            newPos.y = window.innerHeight - this.radius;

        this.entity.style.left = `${newPos.x}px`;
        this.entity.style.top = `${newPos.y}px`;

        return newPos;
    }

    // move: {x: 0, y: 0}
    move(move)
    {
        const pos = this.getPos();
        this.setPos({x: pos.x + move.x, y: pos.y + move.y});
    }

    takeDamage(damage)
    {
        this.health -= damage;
        return this.health <= 0;
    }

    destroy()
    {
        this.entity.remove();
    }
}

export class Player extends Character
{
    weapon;
    constructor(pos, radius, speed)
    {
        super(pos, radius, speed, 100);
        this.entity.id = "player";

        this.weapon = new Weapon();
        this.entity.appendChild(this.weapon.entity)

        // subscribe to event KeyManager

        window.addEventListener("KeyManager", () => {
            if (KeyManager.isPressed('w'))
                this.move({x: 0, y: -speed});
            if (KeyManager.isPressed('d'))
                this.move({x: speed, y: 0});
            if (KeyManager.isPressed('s'))
                this.move({x: 0, y: speed});
            if (KeyManager.isPressed('a'))
                this.move({x: -speed, y: 0});
        });

        document.addEventListener("mousemove", (event) => {
            window.screenX = event.screenX;
            window.screenY = event.screenY;
            this.turn(event.screenX, event.screenY)
        });

        setInterval(() => {
            this.shoot()
        }, 250);
    }

    setAngle(newDeg)
    {
        this.entity.style.rotate = `${newDeg}deg`;
    }

    turn(mouseX, mouseY)
    {
        const angle = computeAngle(this.getPos(), {x: mouseX, y: mouseY});
        this.setAngle(angle);
    }

    shoot()
    {
        this.weapon.shoot(this.getPos());
    }

    takeDamage(damage)
    {
        const dead = super.takeDamage(damage);
        if (dead)
            this.destroy();

        return dead;
    }

    destroy()
    {
        super.destroy();
        console.log("You loose");
    }
}

export class Bot extends Character
{
    constructor(pos, botType)
    {
        let radius = 25;
        let speed = 10;
        let health = 100;

        if (botType === "speed-bot")
        {
            radius = 15;
            speed = 15;
            health = 50;
        }
        else if (botType === "fat-bot")
        {
            radius = 35;
            speed = 5;
            health = 200
        }

        super(pos, radius, speed, health);
        // <div class="character"></div>

        this.entity.classList.add("bot")

        if (botType !== undefined)
            this.entity.classList.add(botType)
    }

    destroy()
    {
        super.destroy();
        console.log('You killed an ennemie');
    }

    takeDamage(damage)
    {
        const dead = super.takeDamage(damage);
        if (dead)
            this.destroy();

        return dead;
    }
}