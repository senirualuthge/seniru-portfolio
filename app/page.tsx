import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import WhatIBuild from "@/components/build/WhatIBuild";
import HowIThink from "@/components/howithink/HowIThink";
import ProblemsSolutions from "@/components/problems/ProblemsSolutions";
import FailuresLessons from "@/components/failures/FailuresLessons";
import AgreementPlatform from "@/components/projects/AgreementPlatform";
import Aariya from "@/components/projects/Aariya";
import SystemLab from "@/components/lab/SystemLab";
import Skills from "@/components/skills/Skills";
import Journey from "@/components/timeline/Journey";
import BuildLogSection from "@/components/buildlog/BuildLogSection";
import SystemStatus from "@/components/systemstatus/SystemStatus";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <WhatIBuild />
      <HowIThink />
      <ProblemsSolutions />
      <FailuresLessons />
      <AgreementPlatform />
      <Aariya />
      <SystemLab />
      <Skills />
      <Journey />
      <BuildLogSection />
      <SystemStatus />
      <Contact />
    </main>
  );
}
