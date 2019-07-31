import React, { useEffect, useRef } from "react";
import "./Player.css";

import { usePlayerStateToggle } from "./hooks/usePlayerStateToggle";
import { VolumeRocker } from "./VolumeRocker";

const Player = ({ artist, title, streamUrl, isMobile }) => {
  const [state, toggleState] = usePlayerStateToggle();

  const audio = useRef();
  const playerRef = useRef();

  useEffect(() => {
    playerRef.current.focus();

    if (state === "playing") {
      audio.current = new Audio(`${streamUrl}?${Date.now()}`);
      audio.current.play();
    } else if (state === "stopped") {
      audio.current.pause();
      audio.current = undefined;
    }
  }, [state]);

  return (
    <div
      className="Player"
      ref={ref => {
        playerRef.current = ref;
      }}
    >
      <div
        className={
          "Player__button Player__flex-fixed" +
          (state === "playing" ? " Player__button--playing" : "")
        }
        onClick={toggleState}
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
      {!isMobile && (
        <div className=".Player__flex-fixed">
          <VolumeRocker
            onChange={el => {
              audio.current.volume = el.target.value;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
