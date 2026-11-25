// SHADOW EMPIRE — frontend navigation and page renderer
// Static frontend preview. Backend required for secure accounts and payments.

const app = document.getElementById('app');
if (!app) throw new Error('Missing <div id="app"></div> in index.html');

const style = document.createElement('style');
style.textContent = `
:root{--cyan:#00dfff;--blue:#2678ff;--panel:#0b1423;--line:#1b3550;--text:#eaf2ff;--muted:#aabbd0}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#050713;color:var(--text);font-family:Arial,sans-serif}
button,input,textarea{font:inherit}button{cursor:pointer}
.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 5%;background:#050912ee;backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.brand{font-weight:900;letter-spacing:4px;color:var(--cyan);white-space:nowrap}.menu-toggle{display:none;background:#101b2c;color:var(--cyan);border:1px solid var(--line);border-radius:10px;padding:9px 13px;font-size:22px}
.nav-menu{display:flex;gap:7px;flex-wrap:wrap}.nav-menu button,.btn{border:1px solid var(--line);border-radius:10px;background:#0c1a2b;color:#dceaff;padding:11px 14px;transition:.2s}.nav-menu button:hover,.btn:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-1px)}.nav-menu button.active{background:#102d43;border-color:var(--cyan);color:var(--cyan)}
main{max-width:1150px;margin:auto;padding:32px 5% 60px}.view{animation:fade .22s ease}.hero{min-height:65vh;display:flex;flex-direction:column;justify-content:center;padding:clamp(25px,6vw,70px);border:1px solid #173451;border-radius:24px;background:radial-gradient(ellipse at 80% 20%,#123b61 0%,#091324 45%,#050713 78%);overflow:hidden}.eyebrow{color:var(--cyan);letter-spacing:5px;font-weight:bold}.hero h1{font-size:clamp(38px,8vw,76px);line-height:1.02;margin:20px 0}.hero p,.lead{font-size:clamp(17px,2.5vw,22px);line-height:1.7;color:var(--muted);max-width:720px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}.btn.primary{background:var(--cyan);color:#001018;border-color:var(--cyan);font-weight:bold}.section-title{font-size:clamp(28px,5vw,42px);margin:8px 0 18px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:16px;margin-top:22px}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px}.card h3{margin-top:0}.muted{color:var(--muted);line-height:1.65}.progress{height:12px;background:#142338;border-radius:20px;overflow:hidden;margin:14px 0}.progress span{display:block;height:100%;background:linear-gradient(90deg,var(--blue),var(--cyan));width:0}.form{display:grid;gap:12px;max-width:520px}.form input,.form textarea{width:100%;padding:13px;border-radius:10px;background:#050912;color:var(--text);border:1px solid var(--line)}.notice{padding:14px;border:1px solid #765b26;background:#251d0e;color:#ffe2a3;border-radius:12px;margin:14px 0}.qr{max-width:260px;width:100%;background:white;padding:10px;border-radius:12px}.status{color:var(--cyan)}footer{border-top:1px solid var(--line);padding:24px 5%;text-align:center;color:var(--muted)}
@keyframes fade{from{opacity:.4;transform:translateY(5px)}to{opacity:1;transform:none}}
@media(max-width:760px){.site-header{align-items:flex-start;flex-wrap:wrap}.menu-toggle{display:block}.nav-menu{display:none;width:100%;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.nav-menu.open{display:grid}.nav-menu button{width:100%;padding:12px 7px;font-size:13px}.hero{min-height:58vh;padding:28px 22px}.hero h1{font-size:clamp(36px,11vw,58px)}main{padding-top:22px}}
`;
document.head.appendChild(style);

const navItems = ['HOME','ABOUT','FEATURES','ROADMAP','FUND','COMMUNITY','DASHBOARD'];

const pages = {
  HOME: () => `<section class="hero"><p class="eyebrow">SHADOW EMPIRE</p><h1>RISE FROM<br>THE SHADOWS</h1><p>Forge your destiny. Explore a world shaped by power, mystery, and your choices.</p><div class="actions"><button class="btn primary" data-page="FEATURES">EXPLORE THE GAME</button><button class="btn" data-page="FUND">SUPPORT DEVELOPMENT</button></div></section><div class="grid"><article class="card"><h3>⚔ Open-World RPG</h3><p class="muted">Explore a dark fantasy world.</p></article><article class="card"><h3>✦ Epic Dungeons</h3><p class="muted">Face powerful bosses and discover hidden places.</p></article><article class="card"><h3>⬆ Character Growth</h3><p class="muted">Forge your own path through progression.</p></article></div>`,

  ABOUT: () => `<h1 class="section-title">ABOUT SHADOW EMPIRE</h1><p class="lead">A dark fantasy Roblox RPG built around exploration, challenging encounters, and meaningful character progression.</p><div class="grid"><article class="card"><h3>Our Vision</h3><p class="muted">Create an immersive world where players shape their own legend.</p></article><article class="card"><h3>Project Goals</h3><p class="muted">Build memorable quests, balanced combat, and a welcoming community.</p></article><article class="card"><h3>Development Team</h3><p class="muted">An independent project team developing Shadow Empire step by step.</p></article></div>`,

  FEATURES: () => `<h1 class="section-title">GAME FEATURES</h1><p class="lead">Discover what awaits beyond the shadows.</p><div class="grid">${['Open-world RPG','Quests and missions','Dungeons and bosses','Weapons and equipment','Character progression','PvE and PvP','Party system','Multiple worlds'].map(x=>`<article class="card"><h3>✦ ${x}</h3><p class="muted">Planned gameplay feature for the Shadow Empire experience.</p></article>`).join('')}</div>`,

  ROADMAP: () => `<h1 class="section-title">DEVELOPMENT ROADMAP</h1><p class="lead">Follow the journey from concept to playable world.</p><div class="grid"><article class="card"><p class="status">● FOUNDATION</p><h3>Project setup</h3><p class="muted">Planning, core concept, and initial systems.</p></article><article class="card"><p class="status">● IN DEVELOPMENT</p><h3>Core gameplay</h3><p class="muted">Combat, player progression, and world prototyping.</p></article><article class="card"><p class="status">● UPCOMING</p><h3>World expansion</h3><p class="muted">Quests, dungeons, testing, and community feedback.</p></article></div>`,

  FUND: () => `<h1 class="section-title">SUPPORT DEVELOPMENT</h1><p class="lead">Help fund the creation of Shadow Empire. Contributions remain pending until reviewed by the project owner.</p><div class="grid"><article class="card"><h3>Project Funding</h3><p class="muted">Funding goal: <strong id="goalText">Set by project owner</strong></p><p class="muted">Confirmed total: <strong id="totalText">₱0</strong></p><div class="progress"><span id="fundProgress"></span></div><p class="muted">Only verified payments should be included in official totals.</p></article><article class="card"><h3>InstaPay QR</h3><img class="qr" src="./instapay-qr.jpg" alt="Project InstaPay QR code" onerror="this.style.display='none';document.getElementById('qrMissing').style.display='block'"><p id="qrMissing" class="notice" style="display:none">QR image not found. Upload your genuine instapay-qr.jpg to the repository root.</p><p class="muted">Scan with your payment app. Never share your MPIN or OTP.</p></article></div><div class="card" style="margin-top:16px"><h3>Submit payment reference</h3><div class="actions">${[50,100,200,500].map(n=>`<button class="btn amount" data-amount="${n}">₱${n}</button>`).join('')}</div><form class="form" id="paymentForm"><label>Contribution amount (PHP)<input name="amount" type="number" min="1" required placeholder="e.g. 100"></label><label>Transaction reference<input name="reference" required maxlength="100" placeholder="Reference number from payment receipt"></label><button class="btn primary" type="submit">SUBMIT FOR REVIEW</button></form><p class="notice">This demo form does not send or verify payments. Connect a secure backend before accepting real submissions.</p><p id="paymentMessage" class="muted" aria-live="polite"></p></div>`,

  COMMUNITY: () => `<h1 class="section-title">JOIN THE COMMUNITY</h1><p class="lead">Follow development, share feedback, and join fellow adventurers.</p><div class="grid"><article class="card"><h3>Discord</h3><p class="muted">Add your official Discord invite in the website settings.</p><button class="btn" data-link="discord">OPEN DISCORD</button></article><article class="card"><h3>Announcements</h3><p class="muted">Development news and project updates will appear here when connected to the backend.</p></article><article class="card"><h3>Social Links</h3><p class="muted">Add official Roblox and social media links before publishing.</p></article></div>`,

  DASHBOARD: () => `<h1 class="section-title">DASHBOARD</h1><p class="lead">Sign in to access your supporter dashboard.</p><div class="grid"><article class="card"><h3>USER LOGIN</h3><form class="form" id="loginForm"><label>Username<input name="username" required minlength="3" maxlength="20" autocomplete="username"></label><label>Password<input name="password" type="password" required minlength="8" autocomplete="current-password"></label><button class="btn primary" type="submit">LOGIN</button></form><p id="loginMessage" class="muted" aria-live="polite"></p></article><article class="card"><h3>CREATE ACCOUNT</h3><form class="form" id="registerForm"><label>Username<input name="username" required minlength="3" maxlength="20" pattern="[A-Za-z0-9_]+" autocomplete="username"></label><label>Password<input name="password" type="password" required minlength="8" autocomplete="new-password"></label><label>Confirm password<input name="confirm" type="password" required minlength="8" autocomplete="new-password"></label><button class="btn" type="submit">CREATE ACCOUNT</button></form><p id="registerMessage" class="muted" aria-live="polite"></p></article></div><div class="notice">Authentication is not connected in this static preview. Do not use real passwords here. Configure the server-side username authentication function and database policies before launch.</div>`
};

app.innerHTML = `<header class="site-header"><div class="brand">SHADOW EMPIRE</div><button class="menu-toggle" id="menuToggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="nav-menu" id="navMenu" aria-label="Main navigation">${navItems.map(n=>`<button type="button" data-page="${n}">${n}</button>`).join('')}</nav></header><main><div id="pageView" class="view"></div></main><footer>SHADOW EMPIRE · FORGE YOUR DESTINY. RISE FROM THE SHADOWS.</footer>`;
const pageView = document.getElementById('pageView');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');

function showPage(name, updateHash=true){
  const page = navItems.includes(name) ? name : 'HOME';
  pageView.innerHTML = pages[page]();

  navMenu.querySelectorAll('[data-page]').forEach(b =>
    b.classList.toggle('active',b.dataset.page===page)
  );

  navMenu.classList.remove('open');
  menuToggle.textContent='☰';
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open navigation');

  if(updateHash) history.replaceState(null,'','#'+page.toLowerCase());

  window.scrollTo({top:0,behavior:'smooth'});
}

menuToggle.addEventListener('click',()=>{
  const open=navMenu.classList.toggle('open');

  menuToggle.textContent=open?'✕':'☰';
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});

app.addEventListener('click',e=>{
  const pageButton=e.target.closest('[data-page]');

  if(pageButton){
    showPage(pageButton.dataset.page);
    return;
  }

  const amount=e.target.closest('[data-amount]');

  if(amount){
    const input=document.querySelector('#paymentForm [name="amount"]');
    if(input)input.value=amount.dataset.amount;
    return;
  }

  const link=e.target.closest('[data-link]');

  if(link){
    alert('Add your official community URL in the project configuration before using this link.');
  }
});

app.addEventListener('submit',e=>{
  if(e.target.id==='paymentForm'){
    e.preventDefault();

    document.getElementById('paymentMessage').textContent=
      'Demo only: no payment was submitted. Connect the secure backend to record this as Pending.';
  }

  if(e.target.id==='loginForm'){
    e.preventDefault();

    document.getElementById('loginMessage').textContent=
      'Login backend is not configured yet. No credentials were sent or saved.';
  }

  if(e.target.id==='registerForm'){
    e.preventDefault();

    const f=e.target;
    const username=f.username.value.trim();

    if(!/^[A-Za-z0-9_]{3,20}$/.test(username)){
      document.getElementById('registerMessage').textContent=
        'Use 3–20 letters, numbers, or underscores.';
      return;
    }

    if(f.password.value!==f.confirm.value){
      document.getElementById('registerMessage').textContent=
        'Passwords do not match.';
      return;
    }

    document.getElementById('registerMessage').textContent=
      'Frontend validation passed. Account creation requires the secure backend and is not active in this preview.';
  }
});

window.addEventListener('hashchange',()=>{
  showPage(location.hash.slice(1).toUpperCase(),false);
});

showPage(location.hash.slice(1).toUpperCase()||'HOME',false);
