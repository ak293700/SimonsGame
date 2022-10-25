export class Weapon
{
    entity;

    constructor()
    {
        this.entity = document.createElement("div");
        this.entity.classList.add("weapon");
    }
}

class Bullet
{
    entity;
    pos;
    speedVect;

    constructor(pos, speedVect)
    {
        this.setPos(pos);
        this.entity = document.createElement("div");
        this.entity.classList.add("bullet")


    }

    setPos(newPos)
    {
        // if (newPos.x < this.radius)
        //     newPos.x = this.radius;
        // else if (newPos.x > window.innerWidth - this.radius)
        //     newPos.x = window.innerWidth - this.radius;
        //
        // if (newPos.y < this.radius)
        //     newPos.y = this.radius;
        // else if (newPos.y > window.innerHeight - this.radius)
        //     newPos.y = window.innerHeight - this.radius;

        this.entity.style.left = `${newPos.x}px`;
        this.entity.style.top = `${newPos.y}px`;

        return newPos;
    }
}