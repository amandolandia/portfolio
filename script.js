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

document.querySelectorAll(".scroll-cue[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();

    const targetRect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const visibleSectionHeight = Math.min(targetRect.height, viewportHeight * 0.72);
    const centeredOffset = (viewportHeight - visibleSectionHeight) / 2;
    const targetTop = targetRect.top + window.scrollY - centeredOffset;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    history.pushState(null, "", link.getAttribute("href"));
  });
});

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

const getLanguageButtons = () => document.querySelectorAll(".language-switcher button");
const getStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};
const languageStorage = getStorage();
const savedLanguage = languageStorage?.getItem("site-language");
const browserLanguage = navigator.languages?.[0] || navigator.language || "pt-BR";
const pageLang = document.documentElement.lang?.toLowerCase() || "";
const pageDefaultLanguage = pageLang.startsWith("en") ? "en" : "pt";
const initialLanguage = pageDefaultLanguage === "en"
  ? "en"
  : (savedLanguage || (browserLanguage.toLowerCase().startsWith("pt") ? "pt" : "en"));

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
      projects: "projetos.html",
      publications: "publicacoes.html",
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
      projects: "projetos.html",
      publications: "publicacoes.html",
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
      projects: "projetos.html",
      publications: "publicacoes.html",
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
      projects: "projetos.html",
      publications: "publicacoes.html",
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
      projects: "projetos.html",
      publications: "publicacoes.html",
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
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
  },
  "secuida.html": {
    pt: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
      about: "curriculo.html",
      contact: "index.html#contact",
    },
    en: {
      home: "index.html#top",
      projects: "projetos.html",
      publications: "publicacoes.html",
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

  if (currentFile === "index.html") {
    const maiCard = document.querySelector('a.work-feature[href="mai.html"]');
    if (maiCard) maiCard.href = "mai.html";

    const martyCard = document.querySelector('a.work-feature[href="marty.html"]');
    if (martyCard) martyCard.href = "marty.html";

    const moreProjects = document.querySelector('.more-projects a.pill-button[href="projetos.html"]');
    if (moreProjects) moreProjects.href = "projetos.html";

    const allPublications = document.querySelector('.more-projects a.pill-button[href="publicacoes.html"]');
    if (allPublications) allPublications.href = "publicacoes.html";
  }

  if (currentFile === "projetos.html") {
    const maiCard = document.querySelector('a.work-feature[href="mai.html"]');
    if (maiCard) maiCard.href = "mai.html";

    const martyCard = document.querySelector('a.work-feature[href="marty.html"]');
    if (martyCard) martyCard.href = "marty.html";
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
    menuOpenLabel: "Abrir menu",
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
    projectsPageTitle: "Projetos | Amanda Gomes",
    projectsPageDescription:
      "Projetos de Amanda Gomes em design de produto, interfaces conversacionais e experiência do usuário.",
    projectsPageEyebrow: "projetos",
    projectsPageHeading: "Projetos em destaque.",
    projectsPageIntro:
      "Cases de design conversacional com foco em clareza, conteúdo e experiência do usuário.",
    projectsPageGridLabel: "Todos os projetos",
    publicationsPageTitle: "Publicacoes | Amanda Gomes",
    publicationsPageDescription:
      "Publicacoes de Amanda Gomes sobre design da informacao, pesquisa e tecnologia.",
    publicationsPageHeading: "Pesquisa, design e tecnologia.",
    publicationsPageIntro:
      "Produções acadêmicas e textos que conectam design da informação, tecnologia e contexto social.",
    publicationsListLabel: "Lista de publicações",
    secuidaPageTitle: "SeCuida | Amanda Gomes",
    secuidaPageDescription: "Case do projeto SeCuida, um gerenciador de saúde.",
    secuidaCaseNavLabel: "Navegacao do case",
    secuidaBackLink: "voltar ao portfolio",
    secuidaCaseLabel: "Gerenciador de saúde",
    secuidaCaseTitle: "<span>SeCuida</span><br />Seu cuidado em um só lugar",
    secuidaCaseSubtitle:
      "Um aplicativo pensado para ajudar pessoas a organizar informações de saúde, acompanhar rotinas de cuidado e manter dados importantes sempre acessíveis.",
    secuidaCaseTagThree: "Saúde",
    secuidaCaseTagFour: "Organização pessoal",
    secuidaOverviewLabel: "Visão geral",
    secuidaOverviewTitle: "Saúde cotidiana também precisa de design.",
    secuidaOverviewDescription:
      "SeCuida parte de uma necessidade simples: reunir, lembrar e consultar informações de saúde sem depender de papéis soltos, memória ou conversas espalhadas.",
    secuidaProblemTitle: "O problema",
    secuidaProblemText:
      "Consultas, medicamentos, exames e sintomas costumam ficar distribuídos em lugares diferentes, dificultando acompanhamento e tomada de decisão.",
    secuidaProposalTitle: "A proposta",
    secuidaProposalText:
      "Criar um gerenciador de saúde pessoal com informações organizadas, lembretes e registros que ajudem no cuidado contínuo.",
    secuidaDesignFocusTitle: "O foco de design",
    secuidaDesignFocusText:
      "Tornar uma categoria sensível mais clara, acolhedora e fácil de usar, evitando linguagem técnica ou sensação de sobrecarga.",
    secuidaExperienceLabel: "Experiência",
    secuidaExperienceTitle: "Organizar sem assustar.",
    secuidaExperienceDescription:
      "A interface precisava equilibrar utilidade e cuidado emocional: saúde envolve urgência, ansiedade e responsabilidade, então cada decisão visual deveria reduzir esforço.",
    secuidaMockupLabel: "Mockup conceitual do aplicativo SeCuida",
    secuidaMockupToday: "Hoje",
    secuidaMockupNextCare: "Próximo cuidado",
    secuidaMockupMedication: "Medicamento às 18h",
    secuidaMockupAppointment: "Consulta",
    secuidaMockupDermatologist: "Dermatologista · quinta-feira",
    secuidaMockupRecords: "Registros",
    secuidaMockupRecordsText: "Sintomas, exames e histórico",
    secuidaDashboardTitle: "Dashboard de cuidado",
    secuidaDashboardText:
      "Uma visão inicial com o que exige atenção agora: lembretes, próximas consultas e registros recentes.",
    secuidaHistoryTitle: "Histórico organizado",
    secuidaHistoryText:
      "Informações de saúde agrupadas por tipo para facilitar consulta em atendimentos ou acompanhamento pessoal.",
    secuidaRemindersTitle: "Lembretes úteis",
    secuidaRemindersText:
      "Alertas pensados para apoiar a rotina sem transformar cuidado em cobrança constante.",
    secuidaJourneyLabel: "Jornada",
    secuidaJourneyTitle: "Da informação solta ao cuidado acompanhado.",
    secuidaJourneyOneTitle: "Cadastro inicial",
    secuidaJourneyOneText:
      "Coletar apenas o necessário para começar, evitando um onboarding longo em um tema que já pode ser sensível.",
    secuidaJourneyTwoTitle: "Registro de saúde",
    secuidaJourneyTwoText:
      "Permitir que a pessoa adicione medicamentos, consultas, sintomas e exames de forma simples e progressiva.",
    secuidaJourneyThreeTitle: "Acompanhamento",
    secuidaJourneyThreeText:
      "Trazer lembretes e informações importantes no momento certo, ajudando a manter consistência no cuidado.",
    secuidaPrinciplesLabel: "Princípios de design",
    secuidaPrinciplesTitle: "Decisões para uma experiência mais humana.",
    secuidaPrincipleOneTitle: "Clareza antes de completude",
    secuidaPrincipleOneText:
      "Em vez de mostrar tudo ao mesmo tempo, a interface prioriza o que a pessoa precisa ver ou fazer primeiro.",
    secuidaPrincipleTwoTitle: "Tom acolhedor",
    secuidaPrincipleTwoText:
      "A experiência evita linguagem alarmista e usa textos diretos, calmos e fáceis de entender.",
    secuidaPrincipleThreeTitle: "Controle do usuário",
    secuidaPrincipleThreeText:
      "Dados de saúde são pessoais. A pessoa precisa sentir que entende, edita e decide o que registrar.",
    secuidaPrincipleFourTitle: "Rotina sustentável",
    secuidaPrincipleFourText:
      "Lembretes e registros devem apoiar o cuidado sem criar fadiga de notificações ou excesso de tarefas.",
    secuidaLearningsLabel: "Aprendizados",
    secuidaLearningsTitle: "O que esse projeto exercita.",
    secuidaLearningOneTitle: "Saúde exige confiança",
    secuidaLearningOneText:
      "Uma interface de saúde precisa parecer confiável sem ficar fria. O equilíbrio está em clareza, consistência e cuidado no texto.",
    secuidaLearningTwoTitle: "Menos campos, mais continuidade",
    secuidaLearningTwoText:
      "O valor do produto não está em preencher tudo de uma vez, mas em permitir evolução gradual do histórico.",
    secuidaLearningThreeTitle: "Organização é parte da experiência",
    secuidaLearningThreeText:
      "A arquitetura da informação precisa responder rápido: o que tenho hoje, o que já aconteceu e o que vem depois.",
    secuidaLearningFourTitle: "Design também reduz ansiedade",
    secuidaLearningFourText:
      "Hierarquia visual, linguagem e ritmo de interação ajudam a tornar um assunto sensível mais manejável.",
    secuidaFooter: "SeCuida - Seu gerenciador de saúde",
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
    caseClientLabel: "Cliente",
    caseYearLabel: "Ano do projeto",
    caseGoalLabel: "Objetivo",
    caseContextLabel: "Contexto",
    caseContextTitle: "Contexto do projeto.",
    caseChallengeTitle: "Desafio",
    caseSolutionTitle: "Solução",
    caseDeliveryLabel: "Entrega",
    personaContextLabel: "Contexto",
    personaPainsLabel: "Dores",
    maiCaseLabel: "Design conversacional",
    maiCaseTitle: '<span>Mai</span>, do <br class="mobile-title-break" />AprendiZAP <br class="mobile-title-break" />Encceja',
    maiCaseSubtitle:
      "Democratizando o acesso à educação para parceiros iFood através de uma experiência conversacional simples, humana e acessível.",
    maiCaseTagOne: "UX Writing",
    maiCaseTagTwo: "Chatbot Design",
    maiCaseTagThree: "Educação",
    maiCaseTagFour: "Impacto Social",
    maiOverviewClient: "Plataforma de estudos voltada a ampliar o acesso à educação para parceiros do iFood.",
    maiOverviewYear: "Projeto concebido para o contexto de pré-lançamento do assistente conversacional.",
    maiOverviewGoalTitle: "Conduzir a inscrição",
    maiOverviewGoal: "Orientar o usuário com uma jornada simples, acolhedora e clara até a lista de espera.",
    maiContextVisualLabel: "Capturas da conversa da Mai no WhatsApp",
    maiContextImageOneAlt: "Captura da conversa da Mai no WhatsApp 1",
    maiContextImageTwoAlt: "Captura da conversa da Mai no WhatsApp 2",
    maiContextDescription:
      "Mai conecta entregadores e parceiros do iFood ao programa Meu Diploma do Ensino Médio, preparando-os para o Encceja por meio de uma jornada personalizada e acolhedora.",
    maiChallengeText:
      "Muitos profissionais parceiros não concluíram o ensino médio e enfrentam barreiras de tempo, acesso e informação para retomar os estudos.",
    maiSolutionText:
      "Um assistente conversacional que orienta a inscrição no programa, identifica perfis e adapta a jornada ao contexto de cada pessoa.",
    maiPersonasLabel: "Personas",
    maiPersonasTitle: "Personas.",
    maiPersonasDescription: "Três perfis orientaram as decisões de linguagem, fluxo e suporte ao longo da experiência.",
    maiPersonaMarcosMeta: "28 anos · Entregador parceiro iFood",
    maiPersonaMarcosContext: "Trabalha como entregador há 2 anos e não concluiu o ensino médio.",
    maiPersonaMarcosPainOne: "Falta de tempo para buscar informações.",
    maiPersonaMarcosPainTwo: "Desconhecimento de oportunidades gratuitas.",
    maiPersonaMarcosPainThree: "Sensação de que “não é mais hora” de estudar.",
    maiPersonaCarlaMeta: "35 anos · Dona de restaurante",
    maiPersonaCarlaContext: "Gerencia uma pequena lanchonete cadastrada no iFood e tem ensino médio incompleto.",
    maiPersonaCarlaPainOne: "Rotina intensa na gestão do negócio.",
    maiPersonaCarlaPainTwo: "Insegurança sobre o processo de matrícula.",
    maiPersonaCarlaPainThree: "Dúvidas sobre validade do certificado.",
    maiPersonaRafaelMeta: "32 anos · Usuário curioso",
    maiPersonaRafaelContext: "Chegou ao bot sem vínculo direto com o iFood, mas busca oportunidades de estudo.",
    maiPersonaRafaelPainOne: "Não sabe se tem direito aos benefícios.",
    maiPersonaRafaelPainTwo: "Precisa de orientação sobre como proceder.",
    maiPersonaRafaelPainThree: "Tem dúvidas sobre elegibilidade.",
    maiMethodLabel: "Metodologia",
    maiMethodTitle: "Etapas do projeto.",
    maiMethodDescription:
      "Um processo em três frentes para entender o contexto, organizar a experiência e escrever a conversa com clareza.",
    maiProcessResearchTitle: "Pesquisa",
    maiProcessResearchText: "Entendimento das barreiras, motivadores e contexto real de quem chegava ao fluxo.",
    maiProcessResearchItemOne: "Análise do público e do cenário de uso.",
    maiProcessResearchItemTwo: "Mapeamento de jornadas e necessidades.",
    maiProcessResearchItemThree: "Levantamento de requisitos e validações.",
    maiProcessStructureTitle: "Estrutura",
    maiProcessStructureText: "Organização dos fluxos, dos pontos de decisão e do caminho principal até a inscrição.",
    maiProcessStructureItemOne: "Definição das jornadas por perfil.",
    maiProcessStructureItemTwo: "Mapeamento de estados e transições.",
    maiProcessStructureItemThree: "Priorização de clareza em cada passo.",
    maiProcessConversationTitle: "Conversa",
    maiProcessConversationText: "Escrita de mensagens diretas, acolhedoras e consistentes com o tom do projeto.",
    maiProcessConversationItemOne: "Saudação, onboarding e confirmações.",
    maiProcessConversationItemTwo: "Mensagens de erro e recuperação.",
    maiProcessConversationItemThree: "Ajuste fino de tom e voz.",
    maiFlowsLabel: "Fluxogramas",
    maiFlowsTitle: "Jornadas principais.",
    maiFlowsDescription: "Três jornadas resumidas para mostrar como a conversa muda conforme o contexto de entrada.",
    maiFlowOneKicker: "Fluxo 01",
    maiFlowOneTitle: "Entregadores",
    maiFlowOneText: "Entrada principal para parceiros do iFood que querem concluir o ensino médio.",
    maiFlowOneMeta: "Onboarding · validação · inscrição",
    maiFlowTwoKicker: "Fluxo 02",
    maiFlowTwoTitle: "Restaurantes",
    maiFlowTwoText: "Jornada para parceiros de restaurantes, com confirmação de vínculo e CNPJ.",
    maiFlowTwoMeta: "Onboarding · vínculo · confirmação",
    maiFlowThreeKicker: "Fluxo 03",
    maiFlowThreeTitle: "Sem link de origem",
    maiFlowThreeText: "Fluxo alternativo para quem chega sem a origem já definida no sistema.",
    maiFlowThreeMeta: "Boas-vindas · checagem · direcionamento",
    maiFeaturesLabel: "Funcionalidades",
    maiFeaturesTitle: "Funcionalidades.",
    maiFeaturesDescription:
      "Recursos básicos da conversa para orientar a entrada, validar informações e concluir a inscrição.",
    maiFeatureOneTitle: "Entrada guiada",
    maiFeatureOneText: "Apresentação inicial do assistente e do próximo passo no fluxo.",
    maiFeatureTwoTitle: "Validação simples",
    maiFeatureTwoText: "Perguntas objetivas para confirmar dados e seguir com a jornada.",
    maiFeatureThreeTitle: "Confirmação final",
    maiFeatureThreeText: "Fechamento da inscrição com uma mensagem final e a próxima orientação.",
    maiDeliveryTitle: "Escopo da minha atuação.",
    maiDeliveryDescription:
      "O trabalho concentrou-se na estruturação da jornada inicial, na definição dos fluxos principais e na escrita das mensagens essenciais da experiência.",
    maiDeliveryOneTitle: "Estrutura do fluxo",
    maiDeliveryOneText: "Definição do caminho inicial, das etapas principais e das saídas possíveis.",
    maiDeliveryTwoTitle: "UX writing",
    maiDeliveryTwoText: "Redação das mensagens centrais para orientar, confirmar e concluir a inscrição.",
    maiDeliveryThreeTitle: "Entrega funcional",
    maiDeliveryThreeText: "Material preparado para seguir em evolução com o time do AprendiZAP.",
    maiEvolutionLabel: "Evolução",
    maiEvolutionTitle: "Evolução do projeto.",
    maiEvolutionDescription:
      "Depois da entrega inicial, a experiência continuou evoluindo com o próprio time do AprendiZAP, incorporando ajustes, aprendizado de uso real e novas necessidades do produto.",
    martyCaseLabel: "Design conversacional",
    martyCaseTitle: '<span>Marty</span>, da <br class="mobile-title-break" />Campus Party <br class="mobile-title-break" />Nordeste.',
    martyCaseSubtitle:
      "Um bot não oficial para ajudar campuseiros da Campus Party Nordeste 2024 a encontrar informações sobre programação, dúvidas gerais e contexto do evento.",
    martyCaseTagOne: "Design Conversacional",
    martyCaseTagTwo: "UX Writing",
    martyCaseTagThree: "Tom de Voz",
    martyCaseTagFour: "IA Generativa",
    martyOverviewClient: "Assistente virtual criado para apoiar participantes durante a Campus Party Nordeste 2024.",
    martyOverviewYear: "Projeto desenvolvido para a edição Nordeste da Campus Party.",
    martyOverviewGoalTitle: "Orientar no evento",
    martyOverviewGoal: "Responder dúvidas com rapidez, contexto e uma voz coerente com a comunidade do evento.",
    martyContextVisualLabel: "Capturas do Marty no WhatsApp",
    martyContextImageOneAlt: "Captura do Marty no WhatsApp 1",
    martyContextImageTwoAlt: "Captura do Marty no WhatsApp 2",
    martyContextDescription:
      "Marty foi desenvolvido como um chatbot para WhatsApp voltado a responder dúvidas sobre a Campus Party Nordeste 2024, com base em cronograma, FAQ e orientações sobre o evento.",
    martyChallengeText:
      "Oferecer informações úteis para quem estava no evento, sem depender de buscas longas no site ou em redes sociais.",
    martySolutionText:
      "Estruturar o bot com base no cronograma, na FAQ e em temas descobertos durante o uso, mantendo clareza no atendimento.",
    martyVoiceLabel: "Tom de voz",
    martyVoiceTitle: "Como Marty deveria soar.",
    martyVoiceDescription:
      'A voz foi definida a partir do material <a href="https://www.nngroup.com/articles/tone-of-voice-dimensions/" target="_blank" rel="noreferrer">The Four Dimensions of Tone of Voice</a>, da Nielsen Norman Group, e refinada para deixar o bot próximo, leve e útil em qualquer dúvida.',
    martyVoiceScaleLabel: "Escala de tom de voz",
    martyVoiceFormal: "Formal",
    martyVoiceCasual: "Casual",
    martyVoiceSerious: "Sério",
    martyVoiceFun: "Divertido",
    martyVoiceRespectful: "Respeitoso",
    martyVoiceIrreverent: "Irreverente",
    martyVoiceDirect: "Direto",
    martyVoiceEnthusiastic: "Entusiástico",
    martyVoiceCardOneTitle: "Próximo e fácil de entender",
    martyVoiceCardOneText:
      "Informal e acessível, criando proximidade com os usuários e evitando uma comunicação engessada.",
    martyVoiceCardTwoTitle: "Leve sem perder utilidade",
    martyVoiceCardTwoText:
      "Referências culturais e elementos de cultura pop ajudam a manter a conversa leve e envolvente.",
    martyVoiceCardThreeTitle: "Com humor na medida",
    martyVoiceCardThreeText:
      "O tom pode ser mais solto e bem-humorado quando fizer sentido, sem perder a confiança da resposta.",
    martyVoiceCardFourTitle: "Com energia de evento",
    martyVoiceCardFourText:
      "Respostas animadas e positivas, reforçando a empolgação do evento e mantendo a orientação clara.",
    martyTimelineLabel: "Design conversacional",
    martyTimelineTitle: "Nossa linha do tempo.",
    martyTimelineDescription:
      "O projeto evoluiu a partir do contexto do chatbot até a integração com os serviços necessários para o funcionamento no WhatsApp.",
    martyTimelineOneTitle: "O contexto do chatbot",
    martyTimelineOneText: "Definição da necessidade, do canal e do papel do Marty dentro da experiência do evento.",
    martyTimelineTwoTitle: "Definição de tom de voz",
    martyTimelineTwoText:
      "Construção da personalidade do bot com base em casualidade, diversão, irreverência e entusiasmo.",
    martyTimelineThreeTitle: "Configuração do número no WhatsApp Business",
    martyTimelineThreeText: "Organização do canal de entrada para que o bot pudesse operar dentro do fluxo esperado.",
    martyTimelineFourTitle: "Configuração da infra em cloud",
    martyTimelineFourText: "Preparação da base técnica para hospedar e sustentar a operação do assistente.",
    martyTimelineFiveTitle: "Integração da API da OpenAI e WhatsApp Cloud API",
    martyTimelineFiveText:
      "Conexão entre o modelo de IA e a interface do WhatsApp para viabilizar o fluxo final da conversa.",
    martyArtifactsLabel: "Artefatos de design",
    martyArtifactsTitle: "O que precisou ser desenhado.",
    martyArtifactsDescription:
      "Os artefatos abaixo mostram como o conteúdo foi sendo ampliado ao longo do uso, incorporando novas dúvidas, respostas e temas que não estavam previstos na primeira versão.",
    martyArtifactsVisualLabel: "Artefatos visuais do Marty",
    martyArtifactImageOneAlt: "Captura de uma versão intermediária do Marty com conteúdo expandido",
    martyArtifactImageTwoAlt: "Captura de uma versão do Marty com ajustes de conteúdo e respostas",
    martyArtifactOneKicker: "Conteúdo",
    martyArtifactOneTitle: "Expansão do conteúdo",
    martyArtifactOneText:
      "O conjunto de respostas foi ampliado com informações que passaram a aparecer com mais frequência durante o evento.",
    martyArtifactTwoKicker: "Uso real",
    martyArtifactTwoTitle: "Evolução por uso",
    martyArtifactTwoText:
      "As interações reais ajudaram a identificar lacunas, ajustar a priorização de temas e refinar o conteúdo disponível.",
    martyArtifactThreeKicker: "Base",
    martyArtifactThreeTitle: "Base de conhecimento",
    martyArtifactThreeText:
      "Estruturação das informações essenciais do evento, incluindo cronograma, FAQ e orientações práticas para o usuário.",
    martyLearningsLabel: "Aprendizados",
    martyLearningsTitle: "O que esse projeto reforçou.",
    martyLearningsDescription:
      "A principal aprendizagem foi que o conteúdo do bot não poderia ficar fechado na FAQ inicial. O uso real trouxe temas novos, ajustou prioridades e mostrou que tom, contexto e síntese precisam caminhar juntos.",
    martyLearningOneTitle: "Tom de voz também é interface",
    martyLearningOneText:
      "A forma como o bot responde interfere diretamente na confiança, na clareza e na continuidade da conversa.",
    martyLearningTwoTitle: "IA precisa de direção",
    martyLearningTwoText:
      "O resultado melhora quando há boas instruções, contexto, limites e exemplos de comportamento esperado.",
    martyLearningThreeTitle: "FAQ nunca nasce completa",
    martyLearningThreeText:
      "As perguntas reais revelam lacunas de conteúdo e indicam o que precisa entrar primeiro na base de respostas.",
    martyLearningFourTitle: "WhatsApp pede síntese",
    martyLearningFourText: "Respostas longas ou muito formais quebram o ritmo. O canal pede clareza e resposta rápida.",
    footerCopyright: "© 2026 by Amanda Gomes.",
  },
  en: {
    navLabel: "Main navigation",
    navHome: "home",
    navProjects: "projects",
    navAbout: "about",
    navPublications: "publications",
    navContact: "contact",
    menuOpenLabel: "Open menu",
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
    projectsPageTitle: "Projects | Amanda Gomes",
    projectsPageDescription:
      "Amanda Gomes' projects in product design, conversational interfaces, and user experience.",
    projectsPageEyebrow: "projects",
    projectsPageHeading: "Featured projects.",
    projectsPageIntro:
      "Conversational design case studies focused on clarity, content, and user experience.",
    projectsPageGridLabel: "All projects",
    publicationsPageTitle: "Publications | Amanda Gomes",
    publicationsPageDescription:
      "Amanda Gomes' publications on information design, research, and technology.",
    publicationsPageHeading: "Research, design, and technology.",
    publicationsPageIntro:
      "Academic work and writing that connect information design, technology, and social context.",
    publicationsListLabel: "Publications list",
    secuidaPageTitle: "SeCuida | Amanda Gomes",
    secuidaPageDescription: "Case study for SeCuida, a health manager app.",
    secuidaCaseNavLabel: "Case navigation",
    secuidaBackLink: "back to portfolio",
    secuidaCaseLabel: "Health manager",
    secuidaCaseTitle: "<span>SeCuida</span><br />Your care in one place",
    secuidaCaseSubtitle:
      "An app designed to help people organize health information, track care routines, and keep important data always accessible.",
    secuidaCaseTagThree: "Health",
    secuidaCaseTagFour: "Personal organization",
    secuidaOverviewLabel: "Overview",
    secuidaOverviewTitle: "Everyday health needs design too.",
    secuidaOverviewDescription:
      "SeCuida starts from a simple need: gathering, remembering, and checking health information without relying on loose papers, memory, or scattered conversations.",
    secuidaProblemTitle: "The problem",
    secuidaProblemText:
      "Appointments, medication, exams, and symptoms are often spread across different places, making follow-up and decision-making harder.",
    secuidaProposalTitle: "The proposal",
    secuidaProposalText:
      "Create a personal health manager with organized information, reminders, and records that support continuous care.",
    secuidaDesignFocusTitle: "The design focus",
    secuidaDesignFocusText:
      "Make a sensitive category clearer, more welcoming, and easier to use, avoiding technical language or a sense of overload.",
    secuidaExperienceLabel: "Experience",
    secuidaExperienceTitle: "Organize without overwhelming.",
    secuidaExperienceDescription:
      "The interface needed to balance usefulness and emotional care: health involves urgency, anxiety, and responsibility, so every visual decision should reduce effort.",
    secuidaMockupLabel: "Conceptual mockup of the SeCuida app",
    secuidaMockupToday: "Today",
    secuidaMockupNextCare: "Next care",
    secuidaMockupMedication: "Medication at 6 PM",
    secuidaMockupAppointment: "Appointment",
    secuidaMockupDermatologist: "Dermatologist · Thursday",
    secuidaMockupRecords: "Records",
    secuidaMockupRecordsText: "Symptoms, exams, and history",
    secuidaDashboardTitle: "Care dashboard",
    secuidaDashboardText:
      "An initial view of what needs attention now: reminders, upcoming appointments, and recent records.",
    secuidaHistoryTitle: "Organized history",
    secuidaHistoryText:
      "Health information grouped by type to make it easier to check during appointments or personal follow-up.",
    secuidaRemindersTitle: "Useful reminders",
    secuidaRemindersText:
      "Alerts designed to support routine without turning care into constant pressure.",
    secuidaJourneyLabel: "Journey",
    secuidaJourneyTitle: "From scattered information to guided care.",
    secuidaJourneyOneTitle: "Initial setup",
    secuidaJourneyOneText:
      "Collect only what is needed to begin, avoiding a long onboarding flow in a topic that can already feel sensitive.",
    secuidaJourneyTwoTitle: "Health record",
    secuidaJourneyTwoText:
      "Allow people to add medications, appointments, symptoms, and exams simply and progressively.",
    secuidaJourneyThreeTitle: "Follow-up",
    secuidaJourneyThreeText:
      "Bring reminders and important information at the right moment, helping maintain consistency in care.",
    secuidaPrinciplesLabel: "Design principles",
    secuidaPrinciplesTitle: "Decisions for a more human experience.",
    secuidaPrincipleOneTitle: "Clarity before completeness",
    secuidaPrincipleOneText:
      "Instead of showing everything at once, the interface prioritizes what the person needs to see or do first.",
    secuidaPrincipleTwoTitle: "Welcoming tone",
    secuidaPrincipleTwoText:
      "The experience avoids alarmist language and uses direct, calm, easy-to-understand text.",
    secuidaPrincipleThreeTitle: "User control",
    secuidaPrincipleThreeText:
      "Health data is personal. People need to feel they understand, edit, and decide what to record.",
    secuidaPrincipleFourTitle: "Sustainable routine",
    secuidaPrincipleFourText:
      "Reminders and records should support care without creating notification fatigue or too many tasks.",
    secuidaLearningsLabel: "Learnings",
    secuidaLearningsTitle: "What this project exercises.",
    secuidaLearningOneTitle: "Health requires trust",
    secuidaLearningOneText:
      "A health interface needs to feel reliable without becoming cold. The balance is in clarity, consistency, and careful writing.",
    secuidaLearningTwoTitle: "Fewer fields, more continuity",
    secuidaLearningTwoText:
      "The product's value is not in filling everything out at once, but in allowing the history to evolve gradually.",
    secuidaLearningThreeTitle: "Organization is part of the experience",
    secuidaLearningThreeText:
      "The information architecture needs to answer quickly: what do I have today, what already happened, and what comes next.",
    secuidaLearningFourTitle: "Design also reduces anxiety",
    secuidaLearningFourText:
      "Visual hierarchy, language, and interaction rhythm help make a sensitive subject more manageable.",
    secuidaFooter: "SeCuida - Your health manager",
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
    caseClientLabel: "Client",
    caseYearLabel: "Project year",
    caseGoalLabel: "Goal",
    caseContextLabel: "Context",
    caseContextTitle: "Project context.",
    caseChallengeTitle: "Challenge",
    caseSolutionTitle: "Solution",
    caseDeliveryLabel: "Delivery",
    personaContextLabel: "Context",
    personaPainsLabel: "Pain points",
    maiCaseLabel: "Conversational design",
    maiCaseTitle: '<span>Mai</span>, from <br class="mobile-title-break" />AprendiZAP <br class="mobile-title-break" />Encceja',
    maiCaseSubtitle:
      "Democratizing access to education for iFood partners through a simple, human, and accessible conversational experience.",
    maiCaseTagOne: "UX Writing",
    maiCaseTagTwo: "Chatbot Design",
    maiCaseTagThree: "Education",
    maiCaseTagFour: "Social Impact",
    maiOverviewClient: "A study platform focused on expanding access to education for iFood partners.",
    maiOverviewYear: "A project designed for the pre-launch context of the conversational assistant.",
    maiOverviewGoalTitle: "Guide registration",
    maiOverviewGoal: "Guide users through a simple, welcoming, and clear journey to the waiting list.",
    maiContextVisualLabel: "Screenshots of the Mai WhatsApp conversation",
    maiContextImageOneAlt: "Screenshot of the Mai WhatsApp conversation 1",
    maiContextImageTwoAlt: "Screenshot of the Mai WhatsApp conversation 2",
    maiContextDescription:
      "Mai connects iFood couriers and restaurant partners to the Meu Diploma do Ensino Médio program, preparing them for Encceja through a personalized and welcoming journey.",
    maiChallengeText:
      "Many partner professionals have not completed high school and face barriers of time, access, and information when returning to their studies.",
    maiSolutionText:
      "A conversational assistant that guides program registration, identifies profiles, and adapts the journey to each person's context.",
    maiPersonasLabel: "Personas",
    maiPersonasTitle: "Personas.",
    maiPersonasDescription: "Three profiles guided language, flow, and support decisions throughout the experience.",
    maiPersonaMarcosMeta: "28 years old · iFood partner courier",
    maiPersonaMarcosContext: "Has worked as a courier for 2 years and has not completed high school.",
    maiPersonaMarcosPainOne: "Little time to search for information.",
    maiPersonaMarcosPainTwo: "Unaware of free opportunities.",
    maiPersonaMarcosPainThree: "Feels that “it is too late” to study.",
    maiPersonaCarlaMeta: "35 years old · Restaurant owner",
    maiPersonaCarlaContext: "Manages a small snack bar registered on iFood and has not completed high school.",
    maiPersonaCarlaPainOne: "Intense routine managing the business.",
    maiPersonaCarlaPainTwo: "Uncertainty about the enrollment process.",
    maiPersonaCarlaPainThree: "Questions about the certificate's validity.",
    maiPersonaRafaelMeta: "32 years old · Curious user",
    maiPersonaRafaelContext: "Reached the bot without a direct connection to iFood, but is looking for study opportunities.",
    maiPersonaRafaelPainOne: "Does not know whether he is eligible for the benefits.",
    maiPersonaRafaelPainTwo: "Needs guidance on how to proceed.",
    maiPersonaRafaelPainThree: "Has questions about eligibility.",
    maiMethodLabel: "Methodology",
    maiMethodTitle: "Project stages.",
    maiMethodDescription:
      "A three-part process to understand the context, organize the experience, and write the conversation clearly.",
    maiProcessResearchTitle: "Research",
    maiProcessResearchText: "Understanding the barriers, motivations, and real context of people entering the flow.",
    maiProcessResearchItemOne: "Analysis of the audience and usage scenario.",
    maiProcessResearchItemTwo: "Mapping journeys and needs.",
    maiProcessResearchItemThree: "Gathering requirements and validations.",
    maiProcessStructureTitle: "Structure",
    maiProcessStructureText: "Organizing flows, decision points, and the main path to registration.",
    maiProcessStructureItemOne: "Defining journeys by profile.",
    maiProcessStructureItemTwo: "Mapping states and transitions.",
    maiProcessStructureItemThree: "Prioritizing clarity at every step.",
    maiProcessConversationTitle: "Conversation",
    maiProcessConversationText: "Writing direct, welcoming messages consistent with the project's tone.",
    maiProcessConversationItemOne: "Greeting, onboarding, and confirmations.",
    maiProcessConversationItemTwo: "Error and recovery messages.",
    maiProcessConversationItemThree: "Fine-tuning tone and voice.",
    maiFlowsLabel: "Flowcharts",
    maiFlowsTitle: "Main journeys.",
    maiFlowsDescription: "Three summarized journeys showing how the conversation changes according to the entry context.",
    maiFlowOneKicker: "Flow 01",
    maiFlowOneTitle: "Couriers",
    maiFlowOneText: "Main entry point for iFood partners who want to complete high school.",
    maiFlowOneMeta: "Onboarding · validation · registration",
    maiFlowTwoKicker: "Flow 02",
    maiFlowTwoTitle: "Restaurants",
    maiFlowTwoText: "Journey for restaurant partners, with relationship and CNPJ confirmation.",
    maiFlowTwoMeta: "Onboarding · relationship · confirmation",
    maiFlowThreeKicker: "Flow 03",
    maiFlowThreeTitle: "No source link",
    maiFlowThreeText: "Alternative flow for users who arrive without a source already defined in the system.",
    maiFlowThreeMeta: "Welcome · check · routing",
    maiFeaturesLabel: "Features",
    maiFeaturesTitle: "Features.",
    maiFeaturesDescription:
      "Basic conversation resources to guide entry, validate information, and complete registration.",
    maiFeatureOneTitle: "Guided entry",
    maiFeatureOneText: "Initial presentation of the assistant and the next step in the flow.",
    maiFeatureTwoTitle: "Simple validation",
    maiFeatureTwoText: "Objective questions to confirm data and continue the journey.",
    maiFeatureThreeTitle: "Final confirmation",
    maiFeatureThreeText: "Registration closure with a final message and the next guidance.",
    maiDeliveryTitle: "Scope of my work.",
    maiDeliveryDescription:
      "The work focused on structuring the initial journey, defining the main flows, and writing the experience's essential messages.",
    maiDeliveryOneTitle: "Flow structure",
    maiDeliveryOneText: "Definition of the initial path, main steps, and possible exits.",
    maiDeliveryTwoTitle: "UX writing",
    maiDeliveryTwoText: "Writing the core messages to guide, confirm, and complete registration.",
    maiDeliveryThreeTitle: "Functional delivery",
    maiDeliveryThreeText: "Material prepared to continue evolving with the AprendiZAP team.",
    maiEvolutionLabel: "Evolution",
    maiEvolutionTitle: "Project evolution.",
    maiEvolutionDescription:
      "After the initial delivery, the experience continued evolving with AprendiZAP's own team, incorporating adjustments, real-use learnings, and new product needs.",
    martyCaseLabel: "Conversational design",
    martyCaseTitle: '<span>Marty</span>, from <br class="mobile-title-break" />Campus Party <br class="mobile-title-break" />Nordeste.',
    martyCaseSubtitle:
      "An unofficial bot to help Campus Party Nordeste 2024 participants find information about the schedule, general questions, and event context.",
    martyCaseTagOne: "Conversational Design",
    martyCaseTagTwo: "UX Writing",
    martyCaseTagThree: "Tone of Voice",
    martyCaseTagFour: "Generative AI",
    martyOverviewClient: "A virtual assistant created to support participants during Campus Party Nordeste 2024.",
    martyOverviewYear: "Project developed for the Nordeste edition of Campus Party.",
    martyOverviewGoalTitle: "Guide during the event",
    martyOverviewGoal: "Answer questions quickly, with context and a voice aligned with the event community.",
    martyContextVisualLabel: "Screenshots of Marty on WhatsApp",
    martyContextImageOneAlt: "Screenshot of Marty on WhatsApp 1",
    martyContextImageTwoAlt: "Screenshot of Marty on WhatsApp 2",
    martyContextDescription:
      "Marty was developed as a WhatsApp chatbot designed to answer questions about Campus Party Nordeste 2024, based on the schedule, FAQ, and event guidance.",
    martyChallengeText:
      "Offer useful information to people at the event without requiring long searches on the website or social media.",
    martySolutionText:
      "Structure the bot around the schedule, FAQ, and topics discovered during use, keeping the support experience clear.",
    martyVoiceLabel: "Tone of voice",
    martyVoiceTitle: "How Marty should sound.",
    martyVoiceDescription:
      'The voice was defined using Nielsen Norman Group’s <a href="https://www.nngroup.com/articles/tone-of-voice-dimensions/" target="_blank" rel="noreferrer">The Four Dimensions of Tone of Voice</a> and refined to make the bot approachable, light, and useful for any question.',
    martyVoiceScaleLabel: "Tone of voice scale",
    martyVoiceFormal: "Formal",
    martyVoiceCasual: "Casual",
    martyVoiceSerious: "Serious",
    martyVoiceFun: "Fun",
    martyVoiceRespectful: "Respectful",
    martyVoiceIrreverent: "Irreverent",
    martyVoiceDirect: "Direct",
    martyVoiceEnthusiastic: "Enthusiastic",
    martyVoiceCardOneTitle: "Approachable and easy to understand",
    martyVoiceCardOneText: "Informal and accessible, creating proximity with users and avoiding stiff communication.",
    martyVoiceCardTwoTitle: "Light without losing usefulness",
    martyVoiceCardTwoText: "Cultural references and pop culture elements help keep the conversation light and engaging.",
    martyVoiceCardThreeTitle: "Humor in the right measure",
    martyVoiceCardThreeText:
      "The tone can be looser and more humorous when appropriate, without losing trust in the answer.",
    martyVoiceCardFourTitle: "With event energy",
    martyVoiceCardFourText:
      "Animated and positive answers that reinforce the excitement of the event while keeping guidance clear.",
    martyTimelineLabel: "Conversational design",
    martyTimelineTitle: "Our timeline.",
    martyTimelineDescription:
      "The project evolved from the chatbot context to integration with the services needed for it to work on WhatsApp.",
    martyTimelineOneTitle: "The chatbot context",
    martyTimelineOneText: "Defining the need, the channel, and Marty's role within the event experience.",
    martyTimelineTwoTitle: "Tone of voice definition",
    martyTimelineTwoText:
      "Building the bot's personality based on casualness, fun, irreverence, and enthusiasm.",
    martyTimelineThreeTitle: "WhatsApp Business number setup",
    martyTimelineThreeText: "Organizing the entry channel so the bot could operate within the expected flow.",
    martyTimelineFourTitle: "Cloud infrastructure setup",
    martyTimelineFourText: "Preparing the technical base to host and sustain the assistant's operation.",
    martyTimelineFiveTitle: "OpenAI API and WhatsApp Cloud API integration",
    martyTimelineFiveText:
      "Connecting the AI model and the WhatsApp interface to enable the final conversation flow.",
    martyArtifactsLabel: "Design artifacts",
    martyArtifactsTitle: "What had to be designed.",
    martyArtifactsDescription:
      "The artifacts below show how the content expanded throughout use, incorporating new questions, answers, and topics that were not planned in the first version.",
    martyArtifactsVisualLabel: "Marty visual artifacts",
    martyArtifactImageOneAlt: "Screenshot of an intermediate version of Marty with expanded content",
    martyArtifactImageTwoAlt: "Screenshot of a Marty version with content and response adjustments",
    martyArtifactOneKicker: "Content",
    martyArtifactOneTitle: "Content expansion",
    martyArtifactOneText:
      "The set of answers was expanded with information that started appearing more frequently during the event.",
    martyArtifactTwoKicker: "Real use",
    martyArtifactTwoTitle: "Evolution through use",
    martyArtifactTwoText:
      "Real interactions helped identify gaps, adjust topic prioritization, and refine the available content.",
    martyArtifactThreeKicker: "Base",
    martyArtifactThreeTitle: "Knowledge base",
    martyArtifactThreeText:
      "Structuring essential event information, including the schedule, FAQ, and practical guidance for users.",
    martyLearningsLabel: "Learnings",
    martyLearningsTitle: "What this project reinforced.",
    martyLearningsDescription:
      "The main learning was that the bot's content could not stay limited to the initial FAQ. Real use brought new topics, adjusted priorities, and showed that tone, context, and synthesis need to move together.",
    martyLearningOneTitle: "Tone of voice is also interface",
    martyLearningOneText:
      "The way the bot responds directly affects trust, clarity, and continuity in the conversation.",
    martyLearningTwoTitle: "AI needs direction",
    martyLearningTwoText:
      "The result improves when there are good instructions, context, limits, and examples of expected behavior.",
    martyLearningThreeTitle: "An FAQ is never complete at birth",
    martyLearningThreeText:
      "Real questions reveal content gaps and indicate what needs to enter the answer base first.",
    martyLearningFourTitle: "WhatsApp asks for synthesis",
    martyLearningFourText: "Long or overly formal answers break the rhythm. The channel asks for clarity and quick replies.",
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

  getLanguageButtons().forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateNavigationLinks(lang);
  updateProjectLinks(lang);

  if (shouldPersist) {
    languageStorage?.setItem("site-language", lang);
  }
};

setLanguage(initialLanguage);

const marquee = document.querySelector(".marquee");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest?.(".language-switcher button");
  if (!button) return;

  const lang = button.dataset.lang;
  if (!lang) return;
  setLanguage(lang, true);
});
