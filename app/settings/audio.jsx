import { ClassNames } from "@emotion/react";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Audio({ name }) {
  const [volume, setVolume] = useState(50); // Set a default value or retrieve from local storage

  useEffect(() => {
    // Retrieve volume from localStorage on component mount
    const storedVolume = localStorage.getItem("audioVolume" + name);
    if (storedVolume !== null) {
      setVolume(Number(storedVolume) * 100);
    }
  }, []);

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    // Save volume to localStorage
    localStorage.setItem("audioVolume" + name, (newVolume/100).toString());
  };

  return (
    <div className={styles.item}>
      <span className={styles.span}>{name}</span>
      <input
        className={styles.slider}
        type="range"
        name="volume"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}