// School — раздел «Статьи и кейсы» с табами навигации.

const useSchoolViewport = () => {
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

const SchoolPage = () => {
  const S = window.SCHOOL;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useSchoolViewport();
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

  // ── tabs state ──
  const [activeTab, setActiveTab] = React.useState('all');
  const [activeTag, setActiveTag] = React.useState(null);

  // фильтр + подсчёт
  const filtered = S.posts.filter(p => {
    if (activeTab !== 'all' && p.type !== activeTab) return false;
    if (activeTag && !(p.tags || []).includes(activeTag)) return false;
    return true;
  });

  // все теги (для фильтра-чипов)
  const allTags = Array.from(new Set(S.posts.flatMap(p => p.tags || []))).sort();
  const counts = {
    all:     S.posts.length,
    case:    S.posts.filter(p => p.type === 'case').length,
    article: S.posts.filter(p => p.type === 'article').length,
  };

  return (
    <React.Fragment>
      <window.SiteHeader active="cases" />

      <div data-screen-label="School" style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 32 : 48}px` }}>
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
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: ink, display: 'inline-block',
              }} />
              ЖУРНАЛ
            </span>
            <span style={{ ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11 }}>
              {`>>> ${S.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {S.hero.kicker}
            </span>
            <a href={S.hero.tg.h} target="_blank" rel="noopener" style={{
              marginLeft: isMobile ? 0 : 'auto',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: isMobile ? '6px 10px' : '8px 12px',
              border: `1px solid ${line}`,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 10 : 11, letterSpacing: 1, textTransform: 'uppercase',
              color: muted, textDecoration: 'none',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#33ade7' }} />
              [ tg → {S.hero.tg.l} ]
            </a>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(96px, 12vw, 200px)',
            lineHeight: 0.88, letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase', overflowWrap: 'anywhere',
            whiteSpace: 'pre-line',
          }}>{S.hero.title}</h1>

          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{
              ...monoBody, margin: 0,
              gridColumn: isMobile ? 'auto' : 'span 2', maxWidth: 720,
            }}>
              {S.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{S.hero.body2}</span>
            </p>
          </div>
        </section>

        {/* TABS — навигация */}
        <section style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: paper, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
        }}>
          <div style={{
            ...wrap,
            display: 'flex', gap: 0, alignItems: 'stretch',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
          }}>
            {S.tabs.map((t, i) => {
              const isActive = activeTab === t.id;
              return (
                <button key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    flex: isMobile ? '1 1 33%' : 'unset',
                    padding: isMobile ? '14px 16px' : '20px 28px',
                    background: isActive ? ink : 'transparent',
                    color: isActive ? paper : ink,
                    border: 'none',
                    borderRight: i < S.tabs.length - 1 ? `1px solid ${line}` : 'none',
                    fontFamily: '"Archivo Black",sans-serif',
                    fontSize: isMobile ? 14 : 18,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'baseline', gap: 10,
                    transition: 'background 0.15s, color 0.15s',
                  }}>
                  <span>{t.l}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: isMobile ? 10 : 11,
                    color: isActive ? '#888' : muted, letterSpacing: 1,
                  }}>{counts[t.id]}</span>
                </button>
              );
            })}
            {/* search/filter placeholder right side */}
            {!isMobile && (
              <div style={{
                marginLeft: 'auto',
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '20px 28px',
                ...monoLabel, fontSize: 10, color: muted,
              }}>
                <span>// {filtered.length} материалов</span>
              </div>
            )}
          </div>

          {/* теги */}
          <div style={{
            ...wrap,
            display: 'flex', gap: 8, flexWrap: 'wrap',
            padding: isMobile ? '12px 20px' : '14px 56px',
            borderTop: `1px solid ${line}`,
          }}>
            <button onClick={() => setActiveTag(null)} style={{
              padding: '4px 10px', border: `1px solid ${line}`,
              background: activeTag === null ? ink : 'transparent',
              color: activeTag === null ? paper : muted,
              ...monoLabel, fontSize: 10, letterSpacing: 1,
              cursor: 'pointer', textTransform: 'uppercase',
            }}>
              · все теги
            </button>
            {allTags.map(t => (
              <button key={t} onClick={() => setActiveTag(activeTag === t ? null : t)} style={{
                padding: '4px 10px', border: `1px solid ${line}`,
                background: activeTag === t ? ink : 'transparent',
                color: activeTag === t ? paper : muted,
                ...monoLabel, fontSize: 10, letterSpacing: 0.5,
                cursor: 'pointer', textTransform: 'lowercase',
              }}>
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* СЕТКА */}
        <section style={{ padding: `${isMobile ? 28 : 48}px 0 ${sectionPadY}px` }}>
          <div style={wrap}>
            {filtered.length === 0 ? (
              <div style={{
                padding: isMobile ? 40 : 80,
                border: `1px dashed ${line}`, textAlign: 'center',
                ...monoLabel, fontSize: 12, color: muted, textTransform: 'none',
              }}>
                по этому фильтру пока ничего нет — снимите фильтр или выберите другой тег.
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
                gap: 0, border: `1px solid ${line}`,
              }}>
                {filtered.map((p, i) => {
                  const perRow = isMobile ? 1 : (isTablet ? 2 : 3);
                  const inLastCol = ((i + 1) % perRow) === 0;
                  const inLastRow = i >= filtered.length - (filtered.length % perRow || perRow);
                  const isCase = p.type === 'case';
                  return (
                    <a key={i} href={p.h} target="_blank" rel="noopener" style={{
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      padding: isMobile ? 22 : 26, background: paper,
                      borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                      borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                      textDecoration: 'none', color: 'inherit',
                      minHeight: isMobile ? 200 : 240,
                      gap: 18,
                    }}>
                      {/* top: type + date */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      }}>
                        <span style={{
                          ...monoLabel, fontSize: 9, letterSpacing: 1.5,
                          padding: '4px 8px',
                          border: `1px solid ${isCase ? ink : line}`,
                          color: isCase ? ink : muted,
                          background: isCase ? 'transparent' : 'transparent',
                        }}>
                          {isCase ? 'кейс' : 'статья'}
                          {p.new && <span style={{ color: '#3dd183', marginLeft: 6 }}>·NEW</span>}
                        </span>
                        <span style={{ ...monoLabel, fontSize: 9, color: muted, letterSpacing: 1 }}>
                          {p.date}
                        </span>
                      </div>

                      {/* title */}
                      <h3 style={{
                        ...display, fontSize: isMobile ? 17 : 19,
                        letterSpacing: '-0.01em', lineHeight: 1.15,
                        margin: 0, color: ink, textTransform: 'none',
                      }}>
                        {p.title}
                      </h3>

                      {/* bottom: tags + author */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        gap: 10, flexWrap: 'wrap',
                      }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {(p.tags || []).slice(0, 3).map(t => (
                            <span key={t} style={{
                              ...monoLabel, fontSize: 9, color: muted,
                              padding: '2px 6px', border: `1px solid ${line}`,
                              textTransform: 'lowercase', letterSpacing: 0.3,
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <span style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.3 }}>
                          · {p.author}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          background: ink, color: paper, padding: `${isMobile ? 72 : 120}px 0`,
          borderTop: `1px solid ${line}`,
        }}>
          <div style={wrap}>
            <div style={{
              ...monoLabel, color: '#666',
              fontSize: isMobile ? 10 : 11, marginBottom: isMobile ? 14 : 24,
              letterSpacing: 2,
            }}>{S.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase',
              whiteSpace: 'pre-line',
            }}>{S.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 600, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{S.cta.body}</p>

            <div style={{
              marginTop: isMobile ? 28 : 40,
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <a href={S.cta.buttonHref} target="_blank" rel="noopener" style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {S.cta.buttonLabel} → ]</a>
              <a href="/audit" style={{
                padding: '16px 28px', color: paper,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5,
                textDecoration: 'none', border: `1px solid #333`,
              }}>[ или начать с аудита ]</a>
            </div>
          </div>
        </section>
      </div>

      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.SchoolPage = SchoolPage;
