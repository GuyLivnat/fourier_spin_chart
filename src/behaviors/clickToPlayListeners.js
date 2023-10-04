
const clickToPlayListener = (playFunc) => {
    let timer = false;

    const startTimer = () => {
        timer = true;
        setTimeout(()=> timer = false, 200);
    }
    
    const endTimer = () => {
        if (timer) playFunc();
        timer = false;

    }

    const listeners = []
    listeners.push({evnt:'mousedown', func:startTimer}, {evnt:'mouseup', func:endTimer});
    return listeners;
}

export default clickToPlayListener;
