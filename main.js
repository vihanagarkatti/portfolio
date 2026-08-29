/* ================================================================
   VIHA NAGARKATTI PORTFOLIO: SHARED JS
   Upgraded recruiter chatbot · nav · fade-up
================================================================ */

/* ── NAV ACTIVE STATE ── */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
});

/* ── FADE-UP OBSERVER ── */
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => obs.observe(el));
}

/* ================================================================
   CHATBOT: recruiter-optimised Q&A
   Each entry has: text, optional link {label, url}, optional chips
================================================================ */
const OWNER = "Viha";

const botFlows = {

  /* ── GREETING ── */
  _greeting: {
    text: `Hey! 👋 I'm Viha, well, this is my store assistant, but I'm answering as myself. Recruiters usually ask me about my projects, skills, or how to reach me. What can I help with?`,
    chips: ["See her projects", "Work experience", "What tools does she use?", "How to contact her", "Is she available?"]
  },

  /* ── KEYWORD MAP ──
     Keys are matched with .includes() so keep them short & specific.
     Order matters: first match wins. Put specifics before generals.  */
  keywords: {

    /* AVAILABILITY / HIRING */
    "available": {
      text: "Yes! I'm actively looking for Product Design / UX internships for Summer 2027, ideally in the US. I'm open to full-time roles after graduation too.",
      link: { label: "Email her directly →", url: "mailto:vihanagarkatti@gmail.com" },
      chips: ["See her projects", "What tools does she use?"]
    },
    "hire": {
      text: "Great taste. I'm open to opportunities! Reach me at vihanagarkatti@gmail.com or on LinkedIn. I read everything.",
      link: { label: "LinkedIn →", url: "https://www.linkedin.com/in/viha-nagarkatti-382a371a8" },
      chips: ["See her projects", "What's her experience?"]
    },
    "intern": {
      text: "I'm actively seeking Product Design and UX internships for Summer 2027 in the US. I have 5 prior internships/consulting roles across health tech, ed-tech, government UX, and social impact.",
      link: { label: "See her work →", url: "projects.html" },
      chips: ["Contact her", "Her experience so far"]
    },
    "contact": {
      text: "Best ways to reach me: Email → vihanagarkatti@gmail.com · LinkedIn → linkedin.com/in/viha-nagarkatti-382a371a8. I respond quickly.",
      chips: ["See her projects", "Is she available?"]
    },

    /* PROJECTS: specific */
    "aashray": {
      text: "Aashray is an app for domestic violence victims and survivors. I dug deep to find WHY victims in India stayed in such situations. My solution: shelter maps, legal aid, financial assistance, and a discreet SOS, all in one app. The key insight: 86% of survivors stay for financial reasons.",
      link: { label: "Read the full case study →", url: "aashray.html" },
      chips: ["Tell me about Ara", "Tell me about Techie", "What was her process?"]
    },
    "ara": {
      text: "Ara is a solo travel safety app I designed for the 59% of solo travellers who are women. It's the only app offering both offline SOS and real-time safety alerts and family check-ins, a gap I identified through a competitive audit of 12 apps.",
      link: { label: "Read the full case study →", url: "ara.html" },
      chips: ["Tell me about Aashray", "Tell me about Techie", "Published research?"]
    },
    "techie": {
      text: "Techie is a QR-triggered conversational assistant for electronics retail that I designed. No app download needed, just scan the shelf QR! It translates specs into plain-language decisions. My research behind it was published in Springer and presented at Cambridge University. It addresses the 68% of shoppers who leave without buying due to information overload.",
      link: { label: "Read the full case study →", url: "techie.html" },
      chips: ["Tell me about Aashray", "Tell me about Ara", "Her published research"]
    },
    "azorte": {
      text: "Azorte is a service design + UX study I did of a Bengaluru neo-fashion retail store. 3 weeks of in-store observation, customer journey mapping, and service blueprint redesign. Key finding: the tech (smart mirrors, digital screens) was deployed to impress, not assist. I redesigned 4 touchpoints with behavioural nudges.",
      link: { label: "Read the case study →", url: "azorte.html" },
      chips: ["See all projects", "What tools does she use?"]
    },
    "samvit": {
      text: "Samvit Sudha is an NPO website redesign: I reduced nav from 8 links to 3, put the mission statement above the fold, added impact numbers (1.2k students, 14 villages), and cut the donation path from 4 clicks to 1. Clean, accessible, purpose-first.",
      link: { label: "Read the case study →", url: "samvitsudha.html" },
      chips: ["See all projects", "Her design philosophy"]
    },

    /* PROJECTS: general */
    "project": {
      text: "I have 5 projects: Aashray (domestic violence safety app), Ara (solo travel, research-backed), Techie (retail chatbot, Springer-published + Cambridge-presented), Azorte (service design study), and Samvit Sudha (NPO redesign). Each one is research-first.",
      link: { label: "Browse all projects →", url: "projects.html" },
      chips: ["Tell me about Aashray", "Tell me about Ara", "Tell me about Techie"]
    },
    "social impact": {
      text: "Two of my five projects are directly social-impact focused: Samvit Sudha, a non-profit whose homepage I redesigned, Aashray (domestic violence survivors), and Ara (solo women's travel safety). Both came from rigorous research; I design for the problem, not the brief.",
      link: { label: "See Aashray →", url: "aashray.html" },
      chips: ["Tell me about Ara", "Her research approach"]
    },
    "research": {
      text: "Research is my foundation. I've published in Springer and presented at Cambridge (Techie), wrote an unpublished research paper behind Ara, conducted in-store observational studies (Azorte, Techie), and run user interviews before any wireframe opens. I treat evidence as a design material.",
      link: { label: "See published work (Techie) →", url: "techie.html" },
      chips: ["Tell me about Ara", "See all projects"]
    },
    "publish": {
      text: "I have one Springer-published research paper, on conversational UX in physical retail (Techie project), also presented at Cambridge University. My Ara research paper, on solo travel safety gaps, was written but never published anywhere.",
      link: { label: "See Techie case study →", url: "techie.html" },
      chips: ["See Ara case study", "Contact her"]
    },
    "cambridge": {
      text: "I presented my research on conversational retail UX (the Techie project) at a Cambridge University conference. Feedback from researchers there directly shaped the final product design, particularly around ambient awareness vs. active alerts.",
      link: { label: "Read Techie case study →", url: "techie.html" },
      chips: ["Her published research", "Contact her"]
    },
    "springer": {
      text: "Techie has Springer-published research behind it: a paper I wrote on conversational UX in electronics retail, published 2024. Ara also has a research paper behind it (on solo travel safety gaps), though I never got it published anywhere.",
      link: { label: "See Techie →", url: "techie.html" },
      chips: ["See Ara", "Contact her"]
    },

    /* WORK EXPERIENCE */
    "wayground": {
      text: "I consulted as an Instructional Designer at Wayground (formerly Quizizz) from Aug–Dec 2025, applying UX research and design thinking to learning experience design. With kids as the primary target audience, I studied attention spans, reading levels, and motivation patterns specific to K-12 learners, then translated that into instructional frameworks and UX decisions the product and content teams could act on.",
      link: { label: "Read full breakdown →", url: "exp-wayground.html" },
      chips: ["Her other roles", "See her projects"]
    },
    "quizizz": {
      text: "Wayground (formerly Quizizz) is where I served as an Instructional Designer Consultant (Aug–Dec 2025). I brought a UX lens to educational content design for a largely K-12 audience, researching how kids specifically engage with learning content, not just adapting adult UX patterns, while surfacing learner friction points and collaborating with product and content teams.",
      link: { label: "Read full breakdown →", url: "exp-wayground.html" },
      chips: ["Her other roles", "See her projects"]
    },
    "pharmeasy": {
      text: "At PharmEasy (Jan–Jun 2025), I led research for a conversational UX feature for users aged 50+, surfacing a caregiver use case that expanded the product roadmap. I also mapped 10+ user journeys, designed Android + web screens, contributed to the design system, and wrote internal launch SOPs.",
      link: { label: "Read full breakdown →", url: "exp-pharmeasy.html" },
      chips: ["Her other internships", "What tools does she use?"]
    },
    "iisc": {
      text: "At IISc Bangalore (Oct 2024–May 2025), I designed a 120+ page Silver Jubilee coffee table book for the Department of Design and Manufacturing: research, editorial layout design across 5 chapters, and full print-ready production under Dr. Vishal Singh.",
      link: { label: "Read full breakdown →", url: "exp-iisc.html" },
      chips: ["Her other internships", "See her projects"]
    },
    "digital india": {
      text: "At Digital India Corporation (May–Jul 2022), I worked on Poshan Tracker, a national nutrition-tracking app for frontline Anganwadi health workers. I designed accessibility-first interfaces for low-connectivity, mixed-literacy field users, across both Android and web admin platforms.",
      link: { label: "Read full breakdown →", url: "exp-digitalindia.html" },
      chips: ["Her other internships", "See her projects"]
    },
    "nuava": {
      text: "At Nuava (Jun–Jul 2024), I was the sole designer on a 0→1 web app for school sports coaches, replacing spreadsheet chaos with fixture scheduling, tournament brackets, and student performance dashboards. I benchmarked PlayHQ and SportEasy, and worked directly with engineers.",
      link: { label: "Read full breakdown →", url: "exp-nuava.html" },
      chips: ["Her other internships", "See her projects"]
    },
    "university of maryland": {
      text: "I'm currently pursuing my Master of Science in Human Computer Interaction at the University of Maryland, College Park. Graduating in 2028. UMD's HCI programme is one of the top in the US, strengthening my research foundations alongside my interdisciplinary design practice.",
      chips: ["About Viha", "Contact her"]
    },
    "umd": {
      text: "I'm currently at the University of Maryland (UMD) pursuing my MS in HCI, graduating 2028. Being in the US makes me well-positioned for Summer 2027 internships at companies like Google, Meta, Figma, and Airbnb.",
      chips: ["Is she available?", "Contact her"]
    },
    "master": {
      text: "I'm doing my Master's in Human Computer Interaction at the University of Maryland, graduating 2028. I did my undergrad in Interaction Design at Srishti Manipal Institute in Bengaluru.",
      chips: ["See her projects", "Contact her"]
    },
    "experience": {
      text: "I have 5 roles: Wayground/Quizizz (instructional design), PharmEasy (product design), IISc Bangalore (editorial design), Nuava (sole UX designer, 0→1), and Digital India Corporation (GovTech UX). Plus I run tripplecrochet. Now doing my MS HCI at UMD.",
      link: { label: "See full experience →", url: "work.html" },
      chips: ["Tell me about PharmEasy", "See her projects"]
    },
    "work": {
      text: "I've worked across 5 organisations: Wayground (ed-tech), PharmEasy (health tech), IISc (academic publishing), Nuava (sports tech), and Digital India Corporation (government). I'm now an HCI Master's student at the University of Maryland.",
      link: { label: "Full work history →", url: "work.html" },
      chips: ["Tell me about PharmEasy", "See her projects"]
    },

    /* 50 RECRUITER QUESTIONS
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       TO ADD MORE Q&A: find this section, copy one block below,
       change the key (what the user types) and the text (the reply).
       Save main.js → git add . → git commit -m "update chatbot" → git push
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

    "who is": {
      text: "I'm Viha Nagarkatti, a product designer and HCI Master's student at the University of Maryland. Research-first, published in Springer, presented at Cambridge. I've worked across health tech, government UX, ed-tech, and social impact. Seeking Summer 2027 internships in the US.",
      link: { label: "See her full story →", url: "about.html" },
      chips: ["See her projects", "Her experience", "Contact her"]
    },
    "type of designer": {
      text: "I'm a product + UX designer who leans research-heavy. Equally comfortable running user interviews, mapping service blueprints, and then executing in Figma. I'm not a pure UI designer; I care deeply about the 'why' behind the screen.",
      chips: ["See her projects", "Her design process"]
    },
    "industries": {
      text: "I've worked across: health tech (PharmEasy), ed-tech (Wayground/Quizizz), government + public health (Digital India Corp / Poshan Tracker), academic publishing (IISc), sports tech (Nuava), and social impact (Aashray, Ara). Broad exposure, consistent research-first process.",
      link: { label: "Full experience →", url: "work.html" },
      chips: ["See her projects"]
    },
    "different": {
      text: "What makes me different: (1) Published Springer research + Cambridge presentation, rare for an intern-level designer. (2) I design for the hard users: 50+ users at PharmEasy, DV survivors for Aashray, rural frontline workers at Digital India Corp. (3) My portfolio IS a product: chatbot, design system, personality. You're in it right now.",
      chips: ["See her projects", "Contact her"]
    },
    "remember": {
      text: "The grocery store theme is intentional: I genuinely love browsing stores and wanted the portfolio to feel like an experience, not a gallery. The chatbot, hand-drawn aesthetic, and case study depth are deliberate signals: I'm a designer who sweats the details.",
      chips: ["See her projects", "Contact her"]
    },
    "passionate": {
      text: "Outside work, I shoot film photography, run a small crochet business (tripplecrochet), and browse grocery stores for fun. I see UX everywhere. This portfolio is proof I design beyond 9–5.",
      link: { label: "About her →", url: "about.html" },
      chips: ["See her projects"]
    },
    "work with": {
      text: "I've consistently worked cross-functionally: PMs, engineers, and stakeholders at PharmEasy, a 3-person design team at Digital India Corp, directly with engineers at Nuava. I'm collaborative, clear, and don't need to be told twice.",
      chips: ["Contact her", "See her experience"]
    },
    "personality": {
      text: "Warm, curious, and precise. I sketch before I wireframe. I document the messy process, not just the polished output. And I built a grocery-store themed portfolio with a chatbot, which tells you something.",
      link: { label: "See the about page →", url: "about.html" },
      chips: ["See her projects"]
    },
    "navigate": {
      text: "I built this portfolio for under-2-minute scanning. Homepage → Today's Specials (featured projects) → one click to a case study. Each case study has 'next' navigation. The chatbot handles quick questions without clicking at all.",
      chips: ["See projects", "Contact her"]
    },
    "problem": {
      text: "Every case study I write opens with the problem, not the solution. Aashray: zero apps combined shelter + legal + financial + SOS for DV survivors. Ara: no travel app offered offline SOS + real-time alerts together. Techie: 68% of electronics shoppers leave without buying. Problem always comes first.",
      chips: ["See Aashray", "See Ara", "See Techie"]
    },
    "role": {
      text: "I was the sole or lead designer on every project shown. At PharmEasy I led the 50+ research workstream. At IISc I owned full editorial design. At Nuava I was the only designer. I'm not padding team projects as individual work.",
      chips: ["See her experience", "See her projects"]
    },
    "constraint": {
      text: "Real constraints: designing for DV survivors who fear their abuser finding the app (Aashray). Designing for frontline workers with no WiFi (Digital India Corp). A 120-page print publication with dozens of faculty stakeholders (IISc). I design under real-world pressure.",
      chips: ["See Aashray", "See Digital India Corp"]
    },
    "success metric": {
      text: "I define success before designing. For Aashray: Quick Exit under 1 second, all tasks under 3 taps. For Ara: the research paper validated the market gap pre-design. For PharmEasy: caregiver use case expanded the product roadmap, a measurable business outcome.",
      chips: ["See her case studies", "Contact her"]
    },
    "meaningful research": {
      text: "Every project, without exception. Aashray: NGO interviews + secondary research on survivor behaviour. Ara: competitive audit of 12 travel apps. Techie: 3 weeks of in-store observation. Azorte: customer shadowing + exit interviews. PharmEasy: interviews with 50+ users. Research isn't a box I tick; it shapes every decision.",
      chips: ["See Ara", "See Techie (Cambridge)"]
    },
    "product designer or ui": {
      text: "I think like a product designer, not a pixel pusher. I ask 'why this problem?' before 'how does it look?' My PharmEasy SOP work, Azorte service blueprint, and Aashray caregiver discovery are all design thinking beyond the screen.",
      chips: ["See her projects", "Her design philosophy"]
    },
    "business goal": {
      text: "At PharmEasy, my research surfaced a caregiver use case that expanded the product roadmap, directly connecting design to a business growth opportunity. At Nuava, my competitive analysis shaped first-release scoping, a product strategy contribution.",
      chips: ["See PharmEasy work", "Contact her"]
    },
    "simplif": {
      text: "My strongest skill is making complex systems feel simple. Aashray distills a fragmented support ecosystem into a 2-tap interface. Techie translates spec sheets into conversational plain language. Samvit Sudha reduced an NGO website's nav from 8 links to 3.",
      chips: ["See Aashray", "See Techie"]
    },
    "systems thinking": {
      text: "Azorte is an explicit service design project (service blueprints, journey maps). PharmEasy involved design system contributions across 3 teams. Digital India Corp required cross-platform consistency across web + Android. Systems thinking isn't just a buzzword for me.",
      chips: ["See Azorte", "See PharmEasy work"]
    },
    "iterate": {
      text: "I document iteration in my case studies: what I designed, what testing revealed, what changed. At PharmEasy I ran A/B design tests. For Techie, Cambridge feedback was incorporated into the final product. I'm not precious about early decisions.",
      chips: ["See Ara case study", "See Aashray case study"]
    },
    "accessib": {
      text: "Accessibility is central to my work, not a bolt-on. At Digital India Corp I designed for users with varying literacy and no reliable connectivity. At PharmEasy I designed for 50+ users who needed larger touch targets, clearer contrast, and voice options. I design for the edges first.",
      chips: ["See Digital India Corp", "See PharmEasy work"]
    },
    "polish": {
      text: "My visual design is clean and considered. My Figma screens (Aashray, Ara, Techie, PharmEasy) are high-fidelity and production-realistic. This portfolio itself, with its consistent type scale, intentional colour system, and hand-drawn details, is a live demonstration of my visual sensibility.",
      chips: ["See her projects"]
    },
    "impact": {
      text: "Impact across projects: PharmEasy, caregiver use case added to roadmap. Aashray, Quick Exit under 1s in testing, all tasks under 3 taps. Ara, the research paper validated the market gap. Digital India Corp, contributed to a national-scale health platform. Not just screens.",
      chips: ["See Aashray", "See PharmEasy", "Contact her"]
    },
    "collaborate": {
      text: "I've worked cross-functionally in every role. PharmEasy: PMs, engineers, data analysts, stakeholders. Digital India Corp: Head of UX + 2-person team + government stakeholders. Nuava: direct engineering collaboration. IISc: dozens of faculty contributors. I'm not a lone-wolf designer.",
      chips: ["See her experience", "Contact her"]
    },
    "interview": {
      text: "If you're asking whether I'm worth interviewing: yes. Published research, 5 real internship/consulting roles, social impact work, and I'm doing my MS HCI at University of Maryland. I'd love to talk.",
      link: { label: "Email her now →", url: "mailto:vihanagarkatti@gmail.com" },
      chips: ["See her projects", "LinkedIn"]
    },

    /* SKILLS & TOOLS */
    "figma": {
      text: "Figma is my primary design tool: I use it for everything from wireframes to hi-fi prototypes to design system documentation. I also use Adobe Illustrator, Photoshop, After Effects, Framer, and write HTML/CSS.",
      chips: ["See her projects", "Her design process"]
    },
    "tool": {
      text: "My toolkit: Figma (primary), Framer, Adobe Illustrator, Photoshop, After Effects, HTML/CSS. For research: user interviews, usability testing, journey mapping, service blueprinting, competitive audits.",
      chips: ["See her projects", "Her research approach"]
    },
    "skill": {
      text: "My core skills: product design, UX research, conversational UI, service design, design systems, editorial/publication design, usability testing, and research writing (Springer-published). Strong cross-functional collaboration across PM, engineering, and data teams.",
      chips: ["See her projects", "Her work experience"]
    },
    "design system": {
      text: "I contributed to PharmEasy's design system, creating reusable components and updating documentation across 3 parallel product teams. I also built the entire visual system for the IISc Silver Jubilee book.",
      link: { label: "See PharmEasy work →", url: "exp-pharmeasy.html" },
      chips: ["See her projects", "What tools does she use?"]
    },
    "process": {
      text: "My process: research first, always. Competitive audits, user interviews, or in-store observation depending on the project. Then synthesis into insights and a sharp problem statement. Then lo-fi ideation, often by hand, before anything opens in Figma. I use AI during ideation to stress-test directions and surface edge cases, but treat AI output as raw material, not finished thinking. Usability testing closes the loop before final delivery.",
      chips: ["See Aashray (most research-heavy)", "See Azorte (service design)", "Contact her"]
    },

    /* AI & DESIGN PROCESS */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       TO EDIT CHATBOT ANSWERS: find this section in main.js and update
       the "text" value for any keyword. To add a new keyword, copy one
       block and change the key and text. Save the file, then git push.
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    "ai": {
      text: "I use AI as an ideation partner, not a design shortcut. I use it early in the process: for rapid brainstorming, reframing problem statements, and stress-testing assumptions before committing to a direction. But I draw a firm line: AI generates starting points, not solutions. The actual design thinking, understanding users, identifying the right problem, making tradeoffs, is all human work. I believe that in an age where AI can produce screens instantly, the designer's value lies in knowing which problem is worth solving, and why.",
      link: { label: "See her design process →", url: "about.html" },
      chips: ["Her design philosophy", "See her projects", "Contact her"]
    },
    "design thinking": {
      text: "My design process is grounded in the double diamond. I don't jump to solutions. Every project starts with research (competitive audits, user interviews, observational fieldwork), then synthesis into sharp problem statements, then ideation, then prototyping and testing. I'm wary of the trend where senior designers skip research and go straight to hi-fi mockups. Speed is not the same as clarity.",
      link: { label: "See her projects →", url: "projects.html" },
      chips: ["Her research approach", "See Aashray", "See Ara"]
    },
    "senior designer": {
      text: "I've noticed a pattern: as designers become more senior, some start skipping the early messy stages: the research, the bad ideas, the wrong paths. AI makes this worse by making it too easy to jump straight to polished output. I deliberately start with messy hand-sketches and rough thinking to avoid anchoring too early. The best design decisions come from deeply understanding the problem first.",
      chips: ["Her design process", "See her projects"]
    },

    /* ABOUT */
    "about": {
      text: "I'm an interaction designer based in Bengaluru. I think in systems, build in Figma, and have a soft spot for hand-drawn things (as you can see). Published researcher, crochet business owner, photography enthusiast.",
      link: { label: "Full about page →", url: "about.html" },
      chips: ["Her design philosophy", "Contact her"]
    },
    "philosophy": {
      text: "My conviction: design without evidence is decoration. I believe the most important work happens before the canvas opens, in interviews, observations, and understanding why people do what they do, not what they say they do.",
      link: { label: "Read more →", url: "about.html" },
      chips: ["See her projects", "Contact her"]
    },
    "graduat": {
      text: "I'm graduating in 2026 from my Interaction Design degree in Bengaluru, India. I'm actively seeking Summer 2027 internships in the US to bridge into a full-time product design role.",
      chips: ["See her projects", "Contact her"]
    },

    /* TARGET COMPANIES */
    "google": {
      text: "Google is at the top of my list. My human-centred, research-first approach maps well to how Google's design teams work. Best projects to look at: Ara (complex safety systems) and Aashray (social impact).",
      link: { label: "See Ara →", url: "ara.html" },
      chips: ["See Aashray", "Contact her"]
    },
    "meta": {
      text: "Meta is on my target list. My work on multi-user social systems (Ara's meet-up verification, Aashray's caregiver flows) translates well to social product design at Meta's scale.",
      link: { label: "See Ara →", url: "ara.html" },
      chips: ["See Aashray", "Contact her"]
    },
    "figma company": {
      text: "Figma is my dream company: I live in the tool daily and have strong opinions about design tooling UX. My conversational UI work (Techie) and design systems experience (PharmEasy) are particularly relevant.",
      link: { label: "See Techie →", url: "techie.html" },
      chips: ["See PharmEasy work", "Contact her"]
    },
    "airbnb": {
      text: "Airbnb is on my list: the Ara project (solo travel safety, safety mapping, verified meet-ups) is directly relevant to the travel + trust + community product space Airbnb operates in.",
      link: { label: "See Ara →", url: "ara.html" },
      chips: ["Contact her"]
    },
    "duolingo": {
      text: "Duolingo is on my target list. My conversational UX experience (Techie) and my design philosophy around reducing friction and increasing accessibility are a strong match for Duolingo's product culture.",
      link: { label: "See Techie →", url: "techie.html" },
      chips: ["Contact her", "See all projects"]
    },
    "capital one": {
      text: "Capital One is on my list. My research work at PharmEasy (designing for 50+ users, complex multi-flow journeys) and my service design skills translate well to fintech UX challenges.",
      link: { label: "See PharmEasy work →", url: "exp-pharmeasy.html" },
      chips: ["Contact her"]
    },

    /* GENERIC NAVIGATION */
    "hello": { text: "Hey there! 👋 What can I help you find?", chips: ["See her projects", "Work experience", "How to contact her"] },
    "hi":    { text: "Hi! 👋 I can answer questions about my work, skills, or experience.", chips: ["Her projects", "Contact her"] },
    "see project": {
      text: "I have 5 projects on the shelf: Aashray, Ara, Techie, Azorte, and Samvit Sudha. Which would you like to know more about?",
      link: { label: "Browse all →", url: "projects.html" },
      chips: ["Aashray", "Ara", "Techie"]
    },
    "browsing": { text: "Take your time! Every item on the shelf links to a full case study. The Projects aisle is well-stocked 🫙", chips: ["Tell me about Aashray", "Tell me about Ara"] },
  },

  fallback: {
    text: "I'm not sure about that one, but I can help with my projects, experience, skills, or how to reach me. What are you most interested in?",
    chips: ["Her projects", "Work experience", "Contact her", "What tools does she use?"]
  }
};

/* ── CHAT WIRING ── */
(function initChat() {
  const toggle   = document.getElementById('chatToggle');
  const panel    = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const input    = document.getElementById('chatInput');
  const sendBtn  = document.getElementById('chatSend');
  const announce        = document.getElementById('chatAnnounce');
  const announceDismiss = document.getElementById('announceDismiss');
  const announceCta     = document.getElementById('announceCta');

  if (!toggle) return;

  let greeted = false;
  let announceTimer;
  setTimeout(() => {
    if (announce) { announce.classList.add('visible'); announceTimer = setTimeout(hideAnnounce, 8000); }
  }, 2000);

  function hideAnnounce() { if (announce) announce.classList.remove('visible'); clearTimeout(announceTimer); }
  announceDismiss && announceDismiss.addEventListener('click', hideAnnounce);
  announceCta     && announceCta.addEventListener('click', () => { hideAnnounce(); openChat(); });

  function openChat() {
    panel.classList.add('open');
    if (!greeted) { greeted = true; setTimeout(() => botReply(botFlows._greeting), 350); }
    setTimeout(() => input && input.focus(), 400);
  }
  function closeChat() { panel.classList.remove('open'); }

  toggle.addEventListener('click', () => { hideAnnounce(); panel.classList.contains('open') ? closeChat() : openChat(); });
  closeBtn && closeBtn.addEventListener('click', closeChat);

  function appendMsg(text, role) {
    const d = document.createElement('div');
    d.className = `msg ${role}`;
    d.textContent = text;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
    return d;
  }

  function appendLink(link, container) {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.label;
    a.className = 'msg-link';
    a.style.cssText = 'display:inline-block;margin-top:6px;font-size:.82rem;font-weight:700;color:var(--accent);text-decoration:none;border-bottom:1.5px solid var(--accent);';
    container.appendChild(a);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendChips(chips, container) {
    const wrap = document.createElement('div');
    wrap.className = 'chips';
    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = c;
      btn.addEventListener('click', () => handleInput(c));
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    return t;
  }

  function botReply(flow) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      const bubble = appendMsg(flow.text, 'bot');
      const wrap = bubble.parentNode;
      if (flow.link) appendLink(flow.link, wrap);
      if (flow.chips?.length) appendChips(flow.chips, wrap);
    }, 600 + Math.random() * 300);
  }

  function handleInput(text) {
    if (!text.trim()) return;
    appendMsg(text, 'user');
    if (input) input.value = '';
    const lower = text.toLowerCase();
    let matched = null;
    for (const [key, val] of Object.entries(botFlows.keywords)) {
      if (lower.includes(key)) { matched = val; break; }
    }
    botReply(matched || botFlows.fallback);
  }

  sendBtn && sendBtn.addEventListener('click', () => handleInput(input.value));
  input   && input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(input.value); });
})();
