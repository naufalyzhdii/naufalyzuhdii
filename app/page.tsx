import { Providers } from "@/components/ui";
import {
  SiteHeader,
  Hero,
  Profile,
  // SelectedWork,
  Cinematic,
  // Services,
  Recognition,
  ClientStrip,
  Contact,
} from "@/components/sections";

export default function Page() {
  return (
    <Providers>
      <a className="skip" href="#work">
        Skip to selected work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Profile />
        <ClientStrip />
        {/* <SelectedWork /> */}
        <Cinematic />
        {/* <Services /> */}
        <Recognition />
        <Contact />
      </main>
    </Providers>
  );
}
