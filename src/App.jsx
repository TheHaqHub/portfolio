import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SolidCursor from "./components/SolidCursor";
import ClickRipple from "./components/ClickRipple";
import ClickCritter from "./components/ClickCritter";
import AmbientBlob from "./components/AmbientBlob";
import TechMarquee from "./components/TechMarquee";
import Preloader from "./components/Preloader";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import GithubSection from "./components/sections/GithubSection";
import Freelance from "./components/sections/Freelance";
import Contact from "./components/sections/Contact";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const heroHeight = window.innerHeight * 0.9;
        const t = Math.min(1, Math.max(0, window.scrollY / heroHeight));
        setScrollProgress(t);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Preloader onDone={() => setLoaded(true)} />
      <ScrollProgressBar />
      <AmbientBlob />
      <SolidCursor />
      <ClickRipple />
      <ClickCritter />
      <Nav />
      <main id="main-content" className={`flex-1 relative z-[1] transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div data-blob="orange">
          <Hero scrollProgress={scrollProgress} />
          <TechMarquee />
        </div>
        <div data-blob="amber">
          <About />
        </div>
        <div data-blob="coral">
          <Skills />
        </div>
        <div data-blob="rust">
          <Experience />
        </div>
        <div data-blob="orange">
          <Projects />
        </div>
        <div data-blob="amber">
          <GithubSection />
        </div>
        <div data-blob="coral">
          <Freelance />
        </div>
        <div data-blob="rust">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
