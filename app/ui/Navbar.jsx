import styles from"./Navbar.module.css";
import Link from "next/link";

export default function Navbar(){
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
        </nav>
    );
}