'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const root = document.documentElement
    const toggle = document.querySelector('[data-theme-toggle]')
    const siteHeader = document.getElementById('siteHeader')
    const menuToggle = document.getElementById('menuToggle')
    const mobileMenu = document.getElementById('mobileMenu')

    let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.setAttribute('data-theme', currentTheme)

    const setIcon = () => {
      if (!toggle) return
      toggle.innerHTML = currentTheme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>'
    }
    setIcon()

    const handleToggle = () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark'
      root.setAttribute('data-theme', currentTheme)
      setIcon()
    }
    toggle?.addEventListener('click', handleToggle)

    const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)

    const handleMenuToggle = () => {
      const open = mobileMenu.classList.toggle('open')
      menuToggle.setAttribute('aria-expanded', String(open))
    }
    menuToggle?.addEventListener('click', handleMenuToggle)

    const mobileLinks = mobileMenu?.querySelectorAll('a') ?? []
    const handleMobileLink = () => {
      mobileMenu.classList.remove('open')
      menuToggle.setAttribute('aria-expanded', 'false')
    }
    mobileLinks.forEach(link => link.addEventListener('click', handleMobileLink))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      toggle?.removeEventListener('click', handleToggle)
      window.removeEventListener('scroll', onScroll)
      menuToggle?.removeEventListener('click', handleMenuToggle)
      mobileLinks.forEach(link => link.removeEventListener('click', handleMobileLink))
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" id="siteHeader">
        <div className="container">
          <nav className="nav" aria-label="Primary navigation">
            <a className="brand" href="#home" aria-label="PAYTII home">
              <img src="/assets/paytii-b.jpeg" alt="PAYTII logo" className="brand-mark" width="46" height="46" />
              <span className="brand-text">
                <strong>PAYTII</strong>
                <span>The Operating System for Trade</span>
              </span>
            </a>

            <div className="nav-links">
              <a href="#product">Product</a>
              <a href="#market">Market</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="nav-actions">
              <button className="theme-toggle" type="button" data-theme-toggle aria-label="Switch theme">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
              <a className="btn btn-primary" href="#contact">Book a Demo</a>
            </div>

            <button className="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
              <span></span><span></span><span></span>
            </button>
          </nav>

          <div className="mobile-panel" id="mobileMenu">
            <a href="#product">Product</a>
            <a href="#market">Market</a>
            <a href="#contact">Contact</a>
            <a className="btn btn-primary" href="#contact">Book a Demo</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">India&apos;s Trade Infrastructure Layer</span>
              <h1>India&apos;s first Trade Communication and Engagement Platform.</h1>
              <p className="lead">
                PAYTII connects brands with retailers through a trade communication and engagement platform
                built for India&apos;s general trade ecosystem, keeping trade execution visible, measurable,
                and faster to act on.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">Get Early Access</a>
              </div>
              <div className="stats">
                <div className="stat"><strong>₹65L Cr</strong><span>General trade market opportunity</span></div>
                <div className="stat"><strong>1.5 Cr+</strong><span>Retailers reachable across India</span></div>
                <div className="stat"><strong>Real-Time</strong><span>Scheme visibility and feedback loop</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="band" aria-label="Highlights">
          <div className="band-track">
            <div className="band-item"><span>•</span>Trade scheme visibility</div>
            <div className="band-item"><span>•</span>Retailer engagement</div>
            <div className="band-item"><span>•</span>Targeted launches</div>
            <div className="band-item"><span>•</span>ROI analytics</div>
            <div className="band-item"><span>•</span>D2C into general trade</div>
            <div className="band-item"><span>•</span>Channel digitisation</div>
            <div className="band-item"><span>•</span>Trade scheme visibility</div>
            <div className="band-item"><span>•</span>Retailer engagement</div>
            <div className="band-item"><span>•</span>Targeted launches</div>
            <div className="band-item"><span>•</span>ROI analytics</div>
            <div className="band-item"><span>•</span>D2C into general trade</div>
            <div className="band-item"><span>•</span>Channel digitisation</div>
          </div>
        </section>

        <section className="section" id="product">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Product Experience</span>
              <h2>Built for field realities, not just dashboard screenshots.</h2>
              <p className="lead">
                The retailer experience is designed for speed and clarity. The brand experience is designed
                for control, scale, and measurable rollout across India.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="market">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Market Context</span>
              <h2>A massive category with room for better execution infrastructure.</h2>
              <p className="lead">
                PAYTII is positioned as an enabling layer between trade schemes and trade execution,
                where visibility, participation, and measurement matter as much as spend itself.
              </p>
            </div>

            <div className="market-grid">
              <div className="market-visual reveal" aria-label="Market illustration">
                <div className="ring">
                  <div className="ring-center">
                    <strong>GT Scale</strong>
                    <span>India-wide network effect</span>
                  </div>
                </div>
              </div>

              <div className="market-cards">
                <article className="market-card reveal">
                  <div className="topline orange">Retail engagement</div>
                  <h3>Bring scheme discovery closer to the retailer decision point.</h3>
                  <p>When retailers can see active schemes directly, execution becomes faster, clearer, and less dependent on fragmented communication.</p>
                </article>
                <article className="market-card reveal">
                  <div className="topline teal">Brand efficiency</div>
                  <h3>Move trade communication from manual to measurable.</h3>
                  <p>Brand teams can improve rollout control, monitor traction earlier, and build more useful feedback loops from the market.</p>
                </article>
                <article className="market-card reveal">
                  <div className="topline orange">Expansion path</div>
                  <h3>Create a better GT entry route for emerging brands.</h3>
                  <p>D2C and challenger brands can use digital trade distribution logic before building heavy on-ground infrastructure.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="cta-shell reveal">
              <div>
                <span className="eyebrow">Get in touch</span>
                <h2 style={{ margin: '18px 0 14px' }}>Ready to modernise trade communication with PAYTII?</h2>
                <p className="lead">Use this section for brand partnerships, investor conversations, pilot programs, or retailer onboarding discussions.</p>
                <p className="lead" style={{ marginTop: '22px' }}>
                  Reach out to us at{' '}
                  <a href="mailto:admin@brandtooretail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    admin@brandtooretail.com
                  </a>
                </p>
                <p className="lead">
                  Call us at{' '}
                  <a href="tel:+919392555686" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    +91 9392555686
                  </a>
                </p>
              </div>

              <div className="contact-grid">
                <article className="contact-card">
                  <h3>Download PAYTII App now</h3>
                  <div style={{ display: 'flex', gap: '14px', marginTop: '12px', justifyContent: 'center' }}>
                    <a className="btn btn-secondary" href="https://apps.apple.com/us/app/peti-b2r/id6762058398" target="_blank" rel="noopener noreferrer">App Store</a>
                    <a className="btn btn-secondary" href="https://play.google.com/store/apps/details?id=com.manisha1211.B2R&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">Play Store</a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-row">
          <div className="brand" aria-label="PAYTII footer brand">
            <img src="/assets/paytii-b.jpeg" alt="PAYTII logo" className="brand-mark" width="46" height="46" />
            <div className="footer-copy">
              <strong>PAYTII</strong>
              <p>The Operating System for Trade.</p>
            </div>
          </div>

          <div className="footer-links">
            <a href="#problem">Problem</a>
            <a href="#solution">Solution</a>
            <a href="#product">Product</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-copy">
            <p>© 2026 PAYTII. All rights reserved.</p>
            <p>Built for modern trade execution in India.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
