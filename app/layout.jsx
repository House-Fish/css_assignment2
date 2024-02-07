import Head from "next/head";
import Navbar from "@/app/ui/Navbar";
import Credits from "@/app/ui/Credits";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Flappy Bird Game</title>
      </Head>
      <body>
        <Navbar />
        {children}
        <Credits />
      </body>
    </html>
  );
}

