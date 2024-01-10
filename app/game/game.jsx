"use client";
import './game.css';
import React from "react";
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const collisionInterval = setInterval(() => {
      const bird = document.querySelector(".bird");
      const upObstacle = document.querySelector(".upObstacle");
      const downObstacle = document.querySelector(".downObstacle")

      if ((topDist > 613) || (UpColliding(bird, upObstacle)) || (DownColliding(bird, downObstacle))) {
        setGameStart(false);
        over();
    }}, 10);

      return () => clearInterval(collisionInterval);
    }, [topDist]);

  // useEffect(() => {
  //   let scoreInterval;
  //   let topDistInterval;
  //   let obstacleInterval;

  //   if (gameStart) {
  //     scoreInterval = setInterval(() => {
  //       if (gameStart) {
  //         setScore((prevScore) => prevScore + 1);
  //       }
  //     }, 100);

  //     topDistInterval = setInterval(() => {
  //       if (gameStart && topDist < 613) {
  //         setTopDist((prevTopDist) => prevTopDist + 10.3);
  //       }
  //     }, 100);

  //     obstacleInterval = setInterval(() => {
  //       if (gameStart) {
  //         setDownLeftDist((prevDownLeftDist) => prevDownLeftDist - 10);
  //         setUpLeftDist((prevUpLeftDist) => prevUpLeftDist - 10);
  //         if (downLeftDist < -160 || upLeftDist < -160) {
  //           setDownLeftDist(550);
  //           setUpLeftDist(550);
  //         }
  //       }
  //     }, 100);
  //   }

  //   return () => {
  //     clearInterval(scoreInterval);
  //     clearInterval(topDistInterval);
  //     clearInterval(obstacleInterval);
  //   };
  // }, [gameStart, score, setScore, topDist, downLeftDist, upLeftDist]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStart == true) {
        setScore(score => score + 1);
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, [gameStart]);

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
      <img className="upObstacle" src="/upBlock.png" style={{marginLeft: upLeftDist}} />
      <img className="bird" src="/bird.png" style={{top: topDist}} />
      <img className="downObstacle" src="/downBlock.png" style={{marginLeft: downLeftDist}} />
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
