// Jia Yu's code

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Controls({ name, defaultKey }) {
  const [inputValue, setInputValue] = useState(defaultKey);

  useEffect(() => {
    // Retrieve input value from localStorage on component mount
    const storedValue = localStorage.getItem(name);
    if (storedValue !== null) {
      setInputValue(storedValue);
    }
  }, []);

  const handleKeyDown = (event) => {
    const key = event.key.replace(/ /g, "Space");
    setInputValue(key);
    localStorage.setItem(name, key);
  };

  return (
    <div className={styles.item}>
      <span className={styles.span}>{name}</span>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        readOnly
      />
    </div>
  );
}
