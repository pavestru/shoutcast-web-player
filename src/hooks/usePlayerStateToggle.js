import React, { useEffect, useState } from "react";

export const usePlayerStateToggle = () => {
  const [state, setState] = useState("");

  const toggleState = () => {
    if (state === "playing") {
      setState("stopped");
    } else {
      setState("playing");
    }
  };

  const handleKeyPress = event => {
    if (event.code === "Space") {
      toggleState();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [state]);

  return [state, toggleState];
};
