// Tevel's Code

"use client";

// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Game from '../gameinstructions/game';
import styles from './page.module.css'; // Import the CSS module

// Component for animating text
const AnimatedText = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 1; // Variable to keep track of the current index in the text
    const interval = setInterval(() => {
      if (index > text.length) {
        clearInterval(interval); // Check if we have reached the end of the text
      } else {
        setVisibleText(text.substring(0, index)); // Update the 'visibleText' state with a substring of 'text' up to the current index
        index += 1;
      }
    }, 100); // Text animation speed (milliseconds)
  }, [text]);

  return <span>{visibleText}</span>;
};

// Component for rendering instructions
export default function Instructions() {
  return (
    <div className={styles.skyContainer}>
      {/* Introduction */}
      <div className={styles.instructions}>
        {/* Flappy Bird Logo */}
        <Image
          src="/bird.png"
          alt="Bird Logo"
          width={150}
          height={100}
          className={`${styles.bird} ${styles.birdfloating}`}
        />
        {/* Title */}
        <p className={styles.instructionsTitle}>
          <Image
            src="/flappy.svg"
            alt="Flappy Bird Logo"
            width={450}
            height={250}
          />
        </p>
        {/* Instructions */}
        <div className={styles.instructionsTextContainer}>
          <p className={styles.instructionsTextLine}>
            <strong>
              <AnimatedText text="Learn to soar through the skies, conquer the pipes and become the best flapper!" />
            </strong>
          </p>
        </div>
      </div>

      {/* Game Preview */}
      <div className={styles.gamePreview1}>
        <Game />
      </div>
      {/* Game Instructions */}
      <div className={styles.gamePreview2}>
        <p className={styles.clickContainer}>
          {/* Game Control Explanation */}
          Hitting the <span className={styles.click}>click</span> imparts a
          slight upward lift. <br />
          <br />
          {/* Gameplay Tips */}
          Careful timing is crucial to navigate through gaps and varying pipe
          heights. <br /> <br /> Travelling greater distances scores you points!<br /> <br /> Be cautious of
          obstacles — colliding with pipes ends the game, and watch for sudden
          changes in pipe height. Occasionally, encounter special pipes with
          gaps, barriers, or moving elements, and beware of Venus fly traps that
          can unexpectedly emerge, ending the game. Enjoy the challenge, have
          fun playing Flappy Bird, and challenge your friends to beat your high
          score.
        </p>
      </div>
    </div>
  );
}

