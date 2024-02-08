// Tevel (Tutorial components) & Liu JieXin (Game Mechanics & Loop) & Jia Yu (Images, Music & Controls)

"use client";
import '/app/game/game.css';
import React from "react";
import { useState, useEffect } from 'react';
import { flipImageUpsideDown } from "../utils/imageUtils";

// default images
var birdImg = "/sparrow.png";
var upObstacleImg = "/upBlock.png";
var downObstacleImg = "/downBlock.png";
var jumpKey = " "; // Space

var masterVolume = 0.5; 

function TutorialFin({restartGame, score}) {
  return (
    <div className="death">
      <img src="/bird2.png" style={{height: "45%", marginLeft: "3.5px", marginTop: "45px"}}/>
      <div className="deathText">
        <p>You completed the tutorial!</p>
      </div>
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

  useEffect(() => {
    if (gameStart) {
      const bgm = new Audio("/bgm.mp3");
      bgm.loop = true;
      const storedMusicVolume = localStorage.getItem("audioVolumeMusic") * masterVolume;
      if (storedMusicVolume !== null) {
        bgm.volume = storedMusicVolume;
      } else {
        bgm.volume = 0.5;
      }
      bgm.play();

      return () => {
        bgm.pause();
      };
    }
   }, [gameStart]);

  useEffect(() => {
    // load bird image
    const storedBird = localStorage.getItem("selectedImageBird");
    if (storedBird !== null) {
      birdImg = storedBird;
    }

    // Load obstacles image
    const storedObstacle = localStorage.getItem("selectedImageObstacles");

    if (storedObstacle !== null) {
      upObstacleImg = storedObstacle;
      flipImageUpsideDown(storedObstacle).then(downImg => {
        downObstacleImg = downImg;
      });
    }

    // Load background image
    const backgroundImgUrl = localStorage.getItem("selectedImageBackground");
    if (backgroundImgUrl !== null) {
      document.querySelector(".background").style.backgroundImage =
        "url(" + backgroundImgUrl + ")";
    }
  }, []);

  useEffect(() => {
    const storedJumpKey = localStorage.getItem("Jump");
    if (storedJumpKey !== null) {
      jumpKey = storedJumpKey === "Space" ? " " : storedJumpKey;
    } 

    const handleKeyPress = (event) => {
      if (event.key === jumpKey && gameStart) {
        setTopDist((prevTopDist) => prevTopDist - 75);
        const flap = new Audio("flapwings.mp3");
        const storedEffectsVolume = localStorage.getItem("audioVolumeEffects") * masterVolume;
        if (storedEffectsVolume !== null) {
          flap.volume = storedEffectsVolume
        } else {
          flap.volume = 0.5;
        }
        flap.play();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStart]);

  /* To detect if the bird has collided with the floor or obstacles whenever the bird or obstacles move
      If detected, setGameStart becomes false and game will be stopped in the App function */
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
        const storedEffectsVolume = localStorage.getItem("audioVolumeEffects") * masterVolume;
        if (storedEffectsVolume !== null) {
          deathSound.volume = storedEffectsVolume;
        } else {
          deathSound.volume = 0.5;
        }
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
          if (diff < 132 )
          {
            var change = 132 - diff;
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
  const handleClick = () => {
    if (gameStart == true) setTopDist((prevTopDist) => prevTopDist - 70);
    const flap = new Audio("flapwings.mp3");
    const storedEffectsVolume = localStorage.getItem("audioVolumeEffects") * masterVolume;
    if (storedEffectsVolume !== null) {
      flap.volume = storedEffectsVolume;
    } else {
      flap.volume = 0.5;
    }
    flap.play();
  };

  // To start game from initial paused state
  const handleStart = () => {
    setGameStart(true);
  };

  return (
    // To detect user inputs to make bird jump
    <div className="background" onClick={handleClick}>
      {/* To see if game started. If not, render a start button that starts game when pressed */ }
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

  useEffect(() => {
    const storedMasterVolume = localStorage.getItem("audioVolumeMaster");
    if (storedMasterVolume !== null) {
      masterVolume = storedMasterVolume
    } else {
      masterVolume = 0.5;
    }
  })

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
    <div className='gameWindow'>
      {gameRun == true ? (
        <div>
          <Game over={handleOver} score={score} setScore={setScore} />
        </div>
      )
      : (
        <TutorialFin restartGame={handleRestart} score={score} />
      )}
    </div>
  );
}

export default App;














