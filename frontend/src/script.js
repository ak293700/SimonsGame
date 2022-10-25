let player = document.querySelector('#player');
const step = 10;
const diameter = 50;
const radius = diameter/2;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

setPlayerPos(windowWidth / 2, windowHeight / 2);


document.addEventListener("keydown", (event) => {
    if (event.key === 'w')
    {
        movePlayer(0, -step);
    }
    if (event.key === 'd')
    {
        movePlayer(step, 0);
    }
    if (event.key === 's')
    {
        movePlayer(0, step);
    }
    if (event.key === 'a')
    {
        movePlayer(-step, 0);
    }
})
document.addEventListener("mousemove", (event) => turnPlayer(event.screenX, event.screenY))

function getPlayerPos(){
    return {
        x: Number(player.style.left.slice(0, -2)),
        y: Number(player.style.top.slice(0, -2))
    }
}

function setPlayerPos(newPosX, newPosY)
{

    if (newPosX < radius)
        newPosX = radius;
    else if (newPosX > windowWidth - radius)
        newPosX = windowWidth - radius;

    if (newPosY < radius)
        newPosY = radius;
    else if (newPosY > windowHeight - radius)
        newPosY = windowHeight - radius;

    player.style.left = `${newPosX}px`;
    player.style.top = `${newPosY}px`;

    return {
        x: newPosX,
        y: newPosY
    }
}


// deplace le joueur de moveX pixels sur en abscisee
// deplace le joueur de moveY pixels sur en ordonnee
function movePlayer(moveX, moveY)
{
    const pos = getPlayerPos();
    setPlayerPos(pos.x + moveX, pos.y + moveY)
}

function getPlayerAngle()
{
    return Number(player.style.rotate.slice(0, -3));
}


function setPlayerAngle(newDeg)
{
    player.style.rotate = `${newDeg}deg`;
}

function computeAngle(pos1, pos2)
{
    return Math.PI + Math.atan2(-pos2.x + pos1.x, pos2.y - pos1.y) * 180 / Math.PI;
}


function turnPlayer(mouseX, mouseY)
{
    const angle = computeAngle(getPlayerPos(), {x: mouseX, y: mouseY});
    setPlayerAngle(angle);
}

setPlayerAngle(180);
console.log(getPlayerAngle())
console.log(getPlayerPos())
