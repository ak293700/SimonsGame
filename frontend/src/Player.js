import {Weapon} from "./Weapon.js";
import {KeyManager} from "./KeyManager.js";
import {computeAngle} from "./utils.js";
import {Character} from "./Character.js";
import {Game} from "./Game.js";

export class Player extends Character
{
    weapon;
    hpEntity;

    constructor(pos, radius, speed, damage)
    {
        super(pos, radius, speed, 100, damage);
        window.clientX = pos.x;
        window.clientY = pos.y - 1;

        this.entity.id = "player";

        this.weapon = new Weapon(damage);
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

            this.turn(window.clientX, window.clientY);
        });

        document.addEventListener("mousemove", (event) => {
            if (!this.active)
                return;

            window.clientX = event.clientX;
            window.clientY = event.clientY;
            this.turn(event.clientX, event.clientY)
        });

        this.intervalId = setInterval(() => {
            if (!this.active)
                return;

            this.shoot()
        }, 150);

        this.hpEntity = document.querySelector("#hp-content");
        this.hpEntity.style.width = "100%";
        this.hpEntity.style.backgroundColor = "forestgreen";
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
        this.hpEntity.style.width = `${this.health / this.maxHealth * 100}%`

        if (dead)
            this.destroy();

        return dead;
    }

    destroy(doThink = true)
    {
        super.destroy();
        if (!doThink)
            return;

        this.hpEntity.style.width = "100%";
        this.hpEntity.style.backgroundColor = "crimson";

        Game.lose();
    }
}