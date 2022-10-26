export function computeAngle(pos1, pos2)
{
    const ref = {
        x: 0,
        y: -1
    }

    // direction
    const dir = normalize({
        x: pos2.x - pos1.x,
        y: pos2.y - pos1.y
    })

    const angle = Math.acos(dir.x * ref.x + dir.y * ref.y) * 180 / Math.PI;
    return dir.x < 0 ? 360 - angle : angle;
}

function norm(v)
{
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

export function normalize(v)
{
    const n = norm(v);
    return {
        x: v.x / n,
        y: v.y / n
    }
}

export function areCollapsing(pos1, r1, pos2, r2)
{
    const vect = {
        x: pos2.x - pos1.x,
        y: pos2.y - pos1.y,
    }

    if (norm(vect) < r1 + r2)
        return true;

    return false;
}