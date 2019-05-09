import React, { useEffect, useRef } from "react";
import "./Player.css";

const Player = ({ artist, title, streamUrl, onPause }) => {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.onpause = event => {
      onPause();
    };
  }, []); // empty array means no dependencies, i.e. never re-run to sync

  return (
    <div className="Player">
      {title} <span className="Player__artist">- {artist}</span>
      <br />
      <br />
      <audio controls ref={audioRef}>
        <source src={streamUrl} preload="none" type="audio/mpeg" />
        Na prehrávanie rádia je potrebné mať nainštalovaný novší prehliadač.
      </audio>
    </div>
  );
};

export default Player;
