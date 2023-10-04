import { useEffect } from "react";

const useListeners = (id, listeners, dependencies=[]) => {
    useEffect(() => {
        const element = document.getElementById(id);

        for (let listener of listeners) {
            let evnt = listener.evnt;
            let func = listener.func;
            element.addEventListener(evnt, func)
        }

        return () => {
            for (let listener of listeners) {
                let evnt = listener.evnt;
                let func = listener.func
                element.removeEventListener(evnt, func);
            }
        }
    }, dependencies)
}

export default useListeners;