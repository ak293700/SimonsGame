import {computeAngle} from "./utils.js";
import {Weapon} from "./Weapon.js"

export class Character
{
    entity; // the entity in the html
    radius;
    speed;

    constructor(pos, radius, speed)
    {
        this.radius = radius;
        this.speed = speed

        let character = document.createElement("div");
        character.classList.add("character");
        this.entity = character;

        // On rajoute le caractère dans la page
        document.body.appendChild(character);

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
}

export class Player extends Character
{
    weapon;
    constructor(pos, radius, speed)
    {
        super(pos, radius, speed);
        this.entity.id = "player";

        this.weapon = new Weapon();
        this.entity.appendChild(this.weapon.entity)

        document.addEventListener("keydown", (event) => {
            if (event.key === 'w')
                this.move({x: 0, y: -speed});
            if (event.key === 'd')
                this.move({x: speed, y: 0});
            if (event.key === 's')
                this.move({x: 0, y: speed});
            if (event.key === 'a')
                this.move({x: -speed, y: 0});
        })
        document.addEventListener("mousemove", (event) => this.turn(event.screenX, event.screenY))
    }

    setAngle(newDeg)
    {
        // console.log(newDeg)
        this.entity.style.rotate = `${newDeg}deg`;
    }

    turn(mouseX, mouseY)
    {
        const angle = computeAngle(this.getPos(), {x: mouseX, y: mouseY});
        this.setAngle(angle);
    }
}

export class Bot extends Character
{
    constructor(pos, botType)
    {
        let radius = 25;
        let speed = 10;

        if (botType === "speed-bot")
        {
            radius = 15;
            speed = 15;
        }
        else if (botType === "fat-bot")
        {
            radius = 35;
            speed = 5;
        }

        super(pos, radius, speed);
        // <div class="character"></div>

        this.entity.classList.add("bot")

        if (botType !== undefined)
            this.entity.classList.add(botType)
    }
}