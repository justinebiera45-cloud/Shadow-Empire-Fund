
const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
*{box-sizing:border-box}
body{margin:0;background:#050912;color:#eef5ff;font-family:Arial,sans-serif}
button,input,textarea{font:inherit}
button{cursor:pointer}
:root{--cyan:#00eaff;--blue:#2678ff;--panel:#0b1423;--border:#1b3550}
header{position:sticky;top:0;background:#050912ee;border-bottom:1px solid var(--border);z-index:5;padding:14px 5%;display:flex;justify-content:space-between;align-items:center}
.logo{color:var(--cyan);font-weight:bold;letter-spacing:3px}
nav{display:flex;gap:8px;flex-wrap:wrap}
nav button,.btn{background:#0c1a2b;color:#dceaff;border:1px solid var(--border);padding:10px 14px;border-radius:8px}
nav button:hover,.btn:hover{border-color:var(--cyan);color:var(--cyan)}
.primary{background:var(--cyan);color:#001018;border:0;font-weight:bold}
main{max-width:1150px;margin:auto;padding:30px 5%}
.hero{min-height:65vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;background:radial-gradient(ellipse at 80% 30%,#10345c 0%,#050912 60%);padding:30px 0}
.eyebrow{color:var(--cyan);letter-spacing:5px}
h1{font-size:clamp(38px,8vw,76px);line-height:1.05;margin:18px 0}
h2{color:var(--cyan)}
p{color:#aabbd0;line-height:1.7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:20px;margin:12px 0}
.card h3{margin-top:0}
.bar{height:12px;background:#142338;border-radius:20px;overflow:hidden}
.bar span{display:block;height:100%;background:linear-gradient(90deg,var(--cyan),var(--blue))}
input,textarea{width:100%;padding:13px;background:#050912;color:white;border:1px solid var(--border);border-radius:8px;margin:8px 0}
section{animation:fade .2s ease}
@keyframes fade{from{opacity:.5;transform:translateY(5px)}to{opacity:1;transform:none}}
footer{text-align:center;border-top:1px solid var(--border);padding:30px;color:#71849b}
.menu{display:none}
@media(max-width:700px){
header{align-items:flex-start;gap:10px;flex-direction:column}
nav{display:grid;grid-template-columns:repeat(3,1fr);width:100%}
nav button{font-size:12px;padding:9px 5px}
main{padding:22px 5%}
.hero{min-height:60vh}
}
`;
document.head.appendChild(style);

let current = "HOME";
let user = null;

const pages = {
HOME: () => `
<section class="hero">
<p class="eyebrow">SHADOW EMPIRE</p>
<h1>RISE FROM<br>THE SHADOWS</h1>
<p>Forge your destiny. Explore a world shaped by power, mystery, and your choices.</p>
<div>
<button class="btn primary" data-page="FEATURES">EXPLORE THE GAME</button>
<button class="btn" data-page="FUND">SUPPORT DEVELOPMENT</button>
</div>
</section>
<div class="grid">
<div class="card"><h3>⚔ Open-World RPG</h3><p>Explore a dark fantasy world.</p></div>
<div class="card"><h3>◆ Epic Dungeons</h3><p>Face powerful bosses and challenges.</p></div>
<div class="card"><h3>✦ Character Growth</h3><p>Forge your own path and abilities.</p></div>
</div>
<div class="card"><h2>Development Progress</h2><p>Project progress will be updated as development continues.</p><div class="bar"><span style="width:15%"></span></div><p>15% — Early development preview</p></div>
`,
ABOUT: () => `
<h1>ABOUT THE EMPIRE</h1>
<div class="card"><h2>Our Vision</h2><p>Shadow Empire is a Roblox fantasy RPG focused on exploration, character progression, challenging battles, and a world players can discover together.</p></div>
<div class="card"><h2>Our Goal</h2><p>Build an immersive game experience through community feedback and steady development.</p></div>
<div class="card"><h2>Development Team</h2><p>Independent Roblox game project. Team information will be announced as the project grows.</p></div>
`,
FEATURES: () => `
<h1>GAME FEATURES</h1>
<div class="grid">
${["Open-world RPG","Quests and missions","Dungeons and bosses","Weapons and equipment","Character progression","PvE and PvP","Party system","Multiple worlds"].map(x=>`<div class="card"><h3>✦ ${x}</h3><p>Planned feature for the Shadow Empire experience.</p></div>`).join("")}
</div>
`,
ROADMAP: () => `
<h1>DEVELOPMENT ROADMAP</h1>
<div class="card"><h3>Phase 1 — Foundation</h3><p>Project planning and core systems.</p><div class="bar"><span style="width:25%"></span></div></div>
<div class="card"><h3>Phase 2 — World Building</h3><p>Map design, environments, and exploration.</p><div class="bar"><span style="width:10%"></span></div></div>
<div class="card"><h3>Phase 3 — Combat & Quests</h3><p>Combat mechanics, missions, and progression.</p><div class="bar"><span style="width:0%"></span></div></div>
<div class="card"><h3>Phase 4 — Testing</h3><p>Community testing and game optimization.</p><div class="bar"><span style="width:0%"></span></div></div>
`,
FUND: () => `
<h1>SUPPORT DEVELOPMENT</h1>
<div class="card"><h2>Project Funding</h2><p>Help support development costs. Contributions are voluntary and manually reviewed.</p>
<h3>Funding goal: ₱10,000</h3><h3>Confirmed: ₱0</h3>
<div class="bar"><span style="width:0%"></span></div>
<p>Official totals only include verified payments.</p></div>
<div class="card"><h2>Choose an amount</h2>
${[50,100,200,500].map(n=>`<button class="btn" data-amount="${n}">₱${n}</button>`).join(" ")}
<p id="selected">Selected: ₱100</p>
<p>Scan the original InstaPay QR code to initiate payment.</p>
<img src="./instapay-qr.jpg" alt="InstaPay QR code" style="width:100%;max-width:280px;border-radius:12px" onerror="this.style.display='none'">
<p>After payment, submit your transaction reference below. Do not enter any PIN, OTP, or banking password.</p>
<form id="payment">
<input name="amount" id="amount" type="number" min="1" value="100" required>
<input name="reference" placeholder="Transaction reference" required>
<button class="btn primary">SUBMIT FOR REVIEW</button>
</form>
<p id="paymentMessage"></p>
</div>
`,
COMMUNITY: () => `
<h1>JOIN THE COMMUNITY</h1>
<div class="card"><h2>Discord</h2><p>Join the community to follow announcements and development updates.</p><a class="btn" href="https://discord.com" target="_blank" rel="noopener">OPEN DISCORD</a></div>
<div class="card"><h2>Announcements</h2><p>Official project announcements and social links will be added here.</p></div>
`,
DASHBOARD: () => `
<h1>ACCOUNT CENTER</h1>
<div class="grid">
<div class="card"><h2>USER LOGIN</h2><button class="btn primary" data-page="LOGIN">LOGIN</button></div>
<div class="card"><h2>CREATE ACCOUNT</h2><button class="btn" data-page="REGISTER">REGISTER</button></div>
<div class="card"><h2>ADMIN</h2><button class="btn" data-page="ADMIN">ADMIN DEMO</button><p>Demo only. Real admin access must be verified server-side.</p></div>
</div>
`,
LOGIN: () => authForm("WELCOME BACK","login"),
REGISTER: () => authForm("CREATE ACCOUNT","register"),
USER: () => `
<h1>SUPPORTER CONTROL CENTER</h1>
<div class="grid">
${["Overview","My Contributions","Transaction History","Notifications","My Profile","Account Settings","Help Center"].map(x=>`<div class="card"><h3>${x}</h3><p>Account section</p></div>`).join("")}
</div>
<button class="btn" data-action="logout">LOGOUT</button>
`,
ADMIN: () => `
<h1>EMPIRE CONTROL CENTER</h1>
<p>Frontend preview only — admin permissions are not secured in this demo.</p>
<div class="grid">
${["Overview","User Management","Funding Management","Payment Verification","Transaction Records","Financial Reports","Development Management","Announcements","Website Settings","Security & Audit Logs"].map(x=>`<div class="card"><h3>${x}</h3><p>Management section preview</p></div>`).join("")}
</div>
`
};

function authForm(title,type){
return `<h1>${title}</h1><div class="card"><form id="auth">
<input name="username" placeholder="Username" minlength="3" maxlength="20" pattern="[A-Za-z0-9_]+" required>
<input name="password" type="password" placeholder="Password (8+ characters)" minlength="8" required>
${type==="register"?'<input name="confirm" type="password" placeholder="Confirm password" minlength="8" required>':''}
<button class="btn primary">${type==="login"?"LOGIN":"CREATE ACCOUNT"}</button>
</form><p id="authMessage"></p>
<button class="btn" data-page="${type==="login"?"REGISTER":"LOGIN"}">${type==="login"?"Create account":"Already have an account? Login"}</button>
</div>`;
}

function render(){
app.innerHTML=`
<header>
<div class="logo">SHADOW EMPIRE</div>
<nav>
${["HOME","ABOUT","FEATURES","ROADMAP","FUND","COMMUNITY","DASHBOARD"].map(p=>`<button data-page="${p}">${p}</button>`).join("")}
</nav>
</header>
<main><section>${(pages[current]||pages.HOME)()}</section></main>
<footer>SHADOW EMPIRE — FORGE YOUR DESTINY. RISE FROM THE SHADOWS.</footer>`;
}

app.addEventListener("click",e=>{
const page=e.target.closest("[data-page]");
if(page){current=page.dataset.page;render();window.scrollTo(0,0);return;}
const amount=e.target.closest("[data-amount]");
if(amount){document.getElementById("amount").value=amount.dataset.amount;document.getElementById("selected").textContent="Selected: ₱"+amount.dataset.amount;return;}
if(e.target.closest('[data-action="logout"]')){user=null;current="HOME";render();}
});

app.addEventListener("submit",e=>{
e.preventDefault();
const form=e.target;
const data=new FormData(form);
if(form.id==="payment"){
document.getElementById("paymentMessage").textContent="Demo submission only. No payment was verified or recorded.";
}
if(form.id==="auth"){
const username=data.get("username");
const password=data.get("password");
if(current==="REGISTER" && password!==data.get("confirm")){
document.getElementById("authMessage").textContent="Passwords do not match.";
return;
}
user={username};
document.getElementById("authMessage").textContent="Demo account only. Connect Supabase for secure authentication.";
}
});

render();
