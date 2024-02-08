// Liu JieXin (Game Mechanics & Loop) & Jia Yu (Images, Music & Controls)

"use client";
import './game.css';
import React, { use } from "react";
import { useState, useEffect } from 'react';
import { flipImageUpsideDown } from "../utils/imageUtils";

// Default images
var birdImg = "/sparrow.png";
var upObstacleImg = "/upBlock.png";
var downObstacleImg = "/downBlock.png";
var jumpKey = " "; // Space

// Default volumes
var masterVolume = 0.5; 
var musicVolume = 0.5;
var effectsVolume = 0.5;

// Function to show game over screen. Asks the user if want to play again.
function DeathPage({restartGame, score}) {

  return (
    <div className="death">
      <img src="/skull.png" style={{height: "45%", marginLeft: "3.5px", marginTop: "45px"}}/>
      <div className="deathText">
        <p>HDB rammed your Bird. </p>
        <p>Your score is {score}.</p>
        Wanna
      </div>
      {/* To set gameRun to true again, 
          allowing Game function to be rendered instead of DeathPage funtion 
          (See App function for implementation) */}
      <button className="againBtn" onClick={restartGame}>Play Again?</button>
    </div>
  );
}

// Detection function to check if the bird has collided with the up obstacle
function UpColliding(birdPos, upObstaclePos) {
  // Needs to return false if alive, true if dead
  return (
    birdPos.top <= upObstaclePos.bottom &&
    birdPos.right >= upObstaclePos.left &&
    birdPos.left <= upObstaclePos.right
  );
}

// Detection function to check if bird has collided with the down obstacle.
function DownColliding(birdPos, downObstaclePos) {
  // Needs to return false if alive, true if dead
  return (
    birdPos.bottom >= downObstaclePos.top &&
    birdPos.right >= downObstaclePos.left &&
    birdPos.left <= downObstaclePos.right
  );
}

/* Game function that moves the obstacles and bird
  It also checks if bird has touched the floor and obstacles (game over) */
function Game({over, score, setScore}) {
  // Setting default bird and obstacle position
  const [topDist, setTopDist] = useState(320);
  const [leftDist, setLeftDist] = useState(540);
  const [gameStart, setGameStart] = useState(false);

  // Setting default obstacles height
  const [topHt, setTopHt] = useState(250);
  const [bottomHt, setBottomHt] = useState(250);

  // Random number generator function to vary the obstacle heights
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Play music while the game is running
  useEffect(() => {
    if (gameStart) {
      const bgm = new Audio("/bgm.mp3");
      bgm.loop = true;
      bgm.volume = musicVolume * masterVolume;
      bgm.play();

      return () => {
        bgm.pause();
      };
    }
   }, [gameStart]);

  // Load data stored in localStorage  
  useEffect(() => {
    const storedBird = localStorage.getItem("selectedImageBird");
    if (storedBird !== null) {
      birdImg = storedBird;
    }

    const storedObstacle = localStorage.getItem("selectedImageObstacles");

    if (storedObstacle !== null) {
      upObstacleImg = storedObstacle;
      flipImageUpsideDown(storedObstacle).then(downImg => {
        downObstacleImg = downImg;
      });
    }

    const backgroundImgUrl = localStorage.getItem("selectedImageBackground");
    if (backgroundImgUrl !== null) {
      document.querySelector(".background").style.backgroundImage =
        "url(" + backgroundImgUrl + ")";
    }

    const storedJumpKey = localStorage.getItem("Jump");
    if (storedJumpKey !== null) {
      jumpKey = storedJumpKey;
    }

    const storedMusicVolume = localStorage.getItem("audioVolumeMusic");
    if (storedMusicVolume !== null) {
      musicVolume = storedMusicVolume;
    }

    const storedEffectsVolume = localStorage.getItem("audioVolumeEffects");
    if (storedEffectsVolume !== null) {
      effectsVolume = storedEffectsVolume;
    }

    const storedMasterVolume = localStorage.getItem("audioVolumeMaster");
    if (storedEffectsVolume !== null) {
      masterVolume = storedMasterVolume;
    }

  }, []);

  /* To detect if the bird has collided with the floor or obstacles whenever the bird or obstacles move
      If collision detected, setGameStart becomes false and game will be stopped in the App function */
  useEffect(() => {
    const collisionInterval = setInterval(() => {
      // If game started, select the objects as variables to get their positions
      if (gameStart == true) {
      const birdPos = document.querySelector(".bird").getBoundingClientRect();
      const upObstaclePos = document.querySelector(".upObstacle").getBoundingClientRect();
      const downObstaclePos = document.querySelector(".downObstacle").getBoundingClientRect();

      // 3 conditions that can cause game over
      if ((topDist > 613) || (DownColliding(birdPos, downObstaclePos)) || (UpColliding(birdPos, upObstaclePos))) {
        const deathSound = new Audio("/death.mp3");
        deathSound.volume = effectsVolume * masterVolume;
        deathSound.play();
        clearInterval(collisionInterval)
        // Stop game and render death screen (See App function for implementation)
        setGameStart(false);
        over();
      }
    }
    });

      return () => clearInterval(collisionInterval);
    }, [topDist, leftDist]);

  /* To move the bird downwards and obstacles left every 170ms 
      Also changes the height of the obstacles every iteration */
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameStart == true) {
        // Score Increase
        setScore((prevScore) => prevScore + 1);
        // Bird dropping
        setTopDist((prevTopDist) => prevTopDist + 12);
        // Obstacle moving right
        setLeftDist((prevLeftDist) => prevLeftDist - 15);
        // If obstacles goes out of screen, reset obstacle location
        if (leftDist < -160) {
          setLeftDist(550);
          // Randomly generate obstacle height from 205 - 330
          var topRandHt = randomNumberInRange(210,350);
          var bottomRandHt = randomNumberInRange(210,350);
          /* If the obstacles' heights are too tall for the bird to get through,
            decrease the height of obstacle */
          const diff = 660 - (topRandHt + bottomRandHt);
          if (diff < 132)
          {
            const change = 132 - diff;
            if (topRandHt > bottomRandHt)
            {
              topRandHt -= change;
            }
            else
            {
              bottomRandHt -= change;
            }
          }
          // Set new obstacle heights
          setBottomHt(topRandHt);
          setTopHt(bottomRandHt);
        }
      }
    }, 170);

      return () => clearInterval(moveInterval);
    }, [gameStart, leftDist]);

  // Upon click, bird moves up by 70px
  const handleKeyDown = (e) => {
    if (gameStart && e.key === jumpKey) {
      setTopDist((prevTopDist) => prevTopDist - 70);
      const flap = new Audio("flapwings.mp3");
      flap.volume = effectsVolume * masterVolume;
      flap.play();
    }
  };
  
  // To start game from initial paused state
  const handleStart = () => {
    setGameStart(true);
    document.querySelector(".background").focus();
  };

  return (
    <div className="background" onKeyDown={handleKeyDown} tabIndex="0">
      { (gameStart == false) && (
        <button className="startBtn" onClick={handleStart}>Start Game</button>
      )}
      <div className="score">{score}</div>
      {/* Render of game objects */}
      <img className="upObstacle" src={upObstacleImg} style={{marginLeft: leftDist, height: topHt}} />
      <img className="bird" src={birdImg} style={{top: topDist}} />
      <img className="downObstacle" src={downObstacleImg} style={{marginLeft: leftDist, height: bottomHt}} />
    </div>    
  )
}

/* Game loop, handles game over and restart */
function App() {
  const [gameRun, setGameRun] = useState(true);
  const [score, setScore] = useState(0);

  // Game over
  const handleOver = () => {
    setGameRun(false);
  };

  // Restart game and reset score
  const handleRestart = () => {
    setGameRun(true);
    setScore(0);
  };

  // If gameRun is true game function renders, else death page function renders
  return (
    <div className="websiteContainer">
      <div className="gameWindow">
        {gameRun == true ? (
          <div>
            <Game over={handleOver} score={score} setScore={setScore} />
          </div>
        )
        : (
          <DeathPage restartGame={handleRestart} score={score} />
        )}
      </div>
    </div>
  );
}

export default App;