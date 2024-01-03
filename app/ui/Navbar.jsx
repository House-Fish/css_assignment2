import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navitem} href="/">
        Home
      </Link>
      <Link className={styles.navitem} href="/instructions">
        Instructions
      </Link>
      <Link className={styles.navitem} href="/history">
        History
      </Link>
      <Link className={styles.navitem} href="/credits">
        Credits
      </Link>

      <Image
        src="/flappy.svg"
        alt="Flappy Bird Logo"
        width={100}
        height={50}
        style={{ marginLeft: "auto", paddingRight: "20px" }}
      />
    </nav>
  );
}
