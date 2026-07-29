export type Lang = "zh" | "en";
export type Localized = Record<Lang, string>;
export type Filter = "all" | "strategy" | "writing" | "activation" | "media" | "social";

export type PdfDocument = {
  id: string;
  title: Localized;
  type: Localized;
  src: string;
  filename: string;
  pages: number;
};

export type ProjectMetric = {
  value: string;
  label: Localized;
};

export type Project = {
  id: string;
  index: string;
  title: Localized;
  sector: Localized;
  summary: Localized;
  role: Localized;
  context: Localized;
  metrics: ProjectMetric[];
  actions: Record<Lang, string[]>;
  outcomes: Record<Lang, string[]>;
  boundary: Localized;
  filters: Exclude<Filter, "all">[];
  cover: string;
  documents: PdfDocument[];
};

export type WritingDocument = PdfDocument & {
  number: string;
  description: Localized;
};

export const ui = {
  zh: {
    skip: "跳到主要内容",
    brandAria: "返回首页",
    navWork: "代表案例",
    navCapabilities: "核心能力",
    navWriting: "写作研究",
    navExperience: "经历教育",
    navToolkit: "能力工具",
    navContact: "联系",
    menu: "菜单",
    language: "语言切换",
    eyebrow: "吴蕴恒 — 品牌公关 · 传播策划 · 项目执行",
    heroTitle: ["把复杂业务，", "讲成值得相信的故事。"],
    heroLead:
      "英国传媒本硕背景，具备消费科技、奢侈品、美妆、酒旅与会员运营项目经验。能够从业务目标出发，完成传播策划、双语内容、媒体/KOL协同、跨团队推进与数据复盘。",
    availability: "上海 · 寻求品牌公关岗位机会",
    viewWork: "查看案例",
    resume: "下载简历",
    carouselLabel: "代表项目轮播",
    previous: "上一个项目",
    next: "下一个项目",
    pause: "暂停轮播",
    play: "播放轮播",
    openCase: "查看案例",
    proofLabel: "代表性成果",
    proofFootnote:
      "* 项目数据按原始材料口径呈现；现场总人流不等同于独立到访，Bonpoint阅读量基于2026年4月表现年化推算。",
    positioningLabel: "定位 / POSITIONING",
    positioningTitle: "从Brief到复盘，把传播策略转化为可落地、可验证的结果。",
    positioningBody:
      "我关注如何将业务目标转化为可执行的传播方案，并通过跨团队沟通、内容产出、媒体与KOL协同、现场执行及数据复盘推动落地。工作路径从业务洞察与议题识别，到传播策略与内容表达，再到协同执行与效果复盘。",
    positioningSteps: ["业务洞察与议题识别", "传播策略与内容表达", "协同落地与效果复盘"],
    workLabel: "代表案例 / SELECTED WORK",
    workTitle: "五组代表项目，呈现品牌公关从策略到复盘的关键环节。",
    workBody:
      "每组案例围绕业务目标、本人职责与关键动作、跨团队沟通、核心交付及结果复盘展开，清楚说明我在不同项目阶段的实际贡献。",
    scope: "实际结果、提案目标与推算数据均在案例内清晰区分。",
    filters: {
      all: "全部",
      strategy: "传播策略",
      writing: "内容策划与写作",
      activation: "公关活动",
      media: "媒体/KOL协同",
      social: "社媒运营与复盘",
    } as Record<Filter, string>,
    capabilityLabel: "核心能力 / WHAT I BRING",
    capabilityTitle: "我能为品牌公关团队带来的四项能力。",
    capabilityBody: "从业务判断到内容表达，再到跨团队推进和数据复盘，能力都落在真实项目与可核验交付中。",
    capabilities: [
      {
        title: "业务洞察与传播策划",
        body: "从Brief、品牌资产、行业背景和受众需求中提炼传播机会，并拆解为议题、内容与执行路径。",
        projects: "L’OCCITANE · HAUS / LUX",
        projectId: "loccitane",
      },
      {
        title: "新闻稿与内容写作",
        body: "完成新闻稿、本地化内容、社媒选题与多平台版本协作，让复杂信息进入媒体和受众能够理解的语境。",
        projects: "L’OCCITANE · Bonpoint",
        projectId: "loccitane",
      },
      {
        title: "公关活动与跨团队执行",
        body: "协调场地、供应商、设计、设备和现场团队，将活动机制、物料与人员分工推进到落地。",
        projects: "TCL · HAUS / LUX",
        projectId: "tcl",
      },
      {
        title: "媒体/KOL协同与数据复盘",
        body: "跟进媒体与KOL内容交付，汇总曝光、互动、粉丝与打开率等指标，并将复盘结论用于下一轮优化。",
        projects: "TCL · Bonpoint",
        projectId: "bonpoint",
      },
    ],
    processLabel: "工作路径 / HOW I WORK",
    processTitle: "从识别传播机会，到协同落地与复盘。",
    processSteps: [
      {
        word: "SIGNAL",
        title: "业务洞察与议题识别",
        body: "拆解业务目标、品牌语境、行业动态与受众反馈，识别传播机会并提炼核心信息。",
      },
      {
        word: "STORY",
        title: "传播策略与内容表达",
        body: "将核心信息转化为媒体议题、新闻稿、内容主题与活动方案，并通过跨团队沟通推进执行。",
      },
      {
        word: "TRUST",
        title: "协同落地与效果复盘",
        body: "协调媒体、KOL及项目团队，跟进执行节点、报道反馈与传播数据，把经验沉淀为可复用的方法。",
      },
    ],
    writingLabel: "写作与研究 / WRITING & RESEARCH",
    writingTitle: "从新闻稿到研究论文，把复杂信息写清楚。",
    writingBody:
      "一份专业新闻稿与四项学术作品，展示我在品牌叙事、本地化写作、议题分析、传播规划、公开数据整理与跨文化研究中的能力。专业项目、课程作业与硕士论文均按原始性质标注。",
    readPdf: "在线阅读",
    downloadPdf: "下载完整PDF",
    experienceLabel: "经历与教育 / EXPERIENCE & EDUCATION",
    experienceTitle: "围绕业务目标，推动传播项目从策略到落地。",
    experienceBody:
      "现任上海音睿广告有限公司广告公关专员（项目执行），拥有英国传媒与传播专业背景。项目经历覆盖品牌内容策划、公关活动执行、KOL协同、市场研究与数据整理，能够围绕业务目标拆解传播任务，通过跨团队沟通与多方协作推进项目落地，并结合传播数据进行效果复盘与策略优化。",
    workExperience: "工作经历",
    education: "教育背景",
    toolkitLabel: "能力与工具 / SKILLS & TOOLKIT",
    toolkitTitle: "公关基本功之外，也能用数据、视觉与AI工具提升执行效率。",
    toolkitBody:
      "这里展示的不是简单的软件名单，而是我在内容生产、项目执行、数据复盘和跨团队协作中能够实际使用的能力。",
    toolkits: [
      {
        title: "双语沟通与语言学习",
        body: "中文母语；英语TOEFL 95，可完成英文资料检索、双语内容校对及跨文化项目沟通。具备较强的语言学习能力，目前持续学习德语并备考B2考试。",
      },
      {
        title: "传播方案与数据复盘",
        body: "使用PowerPoint完成传播策略方案、活动提案、内容排期和复盘报告；使用Excel进行社媒数据整理、趋势对比、传播指标分析、KOL及媒体名单管理与图表呈现；使用Word完成新闻稿排版、修订留痕和多版本协作。",
      },
      {
        title: "视频剪辑与动态内容",
        body: "熟练使用Premiere Pro进行素材管理、多轨剪辑、字幕制作、音频处理、Lumetri调色、MOGRT与多平台输出；具备Red Giant Universe和FilmImpact实际使用经验，并可结合After Effects、Dynamic Link及Media Encoder完成基础动效与输出。",
      },
      {
        title: "视觉协作与快速草案",
        body: "了解Figma、Adobe Illustrator、Adobe Photoshop及ComfyUI，可快速制作情绪板、社媒版式、KV方向稿、活动物料示意和视觉参考，配合设计师快速确认方向并迭代草案。",
      },
      {
        title: "编程基础与AI工作流",
        body: "熟悉HTML、CSS、Python和Java，掌握C++基础；熟练使用Codex识别并优化重复工作，可辅助搭建轻量网页、自动化脚本及AI小工具，用于素材整理、文件批处理、数据汇总、格式检查与版本管理。",
      },
      {
        title: "现场执行与机动能力",
        body: "持有效机动车驾驶证，累计安全驾驶5万+公里，无事故记录；可适应异地活动、物料协调及对机动性要求较高的现场执行场景。",
      },
    ],
    resumeCtaTitle: "能写、能推进、会复盘，也懂得用AI把重复工作做得更快。",
    resumeCtaBody:
      "如果你正在寻找一位兼具内容表达、项目执行与数字工具能力的品牌公关候选人，我们或许值得聊聊。",
    takeResume: "把我的简历带走",
    campusLabel: "校园与社会实践 / CAMPUS & COMMUNITY",
    campusTitle: "把商业判断、团队协作和长期投入放进真实场景。",
    campus: [
      {
        title: "交通大学商业案例竞赛",
        body: "负责市场分析、策略框架及演讲稿撰写，与团队在限定时间内完成方案整合与现场路演，将调研信息转化为结构清晰、具有说服力的商业建议。",
      },
      {
        title: "英国校级模拟创业项目",
        body: "负责商业模式画布、海外市场进入分析及营销方案设计，与多元文化背景成员共同完成涵盖市场定位、财务测算和落地路径的商业计划书。",
      },
      {
        title: "偏远山区网络支教项目",
        body: "担任线上英语志愿教师，持续为山区小学生提供课程辅导与学习陪伴，参与备课、授课及课后反馈，在长期志愿服务中培养耐心、责任感与沟通能力。",
      },
    ],
    ctaKicker: "期待新的品牌公关机会",
    ctaTitle: "让好的传播，不只停在方案里。",
    ctaBody:
      "如果团队正在寻找一位能理解业务、做好内容，并通过跨团队协作推动项目落地的品牌公关候选人，我们可以从一封邮件开始。",
    email: "wuyunheng0@gmail.com",
    footer: "吴蕴恒 · 品牌公关作品集",
    footerNote: "理解业务，讲清价值，推动落地。",
    backToTop: "回到顶部",
    caseLabel: "案例详情",
    businessContext: "业务背景",
    keyActions: "本人职责与关键动作",
    evidence: "结果与证据",
    boundary: "复盘与数据边界",
    sourceDocs: "完整项目文件",
    sourceDocsHelp: "选择文件后，可在同一窗口内连续滚动查看全部页面。",
    pages: "页",
    openNew: "新窗口打开",
    close: "关闭",
  },
  en: {
    skip: "Skip to main content",
    brandAria: "Back to top",
    navWork: "Work",
    navCapabilities: "Capabilities",
    navWriting: "Writing",
    navExperience: "Experience",
    navToolkit: "Toolkit",
    navContact: "Contact",
    menu: "Menu",
    language: "Language",
    eyebrow: "WU YUNHENG — BRAND PR · COMMUNICATIONS PLANNING · PROJECT DELIVERY",
    heroTitle: ["Turning complex briefs", "into stories people can trust."],
    heroLead:
      "UK-trained in media and communications, with project experience across consumer technology, luxury, beauty, hospitality and membership programmes. I translate business objectives into communications plans, bilingual content, media and KOL coordination, cross-team delivery and measurement.",
    availability: "Shanghai · Seeking brand PR opportunities",
    viewWork: "View work",
    resume: "Download résumé",
    carouselLabel: "Selected project carousel",
    previous: "Previous project",
    next: "Next project",
    pause: "Pause carousel",
    play: "Play carousel",
    openCase: "View case",
    proofLabel: "SELECTED OUTCOMES",
    proofFootnote:
      "* Metrics follow the source material. Venue footfall is not unique attendance; Bonpoint reads are annualised from April 2026 performance.",
    positioningLabel: "POSITIONING",
    positioningTitle: "From brief to review, I turn communications strategy into work that can be delivered and verified.",
    positioningBody:
      "I translate business goals into executable communications plans, then move them forward through cross-team communication, content production, media and KOL coordination, on-site delivery and measurement. My process runs from business insight and issue identification to message strategy, execution and review.",
    positioningSteps: ["Business insight & issue identification", "Message strategy & content expression", "Coordinated delivery & performance review"],
    workLabel: "SELECTED WORK",
    workTitle: "Five project groups spanning the PR workflow—from planning to delivery and review.",
    workBody:
      "Each case sets out the business objective, my specific contribution, stakeholder complexity and supporting evidence.",
    scope: "Actual outcomes, annualised estimates and proposal targets are labelled separately.",
    filters: {
      all: "All",
      strategy: "Strategy",
      writing: "Content & writing",
      activation: "PR activations",
      media: "Media & KOL",
      social: "Social & measurement",
    } as Record<Filter, string>,
    capabilityLabel: "WHAT I BRING",
    capabilityTitle: "Four capabilities I bring to a brand PR team.",
    capabilityBody: "From business judgement and message craft to cross-team delivery and measurement, each capability is grounded in real project work.",
    capabilities: [
      {
        title: "Business insight & communications planning",
        body: "Find the communications opportunity in the brief, brand assets, category context and audience needs, then translate it into messages, content and an executable route.",
        projects: "L’OCCITANE · HAUS / LUX",
        projectId: "loccitane",
      },
      {
        title: "Press writing & content development",
        body: "Create press releases, localised copy, social topics and platform-specific versions that make complex information clear and usable.",
        projects: "L’OCCITANE · Bonpoint",
        projectId: "loccitane",
      },
      {
        title: "PR activations & cross-team delivery",
        body: "Coordinate venues, vendors, designers, equipment and on-site teams to move mechanics, assets and responsibilities from plan to delivery.",
        projects: "TCL · HAUS / LUX",
        projectId: "tcl",
      },
      {
        title: "Media/KOL coordination & measurement",
        body: "Track media and creator deliverables, consolidate reach, engagement, follower and open-rate data, and apply the findings to the next cycle.",
        projects: "TCL · Bonpoint",
        projectId: "bonpoint",
      },
    ],
    processLabel: "HOW I WORK",
    processTitle: "From identifying the opportunity to delivery and review.",
    processSteps: [
      {
        word: "SIGNAL",
        title: "Business insight & issue identification",
        body: "Unpack the business objective, brand context, industry developments and audience feedback to sharpen the communications opportunity.",
      },
      {
        word: "STORY",
        title: "Message strategy & content expression",
        body: "Turn the core message into media angles, press materials, content themes and activation plans, then move the work forward across teams.",
      },
      {
        word: "TRUST",
        title: "Coordinated delivery & performance review",
        body: "Coordinate media, KOLs and project teams, track milestones and performance, and turn delivery experience into a repeatable way of working.",
      },
    ],
    writingLabel: "WRITING & RESEARCH",
    writingTitle: "From press releases to research papers, the goal is to make complex information clear.",
    writingBody:
      "One professional press release and four academic works demonstrate brand storytelling, localisation, issue analysis, communications planning, public-data research and cross-cultural thinking. Each item is labelled by its original format.",
    readPdf: "Read online",
    downloadPdf: "Download full PDF",
    experienceLabel: "EXPERIENCE & EDUCATION",
    experienceTitle: "Starting with the business objective and moving communications work from strategy to delivery.",
    experienceBody:
      "Currently a PR Specialist (Project Delivery) at Shanghai Yinrui Advertising, with UK training in media and communications. Experience spans brand content, PR activations, KOL coordination, market research and data organisation—turning business needs into clear tasks, cross-team delivery and measurable review.",
    workExperience: "Experience",
    education: "Education",
    toolkitLabel: "SKILLS & TOOLKIT",
    toolkitTitle: "PR fundamentals, strengthened by data, design collaboration and AI-enabled workflows.",
    toolkitBody:
      "This is not a software list. It shows how I use tools in content production, project delivery, measurement and cross-team collaboration.",
    toolkits: [
      {
        title: "Bilingual communication & language learning",
        body: "Native Chinese; TOEFL 95 in English, supporting English-language research, bilingual copy review and cross-cultural project communication. Currently learning German and preparing for the B2 exam.",
      },
      {
        title: "Communications decks & performance review",
        body: "PowerPoint for strategy decks, activation proposals, content calendars and reporting; Excel for social-data organisation, trend comparison, KOL/media lists and visualisation; Word for press-release formatting, tracked revisions and version control.",
      },
      {
        title: "Video editing & motion content",
        body: "Premiere Pro for asset management, multi-track editing, subtitles, audio, Lumetri colour, MOGRT and multi-platform export; hands-on experience with Red Giant Universe and FilmImpact, plus After Effects, Dynamic Link and Media Encoder for basic motion and delivery.",
      },
      {
        title: "Visual collaboration & rapid drafts",
        body: "Working knowledge of Figma, Adobe Illustrator, Adobe Photoshop and ComfyUI for moodboards, social layouts, KV directions, asset mock-ups and clearer collaboration with designers.",
      },
      {
        title: "Programming foundations & AI workflows",
        body: "Familiar with HTML, CSS, Python and Java, with foundational C++. Proficient with Codex for lightweight sites, scripts and AI utilities that reduce repetitive work across assets, files, data, formatting and version management.",
      },
      {
        title: "On-site mobility & delivery",
        body: "Valid driving licence with 50,000+ accident-free kilometres, supporting mobile work across events, logistics coordination and on-site delivery.",
      },
    ],
    resumeCtaTitle: "I write, coordinate and review—and use AI to take repetitive work out of the workflow.",
    resumeCtaBody:
      "If you are looking for a brand PR candidate who combines content, delivery and digital-tool fluency, we may have something to talk about.",
    takeResume: "Take my résumé",
    campusLabel: "CAMPUS & COMMUNITY",
    campusTitle: "Putting judgement, teamwork and long-term commitment into practice.",
    campus: [
      {
        title: "Jiao Tong University Business Case Competition",
        body: "Led market analysis, strategy framing and pitch-script development, helping the team turn research into a clear commercial recommendation and live presentation under time constraints.",
      },
      {
        title: "UK University Entrepreneurship Simulation",
        body: "Owned the business-model canvas, overseas market-entry analysis and marketing plan within a multicultural team, contributing to a full plan covering positioning, financial projections and delivery.",
      },
      {
        title: "Remote English Tutoring Programme",
        body: "Volunteered as an online English tutor for primary-school students in remote communities, supporting lesson preparation, teaching and ongoing learning feedback.",
      },
    ],
    ctaKicker: "OPEN TO BRAND PR OPPORTUNITIES",
    ctaTitle: "Good communication goes beyond the deck.",
    ctaBody:
      "If your team is looking for a brand PR candidate who can understand the business, shape the story and move projects forward across teams, let’s start with an email.",
    email: "wuyunheng0@gmail.com",
    footer: "WU YUNHENG · BRAND PR PORTFOLIO",
    footerNote: "Understand the business. Shape the message. Make it happen.",
    backToTop: "Back to top",
    caseLabel: "CASE STUDY",
    businessContext: "Business context",
    keyActions: "My role & key actions",
    evidence: "Results & evidence",
    boundary: "Review & evidence boundary",
    sourceDocs: "Full project documents",
    sourceDocsHelp: "Choose a document and scroll through every page in the same reader.",
    pages: "pages",
    openNew: "Open in new window",
    close: "Close",
  },
};

export const projects: Project[] = [
  {
    id: "tcl",
    index: "01",
    title: { zh: "TCL · 四城快闪与全球SOP", en: "TCL · Four-city activations & global SOP" },
    sector: { zh: "消费科技 / 整合活动", en: "CONSUMER TECH / INTEGRATED ACTIVATION" },
    summary: {
      zh: "围绕意大利四城零售快闪，统筹方案细化、场地与供应商协同、现场运营、KOL传播及数据回收，并将执行流程沉淀为全球SOP。项目汇总记录现场总人流2167万+、参与人次18.8万+；14位KOL发布38条内容，获得276万+播放/曝光。",
      en: "Coordinated four retail activations in Italy across plan refinement, venue and vendor alignment, on-site operations, KOL amplification and reporting, before codifying the workflow in a global SOP. Project reporting recorded 21.67M+ venue footfall, 188K+ participation instances and 2.77M+ views/reach across 38 posts by 14 KOLs.",
    },
    role: {
      zh: "方案细化 · 执行统筹 · KOL协同 · 传播复盘",
      en: "PLAN REFINEMENT · ACTIVATION DELIVERY · KOL COORDINATION · REPORTING",
    },
    context: {
      zh: "品牌需要在意大利四座城市快速复制一致的产品体验，同时适配不同商场、场地、设备及本地供应商条件，并把线下互动转化为可追踪的传播内容。",
      en: "The brief was to deliver a consistent product experience across four Italian cities while adapting to different venue, equipment and supplier conditions—and turning offline interaction into trackable communications content.",
    },
    metrics: [
      { value: "21.67M+", label: { zh: "现场总人流", en: "venue footfall" } },
      { value: "188K+", label: { zh: "参与人次", en: "participation instances" } },
      { value: "2.77M+", label: { zh: "播放/曝光", en: "views/reach" } },
      { value: "3.78%", label: { zh: "互动率", en: "engagement rate" } },
    ],
    actions: {
      zh: [
        "将Brief拆解为场地动线、互动机制、礼品规则、人员分工与数据记录方式。",
        "协调商场、设计、美陈、设备与本地供应商，推进物料修改、制作验收、布场及现场落地。",
        "统筹现场运营与数据回收，根据不同城市的客流和场地约束调整执行细节。",
        "协同14位KOL完成内容发布与效果汇总，并将关键流程整理为全球活动SOP。",
      ],
      en: [
        "Translated the brief into visitor flow, interaction mechanics, gifting rules, team responsibilities and data-capture requirements.",
        "Coordinated venues, design, fabrication, equipment and local vendors through revisions, production checks, installation and delivery.",
        "Managed on-site operations and data collection, adjusting execution details to each city’s traffic and venue constraints.",
        "Coordinated content delivery across 14 KOLs, consolidated performance and documented the workflow in a global SOP.",
      ],
    },
    outcomes: {
      zh: [
        "线下汇总：现场总人流2167万+、参与人次18.8万+、现场互动1.6万+、礼品发放4262+。",
        "社媒汇总：14位KOL、38条内容、2,766,986播放/曝光、58,184互动，互动率3.78%。",
        "形成全球活动SOP，为跨城市复制和团队协作提供统一流程。",
      ],
      en: [
        "Offline reporting: 21.67M+ venue footfall, 188K+ participation instances, 16K+ on-site interactions and 4,262+ gifts distributed.",
        "Social reporting: 14 KOLs, 38 posts, 2,766,986 views/reach, 58,184 interactions and a 3.78% engagement rate.",
        "A global activation SOP created a consistent workflow for cross-city replication and team coordination.",
      ],
    },
    boundary: {
      zh: "以上均为项目汇总口径；现场总人流和参与人次不等同于独立访客，项目不表述为冬奥官方活动合作。复盘重点是在标准化SOP和本地快速响应之间建立平衡。",
      en: "Figures are project-level totals; footfall and participation are not unique visitors, and the activations are not presented as an official Olympic event partnership. The key learning is to balance a standardised SOP with fast local response.",
    },
    filters: ["activation", "media", "social"],
    cover: "/portfolio/covers/tcl.jpg",
    documents: [
      {
        id: "tcl-sop",
        title: { zh: "01 · 全球执行SOP", en: "01 · Global activation SOP" },
        type: { zh: "44页 · 执行标准", en: "44 pages · Operating standards" },
        src: "/documents/projects/tcl-global-sop.pdf",
        filename: "TCL-Global-Activation-SOP.pdf",
        pages: 44,
      },
      {
        id: "tcl-plan",
        title: { zh: "02 · 四城商超与旗舰店快闪方案", en: "02 · Four-city retail activation plan" },
        type: { zh: "98页 · 活动方案", en: "98 pages · Activation plan" },
        src: "/documents/projects/tcl-activation-plan.pdf",
        filename: "TCL-Four-City-Activation-Plan.pdf",
        pages: 98,
      },
      {
        id: "tcl-recap",
        title: { zh: "03 · 四城快闪活动回顾", en: "03 · Four-city activation recap" },
        type: { zh: "19页 · 项目复盘", en: "19 pages · Project recap" },
        src: "/documents/projects/tcl-project-recap.pdf",
        filename: "TCL-Four-City-Activation-Recap.pdf",
        pages: 19,
      },
    ],
  },
  {
    id: "loccitane",
    index: "02",
    title: { zh: "L’OCCITANE · 50周年品牌叙事", en: "L’OCCITANE · 50th-anniversary narrative" },
    sector: { zh: "美妆 / 整合传播", en: "BEAUTY / INTEGRATED COMMS" },
    summary: {
      zh: "围绕50周年节点，将法国总部品牌资产转译为中国市场可采用的媒体议题、新闻稿、溯源体验与创作者内容矩阵。完成两篇本地化新闻稿及多轮总部校准；项目材料记录50周年传播中国区2.3亿+曝光。",
      en: "Adapted L’OCCITANE’s 50th-anniversary platform for China through media angles, localised press releases, an origin-trip experience and a phased creator-content system. Project reporting records 230M+ impressions for the anniversary communications in China.",
    },
    role: { zh: "品牌叙事 · 新闻稿写作 · 总部协同", en: "BRAND NARRATIVE · PRESS WRITING · HQ ALIGNMENT" },
    context: {
      zh: "品牌既要保持50周年全球叙事的一致性，也要让普罗旺斯、自然、匠心、艺术与愉悦等品牌资产进入中国消费者和媒体能够理解、采用的语境。",
      en: "The challenge was to preserve the global anniversary platform while making Provence, nature, craftsmanship, art and wellbeing relevant and editorially usable for Chinese audiences and media.",
    },
    metrics: [
      { value: "230M+", label: { zh: "中国区曝光", en: "China impressions" } },
      { value: "120M", label: { zh: "双话题阅读", en: "hashtag reads" } },
      { value: "1.8M+", label: { zh: "双话题互动", en: "hashtag interactions" } },
      { value: "12M+", label: { zh: "官方内容阅读", en: "official-content reads" } },
    ],
    actions: {
      zh: [
        "将50年品牌资产梳理为文化根源、自然疗愈、匠心表达与未来焕新四条叙事线。",
        "完成两篇中国区新闻稿的撰写、本地化及多轮法国总部校准。",
        "围绕工厂、薰衣草田、SPA、热气球与陶艺工坊搭建溯源体验和内容路径。",
        "规划管理层对谈、媒体议题、创作者匹配、纪录片及UGC内容矩阵。",
      ],
      en: [
        "Structured the 50-year brand story around cultural roots, natural wellbeing, craftsmanship and future-facing renewal.",
        "Drafted and localised two China-market press releases through multiple review rounds with the French HQ.",
        "Built an origin-trip content journey across the factory, lavender fields, spa, hot-air balloon and artisan workshop.",
        "Planned leadership conversations, media angles, creator fit, documentary content and a phased UGC pathway.",
      ],
    },
    outcomes: {
      zh: [
        "50周年传播：中国区2.3亿+曝光，双话题1.2亿阅读、180万+互动，官方内容1200万+阅读、420万视频播放。",
        "文化奖传播另行记录：50+篇报道、820万+官方内容阅读、260万+视频播放。",
        "溯源提案获法国总部与中国团队认可，并被采纳为后续执行蓝本。",
      ],
      en: [
        "Anniversary reporting: 230M+ China impressions, 120M hashtag reads, 1.8M+ interactions, 12M+ official-content reads and 4.2M video views.",
        "Culture Award reporting, shown separately: 50+ stories, 8.2M+ official-content reads and 2.6M+ video views.",
        "The origin-trip proposal was endorsed by the French HQ and China team and adopted as a blueprint for the next stage.",
      ],
    },
    boundary: {
      zh: "50周年和文化奖是两组独立数据，不合并计算；材料中的销售表现仅为定性描述，不扩写为销售额或增长率。提案获采纳也不等同于全部执行完成。",
      en: "Anniversary and Culture Award figures are separate reporting sets and are not combined. Sales momentum is qualitative only, and proposal adoption is not presented as completed campaign performance.",
    },
    filters: ["strategy", "writing"],
    cover: "/portfolio/covers/loccitane.jpg",
    documents: [
      {
        id: "loccitane-origin",
        title: { zh: "01 · 50周年中国溯源活动方案", en: "01 · 50th-anniversary China origin-trip plan" },
        type: { zh: "41页 · 整合活动方案", en: "41 pages · Integrated activation plan" },
        src: "/documents/projects/loccitane-50th-origin-plan.pdf",
        filename: "LOCCITANE-50th-China-Origin-Trip-Plan.pdf",
        pages: 41,
      },
      {
        id: "loccitane-elle",
        title: { zh: "02 · L’OCCITANE × ELLE溯源创意提案", en: "02 · L’OCCITANE × ELLE origin-trip creative proposal" },
        type: { zh: "44页 · 内容创意提案", en: "44 pages · Creative content proposal" },
        src: "/documents/projects/loccitane-elle-origin-proposal.pdf",
        filename: "LOCCITANE-ELLE-Origin-Trip-Creative-Proposal.pdf",
        pages: 44,
      },
    ],
  },
  {
    id: "bonpoint",
    index: "03",
    title: { zh: "Bonpoint · 全渠道社媒增长", en: "Bonpoint · Always-on social growth" },
    sector: { zh: "奢侈品 / 社媒运营", en: "LUXURY / SOCIAL OPERATIONS" },
    summary: {
      zh: "为微信、小红书、微博和抖音建立内容矩阵、发布节奏与月度复盘机制。截至2026年4月，微信粉丝达到168,206，较2025年12月增长2.9%；小红书达到13,973，增长3.2%；按4月表现年化，全渠道阅读量为100万+。",
      en: "Built an always-on content matrix, publishing cadence and monthly review loop across WeChat, RED, Weibo and Douyin. By April 2026, WeChat reached 168,206 followers (+2.9% vs December 2025) and RED reached 13,973 (+3.2%); April performance annualises to 1M+ cross-channel reads.",
    },
    role: { zh: "多平台内容运营 · 发布协同 · 数据复盘", en: "MULTI-PLATFORM CONTENT · PUBLISHING COORDINATION · PERFORMANCE REVIEW" },
    context: {
      zh: "品牌需要把分散的日常发布转化为稳定的长期内容资产，在保持法式精品调性的同时适配不同平台的内容习惯，并用月度数据判断增长机会。",
      en: "The brand needed to turn fragmented day-to-day publishing into a consistent long-term asset—protecting its French luxury codes while adapting content to each platform and using monthly performance to guide decisions.",
    },
    metrics: [
      { value: "1M+", label: { zh: "年化全渠道阅读*", en: "annualised reads*" } },
      { value: "+2.9%", label: { zh: "微信粉丝至168,206", en: "WeChat to 168,206" } },
      { value: "+3.2%", label: { zh: "小红书粉丝至13,973", en: "RED to 13,973" } },
      { value: "6.4%", label: { zh: "微信最高打开率", en: "peak WeChat open rate" } },
    ],
    actions: {
      zh: [
        "围绕品牌节点、产品故事与用户兴趣搭建四平台内容矩阵。",
        "推进选题、素材、文案、短视频与发布时间，使同一主题适配不同平台语境。",
        "按月汇总粉丝、阅读、打开率及单篇内容表现，识别高效题材和渠道差异。",
        "以复盘结论调整后续选题、内容形式和发布节奏，形成持续优化机制。",
      ],
      en: [
        "Built a four-platform matrix around brand moments, product stories and audience interests.",
        "Coordinated topics, assets, copy, short-form video and publishing schedules for platform-native execution.",
        "Consolidated follower data, reads, open rates and post-level performance into a monthly review.",
        "Used the findings to refine subsequent topics, formats and timing.",
      ],
    },
    outcomes: {
      zh: [
        "截至2026年4月：微信168,206粉丝，较2025年12月+2.9%；小红书13,973，+3.2%；微博79,000，基本持平。",
        "微信单篇最高打开率6.4%，高于4.4%的项目基准。",
        "按4月表现年化：全渠道阅读100万+；微信35万+、小红书8万+、抖音19万+、微博38万+。",
      ],
      en: [
        "By April 2026: WeChat 168,206 followers (+2.9% vs December 2025), RED 13,973 (+3.2%) and Weibo 79,000 (broadly flat).",
        "Peak WeChat open rate reached 6.4%, above the project benchmark of 4.4%.",
        "Annualised from April: 1M+ cross-channel reads, including 350K+ on WeChat, 80K+ on RED, 190K+ on Douyin and 380K+ on Weibo.",
      ],
    },
    boundary: {
      zh: "100万+及各平台年度阅读均为基于4月表现的年化推算，不是已完成的全年实绩；粉丝增长与具体内容之间不作未经验证的单一因果归因。",
      en: "The annual totals are projections based on April performance, not completed full-year results. No single content theme is presented as the sole cause of follower growth without further testing.",
    },
    filters: ["writing", "social"],
    cover: "/portfolio/covers/bonpoint.jpg",
    documents: [
      {
        id: "bonpoint-apr",
        title: { zh: "Bonpoint中国社媒月度报告 · 2026年4月", en: "Bonpoint China social report · April 2026" },
        type: { zh: "14页 · 社媒复盘", en: "14 pages · Social performance review" },
        src: "/documents/projects/bonpoint-social-report-apr26.pdf",
        filename: "Bonpoint-China-Social-Report-April-2026.pdf",
        pages: 14,
      },
    ],
  },
  {
    id: "hospitality",
    index: "04",
    title: { zh: "HAUS / LUX* · 中国市场入场传播", en: "HAUS / LUX* · China market-entry communications" },
    sector: { zh: "酒旅 / 入场传播策略", en: "HOSPITALITY / MARKET-ENTRY COMMS" },
    summary: {
      zh: "为HAUS Da Lat与LUX*外滩两个开业前项目制定中国市场传播方案：HAUS形成“预热—开业—持续传播”三阶段PR架构；LUX*以电影首映概念串联品牌12年中国旅程与四城体验。两套提案获认可并进入下一阶段筹备。",
      en: "Developed China-market communications proposals for two pre-opening hospitality projects: a three-phase PR framework for HAUS Da Lat and a cinematic four-city platform for LUX*. Both routes were endorsed for the next stage.",
    },
    role: { zh: "中国市场传播策略 · 议题架构 · 跨市场协同", en: "CHINA-MARKET PR STRATEGY · MESSAGE ARCHITECTURE · CROSS-MARKET ALIGNMENT" },
    context: {
      zh: "HAUS Da Lat需要在开业前建立中国高净值客群及投资、酒旅与生活方式媒体认知；LUX*需要在外滩项目落地前，把品牌在中国的长期积累转化为具有期待感的传播事件。",
      en: "HAUS Da Lat needed pre-opening credibility among Chinese high-net-worth audiences and relevant media. LUX* needed to turn its long-term China presence into a memorable communications event ahead of its Bund property.",
    },
    metrics: [
      { value: "2", label: { zh: "开业前品牌项目", en: "pre-opening briefs" } },
      { value: "3", label: { zh: "HAUS传播阶段", en: "HAUS PR phases" } },
      { value: "4", label: { zh: "LUX*城市叙事", en: "LUX* city chapters" } },
      { value: "A", label: { zh: "LUX*获采纳方向", en: "adopted LUX* route" } },
    ],
    actions: {
      zh: [
        "研究品牌资产、项目卖点与目标受众，并与海外相关方对齐中国市场预期和品牌调性。",
        "为HAUS搭建信息屋，以及预热、开业、持续传播三阶段PR架构。",
        "规划媒体类别、KOL、渠道、时间节点与评估框架，把品牌定位转化为执行路径。",
        "为LUX*提出电影首映式叙事，以影片、人物和体验串联四城品牌旅程。",
      ],
      en: [
        "Researched brand assets, project propositions and target audiences, aligning China-market expectations with overseas stakeholders.",
        "Built HAUS’s message house and three-phase pre-launch, opening and sustained-visibility PR framework.",
        "Structured media categories, KOLs, channels, timing and measurement into an executable rollout.",
        "Developed a cinematic premiere platform for LUX*, connecting film, storytellers and experience across four city chapters.",
      ],
    },
    outcomes: {
      zh: [
        "HAUS方案获海外总部与中国团队认可，进入执行筹备。",
        "LUX* Option A被采纳为下一阶段的核心方向。",
        "两套方案将尚未完全开放的空间与品牌资产转化为媒体议题、内容线索与体验触点。",
      ],
      en: [
        "The HAUS proposal was endorsed by the overseas HQ and China team and moved into execution preparation.",
        "LUX* Option A was adopted as the core route for the next stage.",
        "Both proposals turned not-yet-open assets into media angles, content opportunities and experience touchpoints.",
      ],
    },
    boundary: {
      zh: "HAUS材料中的潜在触达、报道与社交内容数字均为提案目标；LUX*未提供实际曝光、到场、预订或销售数据，因此不作为项目结果呈现。",
      en: "Potential reach, coverage and social figures in the HAUS deck are proposal targets. LUX* provides no delivered reach, attendance, booking or sales data, so none is presented as performance.",
    },
    filters: ["strategy", "activation"],
    cover: "/portfolio/covers/haus-lux.jpg",
    documents: [
      {
        id: "haus-proposal",
        title: { zh: "01 · HAUS Da Lat中国市场公关提案", en: "01 · HAUS Da Lat China PR proposal" },
        type: { zh: "28页 · 入场传播策略", en: "28 pages · Market-entry PR strategy" },
        src: "/documents/projects/haus-china-pr-proposal.pdf",
        filename: "HAUS-Da-Lat-China-PR-Proposal.pdf",
        pages: 28,
      },
      {
        id: "lux-concept",
        title: { zh: "02 · LUX*外滩丽世品牌活动创意方案", en: "02 · LUX* Bund brand-event concept" },
        type: { zh: "9页 · 品牌活动创意", en: "9 pages · Brand-event concept" },
        src: "/documents/projects/lux-bund-event-concept.pdf",
        filename: "LUX-Bund-Brand-Event-Concept.pdf",
        pages: 9,
      },
    ],
  },
  {
    id: "wuliangye",
    index: "05",
    title: { zh: "五粮液 · 会员内容IP与增长机制", en: "Wuliangye · Member content IP & growth design" },
    sector: { zh: "酒类 / 会员增长", en: "SPIRITS / MEMBERSHIP GROWTH" },
    summary: {
      zh: "针对会员中心2.0的拉新、互动与权益差异化问题，提出“两代人生，一枚好酒”父亲节传播提案，设计内容IP、会员权益、裂变拉新和限时转化机制。页面所列2.3亿+曝光、50万会员等为会员中心整体阶段数据，不归因于本次提案。",
      en: "Developed a Father’s Day communications proposal around “Two generations, one fine spirit”, connecting content IP, member benefits, referrals and time-limited conversion. The 230M+ impressions and 500K members are broader programme figures, not outcomes attributed to this proposal.",
    },
    role: { zh: "主题策略 · 内容IP · 会员增长机制设计", en: "CAMPAIGN PLATFORM · CONTENT IP · MEMBER-GROWTH DESIGN" },
    context: {
      zh: "会员中心2.0上线后，面临流量不足、互动偏弱、权益差异化有限和情感主题缺位的问题，需要同时服务年轻用户拉新、老会员身份认同与销售转化。",
      en: "Following the launch of Membership Centre 2.0, the programme faced limited traffic, weak engagement, insufficient benefit differentiation and no unifying emotional platform.",
    },
    metrics: [
      { value: "230M+", label: { zh: "整体阶段曝光", en: "broader-programme impressions" } },
      { value: "500K", label: { zh: "整体阶段会员", en: "broader-programme members" } },
      { value: "80K+", label: { zh: "整体阶段UGC", en: "broader-programme UGC" } },
      { value: "15%", label: { zh: "整体阶段私域销售占比", en: "broader-programme private sales share" } },
    ],
    actions: {
      zh: [
        "从白酒代际记忆和父亲节赠礼场景中提炼“两代人生，一枚好酒”主题。",
        "搭建主题播客、会员限时权益、裂变拉新与股东购酒四个模块。",
        "将故事征集、KOL对谈、线下品鉴、刻字礼遇、拼团和排行榜串成内容—分享—注册—下单路径。",
        "规划自媒体、短信、行业媒体、KOL与朋友圈广告矩阵，并拆解技术、客服、供应链及复盘需求。",
      ],
      en: [
        "Derived “Two generations, one fine spirit” from intergenerational memory and Father’s Day gifting.",
        "Built four modules spanning a branded podcast, member-only offers, referral acquisition and a shareholder purchase offer.",
        "Connected story collection, KOL dialogue, tastings, engraving, group buying and leaderboards into a content-to-purchase journey.",
        "Defined the owned-media, SMS, trade-media, KOL and social-ad matrix, together with operational and reporting requirements.",
      ],
    },
    outcomes: {
      zh: [
        "交付父亲节主题、内容IP、会员权益、裂变路径、渠道矩阵及落地支持需求。",
        "会员中心整体阶段：2.3亿+曝光、品牌讨论量环比+31%、50万会员、8万+UGC及67%用户主动分享率。",
        "同一整体阶段另记录中秋封坛3分钟售罄、会员月均复购率43%、私域销售占比由不足2%提升至15%。",
      ],
      en: [
        "Delivered the campaign platform, content IP, member-benefit structure, referral journey, channel plan and operational requirements.",
        "Broader programme reporting records 230M+ impressions, brand discussion +31% month on month, 500K members, 80K+ UGC and a 67% active-sharing rate.",
        "The same broader phase records a Mid-Autumn release selling out in three minutes, 43% monthly member repurchase and private sales share rising from under 2% to 15%.",
      ],
    },
    boundary: {
      zh: "以上数据包含其他营销节点，不能归因于618/父亲节单一提案；PDF中的销售额和UV为目标值，不作为实际结果。",
      en: "These figures include other campaign moments and are not attributed solely to the 618/Father’s Day proposal. Sales and UV figures in the proposal are targets, not delivered outcomes.",
    },
    filters: ["strategy", "writing"],
    cover: "/portfolio/covers/wuliangye.jpg",
    documents: [
      {
        id: "wuliangye-plan",
        title: { zh: "五粮液会员中心618 × 父亲节活动策划", en: "Wuliangye Membership Centre 618 × Father’s Day plan" },
        type: { zh: "21页 · 会员内容与增长机制", en: "21 pages · Member content & growth design" },
        src: "/documents/projects/wuliangye-membership-fathers-day.pdf",
        filename: "Wuliangye-Membership-Fathers-Day-Plan.pdf",
        pages: 21,
      },
    ],
  },
];
export const writingDocuments: WritingDocument[] = [
  {
    id: "writing-loccitane-50th",
    number: "01",
    title: { zh: "L’OCCITANE 50周年中国区新闻稿", en: "L’OCCITANE 50th-anniversary China press release" },
    type: { zh: "专业写作 · 新闻稿与品牌本地化", en: "PROFESSIONAL WRITING · PRESS RELEASE & LOCALISATION" },
    description: {
      zh: "将全球50周年信息转化为适合中国媒体语境的品牌历程、焕新方向与核心信息。相关传播数据属于50周年整体项目结果，不单独归因于新闻稿。",
      en: "A China-market adaptation of the global anniversary narrative, covering brand heritage, renewal and media-ready key messages. Campaign figures are not attributed to the release alone.",
    },
    src: "/documents/writing/loccitane-50th-press-release.pdf",
    filename: "LOCCITANE-50th-China-Press-Release.pdf",
    pages: 5,
  },
  {
    id: "writing-dissertation",
    number: "02",
    title: { zh: "好莱坞在中国市场的影响力变化", en: "Hollywood’s changing position in the Chinese film market" },
    type: { zh: "硕士论文 · 传媒产业与受众研究", en: "MA DISSERTATION · MEDIA INDUSTRY & AUDIENCE RESEARCH" },
    description: {
      zh: "结合2018—2023年票房、上映份额、跨平台评分与影片案例，分析受众审美、产业路径依赖和跨市场竞争如何重塑中国电影市场。",
      en: "A mixed-method study combining 2018–2023 box-office data, release shares, audience ratings and film cases to examine structural change in the Chinese market.",
    },
    src: "/documents/writing/hollywood-china-ma-dissertation.pdf",
    filename: "Hollywood-in-the-Chinese-Film-Market-MA-Dissertation.pdf",
    pages: 70,
  },
  {
    id: "writing-greenwashing",
    number: "03",
    title: { zh: "道德消费、全球企业与漂绿", en: "Ethical consumption, global corporations & greenwashing" },
    type: { zh: "课程论文 · 品牌责任与声誉议题", en: "COURSE ESSAY · BRAND RESPONSIBILITY & REPUTATION" },
    description: {
      zh: "以马克思主义、符号学与话语分析审视道德消费、CSR与漂绿之间的张力，讨论品牌承诺如何建立或消耗消费者信任。",
      en: "A critical examination of ethical consumption, CSR and greenwashing, focusing on the gap between corporate claims, business practice and consumer trust.",
    },
    src: "/documents/writing/ethical-consumption-greenwashing.pdf",
    filename: "Ethical-Consumption-and-Greenwashing-Essay.pdf",
    pages: 16,
  },
  {
    id: "writing-fragrance",
    number: "04",
    title: { zh: "高端家居香氛新品传播", en: "Luxury home-fragrance launch communications" },
    type: { zh: "课程案例 · 整合传播策划", en: "COURSE CASE · INTEGRATED COMMUNICATIONS" },
    description: {
      zh: "围绕目标受众、传播触点与内容节奏搭建高端香氛新品的整合传播路径，展示从洞察到执行框架的策略思考。",
      en: "An integrated planning sample for a luxury fragrance launch, built around audience insight, communications touchpoints and content cadence.",
    },
    src: "/documents/writing/luxury-fragrance-imc.pdf",
    filename: "Luxury-Home-Fragrance-IMC-Plan.pdf",
    pages: 9,
  },
  {
    id: "writing-anime",
    number: "05",
    title: { zh: "日本动漫全球化与粉丝文化", en: "Japanese anime globalisation & fandom" },
    type: { zh: "课程论文 · 流行文化与受众研究", en: "COURSE ESSAY · POPULAR CULTURE & AUDIENCE RESEARCH" },
    description: {
      zh: "基于二手文献与文化案例，分析动漫全球化、御宅族标签与社会认知，并观察版权及粉丝社群带来的传播风险。",
      en: "A literature- and case-based analysis of anime globalisation, identity labels, audience perception, copyright and fandom-related communications risk.",
    },
    src: "/documents/writing/anime-globalisation-fandom.pdf",
    filename: "Japanese-Anime-Globalisation-and-Fandom-Essay.pdf",
    pages: 9,
  },
];

export const workExperience = [
  {
    date: { zh: "2025.10 — 至今", en: "2025.10 — PRESENT" },
    organisation: { zh: "上海音睿广告有限公司", en: "Shanghai Yinrui Advertising" },
    role: { zh: "广告公关专员（项目执行）", en: "PR Specialist (Project Delivery)" },
    body: {
      zh: "涵盖新闻稿与内容本地化、活动策划与现场运营、KOL协同及传播数据复盘。",
      en: "Work spanning press and content localisation, activation planning and on-site delivery, KOL coordination and communications reporting.",
    },
  },
  {
    date: { zh: "2024.06 — 2024.09", en: "2024.06 — 2024.09" },
    organisation: { zh: "上海科聚电子有限公司", en: "Shanghai Keju Electronics" },
    role: { zh: "数据整理实习生", en: "Data Operations Intern" },
    body: {
      zh: "协助数据整理、基础分析与可视化，提升Excel应用及数据处理流程能力。",
      en: "Supported data organisation, basic analysis and visualisation, strengthening Excel and structured data workflows.",
    },
  },
  {
    date: { zh: "2023.06 — 2023.09", en: "2023.06 — 2023.09" },
    organisation: { zh: "上海宝和云豹智能有限公司", en: "Shanghai Baohe Yunbao Intelligence" },
    role: { zh: "市场营销实习生", en: "Marketing Intern" },
    body: {
      zh: "协助市场调研、竞品分析、行业信息整理、线上营销及社媒内容工作。",
      en: "Supported market research, competitor analysis, industry information, online marketing and social content.",
    },
  },
];

export const education = [
  {
    date: "2024.09 — 2025.11",
    organisation: "University of Westminster",
    role: { zh: "传媒与传播硕士", en: "MA Media and Communication" },
    ranking: { zh: "QS传播与媒体研究学科全球第31", en: "QS Communication & Media Studies: #31 worldwide" },
  },
  {
    date: "2021.09 — 2024.06",
    organisation: "Newcastle University",
    role: { zh: "媒体、传播与文化研究文学学士", en: "BA Media, Communication and Cultural Studies" },
    ranking: { zh: "QS世界大学综合排名全球第149", en: "QS World University Ranking: #149 worldwide" },
  },
];
