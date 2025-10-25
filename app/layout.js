
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider,{ThemeContext} from "./theme"; 



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Shortly",
  description: "Shorten URLs easily and quickly",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Navbar (with Clerk buttons moved here) */}

          <ThemeProvider>
            <Navbar />
            
          {children}
          </ThemeProvider>

          
          <Toaster position="top-center" reverseOrder={false} />

          {/* Optional Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
