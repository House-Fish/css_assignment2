'use client';

import styles from './page.module.css'; // Import the CSS module
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Effect Animation Code
const AnimatedText = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    // Variable to keep track of the current index in the text
    let index = 1;
    const interval = setInterval(() => {
      // Check if we have reached the end of the text
      if (index > text.length) {
        clearInterval(interval);
      } else {
        // Update the 'visibleText' state by taking a substring of 'text' up to the current index
        setVisibleText(text.substring(0, index));
        index += 1;
      }
    }, 100);
  }, [text]);

  return <span>{visibleText}</span>;
};


export default function Instructions() {
  return (
    <div className={styles.skyContainer}>
      {/* Introduction */}
      <div className={styles.instructions}>
        <Image
          src="/bird.png"
          alt="Bird Logo"
          width={150}
          height={100}
          className={`${styles.bird} ${styles.birdfloating}`}
        />
        <p className={styles.instructionsTitle}>
          <Image
            src="/flappy.svg"
            alt="Flappy Bird Logo"
            width={450}
            height={250}
          />
        </p>
        <div className={styles.instructionsTextContainer}>
          <p className={styles.instructionsTextLine}>
            <strong>
              <AnimatedText text="Learn to soar through the skies, conquer the pipes
              and become the best flapper!"/>
            </strong>
          </p>
        </div>
      </div>
    
      <div className={styles.gamePreview1}></div>
      <div className={styles.gamePreview2}>
        <p className={styles.spaceBarContainer}>
          Hit the <span className={styles.spaceBar}>space</span> imparts a
          slight upward lift. <br />
          <br />
          Careful timing is crucial to navigate through gaps and varying pipe
          heights. <br /> <br /> Score points by successfully passing through
          pipes, earning +1 for each passage. <br /> <br /> Be cautious of
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

