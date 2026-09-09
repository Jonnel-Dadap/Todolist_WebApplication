import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import AppPreview from "@/components/landing/AppPreview";
import About from "@/components/landing/About";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home(){
 return(
  <main>
    <Navbar />
    <Hero />
    <Features />
    <AppPreview />
    <About />
    <CTA />
    <Footer />
  </main>
 );
} 