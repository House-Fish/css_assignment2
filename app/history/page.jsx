'use client';
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
                        <Typography variant="h2" component="h1" color="common.white" zIndex={999}>
                            The History of Video Gaming
                        </Typography>
                    </Box>
                </Box>
                {/* Other app content goes here */}
            </div>
            

        </div>
    );
}

export default App;
