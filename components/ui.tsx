"use client";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;
// once:false => animations replay EVERY time an element enters the viewport (scrolling down or up)
export const vp = { once: false, amount: 0.2 } as const;

export const Providers = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
export const Stagger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={vp}
  >
    {children}
  </motion.div>
);
export const Item = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div className={className} style={style} variants={item}>
    {children}
  </motion.div>
);

// The outer wrapper is what the browser watches for "in view" and it is never clipped.
// Only the inner .media-clip layer is clipped, so the reveal can always trigger.
const reveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease } },
};

export function Media({
  src,
  alt,
  ratio,
  pos = "center",
  priority = false,
  className = "",
  parallax = false,
}: {
  src: string;
  alt: string;
  ratio: string;
  pos?: string;
  priority?: boolean;
  className?: string;
  parallax?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !parallax ? ["0%", "0%"] : ["-4%", "4%"],
  );
  return (
    <motion.div
      ref={ref}
      className={`media ${className}`}
      style={{ aspectRatio: ratio }}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={vp}
    >
      <motion.div className="media-clip" variants={reveal}>
        <motion.div
          className="media-inner"
          style={{ y, inset: parallax ? "-6% 0" : 0 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            priority={priority}
            sizes="(max-width: 767px) 100vw, 60vw"
            style={{ objectFit: "cover", objectPosition: pos }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// `label` is no longer shown on screen; it only names the section for assistive tech.
// The empty .rail column is kept so the content keeps its exact position in the grid.
export function Section({
  id,
  label,
  children,
  dark = false,
}: {
  id?: string;
  label: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`section${dark ? " dark" : ""}`}
      aria-label={label}
    >
      <div className="wrap sec-grid">
        <div className="rail" aria-hidden />
        <div className="body">{children}</div>
      </div>
    </section>
  );
}
