import React from "react";
import "./VolumeRocker.css";

export const VolumeRocker = ({ onChange }) => (
  <input
    type="range"
    id="rocker"
    name="rocker"
    min="0"
    max="1"
    defaultValue="1"
    step="any"
    onChange={onChange}
  />
);
