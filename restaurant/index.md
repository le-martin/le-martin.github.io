---
layout: null
permalink: /restaurant/
---
<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surasang | Fine Korean Dining</title>
    <meta name="description"
        content="Experience the authentic taste of Korea at Surasang. Premium Korean BBQ, Bibimbap, and traditional dishes served in an elegant modern atmosphere.">
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
</head>

<body>

    <nav id="navbar">
        <a href="#" class="brand">SURA</a>
        <div class="nav-links" id="navLinks">
            <div class="lang-switcher-mobile">
                <button class="lang-btn" data-lang="en">EN</button>
                <button class="lang-btn active" data-lang="de">DE</button>
                <button class="lang-btn" data-lang="ko">KR</button>
            </div>
            <a href="#home" data-i18n="nav_home">Home</a>
            <a href="#menu" data-i18n="nav_menu">Menu</a>
            <a href="#experience" data-i18n="nav_experience">Experience</a>
            <a href="#location" data-i18n="nav_location">Location</a>
        </div>
        <div class="nav-actions">
            <div class="lang-switcher">
                <button class="lang-btn" data-lang="en">EN</button>
                <button class="lang-btn active" data-lang="de">DE</button>
                <button class="lang-btn" data-lang="ko">KR</button>
            </div>
            <button class="mobile-nav-toggle" id="mobileNavToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <section id="home" class="hero">
        <h1 data-i18n="hero_title">The King's Table</h1>
        <p data-i18n="hero_desc">A modern interpretation of royal Korean cuisine. Elevating traditional flavors through
            contemporary techniques and seasonal ingredients.</p>
        <button class="btn" data-i18n="hero_btn">Speisekarte</button>
    </section>

    <section id="menu">
        <div class="section-header">
            <span class="subtitle" data-i18n="menu_subtitle">Our Selection</span>
            <h2 data-i18n="menu_title">Signature Dishes</h2>
        </div>
        <div class="menu-grid">
            <div class="menu-item">
                <img src="assets/images/bbq.png" alt="Bulgogi">
                <div class="item-info">
                    <h3 data-i18n="item_galbi_title">Bulgogi</h3>
                    <span class="price">17.90€</span>
                    <p data-i18n="item_galbi_desc">Thinly sliced beef marinated in our house-made
                        soy sauce, grilled to perfection.</p>
                </div>
            </div>
            <div class="menu-item">
                <img src="assets/images/bibimbap.png" alt="Dolsot Bibimbap">
                <div class="item-info">
                    <h3 data-i18n="item_bibimbap_title">Dolsot Bibimbap</h3>
                    <span class="price">14.90€</span>
                    <p data-i18n="item_bibimbap_desc">Sizzling stone bowl rice with seasonal mountain vegetables,
                        heritage grains, and aged gochujang.</p>
                </div>
            </div>
            <div class="menu-item">
                <img src="assets/images/ddokbboki.png" alt="Ddokbboki">
                <div class="item-info">
                    <h3 data-i18n="item_hanjeongsik_title">Ddokbboki</h3>
                    <span class="price">10.90€</span>
                    <p data-i18n="item_hanjeongsik_desc">Spicy stir-fried rice cakes with fish cakes and vegetables in a sweet and spicy sauce.</p>
                </div>
            </div>
            <div class="menu-item">
                <img src="assets/images/japchae.png" alt="Japchae">
                <div class="item-info">
                    <h3 data-i18n="item_bulgogi_title">Japchae</h3>
                    <span class="price">13.50€</span>
                    <p data-i18n="item_bulgogi_desc">Stir-fried sweet potato glass noodles with colorful vegetables and savory sauce.</p>
                </div>
            </div>
            <div class="menu-item">
                <img src="assets/images/pajeon.png" alt="Haemul Pajeon">
                <div class="item-info">
                    <h3 data-i18n="item_pajeon_title">Haemul Pajeon</h3>
                    <span class="price">13.50€</span>
                    <p data-i18n="item_pajeon_desc">Traditional Korean pancake made with plenty of scallions and a
                        variety of fresh seafood.</p>
                </div>
            </div>
            <div class="menu-item">
                <img src="assets/images/kimchi_jjigae.png" alt="Kimchi Jjigae">
                <div class="item-info">
                    <h3 data-i18n="item_stew_title">Kimchi Jjigae</h3>
                    <span class="price">14.90€</span>
                    <p data-i18n="item_stew_desc">Rich and savory stew made with our 2-year aged kimchi, pork belly, and
                        silky tofu.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="experience" class="info-section">
        <div class="info-content">
            <span class="subtitle" data-i18n="exp_subtitle">Atmosphere</span>
            <h2 data-i18n="exp_title">An Elevated Experience</h2>
            <p style="margin-bottom: 2rem; color: #aaa;" data-i18n="exp_desc">At Surasang, we believe dining is more
                than just a meal. It's a journey through history, culture, and craftsmanship. Our space combines minimal
                Korean aesthetics with modern luxury to create an íntimate environment for unforgettable moments.</p>
            <button class="btn" data-i18n="exp_btn">Gallery</button>
        </div>
        <div class="info-image">
            <img src="assets/images/hero.png" alt="Restaurant Interior" style="filter: brightness(0.8);">
        </div>
    </section>

    <section id="location" style="background-color: var(--bg-dark);">
        <div class="section-header">
            <span class="subtitle" data-i18n="loc_subtitle">Join Us</span>
            <h2 data-i18n="loc_title">Location & Hours</h2>
        </div>
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 2rem; text-align: center;">
            <div>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_address">Address</h3>
                <p>Königsbrücker Straße 50<br>01099 Dresden</p>
            </div>
            <div>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_hours">Opening Hours</h3>
                <p data-i18n="loc_hours_details">Dienstag - Sonntag: 17:00 - 22:00<br>Montag: Ruhetag</p>
            </div>
            <div>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;" data-i18n="loc_contact">Contact</h3>
                <p>0351 810 747 89<br>suradresden@gmail.com</p>
            </div>
        </div>
    </section>

    <footer>
        <div class="brand" style="font-size: 1.2rem;">SURA</div>
        <div class="footer-info">
            <p data-i18n="footer_rights">&copy; 2024 Sura Korean Restaurant Dresden. All rights reserved.</p>
        </div>
        <div class="nav-links" style="gap: 1.5rem;">
            <a href="#" style="font-size: 0.7rem;">Instagram</a>
            <a href="#" style="font-size: 0.7rem;">Facebook</a>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>