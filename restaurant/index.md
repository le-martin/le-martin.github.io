---
layout: null
permalink: /restaurant/
---
<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Sura | Koreanisches Restaurant in Dresden</title>

    <!-- Preload critical assets -->
    <link rel="preload" href="assets/images/hero.webp" as="image" type="image/webp">
    <link rel="preload" href="assets/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="assets/fonts/playfair-latin.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Critical CSS inlined for fast first paint (above-the-fold only) -->
    <style>
        :root{--primary-color:#c9a050;--primary-soft:#e6cf94;--secondary-color:#14110d;--bg-dark:#0c0a08;--text-color:#f4efe4;--muted:#a99e8b;--line:rgba(201,160,80,0.28);--line-soft:rgba(255,255,255,0.09);--ease:cubic-bezier(0.16,1,0.3,1);--nav-h:88px}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Outfit',system-ui,sans-serif;background-color:var(--bg-dark);color:var(--text-color);line-height:1.65;overflow-x:hidden;font-weight:300}
        h1,.brand{font-family:'Playfair Display',Georgia,serif;font-weight:700;line-height:1.08}
        img{max-width:100%;display:block}
        nav#navbar{position:fixed;top:0;left:0;width:100%;height:var(--nav-h);padding:0 clamp(1.25rem,5vw,4rem);display:flex;justify-content:space-between;align-items:center;z-index:1000;background:linear-gradient(to bottom,rgba(8,6,4,0.75),transparent)}
        .brand{font-size:1.85rem;color:var(--primary-color);text-decoration:none;letter-spacing:4px}
        .nav-links{display:flex;align-items:center;gap:2.6rem}
        .nav-links>a{position:relative;text-decoration:none;color:var(--text-color);text-transform:uppercase;letter-spacing:1.5px;font-size:0.78rem;opacity:0.82}
        .nav-actions{display:flex;align-items:center;gap:1.4rem}
        .lang-switcher{display:flex;gap:0.25rem;background:rgba(255,255,255,0.06);padding:0.22rem;border-radius:100px;border:1px solid var(--line-soft)}
        .lang-switcher-mobile{display:none}
        .lang-btn{background:none;border:none;color:var(--muted);font-family:'Outfit',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:1px;cursor:pointer;padding:0.35rem 0.7rem;border-radius:100px}
        .lang-btn.active{background:var(--primary-color);color:var(--bg-dark)}
        .mobile-nav-toggle{display:none}
        .hero{position:relative;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:var(--nav-h) clamp(1.25rem,5vw,4rem) 6rem;overflow:hidden}
        .hero__bg{position:absolute;inset:0;background:url('assets/images/hero.webp') center/cover no-repeat;transform:scale(1.12);animation:kenburns 22s ease-out forwards;z-index:-2}
        .hero__scrim{position:absolute;inset:0;z-index:-1;background:radial-gradient(120% 90% at 50% 15%,rgba(12,10,8,0.2),rgba(12,10,8,0.75) 70%),linear-gradient(to bottom,rgba(12,10,8,0.55),rgba(12,10,8,0.5) 45%,var(--bg-dark) 99%)}
        @keyframes kenburns{to{transform:scale(1)}}
        .hero__tag{display:inline-flex;align-items:center;gap:0.9rem;font-size:0.8rem;text-transform:uppercase;letter-spacing:4px;color:var(--primary-soft);margin-bottom:1.6rem}
        .hero h1{font-size:clamp(3rem,9vw,6.5rem);margin-bottom:1.4rem}
        .hero__lead{font-size:clamp(1rem,1.6vw,1.2rem);max-width:620px;margin:0 auto 2.6rem;color:rgba(244,239,228,0.86)}
        .hero-cta{display:flex;flex-wrap:wrap;gap:1.2rem;justify-content:center}
        .btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:0.6rem;padding:1.05rem 2.4rem;font-family:'Outfit',sans-serif;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:2.5px;text-decoration:none;color:var(--bg-dark);background:var(--primary-color);border:1px solid var(--primary-color);border-radius:2px;cursor:pointer;overflow:hidden}
        .hero .anim{opacity:0;transform:translateY(28px);animation:heroUp 1s var(--ease) forwards}
        .hero .anim.d1{animation-delay:.25s}.hero .anim.d2{animation-delay:.45s}.hero .anim.d3{animation-delay:.65s}.hero .anim.d4{animation-delay:.85s}
        @keyframes heroUp{to{opacity:1;transform:none}}
    </style>

    <!-- Full stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- Ensure content is visible if JavaScript is unavailable -->
    <noscript>
        <style>
            [data-reveal] { opacity: 1 !important; transform: none !important; }
            .hero .anim, .scroll-cue { opacity: 1 !important; transform: none !important; animation: none !important; }
        </style>
    </noscript>

    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
</head>

<body>

    <a href="#main-content" class="skip-to-content">Zum Hauptinhalt springen</a>

    <nav id="navbar" role="navigation" aria-label="Hauptnavigation">
        <a href="#home" class="brand" aria-label="Sura - Zur Startseite">SURA</a>
        <div class="nav-links" id="navLinks">
            <div class="lang-switcher-mobile" role="group" aria-label="Sprachauswahl">
                <button class="lang-btn" data-lang="en" aria-label="Switch to English">EN</button>
                <button class="lang-btn active" data-lang="de" aria-label="Deutsch ausgewählt" aria-pressed="true">DE</button>
            </div>
            <a href="#home" data-i18n="nav_home">Home</a>
            <a href="#about" data-i18n="nav_about">Über Uns</a>
            <a href="#experience" data-i18n="nav_menu">Menu</a>
            <a href="#location" data-i18n="nav_location">Location</a>
            <a href="#reservation" id="navReservation" data-i18n="nav_reservation">Reservierung</a>
        </div>
        <div class="nav-actions">
            <div class="lang-switcher" role="group" aria-label="Sprachauswahl">
                <button class="lang-btn" data-lang="en" aria-label="Switch to English">EN</button>
                <button class="lang-btn active" data-lang="de" aria-label="Deutsch ausgewählt" aria-pressed="true">DE</button>
            </div>
            <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="navLinks">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <main role="main" id="main-content">

    <!-- Hero -->
    <section id="home" class="hero" aria-labelledby="hero-title">
        <div class="hero__bg" aria-hidden="true"></div>
        <div class="hero__scrim" aria-hidden="true"></div>
        <span class="hero__tag anim d1" data-i18n="hero_tag">수라 · Koreanische Küche · Dresden</span>
        <h1 id="hero-title" class="anim d2" data-i18n="hero_title">Sura Dresden</h1>
        <p class="hero__lead anim d3" data-i18n="hero_desc">Eine moderne Interpretation der königlichen koreanischen Küche –
            traditionelle Aromen, zeitgemäß und mit saisonalen Zutaten neu erzählt.</p>
        <div class="hero-cta anim d4">
            <a href="assets/menu.pdf" class="btn" target="_blank" rel="noopener" data-i18n="hero_btn">Speisekarte</a>
            <a href="#reservation" class="btn btn--ghost" id="heroReservation" data-i18n="hero_reservation">Tisch reservieren</a>
        </div>
        <div class="scroll-cue" aria-hidden="true">
            <span class="scroll-cue__line"></span>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="section section--cream" aria-labelledby="about-title">
        <div class="container">
            <div class="split">
                <div class="split__body" data-reveal="left">
                    <span class="eyebrow"><span class="eyebrow__index">01</span><span data-i18n="about_subtitle">Unsere Geschichte</span></span>
                    <h2 id="about-title" class="section-title" data-i18n="about_title">Über Uns</h2>
                    <p data-i18n="about_desc_1">Das Sura wurde 2020 mit einer klaren Vision gegründet: Die authentische
                        koreanische Küche nach Dresden zu bringen. Unser Name „Sura" stammt vom koreanischen Wort für die
                        königliche Tafel – ein Symbol für höchste Qualität und Sorgfalt.</p>
                    <p data-i18n="about_desc_2">Jedes Gericht wird mit frischen Zutaten und nach traditionellen Rezepten
                        zubereitet, die von Generation zu Generation weitergegeben wurden.</p>
                </div>
                <div class="split__media" data-reveal="right">
                    <div class="media-frame" data-parallax="0.12">
                        <img src="assets/images/bibimbap.webp"
                             alt="Buntes Bibimbap in traditioneller Steinschale - Reis mit Gemüse, Ei und Gochujang Sauce"
                             width="1024" height="1280" loading="lazy">
                    </div>
                    <div class="media-badge media-badge--br">
                        <strong>2020</strong>
                        <span data-i18n="about_badge">Gegründet</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="section section--dark" aria-labelledby="experience-title">
        <div class="container">
            <div class="split split--reverse">
                <div class="split__body" data-reveal="right">
                    <span class="eyebrow"><span class="eyebrow__index">02</span><span data-i18n="exp_subtitle">Atmosphäre</span></span>
                    <h2 id="experience-title" class="section-title" data-i18n="exp_title">Willkommen im Sura</h2>
                    <p data-i18n="exp_desc">Gelegen in der Königsbrücker Straße 50, ist das Sura die Adresse für
                        authentische koreanische Küche in Dresden. Verweilen, entspannen und sich von traditionellen
                        Aromen verzaubern lassen.</p>
                    <a href="assets/menu.pdf" class="btn btn--ghost" target="_blank" rel="noopener" data-i18n="menu_btn" style="margin-top:0.6rem;">Speisekarte (PDF)</a>
                </div>
                <div class="split__media" data-reveal="left">
                    <div class="media-frame" data-parallax="0.12">
                        <img src="assets/images/hero.webp"
                             alt="Elegantes Restaurant-Interieur mit warmer Beleuchtung und moderner koreanischer Einrichtung"
                             width="1024" height="1280" loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Location & Hours -->
    <section id="location" class="section section--darker" aria-labelledby="location-title">
        <div class="container">
            <div class="section-header" data-reveal>
                <span class="subtitle" data-i18n="loc_subtitle">Besuchen Sie uns</span>
                <h2 id="location-title" class="section-title" data-i18n="loc_title">Standort &amp; Zeiten</h2>
            </div>
            <div class="location-container">
                <div class="location-info">
                    <div class="location-item" data-reveal style="--reveal-delay:0ms">
                        <h3 data-i18n="loc_address">Adresse</h3>
                        <p>Königsbrücker Straße 50<br>01099 Dresden</p>
                    </div>
                    <div class="location-item" data-reveal style="--reveal-delay:90ms">
                        <h3 data-i18n="loc_hours">Öffnungszeiten</h3>
                        <p data-i18n="loc_hours_details">Dienstag – Sonntag: 17:00 – 22:00 Uhr<br>Montag: Ruhetag</p>
                    </div>
                    <div class="location-item" data-reveal style="--reveal-delay:180ms">
                        <h3 data-i18n="loc_contact">Kontakt</h3>
                        <p><a href="tel:+4935181074789">0351 810 747 89</a><br>
                           <a href="mailto:suradresden@gmail.com">suradresden@gmail.com</a></p>
                    </div>
                </div>
                <div class="location-map" data-reveal="scale">
                    <div id="mapConsentPlaceholder" class="map-consent-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <p data-i18n="map_consent_text">Klicken Sie hier, um Google Maps zu laden. Dabei werden Daten an Google übertragen.</p>
                        <button id="loadMapBtn" class="btn" data-i18n="map_consent_btn">Karte laden</button>
                    </div>
                    <iframe id="googleMap" data-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.1308701221797!2d13.746738177751032!3d51.069134171716925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf3d87677705%3A0xa89993fea0eaa95f!2sSura%20Restaurant!5e0!3m2!1sen!2sde!4v1767011093448!5m2!1sen!2sde" width="100%" height="340" style="border:0; display: none;" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" title="Google Maps - Sura Restaurant Dresden"></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="voices" class="section section--dark testimonials" aria-labelledby="testimonials-title">
        <div class="container">
            <div class="section-header" data-reveal>
                <span class="subtitle" data-i18n="testimonials_subtitle">Kundenstimmen</span>
                <h2 id="testimonials-title" class="section-title" data-i18n="testimonials_title">Was unsere Gäste sagen</h2>
            </div>
            <div class="testimonials-viewport" data-reveal="fade">
                <div class="testimonials-track" id="testimonialsTrack">
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_1_text">Das beste koreanische Essen außerhalb Koreas! Das Bulgogi war unglaublich zart.</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_2_text">Authentisch, lecker und mit Liebe zubereitet. Das Bibimbap im heißen Steintopf ist ein Muss!</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_3_text">Endlich echte koreanische Küche in Dresden! Das Kimchi Jjigae schmeckt wie bei meiner Oma in Seoul.</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_4_text">Von der Eleganz der Aromen beeindruckt. Ein wirklich erstklassiges Restauranterlebnis.</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_5_text">Die Atmosphäre ist fantastisch, perfekt für ein romantisches Abendessen. Sehr zu empfehlen!</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                    <figure class="testimonial-card">
                        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
                        <p data-i18n="testimonial_6_text">Das beste Bibimbap der Stadt. Die Zutaten sind so frisch und der Steintopf blieb bis zum letzten Bissen heiß!</p>
                        <div class="testimonial-stars" aria-label="5 von 5 Sternen">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    </figure>
                </div>
            </div>
            <div class="slider-controls">
                <button class="slider-btn prev" id="testiPrev" aria-label="Vorherige Bewertung">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div class="slider-dots" id="testiDots" role="tablist"></div>
                <button class="slider-btn next" id="testiNext" aria-label="Nächste Bewertung">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
                </button>
            </div>
        </div>
    </section>

    <!-- Reviews -->
    <section id="reviews" class="section section--darker" aria-labelledby="reviews-title">
        <div class="container">
            <div class="section-header" data-reveal>
                <h2 id="reviews-title" class="section-title" data-i18n="reviews_title">Bewertungen</h2>
            </div>
            <div class="review-widgets-wrapper" data-reveal>
            <div class="review-widgets">
                <a href="https://maps.app.goo.gl/NY1SnsnVozmhaia19" target="_blank" rel="noopener noreferrer" class="review-widget google-widget" aria-label="Sura Restaurant auf Google Reviews ansehen">
                    <div class="widget-header">
                        <svg class="google-logo" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span class="widget-source">Google Reviews</span>
                    </div>
                    <div class="widget-rating">
                        <span class="rating-number" data-count="4.5" data-decimals="1">4.5</span>
                        <div class="rating-stars" aria-hidden="true">
                            <span class="star filled">&#9733;</span>
                            <span class="star filled">&#9733;</span>
                            <span class="star filled">&#9733;</span>
                            <span class="star filled">&#9733;</span>
                            <span class="star half">&#9733;</span>
                        </div>
                    </div>
                    <div class="widget-meta">
                        <span data-i18n="widget_reviews_count">1.037 Bewertungen</span>
                    </div>
                    <div class="widget-cta">
                        <span data-i18n="widget_see_reviews">Bewertungen ansehen</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                </a>
                <a href="https://www.tripadvisor.de/Restaurant_Review-g187399-d5975431-Reviews-SURA_Dresden-Dresden_Saxony.html" target="_blank" rel="noopener noreferrer" class="review-widget tripadvisor-widget" aria-label="Sura Restaurant auf TripAdvisor ansehen">
                    <div class="widget-header">
                        <svg class="tripadvisor-logo" viewBox="0 0 24 24" width="28" height="28">
                            <path fill="#34E0A1" d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
                        </svg>
                        <span class="widget-source">TripAdvisor</span>
                    </div>
                    <div class="widget-rating">
                        <span class="rating-number" data-count="4.2" data-decimals="1">4.2</span>
                        <div class="rating-stars tripadvisor-stars" aria-hidden="true">
                            <span class="circle filled"></span>
                            <span class="circle filled"></span>
                            <span class="circle filled"></span>
                            <span class="circle filled"></span>
                            <span class="circle empty"></span>
                        </div>
                    </div>
                    <div class="widget-meta">
                        <span data-i18n="widget_reviews_count_ta">73 Bewertungen</span>
                    </div>
                    <div class="widget-cta">
                        <span data-i18n="widget_see_reviews">Bewertungen ansehen</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                </a>
            </div>
            <p class="ratings-disclaimer" data-i18n="ratings_disclaimer">Stand: Januar 2026</p>
            </div>
        </div>
    </section>

    <!-- Reservation band -->
    <section class="reserve-band" aria-labelledby="reserve-title">
        <div class="container" data-reveal>
            <span class="subtitle" data-i18n="reserve_subtitle">Reservierung</span>
            <h2 id="reserve-title" data-i18n="reserve_title">Ein Platz an der königlichen Tafel</h2>
            <p data-i18n="reserve_desc">Sichern Sie sich Ihren Tisch und erleben Sie die koreanische Küche im Herzen der Dresdner Neustadt.</p>
            <a href="#reservation" class="btn" id="bandReservation" data-i18n="hero_reservation">Tisch reservieren</a>
        </div>
    </section>

    </main>

    <footer role="contentinfo">
        <div class="brand">SURA</div>
        <div class="footer-info">
            <p data-i18n="footer_rights">&copy; 2025 Sura Korean Restaurant Dresden. All rights reserved.</p>
            <div class="footer-legal">
                <a href="/restaurant/datenschutz/" data-i18n="footer_privacy">Datenschutz</a>
                <span class="footer-divider">|</span>
                <a href="/restaurant/impressum/" data-i18n="footer_imprint">Impressum</a>
            </div>
        </div>
    </footer>

    <!-- Reservation Modal -->
    <div id="reservationModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <button class="modal-close" id="closeModal" aria-label="Schließen">&times;</button>
            <div class="modal-header">
                <h2 id="modalTitle" data-i18n="loc_reservation">Reservierung</h2>
            </div>
            <div class="modal-body">
                <p data-i18n="loc_reservation_info">Tischreservierung telefonisch unter<br><a href="tel:+4935181074789" class="phone-link">0351 810 747 89</a></p>
                <a href="tel:+4935181074789" class="btn" style="margin-top: 1.5rem; display: block; text-align: center;" data-i18n="loc_call_now">Jetzt anrufen</a>
            </div>
        </div>
    </div>

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Nach oben scrollen">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>

    <script src="script.js"></script>
    <script>
        // Google Maps Consent - load map only after user consent
        document.addEventListener('DOMContentLoaded', function() {
            var mapPlaceholder = document.getElementById('mapConsentPlaceholder');
            var loadMapBtn = document.getElementById('loadMapBtn');
            var mapIframe = document.getElementById('googleMap');

            if (localStorage.getItem('mapsConsent') === 'accepted' && mapIframe && mapPlaceholder) {
                mapIframe.src = mapIframe.dataset.src;
                mapIframe.style.display = 'block';
                mapPlaceholder.style.display = 'none';
            }

            if (loadMapBtn && mapIframe && mapPlaceholder) {
                loadMapBtn.addEventListener('click', function() {
                    localStorage.setItem('mapsConsent', 'accepted');
                    mapIframe.src = mapIframe.dataset.src;
                    mapIframe.style.display = 'block';
                    mapPlaceholder.style.display = 'none';
                });
            }
        });
    </script>
</body>

</html>
