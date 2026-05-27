const revealEls = document.querySelectorAll(".reveal");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteHeader && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const syncHeaderState = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => observer.observe(el));

const languageButtons = document.querySelectorAll(".language-switcher button");
const savedLanguage = localStorage.getItem("site-language");
const browserLanguage = navigator.languages?.[0] || navigator.language || "pt-BR";
const pageLang = document.documentElement.lang?.toLowerCase() || "";
const pageDefaultLanguage = pageLang.startsWith("en") ? "en" : "pt";
const initialLanguage = pageDefaultLanguage === "en"
  ? "en"
  : (savedLanguage || (browserLanguage.toLowerCase().startsWith("pt") ? "pt" : "en"));

const languagePageMap = {
  "index.html": { pt: "index.html", en: "index.html" },
  "projetos.html": { pt: "projetos.html", en: "projetos-en.html" },
  "projetos-en.html": { pt: "projetos.html", en: "projetos-en.html" },
  "publicacoes.html": { pt: "publicacoes.html", en: "publicacoes-en.html" },
  "publicacoes-en.html": { pt: "publicacoes.html", en: "publicacoes-en.html" },
  "mai.html": { pt: "mai.html", en: "mai-en.html" },
  "mai-en.html": { pt: "mai.html", en: "mai-en.html" },
  "marty.html": { pt: "marty.html", en: "marty-en.html" },
  "marty-en.html": { pt: "marty.html", en: "marty-en.html" },
  "curriculo.html": { pt: "curriculo.html", en: "curriculo.html" },
};

const navigationLanguageMap = {
  "index.html": {
    pt: {
      home: "#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "#contact",
    },
    en: {
      home: "#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "#contact",
    },
  },
  "projetos.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "projetos-en.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "publicacoes.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "publicacoes-en.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "mai.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "mai-en.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "marty.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "marty-en.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "curriculo.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos-en.html",
      publications: "publicacoes-en.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
};

const updateNavigationLinks = (lang) => {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const navConfig = navigationLanguageMap[currentFile]?.[lang];
  if (!navConfig) return;

  const navLinks = document.querySelectorAll("#site-nav a");
  navLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (text === "home") link.href = navConfig.home;
    if (text === "projects" || text === "projetos") link.href = navConfig.projects;
    if (text === "publications" || text === "publicações") link.href = navConfig.publications;
    if (text === "about" || text === "sobre") link.href = navConfig.about;
    if (text === "contact" || text === "contato") link.href = navConfig.contact;
  });
};

const updateProjectLinks = (lang) => {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const isEnglish = lang === "en";

  if (currentFile === "index.html") {
    const maiCard = document.querySelector('a.work-feature[href="mai.html"], a.work-feature[href="mai-en.html"]');
    if (maiCard) maiCard.href = isEnglish ? "mai-en.html" : "mai.html";

    const martyCard = document.querySelector('a.work-feature[href="marty.html"], a.work-feature[href="marty-en.html"]');
    if (martyCard) martyCard.href = isEnglish ? "marty-en.html" : "marty.html";

    const moreProjects = document.querySelector('.more-projects a.pill-button[href="projetos.html"], .more-projects a.pill-button[href="projetos-en.html"]');
    if (moreProjects) moreProjects.href = isEnglish ? "projetos-en.html" : "projetos.html";

    const allPublications = document.querySelector('.more-projects a.pill-button[href="publicacoes.html"], .more-projects a.pill-button[href="publicacoes-en.html"]');
    if (allPublications) allPublications.href = isEnglish ? "publicacoes-en.html" : "publicacoes.html";
  }

  if (currentFile === "projetos.html" || currentFile === "projetos-en.html") {
    const maiCard = document.querySelector('a.work-feature[href="mai.html"], a.work-feature[href="mai-en.html"]');
    if (maiCard) maiCard.href = isEnglish ? "mai-en.html" : "mai.html";

    const martyCard = document.querySelector('a.work-feature[href="marty.html"], a.work-feature[href="marty-en.html"]');
    if (martyCard) martyCard.href = isEnglish ? "marty-en.html" : "marty.html";
  }
};

const translations = {
  pt: {
    navLabel: "Navegacao principal",
    navHome: "home",
    navProjects: "projetos",
    navAbout: "sobre",
    navPublications: "publicações",
    navContact: "contato",
    projectDropdownLabel: "Selecionar projeto",
    heroAvatarAlt: "Foto de Amanda Gomes sorrindo",
    heroTitle:
      'Olá, eu me chamo <strong>Amanda Gomes</strong> e sou <strong>designer de produtos digitais</strong>.',
    heroSummary:
      "Product Designer com experiência em produtos digitais para web, mobile e chatbots, em projetos de energia, financeiro e aeroespacial. Pesquisa acessibilidade digital em chatbots no mestrado.",
    heroScrollLabel: "Rolar para projetos",
    approachLabel: "Como eu transformo ideias em produtos",
    approachEyebrow: "como eu trabalho",
    approachTitle: "Como eu transformo ideias em produtos.",
    approachOneTitle: "Pesquisa",
    approachOneText:
      "Investigo necessidades, comportamentos e contexto para separar sintomas de problemas reais.",
    approachTwoTitle: "Estratégia",
    approachTwoText:
      "Conecto descobertas, objetivos de negócio e prioridades para definir caminhos viáveis de produto.",
    approachThreeTitle: "Interface",
    approachThreeText:
      "Desenho fluxos e telas que tornam decisões complexas mais simples, úteis e agradáveis.",
    workEyebrow: "uma pequena amostra",
    workTitle: "Projetos que merecem aparecer.",
    workText: "Projetos de produto, design conversacional e experiência do usuário.",
    workGridLabel: "Projetos selecionados",
    maiType: "Design conversacional",
    maiTitle: "Mai, do AprendiZAP Encceja",
    maiDescription:
      "Chatbot para WhatsApp criado para apoiar estudantes do Encceja com conteúdo de estudo e orientação prática.",
    projectCta: "Ver projeto",
    martyType: "Design conversacional",
    martyDescription:
      "Assistente conversacional não oficial da Campus Party Nordeste 2024, criado para responder dúvidas no WhatsApp.",
    pitacoType: "Product design",
    pitacoDescription:
      "Produto digital com foco em organização e tomada de decisão no dia a dia, com experiência simples e orientada a valor.",
    moreProjectsCta: "Ver mais projetos",
    skillProduct: "Design de Produto",
    skillResearch: "Pesquisa",
    publicationsEyebrow: "publicações",
    publicationsTitle: "Pesquisa, design e tecnologia em diálogo.",
    publicationMeta: "CIDI 2025 · Blucher Design Proceedings",
    publicationTitle:
      "Cartografias de resistência: mapeamento de iniciativas decoloniais digitais no Brasil por meio do Design da Informação",
    publicationDescription:
      "Artigo sobre iniciativas brasileiras que utilizam tecnologias digitais como forma de resistência às estruturas coloniais, com o Design da Informação como ferramenta de mapeamento.",
    publicationCta: "Ler publicação",
    allPublicationsCta: "Ver todas as publicações",
    aboutEyebrow: "por trás da tela",
    aboutTitle: "Um pouco sobre mim.",
    aboutTextOne:
      "Sou Product Designer no CESAR, criando produtos digitais para web, mobile e chatbots. Minha prática combina pesquisa, estratégia e prototipação para transformar contextos complexos em experiências mais claras.",
    aboutFactsLabel: "Resumo profissional",
    aboutImageAlt: "Foto de Amanda Gomes",
    aboutFactOneText: "Product Designer @ CESAR",
    aboutFactTwoText: "MSc student @ UFPE",
    aboutResumeCta: "Ver currículo completo",
    contactEyebrow: "contato",
    contactTitle: "Vamos trabalhar juntos?",
    emailCta: "Enviar email",
    socialLinksLabel: "Links profissionais",
    languageLabel: "Selecionar idioma",
    aboutPageEyebrow: "about me",
    aboutPageRole: "Product Designer no CESAR e mestranda na UFPE.",
    aboutPageSummary:
      "Atuo na criação de produtos digitais para web, mobile e chatbots, com foco em pesquisa com usuários, estratégia de produto e validação de soluções para contextos complexos.",
    aboutMetaOne: "Web",
    aboutMetaTwo: "Mobile",
    aboutMetaThree: "Chatbots",
    aboutMetaFour: "Pesquisa",
    aboutMetaFive: "Estratégia",
    aboutSummaryLabel: "resumo",
    aboutSummaryTitle: "Design de produto com pesquisa, estratégia e colaboração.",
    aboutSummaryBody:
      "Product Designer com experiência na criação de produtos digitais para web, mobile e chatbots. No CESAR, lidero pesquisas com usuários, estruturo roadmaps de design e conduzo validações em projetos multidisciplinares para clientes de grande porte dos setores de energia, financeiro e aeroespacial.",
    aboutSummaryFooter: "Product Designer no CESAR",
    aboutExperienceLabel: "experiência",
    aboutExperienceOneTitle: "CESAR",
    aboutExperienceOneBody:
      "Product Designer desde outubro de 2021, com atuação em projetos para clientes dos setores de energia, financeiro e aeroespacial. Responsável por pesquisas, roadmaps de design, prototipação, testes de usabilidade e validação de hipóteses.",
    aboutExperienceOneDate: "out 2021 - atual",
    aboutExperienceTwoTitle: "Take Blip",
    aboutExperienceTwoBody:
      "Atuei com chatbots, pesquisa, definição de tom de voz, UX writing, Lean Inception e testes de usabilidade para fluxos de atendimento.",
    aboutExperienceTwoDate: "abr 2021 - out 2021",
    aboutExperienceThreeTitle: "Bemind Design & Technology",
    aboutExperienceThreeBody:
      "Colaborei com pesquisa de design, processos co-criativos, wireframes, protótipos, testes de usabilidade e repasse técnico para desenvolvimento.",
    aboutExperienceThreeDate: "abr 2020 - abr 2021",
    aboutEducationLabel: "formação acadêmica",
    aboutEducationOneTitle: "Universidade Federal de Pernambuco",
    aboutEducationOneBody:
      "Mestrado em Design de Artefatos Digitais, com pesquisa em acessibilidade digital em chatbots.",
    aboutEducationOneDate: "ago 2024 - ago 2026",
    aboutEducationTwoTitle: "Estácio",
    aboutEducationTwoBody: "MBA em Project Management, com foco em gestão e organização de projetos.",
    aboutEducationTwoDate: "out 2023 - set 2024",
    aboutEducationThreeTitle: "Universidade Federal de Pernambuco",
    aboutEducationThreeBody: "Bacharelado em Design, com base em processo criativo, projeto e investigação.",
    aboutEducationThreeDate: "jan 2017 - mai 2023",
    footerCopyright: "© 2026 by Amanda Gomes.",
  },
  en: {
    navLabel: "Main navigation",
    navHome: "home",
    navProjects: "projects",
    navAbout: "about",
    navPublications: "publications",
    navContact: "contact",
    projectDropdownLabel: "Select project",
    heroAvatarAlt: "Portrait of Amanda Gomes smiling",
    heroTitle:
      'Hi, I’m <strong>Amanda Gomes</strong>, a <strong>digital product designer</strong>.',
    heroSummary:
      "Product Designer experienced in web, mobile, and chatbot products across energy, finance, and aerospace. Currently researching digital accessibility in chatbots in her master’s degree.",
    heroScrollLabel: "Scroll to projects",
    approachLabel: "How I turn ideas into products",
    approachEyebrow: "how I work",
    approachTitle: "How I turn ideas into products.",
    approachOneTitle: "Research",
    approachOneText:
      "I investigate needs, behaviors, and context to separate surface symptoms from real problems.",
    approachTwoTitle: "Strategy",
    approachTwoText:
      "I connect findings, business goals, and priorities to define viable product directions.",
    approachThreeTitle: "Interface",
    approachThreeText:
      "I design flows and screens that make complex decisions simpler, useful, and pleasant.",
    workEyebrow: "a small sample",
    workTitle: "Projects worth showing.",
    workText: "Product design, conversational design, and user experience projects.",
    workGridLabel: "Selected projects",
    maiType: "Conversational design",
    maiTitle: "Mai, from AprendiZAP Encceja",
    maiDescription:
      "A WhatsApp virtual assistant that supports students preparing for the Encceja exam.",
    projectCta: "View project",
    martyType: "Conversational design",
    martyDescription:
      "Unofficial conversational assistant for Campus Party Nordeste 2024, created to answer questions on WhatsApp.",
    pitacoType: "Product design",
    pitacoDescription:
      "Digital product focused on organization and everyday decision-making, with a simple, value-oriented experience.",
    moreProjectsCta: "See more projects",
    skillProduct: "Product Design",
    skillResearch: "Research",
    publicationsEyebrow: "publications",
    publicationsTitle: "Research, design, and technology in dialogue.",
    publicationMeta: "CIDI 2025 · Blucher Design Proceedings",
    publicationTitle:
      "Resistance Cartographies: mapping of digital decolonial initiatives in Brazil through Information Design",
    publicationDescription:
      "An article about Brazilian initiatives that use digital technologies as resistance to colonial structures, with Information Design as a mapping tool.",
    publicationCta: "Read publication",
    allPublicationsCta: "View all publications",
    aboutEyebrow: "behind the screen",
    aboutTitle: "A little about me.",
    aboutTextOne:
      "I’m a Product Designer at CESAR, creating web, mobile, and chatbot products. My practice combines research, strategy, and prototyping to turn complex contexts into clearer experiences.",
    aboutFactsLabel: "Professional summary",
    aboutImageAlt: "Portrait of Amanda Gomes",
    aboutFactOneText: "Product Designer @ CESAR",
    aboutFactTwoText: "MSc student @ UFPE",
    aboutResumeCta: "See full resume",
    contactEyebrow: "contact",
    contactTitle: "Shall we work together?",
    emailCta: "Send email",
    socialLinksLabel: "Professional links",
    languageLabel: "Select language",
    aboutPageEyebrow: "about me",
    aboutPageRole: "Product Designer at CESAR and MSc student at UFPE.",
    aboutPageSummary:
      "I create digital products for web, mobile, and chatbots, with a focus on user research, product strategy, and validating solutions for complex contexts.",
    aboutMetaOne: "Web",
    aboutMetaTwo: "Mobile",
    aboutMetaThree: "Chatbots",
    aboutMetaFour: "Research",
    aboutMetaFive: "Strategy",
    aboutSummaryLabel: "summary",
    aboutSummaryTitle: "Product design with research, strategy, and collaboration.",
    aboutSummaryBody:
      "Product Designer experienced in creating digital products for web, mobile, and chatbots. At CESAR, I lead user research, build design roadmaps, and run validation work across multidisciplinary projects for large clients in energy, finance, and aerospace.",
    aboutSummaryFooter: "Product Designer at CESAR",
    aboutExperienceLabel: "experience",
    aboutExperienceOneTitle: "CESAR",
    aboutExperienceOneBody:
      "Product Designer since October 2021, working on projects for clients in the energy, finance, and aerospace sectors. Responsible for user research, design roadmaps, prototyping, usability testing, and hypothesis validation.",
    aboutExperienceOneDate: "Oct 2021 - present",
    aboutExperienceTwoTitle: "Take Blip",
    aboutExperienceTwoBody:
      "I worked with chatbots, research, tone of voice, UX writing, Lean Inception, and usability testing for support flows.",
    aboutExperienceTwoDate: "Apr 2021 - Oct 2021",
    aboutExperienceThreeTitle: "Bemind Design & Technology",
    aboutExperienceThreeBody:
      "I collaborated on design research, co-creative processes, wireframes, prototypes, usability tests, and technical handoff for development.",
    aboutExperienceThreeDate: "Apr 2020 - Apr 2021",
    aboutEducationLabel: "education",
    aboutEducationOneTitle: "Federal University of Pernambuco",
    aboutEducationOneBody:
      "MSc in Digital Artifact Design, researching digital accessibility in chatbots.",
    aboutEducationOneDate: "Aug 2024 - Aug 2026",
    aboutEducationTwoTitle: "Estácio",
    aboutEducationTwoBody: "MBA in Project Management, with a focus on project management and organization.",
    aboutEducationTwoDate: "Oct 2023 - Sep 2024",
    aboutEducationThreeTitle: "Federal University of Pernambuco",
    aboutEducationThreeBody: "Bachelor’s degree in Design, grounded in creative process, project, and inquiry.",
    aboutEducationThreeDate: "Jan 2017 - May 2023",
    footerCopyright: "© 2026 by Amanda Gomes.",
  },
};

const setLanguage = (language, shouldPersist = false) => {
  const lang = translations[language] ? language : "pt";
  const dictionary = translations[lang];

  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (typeof value === "string") {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, key] = pair.split(":").map((value) => value.trim());
      if (attribute && key && dictionary[key]) {
        element.setAttribute(attribute, dictionary[key]);
      }
    });
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateNavigationLinks(lang);
  updateProjectLinks(lang);

  if (shouldPersist) {
    localStorage.setItem("site-language", lang);
  }
};

setLanguage(initialLanguage);

const marquee = document.querySelector(".marquee");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const targetPage = languagePageMap[currentFile]?.[lang];

    if (targetPage && targetPage !== currentFile) {
      localStorage.setItem("site-language", lang);
      window.location.href = targetPage;
      return;
    }

    setLanguage(lang, true);
  });
});
