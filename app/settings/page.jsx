"use client"

import React from "react";
import "./style.css";
import Controls from "./controls";
import Audio from "./audio";
import Customize from "./customize";

export default function Settings() {


  return (
    <div id="root">
      <Controls name={'Jump'} defaultKey={'Space'}/>
      <Controls name={'Pause'} defaultKey={'p'}/>
      <Audio name={'Music'}/>
      <Audio name={'Effects'}/>
      <Audio name={'Master'}/> 
      <Customize name="Bird"/>
      <Customize name="Obstacles"/>
      <Customize name="Background"/>
    </div>
  );
};
