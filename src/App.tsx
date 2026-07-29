import { useEffect, useMemo, useRef, useState } from "react";
import {
  education,
  projects,
  ui,
  workExperience,
  writingDocuments,
  type Filter,
  type Lang,
  type PdfDocument,
  type Project,
  type WritingDocument,
} from "./content";

function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function CountUp({ value, decimals = 0, prefix = "", suffix = "", reduceMotion = false }: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  reduceMotion?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const finalValue = `${prefix}${value.toFixed(decimals)}${suffix}`;
    if (reduceMotion) {
      node.textContent = finalValue;
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const duration = 1350;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        node.textContent = `${prefix}${(value * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [decimals, prefix, reduceMotion, suffix, value]);

  return <span ref={ref}>{prefix}{reduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)}{suffix}</span>;
}

function ParticleField({ reduceMotion, density = 44 }: { reduceMotion: boolean; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = document.visibilityState === "visible";
    const pointer = { x: -1000, y: -1000 };
    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    let dots: Dot[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(20, Math.min(density, Math.round((width * height) / 28000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.4,
      }));
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && frame === 0) {
        frame = requestAnimationFrame(draw);
      } else if (!visible && frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        if (!reduceMotion) {
          dot.x += dot.vx;
          dot.y += dot.vy;
          if (dot.x < 0 || dot.x > width) dot.vx *= -1;
          if (dot.y < 0 || dot.y > height) dot.vy *= -1;
        }
        const pointerDistance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        if (!reduceMotion && pointerDistance < 110 && pointerDistance > 0) {
          dot.x += ((dot.x - pointer.x) / pointerDistance) * 0.22;
          dot.y += ((dot.y - pointer.y) / pointerDistance) * 0.22;
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(38, 88, 255, .42)";
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        for (let j = i + 1; j < dots.length; j += 1) {
          const other = dots[j];
          const distance = Math.hypot(dot.x - other.x, dot.y - other.y);
          if (distance < 105) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(38, 88, 255, ${(1 - distance / 105) * 0.13})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
        const pointerDistance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
        if (pointerDistance < 155) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(38, 88, 255, ${(1 - pointerDistance / 155) * 0.46})`;
          ctx.lineWidth = 0.9;
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      if (!reduceMotion && visible) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(canvas);
    resize();
    draw();
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, reduceMotion]);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

function CustomCursor({ reduceMotion }: { reduceMotion: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    document.documentElement.classList.add("custom-cursor-ready");
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let frame = 0;

    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.classList.add("visible");
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      cursor.dataset.label = target?.dataset.cursor ?? "";
      cursor.classList.toggle("interactive", Boolean(target));
    };
    const leave = () => cursor.classList.remove("visible");
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-ready");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduceMotion]);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>;
}

function PdfReader({ documents, lang, labels }: {
  documents: PdfDocument[];
  lang: Lang;
  labels: typeof ui.zh | typeof ui.en;
}) {
  const [activeId, setActiveId] = useState(documents[0]?.id ?? "");
  useEffect(() => setActiveId(documents[0]?.id ?? ""), [documents]);
  const active = documents.find((document) => document.id === activeId) ?? documents[0];
  if (!active) return null;
  const activeSrc = assetPath(active.src);

  return (
    <section className="pdf-section" aria-label={labels.sourceDocs}>
      <div className="pdf-heading">
        <div>
          <span>{labels.sourceDocs}</span>
          <p>{labels.sourceDocsHelp}</p>
        </div>
        <a className="pdf-open-link" href={activeSrc} target="_blank" rel="noreferrer" data-cursor={labels.openNew}>
          {labels.openNew}<span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="pdf-tabs" role="tablist" aria-label={labels.sourceDocs}>
        {documents.map((document) => (
          <button
            key={document.id}
            type="button"
            role="tab"
            aria-selected={document.id === active.id}
            className={document.id === active.id ? "active" : ""}
            onClick={() => setActiveId(document.id)}
            data-cursor={labels.readPdf}
          >
            <strong>{document.title[lang]}</strong>
            <span>{document.pages} {labels.pages}</span>
          </button>
        ))}
      </div>
      <div className="pdf-reader-frame">
        <iframe
          key={active.id}
          title={active.title[lang]}
          src={`${activeSrc}#page=1&view=FitH&toolbar=1&navpanes=0`}
          loading="lazy"
        />
        <noscript><a href={activeSrc}>{labels.openNew}</a></noscript>
      </div>
      <div className="pdf-downloads">
        {documents.map((document) => (
          <a
            key={document.id}
            href={assetPath(document.src)}
            download={document.filename}
            data-cursor={labels.downloadPdf}
          >
            <span>{document.title[lang]}</span>
            <strong>{labels.downloadPdf} ↓</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProjectDialog({ project, lang, labels, onClose }: {
  project: Project | null;
  lang: Lang;
  labels: typeof ui.zh | typeof ui.en;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  if (!project) return <dialog ref={ref} />;
  return (
    <dialog
      className="case-dialog"
      ref={ref}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <span>{project.index} / 05 · {labels.caseLabel}</span>
          <button type="button" onClick={onClose} aria-label={labels.close} data-cursor={labels.close}>
            {labels.close}<b aria-hidden="true">×</b>
          </button>
        </header>
        <div className="dialog-intro">
          <div>
            <p>{project.sector[lang]}</p>
            <h2>{project.title[lang]}</h2>
          </div>
          <div>
            <span>{project.role[lang]}</span>
            <p>{project.summary[lang]}</p>
          </div>
        </div>
        <div className="dialog-results-label">
          <span>{labels.evidence}</span><span>01—04</span>
        </div>
        <div className="dialog-metrics">
          {project.metrics.map((metric) => (
            <div className="dialog-metric" key={metric.value + metric.label.en}>
              <strong>{metric.value}</strong>
              <span>{metric.label[lang]}</span>
            </div>
          ))}
        </div>
        <div className="dialog-evidence">
          <section>
            <span>{labels.businessContext}</span>
            <p>{project.context[lang]}</p>
          </section>
          <section>
            <span>{labels.keyActions}</span>
            <ul>{project.actions[lang].map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <span>{labels.evidence}</span>
            <ul>{project.outcomes[lang].map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="boundary-note">
            <span>{labels.boundary}</span>
            <p>{project.boundary[lang]}</p>
          </section>
        </div>
        <PdfReader documents={project.documents} lang={lang} labels={labels} />
        <button type="button" className="dialog-close-bottom" onClick={onClose} data-cursor={labels.close}>
          {labels.close}<span aria-hidden="true">↑</span>
        </button>
      </div>
    </dialog>
  );
}

function WritingDialog({ document, lang, labels, onClose }: {
  document: WritingDocument | null;
  lang: Lang;
  labels: typeof ui.zh | typeof ui.en;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (document && !dialog.open) dialog.showModal();
    if (!document && dialog.open) dialog.close();
  }, [document]);

  if (!document) return <dialog ref={ref} />;
  return (
    <dialog
      className="case-dialog document-dialog"
      ref={ref}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <span>{document.number} / 05 · {labels.writingLabel}</span>
          <button type="button" onClick={onClose} aria-label={labels.close} data-cursor={labels.close}>
            {labels.close}<b aria-hidden="true">×</b>
          </button>
        </header>
        <div className="document-dialog-intro">
          <p>{document.type[lang]}</p>
          <h2>{document.title[lang]}</h2>
          <span>{document.description[lang]}</span>
        </div>
        <PdfReader documents={[document]} lang={lang} labels={labels} />
      </div>
    </dialog>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("zh");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedWritingId, setSelectedWritingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [slide, setSlide] = useState(0);
  const [carouselUserPaused, setCarouselUserPaused] = useState(false);
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [carouselFocusWithin, setCarouselFocusWithin] = useState(false);
  const [capability, setCapability] = useState(0);
  const c = ui[lang];
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;
  const selectedWriting = writingDocuments.find((document) => document.id === selectedWritingId) ?? null;
  const modalOpen = Boolean(selectedProject || selectedWriting);
  const visibleProjects = useMemo(
    () => filter === "all" ? projects : projects.filter((project) => project.filters.includes(filter)),
    [filter],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("wyh-portfolio-language");
      const initial: Lang = saved === "en" ? "en" : "zh";
      setLang(initial);
      document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";
    } catch {
      document.documentElement.lang = "zh-CN";
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", modalOpen);
    return () => document.body.classList.remove("modal-open");
  }, [modalOpen]);

  useEffect(() => {
    if (reduceMotion || carouselUserPaused || carouselHovered || carouselFocusWithin || modalOpen) return;
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % projects.length), 3500);
    return () => window.clearInterval(timer);
  }, [carouselFocusWithin, carouselHovered, carouselUserPaused, modalOpen, reduceMotion]);

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filter, lang, reduceMotion]);

  function switchLanguage(next: Lang) {
    setLang(next);
    setMenuOpen(false);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    try { window.localStorage.setItem("wyh-portfolio-language", next); } catch { /* no-op */ }
  }

  function openProject(id: string) {
    setSelectedWritingId(null);
    setSelectedId(id);
  }

  const navItems = [
    ["#work", c.navWork],
    ["#capabilities", c.navCapabilities],
    ["#writing", c.navWriting],
    ["#experience", c.navExperience],
    ["#toolkit", c.navToolkit],
    ["#contact", c.navContact],
  ];

  const activeSlide = projects[slide];
  const activeCapability = c.capabilities[capability];
  const activeCapabilityProject = projects.find((project) => project.id === activeCapability.projectId) ?? projects[0];

  return (
    <>
      <a className="skip-link" href="#main">{c.skip}</a>
      <CustomCursor reduceMotion={reduceMotion} />
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label={c.brandAria} data-cursor="WYH / PR">
            <span>WYH</span><span>/</span><span>PR</span>
          </a>
          <nav className="desktop-nav" aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
            {navItems.map(([href, label]) => <a key={href} href={href} data-cursor={label}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <div className="language-toggle" role="group" aria-label={c.language}>
              <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => switchLanguage("zh")} aria-pressed={lang === "zh"}>中</button>
              <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLanguage("en")} aria-pressed={lang === "en"}>EN</button>
            </div>
            <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
              {c.menu}<span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label={lang === "zh" ? "移动导航" : "Mobile navigation"}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span aria-hidden="true">↘</span></a>)}
        </nav>
      </header>

      <main id="main">
        <div className="hero-shell" id="top">
          <ParticleField reduceMotion={reduceMotion} density={52} />
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow reveal">{c.eyebrow}</p>
              <h1 className={`display-title reveal ${lang === "en" ? "display-title-en" : ""}`}>
                {c.heroTitle.map((line) => <span key={line}>{line}</span>)}
              </h1>
              <p className="hero-lead reveal">{c.heroLead}</p>
              <div className="hero-actions reveal">
                <a className="primary-link" href="#work" data-cursor={c.viewWork}>{c.viewWork}<span aria-hidden="true">↘</span></a>
                <a className="secondary-link" href={assetPath("/documents/wu-yunheng-resume.pdf")} download="Wu-Yunheng-Resume.pdf" data-cursor={c.resume}>{c.resume}<span aria-hidden="true">↓</span></a>
              </div>
              <p className="availability reveal"><span aria-hidden="true" />{c.availability}</p>
            </div>
            <div
              className="hero-carousel reveal"
              aria-label={c.carouselLabel}
              onMouseEnter={() => setCarouselHovered(true)}
              onMouseLeave={() => setCarouselHovered(false)}
              onFocusCapture={() => setCarouselFocusWithin(true)}
              onBlurCapture={(event) => {
                const nextTarget = event.relatedTarget;
                if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                  setCarouselFocusWithin(false);
                }
              }}
            >
              <button type="button" className="hero-slide" onClick={() => openProject(activeSlide.id)} data-cursor={c.openCase} aria-label={`${c.openCase}: ${activeSlide.title[lang]}`}>
                {projects.map((project, index) => (
                  <img key={project.id} src={assetPath(project.cover)} alt="" className={index === slide ? "active" : ""} aria-hidden={index !== slide} />
                ))}
                <span className="hero-slide-overlay" />
                <span className="hero-slide-copy">
                  <small>{activeSlide.index} / 05 · {activeSlide.sector[lang]}</small>
                  <strong>{activeSlide.title[lang]}</strong>
                  <em>{c.openCase} ↗</em>
                </span>
              </button>
              <div className="carousel-controls">
                <span>{String(slide + 1).padStart(2, "0")} / 05</span>
                <div>
                  <button type="button" onClick={() => setSlide((slide - 1 + projects.length) % projects.length)} aria-label={c.previous}>←</button>
                  {!reduceMotion && (
                    <button type="button" onClick={() => setCarouselUserPaused((value) => !value)} aria-label={carouselUserPaused ? c.play : c.pause}>
                      {carouselUserPaused ? "▶" : "Ⅱ"}
                    </button>
                  )}
                  <button type="button" onClick={() => setSlide((slide + 1) % projects.length)} aria-label={c.next}>→</button>
                </div>
              </div>
            </div>
          </section>
          <section className="proof-strip" aria-label={c.proofLabel}>
            <div className="proof-title">
              <span>{c.proofLabel}</span>
              <p>{c.proofFootnote}</p>
            </div>
            <div className="proof-grid">
              <button type="button" onClick={() => openProject("tcl")} data-cursor="TCL">
                <strong><CountUp value={21.67} decimals={2} suffix="M+" reduceMotion={reduceMotion} /></strong>
                <span>{lang === "zh" ? "TCL现场总人流" : "TCL project venue footfall"}</span>
              </button>
              <button type="button" onClick={() => openProject("tcl")} data-cursor="TCL">
                <strong><CountUp value={2.76} decimals={2} suffix="M+" reduceMotion={reduceMotion} /></strong>
                <span>{lang === "zh" ? "TCL内容播放/曝光" : "TCL content views/reach"}</span>
              </button>
              <button type="button" onClick={() => openProject("bonpoint")} data-cursor="Bonpoint">
                <strong><CountUp value={1} suffix="M+" reduceMotion={reduceMotion} /></strong>
                <span>{lang === "zh" ? "Bonpoint年化全渠道阅读*" : "Bonpoint annualised reads*"}</span>
              </button>
              <div>
                <strong className="language-proof">CN / EN</strong>
                <span>{lang === "zh" ? "中英双语工作" : "Bilingual working capability"}</span>
              </div>
            </div>
          </section>
        </div>

        <section className="section positioning-section particle-section" id="positioning">
          <ParticleField reduceMotion={reduceMotion} density={34} />
          <div className="section-label reveal">{c.positioningLabel}</div>
          <div className="positioning-grid">
            <h2 className="reveal">{c.positioningTitle}</h2>
            <div className="positioning-detail reveal">
              <p>{c.positioningBody}</p>
              <ol>{c.positioningSteps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
            </div>
          </div>
        </section>

        <section className="section work-section particle-section" id="work">
          <ParticleField reduceMotion={reduceMotion} density={48} />
          <div className="section-heading reveal">
            <div><span className="section-label">{c.workLabel}</span><h2>{c.workTitle}</h2></div>
            <p>{c.workBody}</p>
          </div>
          <div className="filter-bar reveal" aria-label={lang === "zh" ? "案例筛选" : "Project filters"}>
            {(Object.keys(c.filters) as Filter[]).map((key) => (
              <button type="button" key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)} aria-pressed={filter === key}>{c.filters[key]}</button>
            ))}
          </div>
          <div className="scope-banner reveal"><span>DATA NOTE</span><p>{c.scope}</p></div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className={`project-card project-${project.id}`} key={project.id}>
                <button type="button" className="project-open" onClick={() => openProject(project.id)} data-cursor={c.openCase}>
                  <div className="project-media"><img src={assetPath(project.cover)} alt={project.title[lang]} loading="lazy" /></div>
                  <div className="project-overlay">
                    <span className="project-topline"><b>{project.index}</b><em>{project.sector[lang]}</em><i>{project.documents.length} PDF</i></span>
                    <div>
                      <h3>{project.title[lang]}</h3>
                      <p>{project.summary[lang]}</p>
                      <span className="project-role">{project.role[lang]}</span>
                    </div>
                    <strong className="project-arrow">↗</strong>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="capability-section" id="capabilities">
          <div className="capability-heading reveal">
            <span className="section-label">{c.capabilityLabel}</span>
            <h2>{c.capabilityTitle}</h2>
            <p>{c.capabilityBody}</p>
          </div>
          <div className="capability-layout reveal">
            <div className="capability-list">
              {c.capabilities.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  className={capability === index ? "active" : ""}
                  onMouseEnter={() => setCapability(index)}
                  onFocus={() => setCapability(index)}
                  onClick={() => openProject(item.projectId)}
                  data-cursor={c.openCase}
                >
                  <span>0{index + 1}</span>
                  <div><h3>{item.title}</h3><p>{item.body}</p><strong>{item.projects} ↗</strong></div>
                </button>
              ))}
            </div>
            <button type="button" className="capability-preview" onClick={() => openProject(activeCapabilityProject.id)} data-cursor={c.openCase}>
              <img src={assetPath(activeCapabilityProject.cover)} alt={activeCapabilityProject.title[lang]} />
              <span>{activeCapability.projects}</span>
            </button>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="process-heading reveal"><span className="section-label">{c.processLabel}</span><h2>{c.processTitle}</h2></div>
          <div className="process-grid">
            {c.processSteps.map((step, index) => (
              <article className="process-step reveal" key={step.word}>
                <span>0{index + 1}</span><strong>{step.word}</strong><h3>{step.title}</h3><p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section writing-section" id="writing">
          <div className="section-heading reveal">
            <div><span className="section-label">{c.writingLabel}</span><h2>{c.writingTitle}</h2></div>
            <p>{c.writingBody}</p>
          </div>
          <div className="document-grid">
            {writingDocuments.map((document) => (
              <article className="document-card reveal" key={document.id}>
                <span className="document-no">{document.number}</span>
                <p className="document-type">{document.type[lang]}</p>
                <h3>{document.title[lang]}</h3>
                <p>{document.description[lang]}</p>
                <div className="document-actions">
                  <button type="button" onClick={() => { setSelectedId(null); setSelectedWritingId(document.id); }} data-cursor={c.readPdf}>{c.readPdf} ↗</button>
                  <a href={assetPath(document.src)} download={document.filename} data-cursor={c.downloadPdf}>{c.downloadPdf} ↓</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-heading reveal">
            <div><span className="section-label">{c.experienceLabel}</span><h2>{c.experienceTitle}</h2></div>
            <p>{c.experienceBody}</p>
          </div>
          <div className="experience-columns">
            <div className="experience-column reveal">
              <h3>{c.workExperience}</h3>
              {workExperience.map((item) => (
                <article className="timeline-row" key={item.date.en}>
                  <time>{item.date[lang]}</time>
                  <div><h4>{item.organisation[lang]}</h4><strong>{item.role[lang]}</strong><p>{item.body[lang]}</p></div>
                </article>
              ))}
            </div>
            <div className="experience-column education-column reveal">
              <h3>{c.education}</h3>
              {education.map((item) => (
                <article className="timeline-row" key={item.organisation}>
                  <time>{item.date}</time>
                  <div><h4>{item.organisation}</h4><strong>{item.role[lang]}</strong><p>{item.ranking[lang]}</p></div>
                </article>
              ))}
              <aside className="resume-cta">
                <h3>{c.resumeCtaTitle}</h3>
                <p>{c.resumeCtaBody}</p>
                <a href={assetPath("/documents/wu-yunheng-resume.pdf")} download="Wu-Yunheng-Resume.pdf" data-cursor={c.resume}>{c.takeResume}<span aria-hidden="true">↓</span></a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section toolkit-section" id="toolkit">
          <div className="section-heading reveal">
            <div><span className="section-label">{c.toolkitLabel}</span><h2>{c.toolkitTitle}</h2></div>
            <p>{c.toolkitBody}</p>
          </div>
          <div className="toolkit-grid">
            {c.toolkits.map((item, index) => (
              <article className="toolkit-card reveal" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="section campus-section" id="campus">
          <div className="section-heading reveal">
            <div><span className="section-label">{c.campusLabel}</span><h2>{c.campusTitle}</h2></div>
          </div>
          <div className="campus-grid">
            {c.campus.map((item, index) => (
              <article className="campus-card reveal" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner reveal">
            <p>{c.ctaKicker}</p>
            <h2>{c.ctaTitle}</h2>
            <span>{c.ctaBody}</span>
            <div className="contact-links">
              <a href={`mailto:${c.email}`} data-cursor="EMAIL">{c.email}<span aria-hidden="true">↗</span></a>
              <a href={assetPath("/documents/wu-yunheng-resume.pdf")} download="Wu-Yunheng-Resume.pdf" data-cursor={c.resume}>{c.resume}<span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{c.footer}</span><span>{c.footerNote}</span><a href="#top">{c.backToTop} ↑</a>
      </footer>

      <ProjectDialog project={selectedProject} lang={lang} labels={c} onClose={() => setSelectedId(null)} />
      <WritingDialog document={selectedWriting} lang={lang} labels={c} onClose={() => setSelectedWritingId(null)} />
    </>
  );
}
