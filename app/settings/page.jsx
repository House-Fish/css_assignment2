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
      <Customize name="Bird" defaultImages={["Sparrow"]} width={60.8} height={46.2}/>
      <Customize name="Obstacles" defaultImages={["Block"]} width={87.8833} height={250}/>
      <Customize name="Background" defaultImages={["HDB"]} width={525} height={660}/>
    </div>
  );
};
