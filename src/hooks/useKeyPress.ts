import { useState, useEffect } from "react";

const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler(e: KeyboardEvent) {
        if (e.key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = (e: KeyboardEvent) => {
        if (e.key === targetKey) {
            setKeyPressed(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    })

    return keyPressed
}

export default useKeyPress