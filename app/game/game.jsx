"use client";
import './game.css';
import React from "react";
import { useState, useEffect } from 'react';
import Instructions from '../instructions/page';

// Things to add: moving background, changing obstacle height

function DeathPage({restartGame, score}) {

  return (
    <div className="death">
      <img src="/skull.png" style={{height: "45%", marginLeft: "3.5px", marginTop: "45px"}}/>
      <div className="deathText">
        <p>HDB rammed your Bird. </p>
        <p>Your score is {score}.</p>
        Wanna
      </div>
      <button className="againBtn" onClick={restartGame}>Play Again?</button>
    </div>
  );
}

function UpColliding(birdPos, upObstaclePos) {
  // Needs to return false if alive, true if dead
  return (
    birdPos.top <= upObstaclePos.bottom &&
    birdPos.right >= upObstaclePos.left &&
    birdPos.left <= upObstaclePos.right
  );
}

function DownColliding(birdPos, downObstaclePos) {
  // Needs to return false if alive, true if dead
  return (
    birdPos.bottom >= downObstaclePos.top &&
    birdPos.right >= downObstaclePos.left &&
    birdPos.left <= downObstaclePos.right
  );
}

function Game({over, score, setScore}) {
  const [topDist, setTopDist] = useState(320);
  const [leftDist, setLeftDist] = useState(540);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    const collisionInterval = setInterval(() => {
      if (gameStart == true) {
      const birdPos = document.querySelector(".bird").getBoundingClientRect();
      const upObstaclePos = document.querySelector(".upObstacle").getBoundingClientRect();
      const downObstaclePos = document.querySelector(".downObstacle").getBoundingClientRect();

      if ((topDist > 613) || (DownColliding(birdPos, downObstaclePos)) || (UpColliding(birdPos, upObstaclePos))) {
        clearInterval(collisionInterval)
        setGameStart(false);
        over();
      }
    }
    });

      return () => clearInterval(collisionInterval);
    }, [topDist, leftDist]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameStart == true) {
        setScore((prevScore) => prevScore + 1);
        setTopDist((prevTopDist) => prevTopDist + 12);
        setLeftDist((prevLeftDist) => prevLeftDist - 15);
        if (leftDist < -160) {
          setLeftDist(550);
        }
      }
    }, 170);

      return () => clearInterval(moveInterval);
    }, [gameStart, leftDist]);

  const handleClick = () => {
    if (gameStart == true)
      setTopDist((prevTopDist) => prevTopDist - 75);
  };

  const handleStart = () => {
    setGameStart(true);
  };
  
  return (
    <div className="background" onClick={handleClick}>
      { (gameStart == false) && (
        <button className="startBtn" onClick={handleStart}>Start Game</button>
      )}
      <div className="score">{score}</div>
      <img className="upObstacle" src="/upBlock.png" style={{marginLeft: leftDist}} />
      <img className="bird" src="/sparrow.png" style={{top: topDist}} />
      <img className="downObstacle" src="/downBlock.png" style={{marginLeft: leftDist}} />
    </div>    
  )
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