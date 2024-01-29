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
import { BarChart } from '@mui/x-charts/BarChart';
import Image from "next/image";
import styles from "./page.module.css";

const chartSetting = {
  xAxis: [
    {
      label: 'Hardware units sold',
    },
  ],
  width: '500',
  height: 400,
};
const dataset = [
  {
    game: 750000,
    month: 'Space Invaders',
  },
  {
    game: 400000,
    month: 'Pac-Man',
  },
  {
    game: 132000,
    month: 'Donkey Kong',
  },
  {
    game: 125000,
    month: 'Ms. Pac-Man',
  },
  {
    game: 100000,
    month: 'Asteroids',
  },
  {
    game: 70000,
    month: 'Defender',
  },
  {
    game: 55988,
    month: 'Centipede',
  },
  {
    game: 50000,
    month: 'Galaxian',
  },
  {
    game: 38000,
    month: 'Hyper Olympic',
  },
  {
    game: 30000,
    month: 'Donkey Kong Jr.',
  },
  {
    game: 30000,
    month: 'Karate Champ',
  },
  {
    game: 30000,
    month: 'Mr Do!',
  },
  {
    game: 29000,
    month: 'Tempest',
  },
  {
    game: 25000,
    month: 'Q*bert',
  },
];

const valueFormatter = (value) => `${value} units`;

const scrollToSection = (section) => {
  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
};
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
        <Grid container spacing = {2} alignItems="center" justifyContent="center" sx ={{height: '100%', width: '100%', margin: 0, bgcolor: 'rgb(247,247,247)'}}>
          {/*Content page grid item */}
          <Grid item className={styles.noPadding} xs={12} lg = {5} display= 'flex' alignItems= 'center' justifyContent= 'center' sx={{height:'100%'}}>
            <Box display = "flex" flexDirection="column" alignItems="center" justifyContent="center" sx = {{width: "100%", height: "100%", margin: 0, padding: 0}}>
              <Button className={styles.contentPage1}
              onClick={() => scrollToSection('the_early_beginnings')}
              sx = {{ 
                borderStyle: 0,
                ':hover': {
                  backgroundSize: "cover",
                  backgroundPosition: '50% 60%',
                  backgroundImage: 'url(tennis_for_two.gif)', 
                  filter: 'brightness(50%)',
                }
                
                }}>
                The Early <br/> Beginnings 
              </Button>
              <Button className = {styles.contentPage} onClick={() => scrollToSection('arcade_games')} 
              sx = {{ 
                ':hover': {
                  backgroundSize: "cover",
                  backgroundPosition: '50% 50%',
                  backgroundImage: 'url(pacman_game.gif)', 
                  filter: 'brightness(50%)',
                }
                }}>
                The Golden Age of <br/> Arcade Games
              </Button>
              <Button className = {styles.contentPage} onClick={() => scrollToSection('home_consoles')} 
              sx = {{ 
                ':hover': {
                  backgroundSize: "cover",
                  backgroundPosition: '50% 10%',
                  backgroundImage: 'url(supermario_game.gif)', 
                  filter: 'brightness(50%)',
                }
                }}>
                The Rise of <br/> Home Consoles
              </Button>
              <Button className = {styles.contentPage} onClick={() => scrollToSection('3d_revolution')} 
              sx = {{ 
                ':hover': {
                  backgroundSize: "cover",
                  backgroundPosition: '50% 50%',
                  backgroundImage: 'url(mario64_game.gif)', 
                  filter: 'brightness(50%)',
                }
                }}>
                The 3D Revolution and <br/> Online Gaming
              </Button>
              <Button className = {styles.contentPage} onClick={() => scrollToSection('modern_era')} 
                sx = {{ 
                ':hover': {
                  backgroundSize: "cover",
                  backgroundPosition: '50% 50%',
                  backgroundImage: 'url(fortnite_game.gif)', 
                  filter: 'brightness(50%)',
                }
                }}>
                Modern Era and the <br/> Explosion of Gaming
              </Button>
            </Box>
          </Grid>
          {/* End of Content page grid item */}
          {/* Start of Intro paragraph grid item */}
          <Grid item xs={12} lg = {7} className= {styles.gridItem} sx={{boxShadow: 10, zIndex: 10}}>
            <Box display = "flex" flexDirection="column" alignItems="center" justifyContent="center" sx = {{width: "100%", height: "100%", margin: 0, padding: 0}}>
              <Typography
                align="center"
                className={styles.para}
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
          {/* End of Intro paragraph grid item */}
          <Container
            maxWidth={false}
            className={styles.noPadding}
            sx={{
              display: 'flex', 
              justifyContent: 'center',
              width: '100%',
              height: "auto",
              bgcolor: "#ffffff",
              minWidth: false,
            }}
          >
            <Container
              maxWidth={false}
              className={styles.noPadding}
              sx={{
                marginTop: 10,
                width: '70%',
                height: "auto",
                minWidth: "lg",
              }}
            >
              <Grid container spacing = {2} display = 'flex' flexDirection="column" alignItems = 'center' justifyContent="center" sx ={{height: "auto", width: '100%', margin: 0, bgcolor: 'rgb(247,247,247)'}}>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "the_early_beginnings"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    The Early Beginnings
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={styles.gridItem}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '90%', 
                      height: 'auto', //for aspect ratio 
                    }}
                    src="tennis_for_two.jpg"
                    alt="Tennis for Two"
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    align="left"
                    className={styles.para}
                    textAlign={"justify"}
                  >
                    The crowd wound out the door at Brookhaven National Laboratory’s open house on October 18, 1958. 
                    Visitors lined up for an interactive exhibit, designed by William A. Higinbotham, a nuclear 
                    physicist who led the lab’s Instrumentation Division. <br/><br/>
                    On a small, round monochrome screen similar to those used in early radar displays, a couple of
                    green-lit lines and a streaking green dot had captured their attention. <br/><br/>
                    It was a tennis simulation 
                    game that enabled two people, each holding a corded metal box, to press a button to simulate swatting
                     the dot, or “ball,” back and forth on the 5-inch screen with unseen rackets, and to control the 
                    angle of each racket by turning a dial on the handheld box. A line at the bottom of the screen 
                    represented the surface of the court and a shorter line in the middle of the screen represented a net.<br/><br/>
                    The button on each controller triggered a loud “click” in the device’s electrical switches, and the
                     onscreen dot sailed in a new direction, arcing in simulated gravity and bouncing on the other side of the net. <br/> <br/>
                     This game was Tennis for Two, the game widely known as being the first video game in history.

                  </Typography>
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "arcade_games"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    The Golden Age of Arcade Games
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={styles.gridItem}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '90%', 
                      height: 'auto', //for aspect ratio 
                    }}
                    src="arcade_games.jpg"
                    alt="Arcade Games"
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    align="left"
                    className={styles.para}
                    textAlign={"justify"}
                  >
                    The golden age of arcade video games was the period of rapid growth, technological 
                    development, and cultural influence of arcade video games from the late 1970s to the 
                    early 1980s. The release of Space Invaders in 1978 led to a wave of shoot-'em-up games 
                    such as Galaxian and the vector graphics-based Asteroids in 1979, made possible by new 
                    computing technology that had greater power and lower costs. Arcade video games switched 
                    from black-and-white to color, with titles such as Frogger and Centipede taking advantage 
                    of the visual opportunities of bright palettes.



                  </Typography>
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[{ dataKey: 'game', label: 'Best-selling arcade games', valueFormatter }]}
                    layout="horizontal"
                    {...chartSetting}
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "home_consoles"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    The Rise of Home Consoles
                  </Typography>
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "3d_revolution"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    The 3D Revolution and Online Gaming
                  </Typography>
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "modern_era"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    Modern Era and The Explosion of Gaming
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Container>
        </Grid>
      </Container>
    </div>
  );
}

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
            onClick={() => scrollToSection('Start')}
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
