// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Section highlighting
const sections = [...document.querySelectorAll('header[id], section[id]')];
const navLinks = [...document.querySelectorAll('.side-nav a')];
function onScroll(){
  let current = sections[0].id;
  sections.forEach(s=>{ if (scrollY >= s.offsetTop - 140) current = s.id });
  navLinks.forEach(a=>{ a.classList.toggle('active', a.getAttribute('href').slice(1)===current) });
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Theme toggle + persistence
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('pp-theme');
if(saved) root.setAttribute('data-theme', saved);
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
  root.setAttribute('data-theme','light');
}
themeBtn.addEventListener('click', ()=>{
  const cur = root.getAttribute('data-theme')==='light' ? 'dark' : 'light';
  root.setAttribute('data-theme', cur); localStorage.setItem('pp-theme', cur);
});

// Skills bars animate in
function animateBars(){
  document.querySelectorAll('.bar > span').forEach(span=>{
    const w = span.style.width; span.style.width='0'; setTimeout(()=> span.style.width = w, 80);
  });
}
animateBars();

// Project filter
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.project');
chips.forEach(c=> c.addEventListener('click', ()=>{
  chips.forEach(x=>x.classList.remove('active')); c.classList.add('active');
  const f = c.dataset.filter;
  cards.forEach(card=>{
    if(f==='all') card.hidden=false; else card.hidden = !(card.dataset.tags.includes(f));
  });
}));

// Simple modals content
const modal = document.getElementById('modal');
const mTitle = document.getElementById('m-title');
const mBody = document.getElementById('m-body');
document.getElementById('m-close').onclick = ()=> modal.style.display='none';
modal.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });
const details = {
  intellilearn: {
    title: 'IntelliLearn — NLP Educational Assistant',
    body: 'Built a chat assistant for students: intents, FAQ retrieval, and basic content guidance. Frontend in HTML/CSS/JS with backend endpoints; experimented with TF‑IDF and basic classifiers.'
  },
  fnd: {
    title: 'Fake News Detection',
    body: 'Explored text cleaning, vectorization (TF‑IDF), and Logistic Regression/Naive Bayes. Achieved solid precision/recall; includes confusion matrices and ROC.'
  },
  churn: {
    title: 'Bank Customer Churn Prediction',
    body: 'Supervised learning with feature engineering, class imbalance handling, and model comparison (XGBoost/RandomForest). Feature importance + actionable insights.'
  },
  ghg: {
    title: 'GHG Emission Predictor',
    body: 'Regression models predicting emissions based on energy & industrial metrics. Visualized trends and performed error analysis (MAE/RMSE).'
  },
  plant: {
    title: 'Plant Disease Detection (CNN)',
    body: 'CNN model classifying leaf diseases; includes data augmentation and Grad‑CAM style saliency for explainability.'
  }
};
document.querySelectorAll('a.more').forEach(a=> a.addEventListener('click', (e)=>{
  e.preventDefault(); const key = a.dataset.modal; const d = details[key];
  if(!d) return; mTitle.textContent = d.title; mBody.textContent = d.body; modal.style.display='grid';
}));

// Certificates carousel buttons
const track = document.getElementById('certTrack');
document.getElementById('prevCert').onclick = ()=> track.scrollBy({left:-340, behavior:'smooth'});
document.getElementById('nextCert').onclick = ()=> track.scrollBy({left: 340, behavior:'smooth'});

// Chatbot (typing + avatar)
const toggle = document.getElementById('chatbot-toggle');
const bot = document.getElementById('chatbot');
const closeBtn = document.getElementById('bot-close');
const msgs = document.getElementById('bot-msgs');
const input = document.getElementById('bot-text');
const send = document.getElementById('bot-send');

const replies = {
  hello: "Hi there! I'm Pragya's AI Assistant. Ask me about her skills, projects or education.",
  whois: "Pragya Pandey is a B.Tech student specializing in AI & Data Science, with ML, full‑stack and cybersecurity exposure.",
  skills: "C, C++, Python, HTML, CSS, JavaScript, NumPy, Pandas, Scikit‑learn, IBM Watson Studio.",
  projects: "House Price Prediction, Plant Disease Detection, Multi‑Disease Prediction, Fake News Detection, IntelliLearn, Churn Prediction, GHG Emission Predictor.",
  education: "UEM Kolkata (2022–2026), B.Tech CST.",
  contact: "Email: pragyapandey801@gmail.com | LinkedIn & GitHub links on top.",
};

function clean(s){ return s.toLowerCase().replace(/[^\w\s]/g,' ').replace(/\s+/g,' ').trim(); }
function addMsg(text, who){
  const d=document.createElement('div'); d.className = 'msg ' + who;
  const av=document.createElement('div'); av.className='avatar'; if(who==='user') av.style.background='hsl(335 70% 60%)';
  const span=document.createElement('div'); span.textContent = text; d.append(av, span); msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
}
function addTyping(){
  const d=document.createElement('div'); d.className='msg bot'; d.id='typing';
  const av=document.createElement('div'); av.className='avatar';
  const t=document.createElement('div'); t.className='typing'; t.innerHTML='<span></span><span></span><span></span>';
  d.append(av, t); msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
}
function removeTyping(){ const t=document.getElementById('typing'); if(t) t.remove(); }

function respond(q){
  const t = clean(q);
  let out = [];
  if(/\b(hi|hello|hey)\b/.test(t)) out.push(replies.hello);
  if(/\b(who|pragya)\b/.test(t)) out.push(replies.whois);
  if(/\b(skill|tech|tool|language)\b/.test(t)) out.push(replies.skills);
  if(/\b(project|build|made|develop)\b/.test(t)) out.push(replies.projects);
  if(/\b(education|study|college|university)\b/.test(t)) out.push(replies.education);
  if(/\b(contact|email|reach|connect|social)\b/.test(t)) out.push(replies.contact);
  return out.join('\n\n') || "I'm still learning! Try asking about skills, projects, education or contact.";
}

function handle(){
  const q = input.value.trim(); if(!q) return; addMsg(q,'user'); input.value=''; addTyping();
  setTimeout(()=>{ removeTyping(); addMsg(respond(q),'bot'); }, 500);
}
toggle.addEventListener('click', ()=>{ bot.classList.toggle('active'); if(bot.classList.contains('active') && !msgs.children.length){ addMsg("Hi! You can ask me about Pragya’s skills, projects, education, or contact.", 'bot'); }});
closeBtn.addEventListener('click', ()=> bot.classList.remove('active'));
send.addEventListener('click', handle);
input.addEventListener('keydown', e=>{ if(e.key==='Enter') handle(); });