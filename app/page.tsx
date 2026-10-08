import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import WhatIBuild from "@/components/build/WhatIBuild";
import AgreementPlatform from "@/components/projects/AgreementPlatform";
import Aariya from "@/components/projects/Aariya";
import SystemLab from "@/components/lab/SystemLab";
import Skills from "@/components/skills/Skills";
import Journey from "@/components/timeline/Journey";
import GitHubSection from "@/components/github/GitHubSection";
import CurrentlyBuilding from "@/components/building/CurrentlyBuilding";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <WhatIBuild />
      <AgreementPlatform />
      <Aariya />
      <SystemLab />
      <Skills />
      <Journey />
      <GitHubSection />
      <CurrentlyBuilding />
      <Contact />
    </main>
  );
}
