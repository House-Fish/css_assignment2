import Link from "next/link";
import Head from "next/head";
import Navbar from "@/app/ui/Navbar";

// rest of the code omitted for brevity
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Website Title</title>
      </Head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


