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




function App() {
  return (
    <div>
      <div className={styles.container}>
        <HeroSection />
      </div>
      <Container
        id="Start"
        maxWidth={false}
        sx={{ width: "100%", height: "30vh", bgcolor: "#ffffff", maxWidth: 1200, marginTop: 2 }}
      >
        <Grid container spacing = {2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm = {4} sx={{boxShadow: 10, height: 100}}>
            <ol>
              <li>Content page 1</li>
            </ol>
          </Grid>
          <Grid item xs={12} sm = {8}>
            <Typography
              variant="h6"
              align="center"
              sx={{ margin: 0, fontWeight: "normal", fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" }}
              component="p"
            >
              Discover the epic journey of gaming, from its rudimentary beginnings
              to the immersive experiences of today. Join us on a journey through
              time and technology.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      <Container
        id="Start"
        maxWidth={false}
        sx={{ width: "100%", height: "30vh", bgcolor: "lightgrey" }}
      >
        
      </Container>
      <Container id="Era 1" sx={{ width: "100%", height: "200vh" }}></Container>
      <Container id="Era 2" sx={{ width: "100%", height: "200vh" }}></Container>
    </div>
    
  );
}
const scrollFirst = () => {
  document.getElementById("Start").scrollIntoView({ behavior: "smooth" });
};

function HeroSection() {
  return (
    <Box style={{ fontFamily: 'inherit' }} className={styles.myHeroSection}>
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
