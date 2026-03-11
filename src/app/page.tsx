import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/sections/Hero";
import CoreValues from "@/components/sections/CoreValues";
import StorylineBuilder from "@/components/sections/StorylineBuilder";
import Collaboration from "@/components/sections/Collaboration";
import Deployment from "@/components/sections/Deployment";
import PreRegistration from "@/components/sections/PreRegistration";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <CoreValues />
      <StorylineBuilder />
      <Collaboration />
      <Deployment />
      <PreRegistration />
      <SiteFooter />
    </main>
  );
}
