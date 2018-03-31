import React from "react";
import "./Player.css";

const Player = ({ artist, title, streamUrl }) => (
  <div className="Player">
    {title} <span className="Player__artist">- {artist}</span>
    <br />
    <br />
    <audio controls>
      <source src={streamUrl} preload="none" type="audio/mpeg" />
      Na prehrávanie rádia je potrebné mať nainštalovaný novší prehliadač.
    </audio>
  </div>
);

export default Player;
