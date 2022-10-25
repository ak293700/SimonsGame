export class Weapon
{
    entity;

    constructor()
    {
        this.entity = document.createElement("div");
        this.entity.classList.add("weapon");
    }
}

export class Bullet
{
    entity;
    pos;
    speedVector;
    intervalFunction;

    constructor(pos, speedVector)
    {
        console.log('create bullet');

        this.speedVector = speedVector;

        this.entity = document.createElement("div");
        this.entity.classList.add("bullet")

        document.body.appendChild(this.entity);

        console.log(this.getPos())

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

        this.setPos({x: pos.x + this.speedVector.x, y: pos.y + this.speedVector.y});
    }
}