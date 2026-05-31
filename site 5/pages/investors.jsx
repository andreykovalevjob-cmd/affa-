// InvestorsPage — страница «Инвесторам»
// Hero + stats → почему fashion (6 карточек) → услуги (4 карточки) → CTA

const useInvestorsViewport = () => {
  const get = () => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false };
    const w = window.innerWidth;
    return { isMobile: w < 768, isTablet: w >= 768 && w < 1024 };
  };
  const [v, setV] = React.useState(get);
  React.useEffect(() => {
    const on = () => setV(get());
    window.addEventListener('resize', on);
    window.addEventListener('orientationchange', on);
    return () => {
      window.removeEventListener('resize', on);
      window.removeEventListener('orientationchange', on);
    };
  }, []);
  return v;
};

const InvestorsPage = () => {
  const D = window.INVESTORS;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useInvestorsViewport();
  const pad = isMobile ? 20 : (isTablet ? 36 : 56);
  const sectionPadY = isMobile ? 56 : (isTablet ? 80 : 96);

  const wrap = { width: '100%', maxWidth: 1600, margin: '0 auto', padding: `0 ${pad}px` };
  const monoLabel = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
  };
  const monoBody = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: isMobile ? 13 : 14, lineHeight: 1.55, color: ink,
  };
  const display = {
    fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
    fontWeight: 900,
  };

  return (
    <React.Fragment>
      <window.SiteHeader active="investors" />

      <div style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 40 : 56}px` }}>
          <div style={{
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: isMobile ? 22 : 32,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '8px 12px' : '10px 14px',
              border: `1px solid ${ink}`, color: ink, background: 'transparent',
              fontFamily: '"JetBrains Mono", monospace', fontWeight: 700,
              fontSize: isMobile ? 11 : 12, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ink, display: 'inline-block' }} />
              ИНВЕСТОРАМ
            </span>
            <span style={{ ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11 }}>
              {`>>> ${D.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {D.hero.kicker}
            </span>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(56px, 18vw, 96px)' : 'clamp(96px, 12.5vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase', overflowWrap: 'anywhere',
          }}>{D.hero.title}</h1>

          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{ ...monoBody, margin: 0, gridColumn: isMobile ? 'auto' : 'span 2', maxWidth: 720 }}>
              {D.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{D.hero.body2}</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: isMobile ? 'stretch' : 'flex-end' }}>
              <a href={D.hero.ctaHref} style={{
                padding: '14px 22px', background: ink, color: paper,
                border: `1px solid ${ink}`, fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
                letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
              }}>[ {D.hero.cta} → ]</a>
            </div>
          </div>

          {/* Цифры */}
          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            border: `1px solid ${line}`,
          }}>
            {D.stats.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? 18 : 28,
                borderRight: !isMobile && i < 3 ? `1px solid ${line}` :
                             (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
                borderBottom: isMobile && i < 2 ? `1px solid ${line}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  ...display, fontSize: isMobile ? 'clamp(22px, 7vw, 32px)' : 'clamp(28px, 3vw, 44px)',
                  letterSpacing: '-0.03em', lineHeight: 0.95, color: ink, textTransform: 'uppercase',
                }}>{s.n}</div>
                <div style={{ ...monoLabel, fontSize: 10, color: ink, letterSpacing: 1.5 }}>{s.l}</div>
                <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ПОЧЕМУ FASHION */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0`, background: deep }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 48, alignItems: 'baseline',
            }}>
              <div style={monoLabel}>[ {D.why.label} ]</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(34px, 9vw, 56px)' : 'clamp(56px, 7vw, 112px)',
                lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0, textTransform: 'lowercase',
              }}>{D.why.title}</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
              gap: 0, border: `1px solid ${line}`, background: paper,
            }}>
              {D.why.items.map((it, i) => {
                const perRow = isMobile ? 1 : (isTablet ? 2 : 3);
                const inLastCol = ((i + 1) % perRow) === 0;
                const inLastRow = i >= D.why.items.length - (D.why.items.length % perRow || perRow);
                return (
                  <div key={i} style={{
                    padding: isMobile ? 24 : 30,
                    borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                    borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: isMobile ? 14 : 18 }}>
                      <span style={{ ...monoLabel, fontSize: 10, color: muted }}>[{it.n}]</span>
                      <h3 style={{
                        ...display, fontSize: isMobile ? 18 : 20,
                        letterSpacing: '-0.02em', textTransform: 'uppercase',
                        margin: 0, color: ink, lineHeight: 1.1,
                      }}>{it.t}</h3>
                    </div>
                    <p style={{ ...monoBody, margin: 0, color: muted, fontSize: isMobile ? 12 : 13 }}>{it.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* УСЛУГИ */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 48, alignItems: 'baseline',
            }}>
              <div style={monoLabel}>[ {D.services.label} ]</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(48px, 6vw, 96px)',
                lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0, textTransform: 'lowercase',
              }}>{D.services.title}</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
              gap: 0, border: `1px solid ${line}`,
            }}>
              {D.services.items.map((it, i) => (
                <div key={i} style={{
                  padding: isMobile ? 22 : 28,
                  borderRight: !isMobile && (isTablet ? i % 2 !== 1 : i < 3) ? `1px solid ${line}` : 'none',
                  borderBottom: isMobile && i < D.services.items.length - 1 ? `1px solid ${line}` :
                                (isTablet && i < 2 ? `1px solid ${line}` : 'none'),
                }}>
                  <div style={{ ...monoLabel, fontSize: 10, color: muted, marginBottom: 14 }}>[{it.n}]</div>
                  <h3 style={{
                    ...display, fontSize: isMobile ? 18 : 22,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    margin: '0 0 12px', color: ink, lineHeight: 1.1,
                  }}>{it.t}</h3>
                  <p style={{ ...monoBody, color: muted, fontSize: isMobile ? 12 : 13, margin: 0 }}>{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section style={{
          borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
          padding: '14px 0', overflow: 'hidden', background: deep,
        }}>
          <div style={{
            display: 'flex', gap: 56, whiteSpace: 'nowrap',
            ...monoLabel, color: ink, fontSize: isMobile ? 11 : 13,
            animation: 'invmarq 40s linear infinite',
          }}>
            {Array.from({ length: 4 }).flatMap((_, k) => [
              <span key={`a${k}`}>FASHION ONLY · D2C ONLY</span>,
              <span key={`b${k}`}>EBITDA 18–25% · ×2 ГОД К ГОДУ</span>,
              <span key={`c${k}`}>12 МЛРД ₽ СОВОКУПНО · 400+ БРЕНДОВ</span>,
              <span key={`d${k}`}>АУДИТ · ОЦЕНКА · СОПРОВОЖДЕНИЕ СДЕЛОК</span>,
            ])}
          </div>
          <style>{`@keyframes invmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          background: ink, color: paper, padding: `${isMobile ? 72 : 120}px 0`,
        }}>
          <div style={wrap}>
            <div style={{
              ...monoLabel, color: '#666',
              fontSize: isMobile ? 10 : 11, marginBottom: isMobile ? 14 : 24, letterSpacing: 2,
            }}>{D.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0, textTransform: 'lowercase',
              whiteSpace: 'pre-line',
            }}>{D.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 600, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{D.cta.body}</p>

            <div style={{ marginTop: isMobile ? 28 : 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href={D.cta.buttonHref} style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {D.cta.buttonLabel} → ]</a>
              <a href={D.cta.secondaryHref} style={{
                padding: '16px 28px', color: paper,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5,
                textDecoration: 'none', border: '1px solid #333',
              }}>[ {D.cta.secondary} ]</a>
            </div>
          </div>
        </section>
      </div>

      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.InvestorsPage = InvestorsPage;
