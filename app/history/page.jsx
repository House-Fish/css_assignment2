// Brayden's Code

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
  //The settings for the chart object
  xAxis: [
    {
      label: 'Hardware units sold',
    },
  ],
  width: '500',
  height: 400,
};
const dataset = [
  //The data of the chart object, Retrived from Wikipedia: https://en.wikipedia.org/wiki/List_of_arcade_video_games
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
  //Method to scroll to the object position by id
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
        {/*Content Page grid background colour*/}
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
                 yet groundbreaking games like "<a href="https://www.youtube.com/watch?v=6PG2mdU_i8k">Tennis for Two</a>" and "<a href="https://www.masswerk.at/spacewar/">Spacewar!</a>" laid 
                 the foundation. The 1970s marked the commercialization of gaming with 
                 the Magnavox Odyssey, the first home video game console, and the rise 
                 of arcade gaming epitomized by "<a href="https://www.ponggame.org/">Pong</a>," which brought video games into
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
          {/* Small yellow bar for aesthethic purpose*/}
          <Grid item xs={12} className= {styles.smallbar} sx={{zIndex: 100, bgcolor: "yellow"}}>
            <Box display = "flex" flexDirection="column" alignItems="center" justifyContent="center" sx = {{width: "100%", height: "100%", margin: 0, padding: 0}}>
              
            </Box>
          </Grid>
          {/* The "inner" page, set in the centre of the larger page*/}
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
            {/* Container for the entire article below the content page and introduction paragraph*/}
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
                    Visitors lined up for an interactive exhibit, designed by <a href="https://en.wikipedia.org/wiki/William_Higinbotham">William A. Higinbotham</a>, a nuclear 
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
                     This game was <a href="https://www.youtube.com/watch?v=6PG2mdU_i8k">Tennis for Two</a>, the game widely known as being the first video game in history.
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
                    early 1980s. <br/><br/>The release of <a href="https://freeinvaders.org/">Space Invaders</a> in 1978 led to a wave of shoot-'em-up games 
                    such as <a href="https://www.retrogames.cz/play_019-NES.php?language=EN">Galaxian</a> and the vector graphics-based <a href="https://freeasteroids.org/">Asteroids</a> in 1979, made possible by new 
                    computing technology that had greater power and lower costs. <br/><br/>Arcade video games switched 
                    from black-and-white to color, with titles such as <a href="https://happyhopper.org/">Frogger</a> and <a href="https://www.retrogames.cz/play_137-Atari7800.php?language=EN">Centipede</a> taking advantage 
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
                    src="home_consoles.jpg"
                    alt="home_consoles"
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    align="left"
                    className={styles.para}
                    textAlign={"justify"}
                  >
                    The late 1980s to early 1990s are a period where two major console manufacturers, <a href="https://www.ign.com/wikis/history-of-video-game-consoles/NES">Nintendo NES</a> and <a href="https://www.ign.com/wikis/history-of-video-game-consoles/SEGA_Genesis">Sega's Genesis</a> vied for dominance. 
                    <a href="https://www.ign.com/wikis/history-of-video-game-consoles/NES"> Nintendo NES</a> released in North America in 1985, and quickly became a houshold name with its intuitive control system, improved graphics and exceptional game library. It introduced the iconic character <a href="https://en.wikipedia.org/wiki/Mario">Mario</a>, 
                    which has become synonymous with Nintendo console gaming up till today. 
                    <br/><br/>
                    Sega answered with its <a href="https://www.ign.com/wikis/history-of-video-game-consoles/SEGA_Genesis">Genesis</a> console in 1989, which had superior hardware, delivering more sophistacted graphics and sound. It became the home of <a href="https://en.wikipedia.org/wiki/Sonic_the_Hedgehog_(character)">Sonic the Hedgehog</a>, whose fast-paced gameplay captured the current generation. 
                    <br/><br/>
                    The period was a technological arms race between the two console producers, that birthed iconic characters like <a href="https://en.wikipedia.org/wiki/Mario">Mario</a> and <a href="https://en.wikipedia.org/wiki/Sonic_the_Hedgehog_(character)">Sonic the Hedgehog</a>. This rivalry between the two systems shaped the gaming industry's future with a lasting legacy. 
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
                    src="3d_evolution.png"
                    alt="3d evolution"
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    align="left"
                    className={styles.para}
                    textAlign={"justify"}
                  >
                    The mid 90s brought forth another seismic shift in video games. The release of Sony's <a href="https://www.ign.com/wikis/history-of-video-game-consoles/PlayStation">PlayStation</a> and <a href="https://www.ign.com/wikis/history-of-video-game-consoles/Nintendo_64">Nintendo 64</a> was a new leap into the realm of three dimensions. 
                    <br/><br/>
                    <a href="https://www.ign.com/wikis/history-of-video-game-consoles/Nintendo_64">Nintendo's N64</a> console brought <a href="https://en.wikipedia.org/wiki/Mario">Mario</a> and <a href="https://en.wikipedia.org/wiki/Ocarina_of_Time">Zelda</a> into
                    the third dimension with "<a href="https://en.wikipedia.org/wiki/Mario">Super Mario 64</a>" and "<a href="https://en.wikipedia.org/wiki/Ocarina_of_Time">The Legend of Zelda: Ocaria of Time</a>". This was a huge visual enhancement from previous two-dimensional platformers. 
                    <br/><br/>
                    Sony's <a href="https://www.ign.com/wikis/history-of-video-game-consoles/PlayStation">PlayStation</a> brought two more 3D games: <a href="https://en.wikipedia.org/wiki/Final_Fantasy_VII">Final Fantasy VII</a> and <a href="https://en.wikipedia.org/wiki/Metal_Gear_Solid_(1998_video_game)">Metal Gear Solid</a>, which were iconic titles which still have sequels still played today.  
                  </Typography>
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    id = "modern_era"
                    align="left"
                    className={styles.title}
                    textAlign={"left"}
                  >
                    Modern Era and the Explosion of Gaming
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
                    src="modern_gaming.jpg"
                    alt="3d evolution"
                  />
                </Grid>
                <Grid item xs={12} className= {styles.gridItem}>
                  <Typography
                    align="left"
                    className={styles.para}
                    textAlign={"justify"}
                  >
                    In the 2000s, gaming became a staple of entertainment in households worldwide. This era can be credited to the <a href="https://www.ign.com/wikis/history-of-video-game-consoles/Xbox_360">Xbox 360</a> and <a href="https://www.ign.com/wikis/history-of-video-game-consoles/PlayStation_3">PlayStation 3</a>. These consoles had powerful processors and intuitive online ecosystems. Players could play games with friends, or compete in multiplayer arenas. 
                    <br/><br/>Nintendo's next console, the <a href="https://www.ign.com/wikis/history-of-video-game-consoles/Nintendo_Wii">Wii</a>, implemented a unique motion-control system, which meant gaming was no longer a sedentary activity. People could swing their arms to hit virtual tennis balls or bowling strikes. 
                    <br/><br/>Simultaneously, the rise of smartphones opened up mobile gaming, with touch screens offering new games like "<a href="https://en.wikipedia.org/wiki/Angry_Birds">Angry Birds</a>" and "<a href="https://en.wikipedia.org/wiki/Candy_Crush_Saga">Candy Crush</a>." 
                    <br/><br/>During all this, PC gaming has continued its march of innocation, with graphics reaching photorealism. Computer gaming has become a billion dollar industry, with triple A game franchies such as <a href="https://en.wikipedia.org/wiki/Call_of_Duty">Call of Duty</a> amassing over <a href="https://www.statista.com/statistics/1244198/cod-lifetime-player-spending/">30 billion dollars in consumer spending</a>. 
                    <br/><br/>The history of video gaming is a testament to the innovation and cultural integration of humans, evolving from simple pixelated screens to complex, narrative experiences that rival movies and literature, in just one lifetime. Emerging technologies like <a href="https://en.wikipedia.org/wiki/Virtual_reality">virtual reality</a> foresee an even more exciting future for the gaming scene. 
                  </Typography>
                </Grid>
                {/*small spacing at the bottom*/}
                <Grid item xs={12} className= {styles.gridItem}/> 
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
            //The "video" that plays in the background
            src="/hero_section2.gif"
            alt="Hero Section"
            layout="fill"
            objectFit="cover"
            className={styles.heroVideo}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography 
            //The Hero Text
            variant="h4" 
            component="h1" 
            className={styles.heroText}
          >
            The <span style={{ color: '#fede24' }}>History</span> of Video Gaming
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
            //The "Learn more" button that scrolls to the start of the article
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
export default App;
