"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  //Stepper,
  //Step,
  //StepLabel,
} from "@mui/material";
import Image from "next/image";
import styles from "./page.module.css";
import { blue } from "@mui/material/colors";




function App() {
  return (
    <div>
      <div className={styles.container}>
        <HeroSection />
        <Box sx={{height: "3vh"}}>

        </Box>
      </div>

      <Container
        id="Start"
        maxWidth={false}
        className={styles.noPadding}
        sx={{ 
          width: '100%', 
          height: "auto", 
          bgcolor: "#ffffff", 
          maxWidth: "lg", 
          marginBottom: 5, 
          boxShadow: 5
        }}
      >
        <Grid container spacing = {2} alignItems="center" justifyContent="center" sx ={{height: '100%', width: '100%', margin: 0}}>
          <Grid item className={styles.noPadding} xs={12} lg = {5} display= 'flex' alignItems= 'center' justifyContent= 'center' sx={{height:'100%'}}>
            <Box display = "flex" flexDirection="column" alignItems="center" justifyContent="center" sx = {{width: "100%", height: "100%", margin: 0, padding: 0}}>
              <Button className={styles.contentPage}> 
                Early Beginnings <br/> (1950s-1970s)
              </Button>
              <Button className = {styles.contentPage}>
                The Golden Age of <br/> Arcade Games
              </Button>
              <Button className = {styles.contentPage}>
                The Rise of <br/> Home Consoles
              </Button>
              <Button className = {styles.contentPage}>
                The 3D Revolution and <br/> Online Gaming
              </Button>
              <Button className = {styles.contentPage} sx = {{borderBottom: 0}}>
                Modern Era and the <br/> Expansion of Gaming
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg = {7} display= 'flex' alignItems= 'center' justifyContent= 'center' sx={{boxShadow: 20, width: '100%', height:'100%', bgcolor: "white"}}>
            <Box display = "flex" flexDirection="column" alignItems="center" justifyContent="center" sx = {{width: "100%", height: "100%", margin: 0, padding: 0}}>
              <Typography
                variant="h6"
                align="center"
                sx={{ 
                  margin: 0, 
                  fontWeight: "normal", 
                  fontFamily: "'Open Sans', 'Opens Sans Fallback', 'Segoe UI', Tahoma, sans-serif",
                  fontSize: '1.5rem', 
                  lineHeight: 1.4,
                  width: '90%',
                  bgcolor: "white"
                }}
                component="p"
                textAlign={"justify"}
              >
                The history of video gaming is a remarkable journey of technological
                 innovation and cultural impact. It began in the 1950s and 1970s, an 
                 experimental phase where the concept of video games emerged. Simple 
                 yet groundbreaking games like "Tennis for Two" and "Spacewar!" laid 
                 the foundation. The 1970s marked the commercialization of gaming with 
                 the Magnavox Odyssey, the first home video game console, and the rise 
                 of arcade gaming epitomized by "Pong," which brought video games into
                  the public eye.
                <br/><br/>
                Discover the epic journey of gaming, from its rudimentary beginnings
                to the immersive experiences of today. Join us on a journey through
                time and technology.
                <br/><br/>
                
              </Typography>
            </Box>

          </Grid>
        </Grid>
      </Container>
      
      
      
    </div>
    
  );
}
const scrollFirst = () => {
  document.getElementById("Start").scrollIntoView({ behavior: "smooth" });
};

function HeroSection() {
  return (
    <Box style={{ fontFamily: 'inherit'}} className={styles.myHeroSection}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Image
            src="/hero_section2.gif"
            alt="Hero Section"
            layout="fill"
            objectFit="cover"
            className={styles.heroVideo}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            component="h1" 
            className={styles.heroText}
          >
            The History of Video Gaming
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            className={styles.button}
            variant="contained"
            onClick={scrollFirst}
          >
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

//SIDE BAR STEPPER CODE
{/*
const sections = ["Start", "Era 1", "Era 2", "Era 3", "Era 4", "Era 5", "Era 6"]; //INCOMPLETE
const scrollToSection = (section) => {
  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
};

function SidebarStepper() {
  const [isSticky, setIsSticky] = useState(false);
  const navbarHeight = 50;
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerWidth * (9 / 16) + navbarHeight; // Calculate height based on aspect ratio
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const heroHeightVH =
    ((window.innerWidth * (9 / 16) + navbarHeight) / window.innerHeight) * 100; // Convert hero height to vh units
  const stepperStyle = isSticky
    ? { position: "fixed", top: 0, left: 10 }
    : { position: "absolute", top: `${heroHeightVH}vh`, left: 10 };

  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (index) => () => {
    setActiveStep(index);
    scrollToSection(sections[index]);
  };

  return (
    <Box sx={{ ...stepperStyle, width: "100%", height: "100vh" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {sections.map((label, index) => (
          <Step key={label} onClick={handleStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
*/}
export default App;
