"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Item, Media, Reveal, Section, Stagger, ease } from "./ui";
import * as D from "@/data/content";

const panel = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease,
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const link = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0 },
};

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`header${solid || open ? " solid" : ""}`}>
      <div className="wrap header-row">
        <a href="#top" className="wordmark" onClick={() => setOpen(false)}>
          {D.site.short}
        </a>
        <nav aria-label="Primary" className="nav-desktop">
          {D.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary header-cta">
          Let&apos;s talk
        </a>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="burger-lines" aria-hidden>
            <motion.i
              animate={open ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.i
              animate={
                open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2, ease }}
            />
            <motion.i
              animate={open ? { y: -6.5, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease }}
            />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="nav-mobile"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {D.nav.map((n) => (
              <motion.a
                key={n.href}
                href={n.href}
                variants={link}
                onClick={() => setOpen(false)}
              >
                {n.label}
                <span aria-hidden>→</span>
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              variants={link}
              className="btn btn-primary nav-mobile-cta"
              onClick={() => setOpen(false)}
            >
              Let&apos;s talk
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        className="progress"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </header>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], ["0%", "8%"]);

  return (
    <section id="top" className="hero">
      <motion.div className="hero-media" style={{ y: imgY }}>
        <Image
          src={D.hero.image}
          alt=""
          fill
          priority
          unoptimized
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </motion.div>
      <div className="hero-scrim" aria-hidden />
      <div className="wrap hero-inner">
        <Stagger className="hero-copy">
          <Item>
            <p className="mono">{D.hero.eyebrow}</p>
          </Item>
          <Item>
            {/* Diubah dari display-xl menjadi display-lg agar ukuran teks lebih kecil */}
            <h1 className="display-lg">{D.hero.heading}</h1>
          </Item>
          <Item>
            <p className="body-lg hero-desc">{D.hero.description}</p>
          </Item>
          <Item>
            <a href="#contact" className="btn btn-primary">
              Software Consultation
            </a>
          </Item>
        </Stagger>
        <a
          href="#about"
          className="scroll-cue mono"
          aria-label="Scroll to about section"
        >
          Scroll
        </a>
      </div>
    </section>
  );
}

// true = desktop dengan mouse (preview melayang), false = layar sentuh/kecil (media inline)
function useFloatingPreview() {
  const [v, setV] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (hover: hover)");
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return v;
}
function CapabilityMediaView({
  m,
  active,
}: {
  m: D.CapabilityMedia;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // video hanya diputar saat item-nya aktif
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  if (m.type === "video") {
    return (
      <video
        ref={ref}
        src={m.src}
        poster={m.poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <Image
      src={m.src}
      alt={m.alt}
      fill
      unoptimized
      sizes="420px"
      style={{ objectFit: "cover" }}
    />
  );
}

export function Profile() {
  const p = D.profile;
  const floating = useFloatingPreview();
  const [hover, setHover] = useState<number | null>(null);
  const [y, setY] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const active = hover ?? 0;

  const enter = (i: number, el: HTMLElement) => {
    const list = listRef.current;
    if (!list) return;
    const r = el.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    setY(r.top - l.top + r.height / 2);
    setHover(i);
  };

  return (
    <Section id="about" label="About">
      <Reveal>
        <h2 className="display-lg">{p.heading}</h2>
      </Reveal>
      {/* 
      <div className="grid profile-grid">
        <Stagger className="c-7">
          <Item>
            <p className="body-lg measure">{p.intro}</p>
          </Item>
        </Stagger>
      </div> */}

      <Reveal>
        <div
          className="caps-x-wrap"
          onMouseLeave={() => floating && setHover(null)}
        >
          <ul className="caps-x" ref={listRef}>
            {p.capabilities.map((c, i) => (
              <li
                key={c.title}
                tabIndex={0}
                className={i === active ? "on" : ""}
                onMouseEnter={(e) => floating && enter(i, e.currentTarget)}
                onFocus={(e) => floating && enter(i, e.currentTarget)}
                onBlur={() => floating && setHover(null)}
                onClick={() => !floating && setHover(i)}
              >
                <span className="caps-title">{c.title}</span>

                {/* mobile / layar sentuh: media inline di bawah judul */}
                {!floating && (
                  <AnimatePresence initial={false}>
                    {i === active && (
                      <motion.div
                        key="inline"
                        className="caps-inline-clip"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <div className="caps-inline">
                          <CapabilityMediaView m={c.media} active />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* desktop: preview melayang di kanan */}
          {floating && (
            <motion.div
              className="caps-preview"
              aria-hidden
              initial={false}
              animate={{
                y,
                opacity: hover === null ? 0 : 1,
                scale: hover === null ? 0.96 : 1,
              }}
              transition={{
                y: { type: "spring", stiffness: 260, damping: 30 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.3, ease },
              }}
            >
              {p.capabilities.map((c, i) => (
                <motion.div
                  key={c.title}
                  className="caps-preview-item"
                  initial={false}
                  animate={{ opacity: hover === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <CapabilityMediaView m={c.media} active={hover === i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

// function ProjectCard({ p, priority }: { p: D.Project; priority?: boolean }) {
//   return (
//     <Stagger className={`card c-${p.span}`}>
//       <a
//         href={p.href}
//         className="card-link"
//         aria-label={`Discuss this project: ${p.title}`}
//       >
//         <Media
//           src={p.image}
//           alt={p.imageAlt}
//           ratio={p.ratio}
//           priority={priority}
//           className="hover-zoom"
//         />
//       </a>
//       <Item className="meta">
//         <div className="meta-row">
//           <h3 className="h3">{p.title}</h3>
//           <span className="mono">{p.year}</span>
//         </div>
//         <p className="mono">{p.category}</p>
//         <p className="soft measure">{p.summary}</p>
//       </Item>
//     </Stagger>
//   );
// }
// export function SelectedWork() {
//   return (
//     <Section id="work" label="Selected work">
//       <Reveal className="heading-row">
//         <h2 className="h1">Selected Work</h2>
//       </Reveal>
//       <div className="grid work-grid">
//         {D.projects.map((p, i) => (
//           <ProjectCard key={p.title} p={p} priority={i === 0} />
//         ))}
//       </div>
//     </Section>
//   );
// }

export function Cinematic() {
  const c = D.cinema;
  return (
    <section className="cinema dark" aria-label="Neightive">
      <Media
        src={c.image}
        alt="Placeholder image for Neightive"
        ratio="16 / 7"
        parallax
        className="cinema-media"
      />
      <div className="cinema-scrim" aria-hidden />
      <Stagger className="wrap cinema-caption">
        <Item>
          <p className="mono">{c.eyebrow}</p>
        </Item>
        <Item>
          <h2 className="h1">{c.title}</h2>
        </Item>
        <Item>
          <p className="mono">{c.caption}</p>
        </Item>
      </Stagger>
    </section>
  );
}

const icons = [
  <circle key="a" cx="16" cy="16" r="11" />,
  <rect key="b" x="5" y="5" width="22" height="22" />,
  <path key="c" d="M16 4 28 27H4Z" />,
  <path key="d" d="M4 16h24M16 4v24" />,
];
export function Services() {
  return (
    <Section id="services" label="Services">
      <Reveal>
        <h2 className="h1">From business problem to working solution.</h2>
      </Reveal>
      <Stagger className="grid services">
        {D.services.map((s, i) => (
          <Item key={s.title} className="service">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              {icons[i]}
            </svg>
            <h3 className="h3">{s.title}</h3>
            <p className="soft measure">{s.description}</p>
          </Item>
        ))}
      </Stagger>
    </Section>
  );
}

export function Recognition() {
  return (
    <Section label="How I work">
      <Reveal>
        <h2 className="h2">How I work.</h2>
      </Reveal>
      <Stagger>
        <ul className="rows">
          {D.recognition.map((r) => (
            <Item key={r.title}>
              <li className="row">
                <span className="h3">{r.title}</span>
                <span className="soft">{r.organization}</span>
              </li>
            </Item>
          ))}
        </ul>
      </Stagger>
    </Section>
  );
}

// Shows the logo image; if the file is missing, falls back to the name as text.
function ClientLogo({ c }: { c: D.Client }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="logo-fallback">{c.name}</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={c.logo}
      alt={c.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientStrip() {
  return (
    <section className="section" aria-label="Experience across">
      <div className="wrap">
        <Stagger>
          <ul className="clients">
            {D.clients.map((c) => (
              <Item key={c.name}>
                <li>
                  <ClientLogo c={c} />
                </li>
              </Item>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const p = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "instagram")
    return (
      <svg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.5h.01M12 16v-5.5M12 13c0-1.7 1-2.5 2.3-2.5S17 11.3 17 13v3" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact dark" aria-label="Contact">
      <div className="wrap">
        <Stagger>
          <Item>
            <h2 className="display-xl">Let&apos;s talk.</h2>
          </Item>
          <Item>
            <a className="email" href={`mailto:${D.site.email}`}>
              {D.site.email}
            </a>
          </Item>
          <Item>
            <a className="btn btn-primary" href={`mailto:${D.site.email}`}>
              Software Consultation
            </a>
          </Item>
        </Stagger>
        <Reveal>
          <ul className="socials">
            {D.site.socials.map((s) => (
              <li key={s.label}>
                <a
                  className="social"
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
