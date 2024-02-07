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
      <Audio name={'Music'}/>
      <Audio name={'Effects'}/>
      <Audio name={'Master'}/> 
      <Customize name="Bird" defaultImages={["sparrow.png"]} width={60.8} height={46.2}/>
      <Customize name="Obstacles" defaultImages={["upBlock.png"]} width={87.8833} height={250}/>
      <Customize name="Background" defaultImages={["sgback2.jpg"]} width={525} height={660}/>
    </div>
  );
};
