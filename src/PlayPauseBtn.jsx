import { useEffect } from "react";

const PlayPauseButton = ({playChart}) => {
    return <button onClick={playChart}>
        play
    </button>
}


export default PlayPauseButton;