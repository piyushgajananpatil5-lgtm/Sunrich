import { useState } from "react";
import "./App.css";

const currentYear = new Date().getFullYear();
const whatsappNumber = "919209619417";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

function createWhatsAppUrl(details) {
  const message = [
    "Hello Sunrich Renewable Power, I’d like to enquire about a solar order.",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email || "Not provided"}`,
    `Phone: ${details.phone || "Not provided"}`,
    `Project details: ${details.message}`,
  ].join("\n");

  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}

const contactDetails = {
  phone: "+91 72179 29014",
  email: "rajeshpatil.9014@gmail.com",
  location: "Jalgaon, Maharashtra 425306",
  whatsapp: "+91 92096 19417",
};

const projects = [
  {
    image: "/images/rooftop-solar.webp",
    title: "Make your rooftop work harder",
    type: "Rooftop solar",
    position: "center 68%",
  },
  {
    image: "/images/solar-installation.webp",
    title: "Designed for the site you have",
    type: "Solar installation",
    position: "center 62%",
  },
  {
    image: "/images/solar-panels.webp",
    title: "A closer look at clean power",
    type: "Solar infrastructure",
    position: "center 66%",
  },
];

const solutions = [
  {
    number: "01",
    title: "Rooftop solar",
    description:
      "Turn available roof space into a practical source of clean electricity for your business or facility.",
    icon: "roof",
  },
  {
    number: "02",
    title: "Ground-mounted solar",
    description:
      "Explore site-led solar development for landowners and organisations with room to grow.",
    icon: "sun",
  },
  {
    number: "03",
    title: "Project planning",
    description:
      "Start with a conversation about your site, energy goals, and the right next step.",
    icon: "plan",
  },
];

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }
  if (name === "roof") {
    return (
      <svg {...common}>
        <path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
        <path d="M8 11h8M10 11v3m4-3v3" />
      </svg>
    );
  }
  if (name === "sun") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    );
  }
  if (name === "plan") {
    return (
      <svg {...common}>
        <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h4" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M5 4h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L15 14l5 2v3c0 1-1 2-2 2C10 20 4 14 3 6c0-1 1-2 2-2Z" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Sunrich Renewable Power home" onClick={closeMenu}>
        <img src="/sunrich-logo.svg" alt="" />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="main-navigation"
        className={`main-navigation${menuOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#solutions" onClick={closeMenu}>Solutions</a>
        <a href="#projects" onClick={closeMenu}>Our work</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Order on WhatsApp <Icon name="arrow" size={17} />
      </a>
    </header>
  );
}

function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    window.location.assign(
      createWhatsAppUrl({
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        message: String(formData.get("message") || "").trim(),
      }),
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="How should we address you?"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          Email address <span className="optional-label">Optional</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Phone number <span className="optional-label">Optional</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="+91"
          maxLength={30}
        />
      </label>
      <label>
        Tell us about your project
        <textarea
          name="message"
          rows="4"
          placeholder="A little about your site and what you’re looking to achieve..."
          minLength={10}
          maxLength={2000}
          required
        />
      </label>
      <button className="button button-primary submit-button" type="submit">
        Continue on WhatsApp <Icon name="arrow" size={18} />
      </button>
      <p className="form-note">
        Your order details are passed to WhatsApp so you can send your enquiry
        directly to our team.
      </p>
    </form>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/rooftop-solar.webp"
            alt="Rows of solar panels on a commercial rooftop"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content page-shell">
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-mark" />
              Sunrich Renewable Power · Maharashtra
            </p>
            <h1 id="hero-title">
              The power to
              <br />
              <span>do more with the sun.</span>
            </h1>
            <p className="hero-description">
              Thoughtful solar solutions for a brighter, more energy-conscious
              tomorrow.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Order on WhatsApp <Icon name="arrow" size={18} />
              </a>
              <a className="text-link text-link-light" href="#solutions">
                Explore solar <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-caption">
            <span className="caption-dot" />
            Solar installation · image supplied by Sunrich
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to learn about Sunrich">
            <span />
          </a>
        </section>

        <section className="intro section-padding" id="about">
          <div className="page-shell intro-grid">
            <div className="section-label">
              <span className="section-index">01</span>
              <span className="section-rule" />
              <span>Good energy, made practical</span>
            </div>
            <div className="intro-copy">
              <p className="eyebrow">Rooted in Maharashtra. Looking ahead.</p>
              <h2>
                A more considered way
                <br className="desktop-break" /> to power what matters.
              </h2>
              <p className="body-copy">
                Sunrich Renewable Power helps homes, businesses and landowners
                explore solar energy with clarity. As a Maharashtra-based solar
                energy business, we bring a practical, site-first approach to
                planning your next step.
              </p>
              <a className="text-link" href="#contact">
                Get to know us <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="intro-note">
              <div className="intro-note-icon"><Icon name="sun" size={26} /></div>
              <p>Cleaner energy begins with the right conversation.</p>
              <span>Sunrich Renewable Power</span>
            </div>
          </div>
        </section>

        <section className="solutions section-padding" id="solutions">
          <div className="page-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ways to go solar</p>
                <h2>Made for your place<br />in the energy future.</h2>
              </div>
              <p className="body-copy section-heading-copy">
                Every site is different. We’ll help you explore a solar path
                that starts with your space, your needs and your goals.
              </p>
            </div>
            <div className="solution-grid">
              {solutions.map((solution) => (
                <article className="solution-card" key={solution.number}>
                  <div className="solution-card-top">
                    <span className="solution-icon"><Icon name={solution.icon} size={24} /></span>
                    <span className="solution-number">{solution.number}</span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <a href="#contact" aria-label={`Ask us about ${solution.title}`}>
                    <Icon name="arrow" size={18} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach section-padding">
          <div className="page-shell approach-grid">
            <div className="approach-heading">
              <p className="eyebrow">A clear path forward</p>
              <h2>From first thought<br />to brighter days.</h2>
              <p className="body-copy">
                Straightforward guidance at every step. No two solar journeys
                are the same — and yours should start with a proper conversation.
              </p>
              <a className="button button-outline" href="#contact">
                Talk to Sunrich <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="approach-steps">
              {[
                ["01", "Tell us about your site", "Share what you have in mind and what matters most."],
                ["02", "Explore your options", "We’ll talk through a practical solar direction for your needs."],
                ["03", "Plan with confidence", "Get in touch to take the next step, together."],
              ].map(([number, title, description]) => (
                <article className="approach-step" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <Icon name="arrow" size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section-padding" id="projects">
          <div className="page-shell">
            <div className="section-heading project-heading">
              <div>
                <p className="eyebrow">A glimpse of solar</p>
                <h2>Real sunshine.<br />Real possibility.</h2>
              </div>
              <p className="body-copy section-heading-copy">
                A few views of solar infrastructure from the images shared with
                us. Every installation is unique to its site.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card project-card-${index + 1}`} key={project.image}>
                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={`${project.type} shown in a Sunrich-supplied photo`}
                      loading="lazy"
                      style={{ objectPosition: project.position }}
                    />
                    <span className="project-image-tag">{project.type}</span>
                  </div>
                  <div className="project-card-caption">
                    <h3>{project.title}</h3>
                    <span>Photo supplied by Sunrich</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-padding" id="contact">
          <div className="page-shell contact-grid">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light">Let’s make good energy happen</p>
              <h2>Have a site in mind?<br /><span>Let’s talk.</span></h2>
              <p className="contact-lede">
                Tell us a little about your plans. We’ll get back to you to
                start the conversation.
              </p>
              <div className="contact-details">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span><Icon name="phone" size={18} /></span>
                  <span>Orders on WhatsApp · {contactDetails.whatsapp}</span>
                </a>
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}>
                  <span><Icon name="phone" size={18} /></span>
                  <span>Call us · {contactDetails.phone}</span>
                </a>
                <a href={`mailto:${contactDetails.email}`}>
                  <span><Icon name="mail" size={18} /></span>
                  <span>{contactDetails.email}</span>
                </a>
                <div>
                  <span><Icon name="pin" size={18} /></span>
                  <span>{contactDetails.location}</span>
                </div>
              </div>
            </div>
            <div className="contact-form-card">
              <p className="eyebrow">Place an order or ask a question</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-main">
          <a className="footer-brand" href="#home" aria-label="Sunrich home">
            <img src="/sunrich-logo.svg" alt="Sunrich Renewable Power" />
          </a>
          <p>Thoughtful solar. A brighter tomorrow.</p>
          <a className="footer-top" href="#home">Back to top ↑</a>
        </div>
        <div className="page-shell footer-bottom">
          <span>© {currentYear} Sunrich Renewable Power</span>
          <span>VHR Energies Private Limited · Maharashtra, India</span>
        </div>
      </footer>
    </>
  );
}

export default App;
