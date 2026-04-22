<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Miraya Tech Labs — Artigianato Digitale</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&amp;family=Inter:wght@300;400;500&amp;display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2/dist/aos.css">
  <style>
    :root {
      --eggplant: #3B2132;
      --rust: #965228;
      --petrol: #1F5867;
      --vinaceous: #824D5E;
      --teal: #00A5B5;
      --cream: #F7F3EB;
      --rice-paper: #EDE8DC;
      --warm-white: #FAF8F3;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background-color: var(--cream);
      color: var(--eggplant);
      line-height: 1.7;
      font-weight: 300;
      overflow-x: hidden;
    }

    h1,
    h2,
    h3,
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 500;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 clamp(24px, 5vw, 80px);
    }

    /* Navigation */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1.5rem 0;
      background: linear-gradient(to bottom, var(--cream) 0%, transparent 100%);
      transition: all 0.4s ease;
    }

    nav.scrolled {
      background: rgba(247, 243, 235, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 1px 0 rgba(59, 33, 50, 0.1);
    }

    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--eggplant);
      text-decoration: none;
      letter-spacing: -0.03em;
    }

    .logo span {
      color: var(--teal);
    }

    .nav-links {
      display: flex;
      gap: 2.5rem;
      list-style: none;
    }

    .nav-links a {
      color: var(--eggplant);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 400;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .nav-links a:hover {
      opacity: 1;
    }

    .nav-cta {
      background: var(--eggplant);
      color: var(--warm-white) !important;
      padding: 0.75rem 1.5rem;
      border-radius: 100px;
      opacity: 1 !important;
      transition: all 0.3s ease;
    }

    .nav-cta:hover {
      background: var(--petrol);
      transform: translateY(-2px);
    }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
    }

    .hero-image-side {
      position: relative;
      overflow: hidden;
      background: var(--eggplant);
    }

    .hero-image-side::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--eggplant) 0%, var(--petrol) 100%);
      opacity: 0.4;
      z-index: 1;
    }

    .hero-image-side img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: transform 8s ease;
    }

    .hero-image-side:hover img {
      transform: scale(1.05);
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: clamp(3rem, 8vw, 6rem);
      background: var(--cream);
      position: relative;
    }

    .hero-content::before {
      content: '';
      position: absolute;
      top: 20%;
      right: 0;
      width: 1px;
      height: 60%;
      background: linear-gradient(to bottom, transparent, var(--vinaceous), transparent);
      opacity: 0.3;
    }

    .hero-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--rust);
      margin-bottom: 2rem;
      font-weight: 500;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: var(--eggplant);
      margin-bottom: 2rem;
      max-width: 540px;
    }

    .hero-title em {
      font-style: italic;
      color: var(--petrol);
    }

    .hero-text {
      font-size: 1.125rem;
      color: var(--eggplant);
      opacity: 0.8;
      max-width: 480px;
      margin-bottom: 3rem;
      line-height: 1.8;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      background: var(--teal);
      color: white;
      padding: 1rem 2rem;
      border-radius: 100px;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.4s ease;
      width: fit-content;
    }

    .hero-cta:hover {
      background: var(--petrol);
      transform: translateX(8px);
      box-shadow: 0 10px 30px rgba(0, 165, 181, 0.3);
    }

    .hero-cta svg {
      transition: transform 0.3s ease;
    }

    .hero-cta:hover svg {
      transform: translateX(4px);
    }

    /* Services Section */
    .services {
      padding: clamp(5rem, 10vw, 10rem) 0;
      background: var(--warm-white);
      position: relative;
    }

    .services::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(to bottom, var(--cream), transparent);
    }

    .services-header {
      text-align: center;
      margin-bottom: 5rem;
      position: relative;
    }

    .services-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--rust);
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .services-title {
      font-size: clamp(2rem, 4vw, 3rem);
      color: var(--eggplant);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .craft-card {
      background: var(--cream);
      padding: 3rem 2.5rem;
      border-radius: 24px;
      position: relative;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      border: 1px solid transparent;
    }

    .craft-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--teal), var(--petrol));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s ease;
    }

    .craft-card:hover::before {
      transform: scaleX(1);
    }

    .craft-card:hover {
      transform: translateY(-8px);
      border-color: rgba(59, 33, 50, 0.1);
      box-shadow: 0 20px 60px rgba(59, 33, 50, 0.1);
    }

    .craft-icon {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, var(--eggplant) 0%, var(--vinaceous) 100%);
    }

    .craft-icon svg {
      width: 28px;
      height: 28px;
      color: var(--warm-white);
    }

    .craft-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--rust);
      margin-bottom: 0.75rem;
      font-weight: 500;
    }

    .craft-title {
      font-size: 1.5rem;
      color: var(--eggplant);
      margin-bottom: 1rem;
    }

    .craft-desc {
      font-size: 1rem;
      color: var(--eggplant);
      opacity: 0.7;
      line-height: 1.7;
    }

    /* Contact Section */
    .contact {
      padding: clamp(5rem, 10vw, 10rem) 0;
      background: linear-gradient(135deg, var(--eggplant) 0%, var(--petrol) 100%);
      color: var(--warm-white);
      position: relative;
      overflow: hidden;
    }

    .contact::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--teal) 0%, transparent 70%);
      opacity: 0.1;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }

    .contact-content h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin-bottom: 1.5rem;
    }

    .contact-content p {
      font-size: 1.125rem;
      opacity: 0.85;
      margin-bottom: 2rem;
      max-width: 400px;
    }

    .contact-form {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      padding: 3rem;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      color: var(--warm-white);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--teal);
      background: rgba(255, 255, 255, 0.12);
    }

    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem 2rem;
      background: var(--teal);
      color: white;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease;
    }

    .submit-btn:hover {
      background: var(--rust);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 165, 181, 0.3);
    }

    /* Footer */
    footer {
      background: var(--eggplant);
      color: var(--warm-white);
      padding: 4rem 0 2rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-brand .logo {
      color: var(--warm-white);
      margin-bottom: 1rem;
      display: inline-block;
    }

    .footer-brand p {
      font-size: 0.95rem;
      opacity: 0.7;
      max-width: 280px;
    }

    .footer-col h4 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .footer-col ul {
      list-style: none;
    }

    .footer-col li {
      margin-bottom: 0.75rem;
    }

    .footer-col a {
      color: var(--warm-white);
      text-decoration: none;
      opacity: 0.7;
      font-size: 0.95rem;
      transition: opacity 0.3s ease;
    }

    .footer-col a:hover {
      opacity: 1;
    }

    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .hero-image-side {
        min-height: 50vh;
      }

      .hero-content {
        padding: 4rem 2rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
      }

      .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .hero-image-side {
        min-height: 40vh;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .footer-brand p {
        margin: 0 auto;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  </style>
</head>

<body>
  <nav id="navbar" data-pf-id="d0be71">
    <div class="container nav-inner" data-pf-id="62d917">
      <a href="#" class="logo">Miraya<span>.</span></a>
      <ul class="nav-links" data-pf-id="3c9009">
        <li><a href="#services">Servizi</a></li>
        <li><a href="#about">Approccio</a></li>
        <li><a href="#contact">Contatti</a></li>
        <li><a href="#contact" class="nav-cta">Parliamo</a></li>
      </ul>
    </div>
  </nav>

  <main data-pf-id="6dceeb">
    <section class="hero" data-pf-id="1e39b6">
      <div class="hero-image-side" data-aos="fade-right" data-aos-duration="1000" data-pf-id="142a98">
        <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900&amp;h=1200&amp;fit=crop&amp;q=80" alt="Mani artigiane al lavoro su materiale naturale" loading="eager">
      </div>
      <div class="hero-content" data-pf-id="17a8d5">
        <div data-aos="fade-up" data-aos-delay="200" data-pf-id="8e8ec9">
          <p class="hero-label">Laboratorio di Artigianato Digitale</p>
          <h1 class="hero-title">L'Intelligenza è un <em>Gesto Umano</em>.</h1>
          <p class="hero-text">In Miraya Tech Labs, trattiamo il codice come materia viva. Siamo artigiani del dato e
            sarti dell'algoritmo. Costruiamo ponti tra la complessità delle macchine e la semplicità di un'intuizione.
          </p>
          <a href="#contact" class="hero-cta">
            Iniziamo una conversazione
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <section class="services" id="services" data-pf-id="512dff">
      <div class="container" data-pf-id="ef2c3e">
        <div class="services-header" data-aos="fade-up" data-pf-id="b100cf">
          <p class="services-label">Le Nostre Craft</p>
          <h2 class="services-title">Dove l'artigianato incontra la tecnologia</h2>
        </div>
        <div class="services-grid" data-pf-id="bdae71">
          <article class="craft-card" data-aos="fade-up" data-aos-delay="100" data-pf-id="ea147c">
            <div class="craft-icon" data-pf-id="4e2331">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
                </path>
              </svg>
            </div>
            <p class="craft-label">AI Consultant</p>
            <h3 class="craft-title">Maieutica dei Dati</h3>
            <p class="craft-desc">Estrarre potenziale latente attraverso modelli etici. Non prediciamo il futuro, lo
              ascoltiamo.</p>
          </article>

          <article class="craft-card" data-aos="fade-up" data-aos-delay="200" data-pf-id="642f1d">
            <div class="craft-icon" data-pf-id="a8a4b3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <p class="craft-label">Web Design</p>
            <h3 class="craft-title">Architetture Sensoriali</h3>
            <p class="craft-desc">Interfacce da abitare, non solo da cliccare. Spazi digitali che respirano con chi li
              attraversa.</p>
          </article>

          <article class="craft-card" data-aos="fade-up" data-aos-delay="300" data-pf-id="cd5775">
            <div class="craft-icon" data-pf-id="526702">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <p class="craft-label">Sviluppo FE/BE</p>
            <h3 class="craft-title">Tessitura Digitale</h3>
            <p class="craft-desc">Infrastrutture robuste intrecciate con cura sartoriale. Ogni riga di codice è un filo
              che lega.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="contact" id="contact" data-pf-id="1d7bf9">
      <div class="container" data-pf-id="b04243">
        <div class="contact-grid" data-pf-id="8b8516">
          <div class="contact-content" data-aos="fade-right" data-pf-id="0e2ca8">
            <h2>Costruiamo qualcosa di significativo insieme</h2>
            <p>Ogni grande progetto inizia con una conversazione. Raccontaci la tua visione, troveremo insieme la forma
              più adatta.</p>
          </div>
          <form class="contact-form" data-aos="fade-left" onsubmit="handleSubmit(event)" data-pf-id="140c4c">
            <div class="form-group" data-pf-id="319214">
              <label for="name">Nome</label>
              <input type="text" id="name" name="name" placeholder="Il tuo nome" required="">
            </div>
            <div class="form-group" data-pf-id="603526">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="la.tua@email.com" required="">
            </div>
            <div class="form-group" data-pf-id="0f08b5">
              <label for="message">Messaggio</label>
              <textarea id="message" name="message" placeholder="Raccontaci il tuo progetto..." required=""></textarea>
            </div>
            <button type="submit" class="submit-btn">Invia il tuo messaggio</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer data-pf-id="f93a9a">
    <div class="container" data-pf-id="0d1eec">
      <div class="footer-grid" data-pf-id="331f33">
        <div class="footer-brand" data-pf-id="2881f2">
          <a href="#" class="logo">Miraya<span>.</span></a>
          <p>Laboratorio di Artigianato Digitale. Modelliamo soluzioni tecnologiche sull'uomo, non l'inverso.</p>
        </div>
        <div class="footer-col" data-pf-id="8e3f11">
          <h4>Servizi</h4>
          <ul data-pf-id="b8d912">
            <li><a href="#services">AI Consultant</a></li>
            <li><a href="#services">Web Design</a></li>
            <li><a href="#services">Sviluppo</a></li>
          </ul>
        </div>
        <div class="footer-col" data-pf-id="47dca6">
          <h4>Approccio</h4>
          <ul data-pf-id="094ad5">
            <li><a href="#">Metodo</a></li>
            <li><a href="#">Valori</a></li>
            <li><a href="#">Case Study</a></li>
          </ul>
        </div>
        <div class="footer-col" data-pf-id="3764ea">
          <h4>Contatti</h4>
          <ul data-pf-id="ecc98e">
            <li><a href="mailto:ciao@miraya.tech">ciao@miraya.tech</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" data-pf-id="3e082a">
        <p>© 2025 Miraya Tech Labs. Tutti i diritti riservati.</p>
        <p>P.IVA 00000000000</p>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/aos@2/dist/aos.js"></script>
  <script>
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    function handleSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.submit-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Messaggio inviato ✓';
      btn.style.background = '#824D5E';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    }
  </script>

</body>

</html>