"use client";
import { useEffect, useRef, useState } from "react";
import type { ContentData, L, Lang } from "@/lib/content";
import { UI } from "@/lib/i18n";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

/* ---------- inline icons ---------- */
const s = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
const IcArrow = () => (<svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
const IcDownload = () => (<svg viewBox="0 0 24 24" {...s}><path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>);
const IcMail = () => (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
const IcPhone = () => (<svg viewBox="0 0 24 24" {...s}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z" /></svg>);
const IcLinkedin = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3 8.5h3.9V21H3V8.5Zm6.3 0H13v1.7h.05c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.4 4.5 5.6V21h-3.9v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.3V8.5Z" /></svg>);
const IcCopy = () => (<svg viewBox="0 0 24 24" {...s}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>);
const IcCheck = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>);
const IcCert = () => (<svg viewBox="0 0 24 24" {...s}><path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" /></svg>);
const IcSun = () => (<svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
const IcMoon = () => (<svg viewBox="0 0 24 24" {...s}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>);
const IcMenu = () => (<svg viewBox="0 0 24 24" {...s}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
const IcUp = () => (<svg width="14" height="14" viewBox="0 0 24 24" {...s}><path d="M12 19V5M5 12l7-7 7 7" /></svg>);
const IcGithub = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>);
const IcGitlab = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="m23.6 9.6-.03-.08-3.2-8.35a.83.83 0 0 0-1.57.03L16.68 7.4H7.33L5.2 1.23a.83.83 0 0 0-1.57-.03L.43 9.55l-.03.08a5.93 5.93 0 0 0 1.97 6.85l.02.02 4.86 3.64 2.41 1.82 1.47 1.11a.97.97 0 0 0 1.17 0l1.47-1.11 2.41-1.82 4.89-3.66.01-.01a5.94 5.94 0 0 0 1.98-6.86Z" /></svg>);

const NAV = [
  { id: "about", key: "about" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "education", key: "education" },
  { id: "contact", key: "contact" },
] as const;

/* Hidden SVG defs — the batik motif (octagon-medallion) referenced by the header/footer layers. */
function BatikDefs() {
  return (
    <svg id="batik-defs" aria-hidden="true">
      <defs>
        <pattern id="batik" width="52" height="52" patternUnits="userSpaceOnUse">
          <polygon className="bt-oct" points="15,0 37,0 52,15 52,37 37,52 15,52 0,37 0,15" />
          <polygon className="bt-oct thin" points="20,5 32,5 47,20 47,32 32,47 20,47 5,32 5,20" />
          <g className="bt-med">
            <circle cx="26" cy="26" r="8.5" />
            <path d="M26 15 L28.4 23.6 L37 26 L28.4 28.4 L26 37 L23.6 28.4 L15 26 L23.6 23.6 Z" />
          </g>
          <circle className="bt-dot" cx="26" cy="26" r="2.1" />
          <path className="bt-dot" d="M0 -5 L5 0 L0 5 L-5 0 Z" />
          <path className="bt-dot" d="M52 -5 L57 0 L52 5 L47 0 Z" />
          <path className="bt-dot" d="M0 47 L5 52 L0 57 L-5 52 Z" />
          <path className="bt-dot" d="M52 47 L57 52 L52 57 L47 52 Z" />
        </pattern>
      </defs>
    </svg>
  );
}
const BatikLayer = ({ className }: { className: string }) => (
  <div className={`bt ${className}`} aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="url(#batik)" /></svg>
  </div>
);

export default function Portfolio({ content }: { content: ContentData }) {
  const p = content.profile;
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [active, setActive] = useState("about");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const t = (v: L) => v[lang];

  /* language persistence + detection */
  useEffect(() => {
    const saved = localStorage.getItem("port-lang");
    if (saved === "en" || saved === "id") setLang(saved);
    else if (navigator.language?.startsWith("id")) setLang("id");
  }, []);
  useEffect(() => {
    localStorage.setItem("port-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  /* theme */
  useEffect(() => {
    const saved = localStorage.getItem("port-theme");
    const cur = saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(cur);
    document.documentElement.setAttribute("data-theme", cur);
  }, []);
  const toggleTheme = () => {
    const next = (theme ?? "light") === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("port-theme", next);
  };

  /* rotating role words */
  useEffect(() => {
    const len = p.roles.en.length || 1;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % len), 2400);
    return () => clearInterval(id);
  }, [p.roles.en.length]);

  /* active-section highlight */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((sec) => obs.observe(sec));
    return () => obs.disconnect();
  }, []);

  /* certificate lightbox: close on Escape, lock body scroll while open */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(p.email).then(() => {
      setToast(t(UI.copied));
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(""), 1800);
    });
  };
  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* hero gold glow follows the cursor */
  const onHeroMove = (e: React.MouseEvent) => {
    const g = glowRef.current;
    if (!g) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    g.style.left = `${e.clientX - r.left}px`;
    g.style.top = `${e.clientY - r.top}px`;
    g.style.opacity = "0.7";
  };
  const onHeroLeave = () => { if (glowRef.current) glowRef.current.style.opacity = "0.45"; };

  const roles = p.roles[lang];
  const shownProjects = content.projects.filter((pr) => filter === "all" || pr.category === filter);

  // Split the display name so the last word gets the italic-gold treatment.
  const nameWords = p.name.trim().split(" ");
  const lastName = nameWords.length > 1 ? nameWords.pop()! : "";
  const firstNames = nameWords.join(" ");

  // Language-aware CV: ID site → Indonesian CV (fall back to English), EN site → English CV.
  const cvHref = lang === "id" ? (p.cvUrlId ?? p.cvUrl) : (p.cvUrl ?? p.cvUrlId);

  // Click "Download CV": open the PDF preview in a new tab AND auto-download the file.
  const downloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cvHref) return;
    window.open(cvHref, "_blank", "noopener,noreferrer");
    try {
      const res = await fetch(cvHref);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = cvHref.split("/").pop() || "CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      /* preview tab already opened; ignore download failure */
    }
  };

  return (
    <div className="page">
      <BatikDefs />

      {/* NAV */}
      <nav className="nav">
        <BatikLayer className="nav-bt" />
        <div className="wrap nav-inner">
          <a className="brand" onClick={() => go("top")} role="button" tabIndex={0}>
            <span className="mark boop">{p.initials}</span>
            <span>{p.name}</span>
          </a>
          <div className="navlinks">
            {NAV.map((n) => (
              <a key={n.id} className={active === n.id ? "active" : ""} onClick={() => go(n.id)}>
                {t(UI.nav[n.key])}
              </a>
            ))}
          </div>
          <div className="controls">
            <div className={`lang ${lang === "id" ? "id" : ""}`} role="group" aria-label="Language">
              <span className="ind" />
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
              <button className={lang === "id" ? "on" : ""} onClick={() => setLang("id")}>ID</button>
            </div>
            <button className="iconbtn boop" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <IcSun /> : <IcMoon />}
            </button>
            <button className="iconbtn menubtn boop" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              <IcMenu />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.id} onClick={() => go(n.id)}>{t(UI.nav[n.key])}</a>
        ))}
      </div>

      <span id="top" />

      <main>
        {/* HERO */}
        <header className="hero" onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
          <div className="glow" ref={glowRef} aria-hidden="true" />
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">{t(p.eyebrow)}</span>
              <h1>{firstNames} {lastName && <span className="amp">{lastName}</span>}</h1>
              <div className="hero-role">
                <span className="caret">&gt;</span>
                <span className="role-word" key={`${lang}-${roleIdx}`}>{roles[roleIdx % roles.length]}</span>
              </div>
              <p className="hero-intro">{t(p.intro)}</p>
              <div className="cta-row">
                <a className="btn btn-primary" onClick={() => go("projects")} role="button" tabIndex={0}>
                  {t(UI.cta.work)} <IcArrow />
                </a>
                {cvHref && (
                  <a className="btn btn-ghost" href={cvHref} onClick={downloadCV} role="button" tabIndex={0}>
                    <IcDownload /> {t(UI.cta.cv)}
                  </a>
                )}
                <a className="btn btn-ghost" onClick={() => go("contact")} role="button" tabIndex={0}>
                  {t(UI.cta.contact)}
                </a>
              </div>
              <div className="coords">
                <span><span className="dot" />{t(p.location)}</span>
                <span><span className="dot live" />{t(p.availability)}</span>
              </div>
            </div>
            <Reveal className="portrait-wrap">
              <div className="portrait">
                <span className="pmark tl" /><span className="pmark tr" />
                <span className="pmark bl" /><span className="pmark br" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photoUrl ?? ""} alt={`Portrait of ${p.name}`} />
                <span className="ptag"><span className="dot" />M.E.D · SWE</span>
              </div>
            </Reveal>
          </div>
          <div className="wrap">
            <div className="stats">
              {p.stats.map((st, i) => (
                <Reveal key={i} className="stat">
                  <CountUp n={st.n} dec={st.dec} suf={st.suf} />
                  <div className="stat-lbl">{t(st.lbl)}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <section className="section" id="about">
          <BatikLayer className="side-bt side-left" />
          <div className="wrap">
            <SecHead kicker="about" title={t(UI.sec.about)} />
            <div className="about-grid">
              <Reveal className="about-copy">
                {p.aboutParas.map((para, i) => <p key={i}>{t(para)}</p>)}
              </Reveal>
              <Reveal className="facts">
                {p.facts.map((f, i) => (
                  <div className="fact" key={i}>
                    <span className="fact-k">{t(f.k)}</span>
                    <span className="fact-v">{t(f.v)}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <BatikLayer className="side-bt side-right" />
          <div className="wrap">
            <SecHead kicker="experience" title={t(UI.sec.experience)} />
            <div className="timeline">
              {content.experiences.map((e) => (
                <Reveal key={e.id} className="tl-item">
                  <div className="tl-side">
                    <div className="tl-period">{t(e.period)}</div>
                    <div className="tl-loc">{e.loc}</div>
                  </div>
                  <div className={`tl-node ${e.current ? "cur" : ""}`} />
                  <div className="tl-card">
                    <div className="tl-role">
                      {t(e.role)}
                      {e.current && <span className="badge">{t(UI.current)}</span>}
                      <span className="badge type">{t(e.type)}</span>
                    </div>
                    <div className="tl-org">{e.org}</div>
                    <ul className="bullets">
                      {e.bullets[lang].map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                    <div className="tags">
                      {e.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <BatikLayer className="side-bt side-left" />
          <div className="wrap">
            <SecHead kicker="projects" title={t(UI.sec.projects)} />
            <div className="filter">
              <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>{t(UI.filterAll)}</button>
              <button className={filter === "web" ? "on" : ""} onClick={() => setFilter("web")}>{t(UI.filters.web)}</button>
              <button className={filter === "mobile" ? "on" : ""} onClick={() => setFilter("mobile")}>{t(UI.filters.mobile)}</button>
            </div>
            <div className="proj-grid">
              {shownProjects.map((pr) => (
                <Reveal key={pr.id} as="article" className="proj-card">
                  <div className="proj-top">
                    <span className="proj-cat">{pr.category === "mobile" ? "Mobile · ML" : "Web"}</span>
                    <span className="proj-period">{t(pr.period)}</span>
                  </div>
                  <h3 className="proj-name">{pr.name}</h3>
                  <div className="proj-role">{t(pr.role)}</div>
                  <p className="proj-desc">{t(pr.desc)}</p>
                  <div className="tags">
                    {pr.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <BatikLayer className="side-bt side-right" />
          <div className="wrap">
            <SecHead kicker="skills" title={t(UI.sec.skills)} />
            <div className="skills-grid">
              {content.skills.map((g) => (
                <Reveal key={g.id} className="skill-group">
                  <div className="sg-title">{t(g.title)}<span className="n">// {g.items.length}</span></div>
                  <div className="chips">
                    {g.items.map((it) => <span className="chip" key={it}>{it}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & ORGANIZATION */}
        <section className="section" id="education">
          <BatikLayer className="side-bt side-left" />
          <div className="wrap">
            <SecHead kicker="education" title={t(UI.sec.education)} />
            <div className="edu-grid">
              <div>
                <div className="col-title">{t(UI.eduCol)}</div>
                {content.education.map((e) => (
                  <Reveal key={e.id} className="card">
                    <div className="card-h">
                      <div>
                        <div className="card-title">{e.school}</div>
                        <div className="card-sub">{t(e.degree)}</div>
                      </div>
                      <div className="card-period">{t(e.period)}</div>
                    </div>
                    <div className="card-detail">{t(e.detail)}</div>
                  </Reveal>
                ))}
                <div className="col-title" style={{ marginTop: 22 }}>{t(UI.certCol)}</div>
                <Reveal className="certs">
                  {content.certificates.map((c) =>
                    c.fileUrl ? (
                      <button className="cert cert-btn" key={c.id} onClick={() => setLightbox(c.fileUrl)} title={t(UI.certView)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="cert-thumb" src={c.fileUrl} alt={c.name} />
                        <div><b>{c.name}</b><span>{t(c.sub)}</span></div>
                      </button>
                    ) : (
                      <div className="cert" key={c.id}>
                        <IcCert />
                        <div><b>{c.name}</b><span>{t(c.sub)}</span></div>
                      </div>
                    )
                  )}
                </Reveal>
              </div>
              <div>
                <div className="col-title">{t(UI.orgCol)}</div>
                {content.organizations.map((o) => (
                  <Reveal key={o.id} className="card">
                    <div className="card-h">
                      <div>
                        <div className="card-title">{t(o.role)}</div>
                        <div className="card-sub">{o.org}</div>
                      </div>
                      <div className="card-period">{t(o.period)}</div>
                    </div>
                    <ul className="bullets">
                      {o.bullets[lang].map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="wrap">
            <SecHead kicker="contact" title={t(UI.sec.contact)} />
            <Reveal className="contact-card">
              <h2 className="contact-h">{t(p.contactH)}</h2>
              <p className="contact-p">{t(p.contactP)}</p>
              <div className="contact-actions">
                <a className="cbtn primary" href={`mailto:${p.email}`}><IcMail /> {p.email}</a>
                <button className="cbtn" onClick={copyEmail}><IcCopy /> {t(UI.copy)}</button>
                <a className="cbtn" href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer"><IcLinkedin /> LinkedIn</a>
                {p.github && <a className="cbtn" href={`https://${p.github}`} target="_blank" rel="noopener noreferrer"><IcGithub /> GitHub</a>}
                {p.gitlab && <a className="cbtn" href={`https://${p.gitlab}`} target="_blank" rel="noopener noreferrer"><IcGitlab /> GitLab</a>}
                {p.showPhone && (
                  <a className="cbtn" href={`tel:${p.phone.replace(/[^+0-9]/g, "")}`}><IcPhone /> {p.phone}</a>
                )}
              </div>
              <div className="open-to">
                <div className="lbl">{t(UI.openTo)}</div>
                <div className="chips">
                  {p.openTo.map((r) => <span className="chip" key={r}>{r}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER (Josh-inspired, batik dome from the bottom) */}
      <footer className="footer">
        <BatikLayer className="foot-bt" />
        <div className="wrap">
          <div className="foot-cta">
            <div className="k">{t(UI.footK)}</div>
            <h2 className="foot-h">{t(p.contactH)}</h2>
            <a className="big-btn boop" onClick={() => go("contact")} role="button" tabIndex={0}>
              ✦ {t(UI.cta.contact)}
            </a>
          </div>

          <div className="foot-cols">
            <div className="fcol">
              <div className="fbrand"><span className="mk">{p.initials}</span>{p.name}</div>
              <p>{t(UI.footTagline)}</p>
              <div className="socials">
                <a className="soc boop" href={`mailto:${p.email}`} title="Email" aria-label="Email"><IcMail /></a>
                <a className="soc boop" href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><IcLinkedin /></a>
                {p.github && <a className="soc boop" href={`https://${p.github}`} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><IcGithub /></a>}
                {p.gitlab && <a className="soc boop" href={`https://${p.gitlab}`} target="_blank" rel="noopener noreferrer" title="GitLab" aria-label="GitLab"><IcGitlab /></a>}
              </div>
            </div>
            <div className="fcol">
              <h4>{t(UI.colExplore)}</h4>
              {NAV.map((n) => <a key={n.id} onClick={() => go(n.id)}>{t(UI.nav[n.key])}</a>)}
            </div>
            <div className="fcol">
              <h4>{t(UI.colWork)}</h4>
              {content.projects.slice(0, 4).map((pr) => (
                <a key={pr.id} onClick={() => go("projects")}>{pr.name}</a>
              ))}
            </div>
            <div className="fcol">
              <h4>{t(UI.colConnect)}</h4>
              <a href={`mailto:${p.email}`}>{p.email}</a>
              <a href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              {p.github && <a href={`https://${p.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {p.gitlab && <a href={`https://${p.gitlab}`} target="_blank" rel="noopener noreferrer">GitLab</a>}
              {cvHref && <a href={cvHref} onClick={downloadCV}>{t(UI.cta.cv)}</a>}
            </div>
          </div>

          <div className="foot-bar">
            <span>{p.name} · 2026</span>
            <button className="totop" onClick={() => go("top")}>
              {t(UI.totop)} <IcUp />
            </button>
          </div>
        </div>
      </footer>

      <div className={`toast ${toast ? "show" : ""}`}>
        {toast && <><IcCheck /><span>{toast}</span></>}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Certificate" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function SecHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="sec-head">
      <span className="sec-kicker">// {kicker}</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-line" />
    </Reveal>
  );
}
