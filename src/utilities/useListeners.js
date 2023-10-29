import { useEffect } from "react";

const useListeners = (id, listeners, dependencies=[]) => {
    useEffect(() => {
        const element = document.getElementById(id);

        for (let listener of listeners) {
            element.addEventListener(listener.evnt, listener.func)
        }

        return () => {
            for (let listener of listeners) {
                element.removeEventListener(listener.evnt, listener.func);
            }
        }
    }, dependencies)
}

export default useListeners;