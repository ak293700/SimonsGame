export class Character
{
    entity; // the entity in the html
    radius;
    speed;
    health;
    maxHealth;
    damage;
    active;
    intervalId;

    constructor(pos, radius, speed, maxHealth, damage)
    {
        this.active = false;
        this.radius = radius;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.damage = damage

        this.entity = document.createElement("div");
        this.entity.classList.add("character");

        // Add eyes
        this.entity.innerHTML = '<div class="eye"></div><div class="eye"></div>';


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
        this.active = false;
        clearInterval(this.intervalId);
    }
}



