import {diffVector, normalize} from "./utils.js";
import {Bullet} from "./Bullet.js";

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
      y: Number(this.entity.style.top.slice(0, -2)),
    };
  }

  shoot(playerPos)
  {
    const dir = normalize(diffVector(playerPos, {x: window.clientX, y: window.clientY}));

    const bullet = new Bullet(this, playerPos, 15, dir, this.damage);
    this.bullets.push(bullet);
  }
}

