import React, { useEffect, useState, useRef } from "react";
import "./Player.css";

const Player = ({ artist, title, streamUrl }) => {
  const [state, setState] = useState("");

  const audio = useRef();

  const toggle = () => {
    if (state === "playing") {
      setState("stopped");
    } else {
      setState("playing");
    }
  };

  useEffect(() => {
    if (state === "playing") {
      audio.current = new Audio(`${streamUrl}?${Date.now()}`);
      audio.current.play();
    } else if (state === "stopped") {
      audio.current.pause();
      audio.current = undefined;
    }
  }, [state]);

  return (
    <div className="Player">
      <div
        className={
          "Player__button" +
          (state === "playing" ? " Player__button--playing" : "")
        }
        onClick={toggle}
      >
        {state === "playing" ? (
          <svg className="Player__play" viewBox="0 0 24 24">
            <path fill="#000000" d="M18,18H6V6H18V18Z" />
          </svg>
        ) : (
          <svg className="Player__play" viewBox="0 0 24 24">
            <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
        )}
      </div>
      <div className="Player__text">
        {title}{" "}
        <span className="Player__artist">
          <br /> {artist}
        </span>
      </div>
    </div>
  );
};

export default Player;
