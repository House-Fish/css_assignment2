"use client"

import React from "react";
import styles from "./page.module.css";
import Controls from "./controls";
import Audio from "./audio";
import Customize from "./customize";

export default function Settings() {
  return (
    <div className={styles.settings}>
      <img className={styles.background}></img>
      <div className={styles.menu}>
        <h1 className={styles.h1}>Controls</h1>
        <ul className={styles.ul}>
          <li><Controls name={"Jump"} defaultKey={"Space"} /></li>
        </ul>
        <h1 className={styles.h1}>Audio</h1>
        <ul className={styles.ul}>
          <li><Audio name={"Music"} /></li>
          <li><Audio name={"Effects"} /></li>
          <li><Audio name={"Master"} /></li>
        </ul>
        <h1 className={styles.h1}>Customize</h1>
        <ul className={styles.ul}>
          <li><Customize
            name="Bird"
            defaultImages={["sparrow.png"]}
            width={60.8}
            height={46.2}
          /></li>
          <li><Customize
            name="Obstacles"
            defaultImages={["upBlock.png"]}
            width={87.8833}
            height={250}
          /></li>
          <li><Customize
            name="Background"
            defaultImages={["sgback2.jpg"]}
            width={525}
            height={660}
          /></li>
        </ul>
      </div>
    </div>
  );
};
