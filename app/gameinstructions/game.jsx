"use client";
import './game.css';
import React from "react";
import { useState, useEffect } from 'react';
import TextBubble from "./TextBubble";


function DeathPage({restartGame, score}) {

  return (
    <div className="death">
      <img src="/bird2.png" style={{height: "45%", marginLeft: "3.5px", marginTop: "45px"}}/>
      <div className="deathText">
        <p>The tutorial is finished! </p>
      </div>
      <button className="againBtn" onClick={restartGame}>Play the tutorial again?</button>
    </div>
  );
}

function UpColliding(bird, upObstacle) {
  const birdPos = bird.getBoundingClientRect();
  const upObstaclePos = upObstacle.getBoundingClientRect();

  // Needs to return false if alive, true if dead
  return (
    birdPos.y <= upObstaclePos.height &&
    birdPos.x + birdPos.width >= upObstaclePos.x &&
    birdPos.x <= upObstaclePos.x + upObstaclePos.width
  );
}

function DownColliding(bird, downObstacle) {
  const birdPos = bird.getBoundingClientRect();
  const downObstaclePos = downObstacle.getBoundingClientRect();

  // Needs to return false if alive, true if dead
  return (
    birdPos.y + birdPos.height - downObstaclePos.y >= 0 &&
    birdPos.x + birdPos.width >= downObstaclePos.x &&
    birdPos.x <= downObstaclePos.x + downObstaclePos.width
  );
}

function Game({over, score, setScore}) {
  const [topDist, setTopDist] = useState(320);
  const [downLeftDist, setDownLeftDist] = useState(540);
  const [upLeftDist, setUpLeftDist] = useState(540);
  const [gameStart, setGameStart] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0); // -- Tevel's Code
  const [showInstructions, setShowInstructions] = useState(true); // -- Tevel's Code
  const [showTextBubble, setShowTextBubble] = useState(false); // Tevel's Code
  
  useEffect(() => {
    const collisionInterval = setInterval(() => {
      const bird = document.querySelector(".bird");
      const upObstacle = document.querySelector(".upObstacle");
      const downObstacle = document.querySelector(".downObstacle");

      if ((topDist > 613) || (UpColliding(bird, upObstacle)) || (DownColliding(bird, downObstacle))) {
        setGameStart(false);
        over();
      }
    }, 10);

    // -- Tevel's Code
    return () => clearInterval(collisionInterval);
  }, [topDist]);

  useEffect(() => {
    const distanceInterval = setInterval(() => {
      if (gameStart) {
        // Update the total distance covered by the bird
        setTotalDistance((prevTotalDistance) => prevTotalDistance + 1);
      }
    }, 100);

    return () => clearInterval(distanceInterval);
  }, [gameStart]);
    // -- Tevel's Code



  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart == true) {
        setScore(score => score + 1);
      }
    }, 100);

    // -- Tevel's Code
    if (totalDistance >= 150) {
        setGameStart(false);
        over();
      }
  
    return () => clearInterval(interval);
  }, [gameStart, totalDistance]);
    // -- Tevel's Code

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart == true) {
        if (topDist < 613) {
          setTopDist(prevTopDist => prevTopDist + 10.3);
        }
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, [gameStart, topDist]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart == true) {
          setDownLeftDist(prevDownLeftDist => prevDownLeftDist - 10);
          setUpLeftDist(prevUpLeftDist => prevUpLeftDist - 10);
        if ((downLeftDist < -160) || (upLeftDist < -160)) {
          setDownLeftDist(550);
          setUpLeftDist(550);
        }
      }}, 100);
    
    return () => clearInterval(interval);
  }, [gameStart, upLeftDist, downLeftDist]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart == true) {
        // Check if half of the distance is covered
        if (totalDistance >= 20 && !showTextBubble) {
          setShowTextBubble(true);
        }
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, [gameStart, totalDistance, showTextBubble]);

  
  const handleClick = () => {
    if (gameStart === true) {
      setTopDist((prevTopDist) => prevTopDist - 75);
    } else {
      // Display a prompt before starting the game
      if (showInstructions) {
        alert("Read the instructions first!");
      } else {
        // Set showInstructions to true to display instructions on the next click
        setShowInstructions(true);
      }
    }
  };

  const handleStart = () => {
    if (!showInstructions) { // -- Tevel's Code
      setGameStart(true);
    } else {
      setShowInstructions(false);
    }
  };

  return (
    <div className="background" onClick={handleClick}>
      {gameStart === false && (
        <div>
          {showInstructions && <p className="instructionPrompt"></p>}
          {showTextBubble && <TextBubble />}
          <button className="startBtn" onClick={handleStart}>
            Start Game
          </button>
        </div>
      )}
      <div className="score">{score}</div>
      <img className="upObstacle" src="/upBlock.png" style={{ marginLeft: upLeftDist }} />
      <img className="bird" src="/bird.png" style={{ top: topDist }} />
      <img className="downObstacle" src="/downBlock.png" style={{ marginLeft: downLeftDist }} />
    </div>
  );
}
 

function App() {
  const [gameRun, setGameRun] = useState(true);
  const [score, setScore] = useState(0);

  const handleOver = () => {
    setGameRun(false);
  };

  const handleRestart = () => {
    setGameRun(true);
    setScore(0);
  };

  return (
    <div className='gameWindow'>
      {gameRun == true ? (
        <div>
          <Game over={handleOver} score={score} setScore={setScore} />
        </div>
      )
      : (
        <DeathPage restartGame={handleRestart} score={score} />
      )}
    </div>
  );
}

export default App;
