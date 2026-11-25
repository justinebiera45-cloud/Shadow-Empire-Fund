const app = document.getElementById("app");

if (!app) {
  throw new Error('Missing <div id="app"></div> in index.html');
}

const FUNDING_GOAL = 10000;
let confirmedTotal = 0;
let currentPage = "HOME";
let menuOpen = false;

const style = document.createElement("style");

style.textContent = `
* {
  box-sizing: border-box;
}

:root {
  --bg: #050713;
  --panel: #0b1424;
  --border: #1b3550;
  --cyan: #00dfff;
  --text: #eef5ff;
  --muted: #aab8cc;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Arial, sans-serif;
}

button, input, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 20px 5%;
  background: #050713;
  border-bottom: 1px solid var(--border);
}

.brand {
  color: var(--cyan);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 4px;
}

.menu-toggle {
  display: block;
  background: var(--panel);
  color: var(--cyan);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 25px;
}

.nav-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 5%;
  width: 230px;
  padding: 12px;
  background: #080d1b;
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 15px 40px #0008;
}

.nav-menu.open {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-menu button,
.btn {
  background: #0c1a2b;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 13px 18px;
  text-align: center;
}

.nav-menu button {
  width: 100%;
}

.nav-menu button.active,
.btn.primary {
  background: var(--cyan);
  color: #001018;
  border-color: var(--cyan);
  font-weight: bold;
}

button:hover,
.btn:hover {
  border-color: var(--cyan);
}

main {
  max-width: 1150px;
  margin: auto;
  padding: 35px 5%;
  min-height: 70vh;
}

.hero {
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px;
  border-radius: 22px;
  background:
    radial-gradient(circle at 80% 20%, #12375c, transparent 45%),
    linear-gradient(135deg, #080d1b, #050713);
  border: 1px solid var(--border);
}

.eyebrow {
  color: var(--cyan);
  letter-spacing: 5px;
  font-weight: bold;
}

h1 {
  font-size: clamp(38px, 8vw, 76px);
  line-height: 1.05;
  margin: 20px 0;
}

h2 {
  color: var(--cyan);
}

p {
  color: var(--muted);
  line-height: 1.8;
}

.lead {
  font-size: 20px;
}

.section-title {
  font-size: clamp(28px, 5vw, 44px);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 25px;
  margin-bottom: 18px;
}

.card h3 {
  margin-top: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 25px;
}

.progress {
  height: 14px;
  background: #142338;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px 0;
}

.progress span {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #00dfff, #783bff);
  transition: width .4s;
}

input,
textarea {
  width: 100%;
  padding: 14px;
  margin: 8px 0 16px;
  background: #050912;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
}

textarea {
  min-height: 110px;
  resize: vertical;
}

footer {
  text-align: center;
  border-top: 1px solid var(--border);
  padding: 25px;
  color: var(--muted);
}

@media (min-width: 900px) {
  .menu-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
    position: static;
    width: auto;
    padding: 0;
    border: 0;
    box-shadow: none;
    background: transparent;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .nav-menu button {
    width: auto;
  }
}

@media (max-width: 600px) {
  .site-header {
    padding: 18px 5%;
  }

  .brand {
    font-size: 17px;
    letter-spacing: 3px;
  }

  main {
    padding: 25px 5%;
  }

  .hero {
    padding: 25px;
  }

  .actions .btn {
    width: 100%;
  }
}
`;

document.head.appendChild(style);

const navItems = [
  "HOME",
  "ABOUT",
  "FEATURES",
  "ROADMAP",
  "FUND",
  "COMMUNITY",
  "DASHBOARD"
];

const pages = {
  HOME: () => `
    <section class="hero">
      <p class="eyebrow">SHADOW EMPIRE</p>
      <h1>RISE FROM<br>THE SHADOWS</h1>
      <p class="lead">
        Forge your destiny. Explore a world shaped by
        power, mystery, and your choices.
      </p>
      <div class="actions">
        <button class="btn primary" data-page="FEATURES">
          EXPLORE THE GAME
        </button>
        <button class="btn" data-page="FUND">
          SUPPORT DEVELOPMENT
        </button>
      </div>
    </section>

    <section class="grid">
      <article class="card">
        <h3>⚔ Open-World RPG</h3>
        <p>Explore a dark fantasy world filled with secrets.</p>
      </article>

      <article class="card">
        <h3>◆ Epic Dungeons</h3>
        <p>Discover dangerous dungeons and powerful bosses.</p>
      </article>

      <article class="card">
        <h3>✦ Character Growth</h3>
        <p>Forge your own path and develop your character.</p>
      </article>
    </section>
  `,

  ABOUT: () => `
    <h1 class="section-title">ABOUT SHADOW EMPIRE</h1>
    <p class="lead">
      Shadow Empire is a dark fantasy Roblox RPG project
      focused on exploration, progression, and adventure.
    </p>

    <div class="card">
      <h2>Our Vision</h2>
      <p>
        Create an immersive world where players can explore,
        discover hidden places, and build their own legends.
      </p>
    </div>
  `,

  FEATURES: () => `
    <h1 class="section-title">GAME FEATURES</h1>
    <p class="lead">Discover what awaits beyond the shadows.</p>

    <div class="grid">
      <article class="card">
        <h3>⚔ Combat System</h3>
        <p>Battle enemies and improve your abilities.</p>
      </article>

      <article class="card">
        <h3>◆ Exploration</h3>
        <p>Travel through mysterious lands and hidden areas.</p>
      </article>

      <article class="card">
        <h3>✦ Progression</h3>
        <p>Develop your character and unlock new skills.</p>
      </article>

      <article class="card">
        <h3>♜ World Events</h3>
        <p>Discover events and challenges throughout the world.</p>
      </article>
    </div>
  `,

  ROADMAP: () => `
    <h1 class="section-title">DEVELOPMENT ROADMAP</h1>

    <div class="card">
      <h3>Phase 1 — Foundation</h3>
      <p>Core planning and initial development.</p>
    </div>

    <div class="card">
      <h3>Phase 2 — World Building</h3>
      <p>Map design, environments, and exploration.</p>
    </div>

    <div class="card">
      <h3>Phase 3 — Gameplay</h3>
      <p>Combat, progression, and quests.</p>
    </div>

    <div class="card">
      <h3>Phase 4 — Testing</h3>
      <p>Testing, balancing, and preparing for release.</p>
    </div>
  `,

  FUND: () => `
    <h1 class="section-title">SUPPORT DEVELOPMENT</h1>

    <p class="lead">
      Help fund the creation of Shadow Empire.
      Contributions remain pending until reviewed.
    </p>

    <section class="card">
      <h2>Project Funding</h2>

      <p>
        Funding goal:
        <strong>₱${FUNDING_GOAL.toLocaleString("en-PH")}</strong>
      </p>

      <p>
        Confirmed total:
        <strong>₱${confirmedTotal.toLocaleString("en-PH")}</strong>
      </p>

      <div class="progress">
        <span id="fundingProgress"></span>
      </div>

      <p id="fundingPercent">0% funded</p>

      <p>
        Only verified payments should be included in official totals.
      </p>
    </section>

    <section class="card">
      <h2>InstaPay QR</h2>

      <img
        src="./instapay-qr.jpg"
        alt="Project payment QR code"
        style="width:100%;max-width:420px;border-radius:12px"
      >

      <p>
        Use the project's genuine payment QR code.
        Verify payment details before sending.
      </p>
    </section>

    <section class="card">
      <h2>Submit Payment Reference</h2>

      <form id="paymentForm">
        <label for="paymentAmount">Amount in PHP</label>
        <input
          id="paymentAmount"
          name="amount"
          type="number"
          min="1"
          required
        >

        <label for="paymentReference">Payment reference</label>
        <input
          id="paymentReference"
          name="reference"
          maxlength="100"
          required
        >

        <button class="btn primary" type="submit">
          SUBMIT FOR REVIEW
        </button>
      </form>

      <p id="paymentMessage">
        Submitted payments are not automatically confirmed.
      </p>
    </section>
  `,

  COMMUNITY: () => `
    <h1 class="section-title">JOIN THE COMMUNITY</h1>

    <p class="lead">
      Follow development and connect with the Shadow Empire
      community.
    </p>

    <div class="card">
      <h2>Discord Community</h2>
      <p>Join the community to receive development updates.</p>
      <a class="btn primary"
         href="https://discord.com"
         target="_blank"
         rel="noopener">
        OPEN DISCORD
      </a>
    </div>
  `,

  DASHBOARD: () => `
    <h1 class="section-title">DASHBOARD</h1>

    <p class="lead">
      Access your supporter dashboard.
    </p>

    <section class="card">
      <h2>Account Login</h2>

      <form id="loginForm">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          autocomplete="username"
          required
        >

        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
        >

        <button class="btn primary" type="submit">
          SIGN IN
        </button>
      </form>

      <p id="loginMessage">
        Account authentication must be connected to Supabase.
      </p>
    </section>

    <section class="card">
      <h2>Admin Panel</h2>
      <p>
        Payment approvals and admin access must be handled
        securely through the backend.
      </p>
      <p>
        Do not put admin passwords or service-role keys
        inside this public JavaScript file.
      </p>
    </section>
  `
};

app.innerHTML = `
  <header class="site-header">
    <div class="brand">SHADOW EMPIRE</div>

    <button
      class="menu-toggle"
      id="menuToggle"
      aria-label="Open navigation"
      aria-expanded="false"
    >☰</button>

    <nav class="nav-menu" id="navMenu">
      ${navItems.map(name => `
        <button data-page="${name}">${name}</button>
      `).join("")}
    </nav>
  </header>

  <main id="pageView"></main>

  <footer>
    SHADOW EMPIRE — RISE FROM THE SHADOWS
  </footer>
`;

const pageView = document.getElementById("pageView");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");

function showPage(name) {
  const page = pages[name] ? name : "HOME";

  currentPage = page;
  pageView.innerHTML = pages[page]();

  navMenu.querySelectorAll("[data-page]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  navMenu.classList.remove("open");
  menuOpen = false;

  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");

  if (page === "FUND") {
    updateFundingDisplay();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function updateFundingDisplay() {
  const progress = document.getElementById("fundingProgress");
  const percentText = document.getElementById("fundingPercent");

  if (!progress || !percentText) return;

  const percent = Math.min(
    100,
    Math.max(0, (confirmedTotal / FUNDING_GOAL) * 100)
  );

  progress.style.width = percent + "%";
  percentText.textContent = percent.toFixed(1) + "% funded";
}

menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;

  navMenu.classList.toggle("open", menuOpen);

  menuToggle.textContent = menuOpen ? "✕" : "☰";

  menuToggle.setAttribute(
    "aria-expanded",
    String(menuOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    menuOpen ? "Close navigation" : "Open navigation"
  );
});

app.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");

  if (!button) return;

  showPage(button.dataset.page);
});

document.addEventListener("click", event => {
  if (
    menuOpen &&
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    menuOpen = false;
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Frontend demonstration only.
// Connect this form to your secure backend before using it.
app.addEventListener("submit", event => {
  event.preventDefault();

  if (event.target.id === "paymentForm") {
    const message = document.getElementById("paymentMessage");

    message.textContent =
      "The form is working, but payment submission needs " +
      "a secure backend connection. No payment was confirmed.";

    return;
  }

  if (event.target.id === "loginForm") {
    const message = document.getElementById("loginMessage");

    message.textContent =
      "Login is not connected yet. Configure Supabase " +
      "authentication before using accounts or admin access.";

    return;
  }
});

// Initial page
showPage("HOME");
