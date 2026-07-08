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

const NAV = [
  { id: "about", key: "about" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "education", key: "education" },
  { id: "contact", key: "contact" },
] as const;

export default function Portfolio({ content }: { content: ContentData }) {
  const p = content.profile;
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [active, setActive] = useState("about");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const roles = p.roles[lang];
  const shownProjects = content.projects.filter((pr) => filter === "all" || pr.category === filter);

  return (
    <div className="page">
      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <a className="brand" onClick={() => go("top")} role="button" tabIndex={0}>
            <span className="mark">{p.initials}</span>
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
            <div className="lang" role="group" aria-label="Language">
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
              <button className={lang === "id" ? "on" : ""} onClick={() => setLang("id")}>ID</button>
            </div>
            <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <IcSun /> : <IcMoon />}
            </button>
            <button className="iconbtn menubtn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
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
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">{t(p.eyebrow)}</span>
              <h1>{p.name}</h1>
              <div className="hero-role">
                <span className="caret">&gt;</span>
                <span className="role-word" key={`${lang}-${roleIdx}`}>{roles[roleIdx % roles.length]}</span>
              </div>
              <p className="hero-intro">{t(p.intro)}</p>
              <div className="cta-row">
                <a className="btn btn-primary" onClick={() => go("projects")} role="button" tabIndex={0}>
                  {t(UI.cta.work)} <IcArrow />
                </a>
                {p.cvUrl && (
                  <a className="btn btn-ghost" href={p.cvUrl} download>
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
          <div className="wrap">
            <SecHead num="01" title={t(UI.sec.about)} />
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
          <div className="wrap">
            <SecHead num="02" title={t(UI.sec.experience)} />
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
          <div className="wrap">
            <SecHead num="03" title={t(UI.sec.projects)} />
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
          <div className="wrap">
            <SecHead num="04" title={t(UI.sec.skills)} />
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
          <div className="wrap">
            <SecHead num="05" title={t(UI.sec.education)} />
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
                  {content.certificates.map((c) => (
                    <div className="cert" key={c.id}>
                      <IcCert />
                      <div><b>{c.name}</b><span>{t(c.sub)}</span></div>
                    </div>
                  ))}
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
            <SecHead num="06" title={t(UI.sec.contact)} />
            <Reveal className="contact-card">
              <h2 className="contact-h">{t(p.contactH)}</h2>
              <p className="contact-p">{t(p.contactP)}</p>
              <div className="contact-actions">
                <a className="cbtn primary" href={`mailto:${p.email}`}><IcMail /> {p.email}</a>
                <button className="cbtn" onClick={copyEmail}><IcCopy /> {t(UI.copy)}</button>
                <a className="cbtn" href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer"><IcLinkedin /> LinkedIn</a>
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

      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="mono">{t(UI.foot)}</span>
          <span className="mono">{p.name} · 2026</span>
          <button className="totop" onClick={() => go("top")}>
            <IcUp /> {t(UI.totop)}
          </button>
        </div>
      </footer>

      <div className={`toast ${toast ? "show" : ""}`}>
        {toast && <><IcCheck /><span>{toast}</span></>}
      </div>
    </div>
  );
}

function SecHead({ num, title }: { num: string; title: string }) {
  return (
    <Reveal className="sec-head">
      <span className="sec-num">{num}</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-line" />
    </Reveal>
  );
}
