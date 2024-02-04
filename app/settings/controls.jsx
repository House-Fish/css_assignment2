import React, { useState, useEffect } from "react";

export default function Controls({ name, defaultKey }) {
  const [inputValue, setInputValue] = useState(defaultKey);

  useEffect(() => {
    // Retrieve input value from localStorage on component mount
    const storedValue = localStorage.getItem(name);
    if (storedValue !== null) {
      setInputValue(storedValue);
    }
  }, [name]);

  const handleKeyDown = (event) => {
    const key = event.key.replace(/ /g, "Space");
    setInputValue(key);
    localStorage.setItem(name, key);
  };

  return (
    <div>
      <span>{name}</span>
      <input
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        readOnly
      />
    </div>
  );
}
