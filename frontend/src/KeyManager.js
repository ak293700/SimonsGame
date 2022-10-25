export class KeyManager
{
    static keyPressed = [];
    static event = new Event('KeyManager');

    static init()
    {
        window.addEventListener('keydown', (event) => {
            const key = event.key;
            if (!KeyManager.isPressed(key))
            {
                KeyManager.keyPressed.push(key);
                console.log(`add ${key}`);
            }
        });
        window.addEventListener('keyup', (event) => {
            const key = event.key;
            const index = KeyManager.keyPressed.indexOf(key);
            if (index !== -1)
            {
                KeyManager.keyPressed.splice(index, 1);
                console.log(`remove ${key} - ${index}`)
            }
        });

        setInterval(() => {
            window.dispatchEvent(KeyManager.event);
        }, 10);
    }

    static isPressed(key)
    {
        return KeyManager.keyPressed.indexOf(key) !== -1;
    }

    // static subscribe()
    // {}
}
