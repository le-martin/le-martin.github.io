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
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Outfit:wght@300;400;600&display=swap" as="style">

    <!-- Critical CSS inlined for fast first paint -->
    <style>
        :root{--primary-color:#c9a050;--secondary-color:#1a1a1a;--text-color:#f5f5f5;--bg-dark:#0a0a0a;--glass:rgba(255,255,255,0.05);--transition:all 0.4s cubic-bezier(0.165,0.84,0.44,1)}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Outfit',sans-serif;background-color:var(--secondary-color);color:var(--text-color);line-height:1.6;overflow-x:hidden}
        h1,h2,h3,.brand{font-family:'Playfair Display',serif}
        nav{position:fixed;top:0;width:100%;padding:2rem 5%;display:flex;justify-content:space-between;align-items:center;z-index:1000;transition:var(--transition);background:linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)}
        .brand{font-size:2rem;font-weight:700;color:var(--primary-color);text-decoration:none;letter-spacing:2px}
        .nav-links{display:flex;gap:3rem}
        .nav-links a{text-decoration:none;color:var(--text-color);font-weight:400;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;position:relative;transition:var(--transition)}
        .nav-actions{display:flex;align-items:center;gap:1.5rem}
        .lang-switcher{display:flex;gap:0.5rem;background:rgba(255,255,255,0.05);padding:0.2rem;border-radius:5px;border:1px solid rgba(255,255,255,0.1)}
        .lang-btn{background:none;border:none;color:#666;font-family:inherit;font-size:0.7rem;font-weight:600;cursor:pointer;padding:0.3rem 0.6rem;border-radius:3px;transition:var(--transition)}
        .lang-btn.active{background:var(--primary-color);color:var(--bg-dark)}
        .mobile-nav-toggle{display:none}
        .hero{height:100vh;width:100%;background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('assets/images/hero.webp');background-size:cover;background-position:center;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 10%}
        .hero h1{font-size:5rem;margin-bottom:1rem;opacity:0;transform:translateY(30px);animation:fadeInUp 1s forwards 0.5s}
        .hero p{font-size:1.2rem;margin-bottom:2rem;max-width:600px;font-weight:300;letter-spacing:1px;opacity:0;transform:translateY(30px);animation:fadeInUp 1s forwards 0.8s}
        .hero-cta{display:flex;gap:1.5rem;opacity:0;transform:translateY(30px);animation:fadeInUp 1s forwards 1.1s}
        .btn{display:inline-block;padding:1rem 2.5rem;border:1px solid var(--primary-color);color:var(--primary-color);text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-size:0.8rem;transition:var(--transition);background:transparent;cursor:pointer}
        .btn.disabled{opacity:0.5;cursor:not-allowed;pointer-events:none;border-color:#666;color:#666}
        @keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}
    </style>

    <!-- Full stylesheet loaded asynchronously -->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>

    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
</head>

<body>

    <a href="#main-content" class="skip-to-content">Zum Hauptinhalt springen</a>

    <nav id="navbar" role="navigation" aria-label="Hauptnavigation">
        <a href="#" class="brand" aria-label="Sura - Zur Startseite">SURA</a>
        <div class="nav-links" id="navLinks">
            <div class="lang-switcher-mobile" role="group" aria-label="Sprachauswahl">
                <button class="lang-btn" data-lang="en" aria-label="Switch to English">EN</button>
                <button class="lang-btn active" data-lang="de" aria-label="Deutsch ausgewählt" aria-pressed="true">DE</button>
                <button class="lang-btn" data-lang="ko" aria-label="한국어로 전환">KR</button>
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
                <button class="lang-btn" data-lang="ko" aria-label="한국어로 전환">KR</button>
            </div>
            <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="navLinks">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <main role="main" id="main-content">
    <section id="home" class="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" data-i18n="hero_title">The King's Table</h1>
        <p data-i18n="hero_desc">A modern interpretation of royal Korean cuisine. Elevating traditional flavors through
            contemporary techniques and seasonal ingredients.</p>
        <div class="hero-cta">
            <a href="assets/menu.pdf" class="btn disabled" target="_blank" data-i18n="hero_btn">Speisekarte</a>
            <a href="#reservation" class="btn" id="heroReservation" data-i18n="hero_reservation">Tisch reservieren</a>
        </div>
    </section>

    <section id="about" class="info-section" aria-labelledby="about-title">
        <div class="info-content">
            <span class="subtitle" data-i18n="about_subtitle">Unsere Geschichte</span>
            <h2 id="about-title" data-i18n="about_title">Über Uns</h2>
            <p style="margin-bottom: 1.5rem; color: #aaa;" data-i18n="about_desc_1">
                Das Sura wurde 2020 mit einer klaren Vision gegründet: Die authentische koreanische Küche nach Dresden zu bringen.
                Unser Name "Sura" stammt vom koreanischen Wort für die königliche Tafel – ein Symbol für die höchste Qualität und Sorgfalt bei der Zubereitung.
            </p>
            <p style="margin-bottom: 2rem; color: #aaa;" data-i18n="about_desc_2">
                Jedes Gericht wird mit frischen Zutaten und nach traditionellen Rezepten zubereitet, die von Generation zu Generation weitergegeben wurden.
                Wir laden Sie ein, die Vielfalt der koreanischen Küche zu entdecken – von würzigem Kimchi bis hin zu zartem Bulgogi.
            </p>
        </div>
        <div class="info-image">
            <picture>
                <source srcset="assets/images/bibimbap.webp" type="image/webp">
                <img src="assets/images/bibimbap.png"
                     alt="Buntes Bibimbap in traditioneller Steinschale - Reis mit Gemüse, Ei und Gochujang Sauce"
                     loading="lazy"
                     style="filter: brightness(0.9);">
            </picture>
        </div>
    </section>

    <section id="experience" class="info-section" aria-labelledby="experience-title">
        <div class="info-content">
            <span class="subtitle" data-i18n="exp_subtitle">Atmosphere</span>
            <h2 id="experience-title" data-i18n="exp_title">An Elevated Experience</h2>
            <p style="margin-bottom: 2rem; color: #aaa;" data-i18n="exp_desc">At Sura, we believe dining is more
                than just a meal. It's a journey through history, culture, and craftsmanship. Our space combines minimal
                Korean aesthetics with modern luxury to create an íntimate environment for unforgettable moments.</p>
            <a href="assets/menu.pdf" class="btn disabled" target="_blank" data-i18n="menu_btn">Speisekarte (PDF)</a>
        </div>
        <div class="info-image">
            <picture>
                <source srcset="assets/images/hero.webp" type="image/webp">
                <img src="assets/images/hero.png"
                     alt="Elegantes Restaurant-Interieur mit warmer Beleuchtung und moderner koreanischer Einrichtung"
                     loading="lazy"
                     style="filter: brightness(0.8);">
            </picture>
        </div>
</section>

<section id="testimonials" aria-labelledby="testimonials-title">
        <div class="section-header">
            <span class="subtitle" data-i18n="testimonials_subtitle">Kundenstimmen</span>
            <h2 id="testimonials-title" data-i18n="testimonials_title">Was unsere Gäste sagen</h2>
        </div>
        <div class="testimonials-slider-container">
            <button class="slider-btn prev" aria-label="Previous testimonial">&#10094;</button>
            <div class="testimonials-slider">
                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_1_text">"Das beste koreanische Essen, das ich je außerhalb Koreas gegessen habe! Das Bulgogi war unglaublich zart und die Atmosphäre ist einfach wunderbar."</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Sarah M.</span>
                        <span class="author-source">Google Reviews</span>
                    </footer>
                </article>
                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_2_text">"Authentisch, lecker und mit Liebe zubereitet. Das Bibimbap im heißen Steintopf ist ein Muss! Freundlicher Service und faire Preise."</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Thomas K.</span>
                        <span class="author-source">TripAdvisor</span>
                    </footer>
                </article>
                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_3_text">"Endlich ein Restaurant in Dresden, das echte koreanische Küche serviert! Das Kimchi Jjigae schmeckt wie bei meiner Oma in Seoul."</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Ji-Young P.</span>
                        <span class="author-source">Google Reviews</span>
                    </footer>
                </article>

                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_4_text">"Ich war von der Eleganz der Aromen beeindruckt. Das Kimchi Jjigae hat die perfekte Balance zwischen Schärfe und Tiefe. Ein wirklich erstklassiges Restauranterlebnis."</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Michael R.</span>
                        <span class="author-source">Google Reviews</span>
                    </footer>
                </article>

                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_5_text">"Die Atmosphäre ist fantastisch, perfekt für ein romantisches Abendessen. Der Service war aufmerksam und das Japchae war voller Geschmack. Sehr zu empfehlen!"</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Julia W.</span>
                        <span class="author-source">TripAdvisor</span>
                    </footer>
                </article>

                <article class="testimonial-card">
                    <div class="testimonial-rating" aria-label="5 von 5 Sternen">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <blockquote>
                        <p data-i18n="testimonial_6_text">"Das beste Bibimbap der Stadt, ohne Zweifel. Die Zutaten sind so frisch und der Steintopf blieb bis zum letzten Bissen heiß!"</p>
                    </blockquote>
                    <footer class="testimonial-author">
                        <span class="author-name">Lukas H.</span>
                        <span class="author-source">Google Reviews</span>
                    </footer>
                </article>
            </div>
            <button class="slider-btn next" aria-label="Next testimonial">&#10095;</button>
        </div>
        <div class="testimonials-cta">
            <div class="aggregate-ratings">
                <div class="rating-item">
                    <div class="rating-stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star-half">&#9733;</span>
                    </div>
                    <span class="rating-text" data-i18n="rating_google">4.5 von 5 Sternen (1.037 Bewertungen)</span>
                    <a href="https://maps.app.goo.gl/NY1SnsnVozmhaia19" target="_blank" rel="noopener noreferrer" class="btn" data-i18n="testimonials_btn_google" aria-label="Bewertung auf Google schreiben (öffnet in neuem Tab)">Google Bewertung</a>
                </div>
                <div class="rating-item">
                    <div class="rating-stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star-empty">&#9733;</span>
                    </div>
                    <span class="rating-text" data-i18n="rating_tripadvisor">4.2 von 5 Sternen (73 Bewertungen)</span>
                    <a href="https://www.tripadvisor.de/Restaurant_Review-g187399-d5975431-Reviews-SURA_Dresden-Dresden_Saxony.html" target="_blank" rel="noopener noreferrer" class="btn" data-i18n="testimonials_btn_tripadvisor" aria-label="Bewertung auf TripAdvisor schreiben (öffnet in neuem Tab)">TripAdvisor Bewertung</a>
                </div>
            </div>
        </div>
</section>

<section id="location" style="background-color: var(--bg-dark);" aria-labelledby="location-title">
        <div class="section-header">
            <span class="subtitle" data-i18n="loc_subtitle">Join Us</span>
            <h2 id="location-title" data-i18n="loc_title">Location & Hours</h2>
        </div>
        <div class="location-container">
            <div class="location-info">
                <div class="location-item">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_address">Address</h3>
                    <p>Königsbrücker Straße 50<br>01099 Dresden</p>
                </div>
                <div class="location-item">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_hours">Opening Hours</h3>
                    <p data-i18n="loc_hours_details">Dienstag - Sonntag: 17:00 - 22:00<br>Montag: Ruhetag</p>
                </div>
                <div class="location-item">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_contact">Contact</h3>
                    <p><a href="tel:+4935181074789" style="color: inherit; text-decoration: none;">0351 810 747 89</a><br>
                       <a href="mailto:suradresden@gmail.com" style="color: inherit; text-decoration: none;">suradresden@gmail.com</a></p>
                </div>
            </div>
            <div class="location-map">
                <iframe data-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.1308701221797!2d13.746738177751032!3d51.069134171716925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf3d87677705%3A0xa89993fea0eaa95f!2sSura%20Restaurant!5e0!3m2!1sen!2sde!4v1767011093448!5m2!1sen!2sde" width="100%" height="300" style="border:0;" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" title="Google Maps - Sura Restaurant Dresden"></iframe>
            </div>
        </div>
</section>

</main>

    <footer role="contentinfo">
        <div class="brand">SURA</div>
        <div class="social-links">
            <a class="social-icon" aria-label="Facebook" style="opacity: 0.5; cursor: not-allowed;" role="link" aria-disabled="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a class="social-icon" aria-label="Instagram" style="opacity: 0.5; cursor: not-allowed;" role="link" aria-disabled="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.tripadvisor.de/Restaurant_Review-g187399-d5975431-Reviews-SURA_Dresden-Dresden_Saxony.html" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="TripAdvisor">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M175.335 281.334c0 24.483-19.853 44.336-44.336 44.336-24.484 0-44.337-19.853-44.337-44.336 0-24.484 19.853-44.337 44.337-44.337 24.483 0 44.336 19.853 44.336 44.337zm205.554-44.337c-24.48 0-44.336 19.853-44.336 44.337 0 24.483 19.855 44.336 44.336 44.336 24.481 0 44.334-19.853 44.334-44.336-.006-24.47-19.839-44.31-44.309-44.323l-.025-.01v-.004zm125.002 44.337c0 68.997-55.985 124.933-124.999 124.933a124.466 124.466 0 01-84.883-33.252l-40.006 43.527-40.025-43.576a124.45 124.45 0 01-84.908 33.3c-68.968 0-124.933-55.937-124.933-124.932A124.586 124.586 0 0146.889 189L6 144.517h90.839c96.116-65.411 222.447-65.411 318.557 0H506l-40.878 44.484a124.574 124.574 0 0140.769 92.333zm-290.31 0c0-46.695-37.858-84.55-84.55-84.55-46.691 0-84.55 37.858-84.55 84.55 0 46.691 37.859 84.55 84.55 84.55 46.692 0 84.545-37.845 84.55-84.54v-.013.003zM349.818 155.1a244.01 244.01 0 00-187.666 0C215.532 175.533 256 223.254 256 278.893c0-55.634 40.463-103.362 93.826-123.786l-.005-.006h-.003zm115.64 126.224c0-46.694-37.858-84.55-84.55-84.55-46.691 0-84.552 37.859-84.552 84.55 0 46.692 37.855 84.55 84.553 84.55 46.697 0 84.55-37.858 84.55-84.55z"/></svg>
            </a>
        </div>
        <div class="footer-info">
            <p data-i18n="footer_rights">&copy; 2025 Sura Korean Restaurant Dresden. All rights reserved.</p>
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
</body>

</html>