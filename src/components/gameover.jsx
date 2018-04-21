import React from "react";

const gameover = ({points, trigger}) => {

	if(trigger) {
		return(<div className="gameover">GAME OVER! Points: {points}</div>);
	} else {
			return(<div></div>);
		}
}

export default gameover;
