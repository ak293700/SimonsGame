export function computeAngle(pos1, pos2)
{


    // pos1 = normalize(pos1);
    // pos2 = normalize(pos2);

    const ref = {
        x: 0,
        y: -1
    }

    // direction
    const dir = normalize({
        x: pos2.x - pos1.x,
        y: pos2.y - pos1.y
    })

    console.log(dir);

    let angle = Math.acos(dir.x * ref.x + dir.y * ref.y)  * 180 / Math.PI;

    if (dir.x < 0)
        angle = 360 - angle;

    console.log(angle);

    return angle;

    // return Math.PI + Math.atan2(-pos2.x + pos1.x, pos2.y - pos1.y) * 180 / Math.PI;
    // return Math.PI + Math.atan2(-dir.x + ref.x, dir.y - ref.y) * 180 / Math.PI;

}

function norm(v)
{
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

function normalize (v)
{
    const n = norm(v);
    return {
        x: v.x/n,
        y: v.y/n
    }
}