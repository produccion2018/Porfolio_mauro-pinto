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

const title = "Product studio — Desarrollo de software y productos digitales";
const description =
  "Desarrollo sitios web, e-commerce, sistemas de gestión, dashboards y plataformas SaaS modernas, escalables y listas para usuarios reales.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <MatrixRain />
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
  );
}