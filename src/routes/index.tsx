import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { MatrixRain } from "@/components/site/MatrixRain";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { DemoShowcase } from "@/components/site/DemoShowcase";
import { Process } from "@/components/site/Process";
import { Technologies } from "@/components/site/Technologies";
import { CTA } from "@/components/site/CTA";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MusicPlayer } from "@/components/site/MusicPlayer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <MatrixRain />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Projects />
          <DemoShowcase />
          <Process />
          <Technologies />
          <CTA />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <MusicPlayer />
    </div>
  );
}
