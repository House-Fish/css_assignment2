"use client";
import '@/app/game/game.css';
import React from "react";
import { useState, useEffect } from 'react';
import TextBubble from "./TextBubble";


// DeathPage component
function DeathPage({ restartGame, score }) {
  return (
    <div className="death">
      <img src="/skull.png" style={{ height: "45%", marginLeft: "3.5px", marginTop: "45px" }} />
      <div className="deathText">
        <p>You died! Your final score: {score} </p>
      </div>
      <button className="againBtn" onClick={restartGame}>Try again?</button>
    </div>
  );
}

// TutorialFin component
function TutorialFin({ restartGame, score }) {
  return (
    <div className="tutorialFin">
      <img src="/bird2.png" style={{ height: "45%", marginLeft: "3.5px", marginTop: "45px" }} />
      <div className="tutorialFinText">
        <p>You completed the tutorial!</p>
      </div>
      <button className="againBtn" onClick={restartGame}>Play again?</button>
    </div>
  );
}

// UpColliding function
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

// DownColliding function
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

// Game component
function Game({ over, score, setScore }) {
  const [topDist, setTopDist] = useState(320);
  const [downLeftDist, setDownLeftDist] = useState(540);
  const [upLeftDist, setUpLeftDist] = useState(540);
  const [gameStart, setGameStart] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Additional state for totalDistance and showTextBubble
  const [totalDistance, setTotalDistance] = useState(0);
  const [showTextBubble, setShowTextBubble] = useState(false);

  // useEffect for collision detection
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

    return () => clearInterval(collisionInterval);
  }, [topDist]);

  // useEffect for distance covered
  useEffect(() => {
    const distanceInterval = setInterval(() => {
      if (gameStart) {
        setTotalDistance((prevTotalDistance) => prevTotalDistance + 1);
      }
    }, 100);

    return () => clearInterval(distanceInterval);
  }, [gameStart, setTotalDistance]);

  // useEffect for score update and game end condition
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart === true) {
        setScore((prevScore) => prevScore + 1);
        if (totalDistance >= 130) {
          setGameStart(false);
          over();
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameStart, totalDistance, over, setScore]);

  // useEffect for bird movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart === true) {
        if (topDist < 613) {
          setTopDist((prevTopDist) => prevTopDist + 10.3);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameStart, topDist]);

  // useEffect for obstacle movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart === true) {
        setDownLeftDist((prevDownLeftDist) => prevDownLeftDist - 10);
        setUpLeftDist((prevUpLeftDist) => prevUpLeftDist - 10);
        if ((downLeftDist < -160) || (upLeftDist < -160)) {
          setDownLeftDist(550);
          setUpLeftDist(550);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameStart, upLeftDist, downLeftDist]);

  // useEffect for showing text bubble
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart === true) {
        if (totalDistance >= 20 && !showTextBubble) {
          setShowTextBubble(true);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [gameStart, totalDistance, showTextBubble]);

  // Click handler for bird jump or showing instructions
  const handleClick = () => {
    if (gameStart === true) {
      setTopDist((prevTopDist) => prevTopDist - 75);
    } else {
      if (showInstructions) {
        alert("Read the instructions first!");
      } else {
        setShowInstructions(true);
      }
    }
  };

  // Click handler for starting the game
  const handleStart = () => {
    if (!showInstructions) {
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
      <img className="upObstacle" src="/upBlock.png" style={{ marginLeft: upLeftDist }} alt="Up Obstacle" />
      <img className="bird" src="/bird.png" style={{ top: topDist }} alt="Bird" />
      <img className="downObstacle" src="/downBlock.png" style={{ marginLeft: downLeftDist }} alt="Down Obstacle" />
    </div>
  );
}

// App component
function App() {
  const [gameRun, setGameRun] = useState(true);
  const [score, setScore] = useState(0);

  // Additional state for totalDistance
  const [totalDistance, setTotalDistance] = useState(0);

  const handleOver = () => {
    setGameRun(false);
  };

  const handleRestart = () => {
    setGameRun(true);
    setScore(0);
    setTotalDistance(0);
  };

  return (
    <div className="gameWindow">
      {gameRun === true ? (
        <div>
          { totalDistance >= 15 ? (
            <TutorialFin restartGame={handleRestart} score={score} />
          ) : (
            <Game over={handleOver} score={score} setScore={setScore} setTotalDistance={setTotalDistance} />
          )}
        </div>
      ) : (
        <DeathPage restartGame={handleRestart} score={score} />
      )}
    </div>
  );
}

export default App;