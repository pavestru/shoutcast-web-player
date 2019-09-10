import React, { useState, useEffect, useRef } from "react";
import "./Player.css";

import { usePlayerStateToggle } from "./hooks/usePlayerStateToggle";
import { VolumeRocker } from "./VolumeRocker";

const Player = ({ artist, title, streamUrls, isMobile }) => {
  const [state, toggleState] = usePlayerStateToggle();
  const [volume, setVolume] = useState(1);

  const audio = useRef();
  const playerRef = useRef();

  useEffect(() => {
    playerRef.current.focus();

    if (state === "playing") {
      audio.current = new Audio(`${streamUrls[0]}?${Date.now()}`);
      audio.current.addEventListener("error", e => {
        switch (e.target.error.code) {
          case e.target.error.MEDIA_ERR_ABORTED:
            alert("You aborted the video playback.");
            break;
          case e.target.error.MEDIA_ERR_NETWORK:
            alert("A network error caused the audio download to fail.");
            break;
          case e.target.error.MEDIA_ERR_DECODE:
            alert(
              "The audio playback was aborted due to a corruption problem or because the video used features your browser did not support."
            );
            break;
          case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            alert(
              "The video audio not be loaded, either because the server or network failed or because the format is not supported."
            );
            break;
          default:
            alert("An unknown error occurred.");
            break;
        }
      });
      audio.current.volume = volume;
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
              const vol = el.target.value;
              if (audio.current) {
                audio.current.volume = vol;
              }
              setVolume(vol);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
