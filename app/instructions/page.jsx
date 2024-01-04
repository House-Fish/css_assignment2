import React from 'react';
import styles from './instructions.module.css'; // Import the CSS module
import Image from "next/image";

export default function App() {
  return (
    <div>
      {/* Introduction to the Game */}
      <div className={styles.instructions}>
        <p className={styles.instructionsTitle}>
          <Image
            src="/flappy.svg"
            alt="Flappy Bird Logo"
            width={350}
            height={250}
          />
        </p>
        <p className={styles.instructionsText}>
          Learn to soar through the skies and conquer the pipes. <br />
          This guide will teach you how to play and be the <strong>highest flapper!</strong>
        </p>
      </div>

      <div className={styles.instructionsBasicGuide}>
        <p className={styles.spaceBarContainer}>
          Hit the <span className={styles.spaceBar}>space</span> imparts a slight upward lift. <br/><br/>Careful timing is crucial to navigate through gaps and varying pipe heights. <br/> <br/>Score points by successfully passing through pipes, earning +1 for each passage.<br/><br/> 
          Be cautious of obstacles — colliding with pipes ends the game, and watch for sudden changes in pipe height. Occasionally, encounter special pipes with gaps, barriers, or moving elements, and beware of Venus fly traps that can unexpectedly emerge, ending the game. Enjoy the challenge, have fun playing Flappy Bird, and challenge your friends to beat your high score.
        </p>
        <div className={styles.gamePreviewPlaceholder1}>
        </div>
        <div className={styles.gamePreviewPlaceholder2}>
        </div>
      </div>
    </div>
  );
}

