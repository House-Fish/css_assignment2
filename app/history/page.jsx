'use client';

import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import styles from './page.module.css'; 


  
function App() {
    const [currentStage, setCurrentStage] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const moveToNextStage = () => {
        if (currentStage < 5) {
            setIsMoving(true);
            setCurrentStage(current => current + 1);
            setTimeout(() => setIsMoving(false), 500); // Reset after animation duration
        }
    };
    return (
        <div className={styles.parallax}>
            <Container className = {styles.frame} sx = {{width: '90%', height: '100vh'}}>
                {/* Timeline + Circle container*/}
                <Container sx={{ height: "10vh", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bgcolor: 'white', position: 'fixed'}}>
                        <Box className = {styles.timeline}/>
                        <Box className={styles.timelineCursor} sx={{
                            left: `${15 + currentStage * (70 / 5)}%`,
                            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`, // Scale up when hovering
                            boxShadow: isHovering ? '0px 10px 20px rgba(0, 0, 0, 0.8)' : '0px 4px 8px rgba(0, 0, 0, 0.5)', // Enhance shadow when hovering
                            
                        }}/>
                </Container>
                <Container sx={{ height: "10vh", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        className="nextButton" // Add this class
                        variant="contained"
                        onClick={moveToNextStage}
                        sx={{ mb: 2, width: '100px' }}
                    >
                        Next
                    </Button>
                    <Box sx = {{width: '80%'}}/>
                    
                    
                </Container>
                {/* Abstract of subpage container*/}
                <Container sx={{ height: "10vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography className={styles.flappybirdfont}>
                        The history of video gaming
                    </Typography>
                </Container>
                {/* Abstract of subpage container*/}
                <Container sx={{ height: "30vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>
                    <Typography className={styles.flappybirdfont}>
                    Welcome to the thrilling world of gaming—a saga that unfolds over decades, 
                    transforming from humble beginnings into a sprawling universe of interactive experiences. 
                    Our journey begins in the 1950s, a time of curiosity and technological experimentation 
                    that planted the seeds for what would become a cultural revolution.
                    </Typography>
                </Container>
                <Container sx={{ height: "30vh", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'right' }}>
                    <Typography className={styles.flappybirdfont}>
                    In these early days, games were simple, often 
                    no more than blips on a screen, yet they represented 
                    the extraordinary potential of electronic play. Pioneers 
                    tinkered with oscilloscopes and colossal computers to 
                    bring us the first digital games, like "Tennis for Two" 
                    and the space combat game "Spacewar!" These innovations 
                    set the stage for a new form of entertainment, blending 
                    art and technology in ways previously unimagined.
                    </Typography>
                    <Container
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Tennis for two."
                    src="/tennis_for_two.gif"
                    />
                </Container>
            </Container>
            
        </div>
    );
}

export default App;
