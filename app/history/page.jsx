'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from './page.module.css'; 

function App() {
    return (
        <div className={styles.parallax}>
            <Container sx={{ height: "10vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography className={styles.flappybirdfont}>
                    The history of video gaming
                </Typography>
            </Container>
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
                src="/tennis_for_two.jpg"
                />
            </Container>
        </div>
    );
}

export default App;
