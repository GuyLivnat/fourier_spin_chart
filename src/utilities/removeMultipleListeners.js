const removeMultipleListeners = (id, listeners) => {
    const element = document.getElementById(id);

    if (listeners.length) {
        for (let listener of listeners) {
            let evnt = listener.envt;
            let func = listener.func
            element.removeEventListener(evnt, func)
        }
    }
}

export default removeMultipleListeners;