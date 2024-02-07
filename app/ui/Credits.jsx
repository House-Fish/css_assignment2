// Tevel's Code

import React from 'react';
import styles from './Credits.module.css';

export default function Credits() {
    return (
      <nav className={styles.credits}>
        <footer>
          <p>
            Credits:
            {' '}
            <a href="https://github.com/djungleskogs" target="_blank" rel="noopener noreferrer">Tevel</a>
            {' | '}
            <a href="https://github.com/LuKaito1412" target="_blank" rel="noopener noreferrer">Jie Xin</a>
            {' | '}
            <a href="https://github.com/House-Fish" target="_blank" rel="noopener noreferrer">Jia Yu</a>
            {' | '}
            <a href="https://github.com/braydenNP" target="_blank" rel="noopener noreferrer">Brayden</a>
          </p>
        </footer>
      </nav>
    );
  }