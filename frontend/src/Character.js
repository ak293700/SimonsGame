import {computeAngle} from "./utils.js";

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
        this.entity = character;
        character.classList.add("character");

        let weapon = document.createElement("div");
        weapon.classList.add("weapon");

        document.body.appendChild(character);
        character.appendChild(weapon);

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

        console.log(`${newPos.x}px`, `${newPos.y}px`);

        this.entity.style.left = `${newPos.x}px`;
        this.entity.style.top = `${newPos.x}px`;

        return newPos;
    }

    // deplace le joueur de moveX pixels sur en abscisee
    // deplace le joueur de moveY pixels sur en ordonnee
     move(move)
     {
         const pos = this.getPos();
         this.setPos({x: pos.x + move.x, y: pos.y + move.y});
     }
}

export class Player extends Character
{
    constructor(pos, radius, speed)
    {
        console.log(pos);

        super(pos, radius, speed);
        this.entity.id = "player";

        document.addEventListener("keydown", (event) => {
            if (event.key === 'w')
                this.move(0, -speed);
            if (event.key === 'd')
                this.move(speed, 0);
            if (event.key === 's')
                this.move(0, speed);
            if (event.key === 'a')
                this.move(-speed, 0);
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

class Bot extends Character
{

}