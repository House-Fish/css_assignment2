'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Typography, Button, Box } from '@mui/material';
import styles from './page.module.css'; 


  
function App() {
    return (
        <div className={styles.parallax}>
            <div className={styles.container}>
                <Box className={styles.heroSection}>
                    <Image
                        src="/hero_section2.gif"
                        alt="Hero Section"
                        layout="fill"
                        objectFit="cover"
                        className={styles.heroVideo}
                    />
                    <Box className={styles.heroText}>
                        The History of Video Gaming
                    </Box>
                </Box>
                {/* Other app content goes here */}
            </div>
            <Container sx={{ width: '100%', height: '50vh' }}>

            </Container>
            

        </div>
    );
}

export default App;
