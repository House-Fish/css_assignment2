"use client";
import '/app/game/game.css';
import React from "react";
import { useState, useEffect } from 'react';

var birdImg;
var upObstacleImg;
var downObstacleImg;

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
    // load bird image
    birdImg = localStorage.getItem("selectedImageBird");

    // Load obstacles image
    upObstacleImg = localStorage.getItem("selectedImageObstacles");
    flipImageUpsideDown(upObstacleImg, function (flippedDataUrl) {
      downObstacleImg = flippedDataUrl;
    });

    // Load background image
    const backgroundImgUrl = localStorage.getItem("selectedImageBackground");
    document.querySelector(".background").style.backgroundImage =
      "url(" + backgroundImgUrl + ")";

  }, []);

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
      <img className="upObstacle" src={upObstacleImg} style={{marginLeft: leftDist, height: 250}} />
      <img className="bird" src={birdImg} style={{top: topDist}} />
      <img className="downObstacle" src={downObstacleImg} style={{marginLeft: leftDist, height: 250}} />
    </div>    
  )
}

function flipImageUpsideDown(dataUrl, callback) {
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Flip the image upside down by drawing it with a transformation matrix
    context.translate(0, img.height);
    context.scale(1, -1);

    // Draw the flipped image onto the canvas
    context.drawImage(img, 0, 0);

    // Get the data URL of the flipped image
    const flippedDataUrl = canvas.toDataURL('image/png');

    // Call the callback function with the flipped data URL
    callback(flippedDataUrl);
  };

  img.src = dataUrl;
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
        <TutorialFin restartGame={handleRestart} score={score} />
      )}
    </div>
  );
}

export default App;













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