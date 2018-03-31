import React from "react";
import "./RecentTrackList.css";

const formatTime = time => {
  const jsTime = new Date(time * 1000);
  return jsTime.toLocaleTimeString();
};

const RecentTracksList = ({ tracks }) => (
  <div className="RecentTrackList">
    <h3>Posledne hrané:</h3>
    {tracks.map(({ artist, title, time }) => (
      <div className="RecentTrackList__track" key={time}>
        <div className="RecentTrackList__title">{title}</div>
        <div className="RecentTrackList__artist">{artist}</div>
        <div className="RecentTrackList__time">od {formatTime(time)}</div>
      </div>
    ))}
  </div>
);

export default RecentTracksList;
