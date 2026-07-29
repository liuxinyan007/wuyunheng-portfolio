"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "zh" | "en";
type Filter = "all" | "activation" | "editorial" | "operations" | "strategy";
type Localized = { zh: string; en: string };
type Media = { src: string; type: "image" | "video"; alt: Localized };

type Project = {
  id: string;
  index: string;
  title: Localized;
  sector: Localized;
  summary: Localized;
  role: Localized;
  context: Localized;
  metricsHeading?: Localized;
  metrics: { value: string; label: Localized }[];
  contributions: { zh: string[]; en: string[] };
  outputs: { zh: string[]; en: string[] };
  boundary: Localized;
  filters: Filter[];
  size: "wide" | "narrow" | "full";
  media: Media[];
};

const ui = {
  zh: {
    skip: "跳到主要内容",
    navWork: "案例",
    navFit: "岗位匹配",
    navWriting: "写作研究",
    navProcess: "方法",
    navProfile: "经历",
    menu: "菜单",
    language: "语言切换",
    eyebrow: "吴蕴恒 — 品牌公关 · 整合营销 · 项目管理",
    heroTitle: ["把复杂产品，", "讲成值得相信的故事。"],
    heroLead:
      "英国传媒本硕背景，覆盖消费科技、奢侈品、美妆、酒旅与会员运营。能把全球叙事、本地内容、跨团队执行与数据复盘连成闭环，并把项目结果讲清楚、把归因边界守准确。",
    viewWork: "查看案例",
    resume: "下载简历",
    availability: "上海 · 开放公关项目机会",
    heroFigure: "TCL意大利四城快闪项目材料",
    heroCaption: "TCL四城快闪 / PDF项目材料",
    proofLabel: "代表性成果",
    proof: [
      ["21.67M+", "TCL现场总人流"],
      ["2.76M+", "TCL内容播放/曝光"],
      ["1M+", "Bonpoint年化阅读"],
      ["CN / EN", "双语跨团队协作"],
    ],
    positioning: "定位 / Positioning",
    positioningTitle: "从Brief到复盘，把每个传播环节做成可交付的证据。",
    positioningBody:
      "我关注的不是一句漂亮口号，而是它如何穿过团队、设计、供应方与现场，最终成为受众能理解的内容。工作方式是先厘清信号，再组织叙事，最后用可靠执行建立信任。",
    capabilities: ["品牌叙事与双语写作", "活动SOP与现场运营", "多平台内容与数据复盘", "总部、团队与供应商协同"],
    selected: "选择性案例 / Selected work",
    selectedTitle: "五个案例，五种把叙事落地的方法。",
    selectedBody: "按业务目标、本人动作、协同复杂度、量化结果与复盘展开。实际结果、年化推算与提案目标分别标注，不混用、不拔高。",
    filtersLabel: "按能力筛选项目",
    filters: {
      all: "全部",
      activation: "活动执行",
      editorial: "内容写作",
      operations: "项目协同",
      strategy: "传播策划",
    } as Record<Filter, string>,
    openCase: "打开案例",
    detailLabels: {
      metrics: "关键结果",
      context: "业务目标",
      contribution: "关键动作",
      outputs: "结果与证据",
      boundary: "复盘与岗位价值",
      gallery: "PDF项目材料",
    },
    close: "关闭",
    roleFit: "岗位匹配 / Tencent CDG PR",
    roleFitTitle: "让岗位描述，落到工作流证据上。",
    roleFitBody:
      "针对CDG公关岗位的四组核心任务，用真实项目中的业务判断、跨团队推动、内容产出与数据复盘逐项对应。",
    evidence: "相关证据",
    scope: "范围边界",
    fitRows: [
      {
        no: "01",
        ask: "支持公关传播项目，并跟进反馈与报道",
        evidence: "TCL四城快闪覆盖方案、物料、现场运营、全球SOP与传播复盘；Bonpoint按月追踪平台数据并据此优化内容节奏。",
        scope: "结果均按项目材料口径呈现；现场总人流不等同于独立到访，年化数据不等同于全年实绩。",
      },
      {
        no: "02",
        ask: "沟通媒体、自媒体、KOL与外部利益相关人",
        evidence: "对接法国总部、中国团队、设计与落地供应商，并在TCL项目中协同14位KOL、四城场地方与当地执行团队。",
        scope: "强调跨团队推动与信息对齐，不把协同经验表述为独立拥有全部外部关系。",
      },
      {
        no: "03",
        ask: "策划落地传播活动，并完成新闻通稿与相关文章",
        evidence: "完成L’OCCITANE两篇本地化新闻稿及总部校准，并参与50周年溯源内容矩阵；同时具备多平台社媒内容运营经验。",
        scope: "写作、策划与执行贡献逐项标明；提案获采纳不等同于全部落地结果。",
      },
      {
        no: "04",
        ask: "理解公关全流程、业务与行业热点",
        evidence: "从消费科技线下活动，到奢侈品社媒增长、酒旅入场与会员私域，均以业务目标—传播动作—结果数据构建闭环。",
        scope: "具备可迁移的消费科技与品牌公关方法，不将其延伸为腾讯内部或互联网大厂从业经验。",
      },
    ],
    writing: "写作与研究 / Writing room",
    writingTitle: "传播判断力，也写在长文本里。",
    writingBody: "新闻稿、整合营销方案与学术研究，构成项目执行之外的思考样本。为保护客户与研究资料，页面仅呈现内容摘要。",
    openPdf: "完整版面试可阅",
    confidentiality: "保密说明 / 预算、私有KOL与媒体名单、内部链接、未来计划及未经核验的目标均已省略；提案与目标不作为结果呈现。",
    docs: [
      {
        title: "L’OCCITANE 文化奖新闻稿",
        type: "新闻稿 · 中英协同",
        desc: "活动新闻稿写作样本，并与法国总部协同中国媒体发布信息。",
      },
      {
        title: "道德消费与漂绿",
        type: "研究论文 · 议题分析",
        desc: "从消费文化与品牌责任出发，观察信任如何被建立或消耗。",
      },
      {
        title: "高端香氛整合营销",
        type: "IMC方案 · 品牌策略",
        desc: "围绕受众、触点与内容节奏搭建的传播规划样本。",
      },
      {
        title: "硕士论文",
        type: "学术研究 · 传媒传播",
        desc: "在英国传媒与传播学习中形成的完整研究与论证样本。",
      },
    ],
    process: "工作方法 / Process",
    processTitle: "信号 → 叙事 → 信任",
    processBody: "一个可复用、也足够务实的传播路径。",
    processSteps: [
      {
        word: "信号",
        en: "SIGNAL",
        title: "先找对真正的问题",
        body: "拆解Brief、品牌语境、行业信息与受众矛盾，确定需要被听见的那一个信号。",
      },
      {
        word: "叙事",
        en: "STORY",
        title: "让信息拥有顺序",
        body: "把核心信息转译为新闻稿、内容主题、视觉需求、活动流程与跨团队都能理解的语言。",
      },
      {
        word: "信任",
        en: "TRUST",
        title: "靠执行兑现承诺",
        body: "用SOP、节点跟进、现场协同与数据复盘守住细节，让传播不只停在提案里。",
      },
    ],
    profile: "经历 / Profile",
    profileTitle: "传播训练来自课堂，更来自现场。",
    profileBody: "现任上海音睿广告有限公司广告公关专员（项目执行），拥有英国媒体、传播与文化研究本科及传媒与传播硕士背景。",
    timeline: [
      ["2025.10 — 至今", "上海音睿广告有限公司", "广告公关专员（项目执行）"],
      ["2024.09 — 2025.11", "University of Westminster", "传媒与传播硕士"],
      ["2021.09 — 2024.06", "Newcastle University", "媒体、传播与文化研究文学学士"],
    ],
    skillLabel: "工具与工作语言",
    skillText: "中文 / 英文 · Office / WPS · Premiere Pro / 剪映",
    ctaKicker: "下一则值得相信的故事",
    ctaTitle: "如果你在找一位能把Brief、文案、设计、活动和复盘串起来的公关项目执行者，我们可以聊聊。",
    emailMe: "发送邮件",
    footer: "吴蕴恒 · 品牌公关作品集",
    footerNote: "信号清晰，叙事有序，执行可信。",
  },
  en: {
    skip: "Skip to main content",
    navWork: "Work",
    navFit: "Role fit",
    navWriting: "Writing",
    navProcess: "Process",
    navProfile: "Profile",
    menu: "Menu",
    language: "Language selector",
    eyebrow: "WU YUNHENG — BRAND PR · INTEGRATED MARKETING · PROJECT DELIVERY",
    heroTitle: ["I turn complex products", "into stories people can trust."],
    heroLead:
      "With UK media degrees at BA and MA level, I work across consumer tech, luxury, beauty, hospitality and membership growth—connecting global narratives, local content, cross-team delivery and measurement while keeping attribution precise.",
    viewWork: "Explore work",
    resume: "View résumé",
    availability: "Shanghai · Open to PR opportunities",
    heroFigure: "Material from TCL's four-city activation in Italy",
    heroCaption: "TCL FOUR-CITY ACTIVATION / PDF SOURCE",
    proofLabel: "SELECTED OUTCOMES",
    proof: [
      ["21.67M+", "TCL venue footfall"],
      ["2.76M+", "TCL content views/reach"],
      ["1M+", "Bonpoint annualised reads"],
      ["CN / EN", "bilingual collaboration"],
    ],
    positioning: "POSITIONING",
    positioningTitle: "From brief to review, every communication step should leave usable evidence.",
    positioningBody:
      "I care about more than a polished line. I care about how it travels through teams, designers, suppliers and the room—until it becomes something an audience can understand. I clarify the signal, shape the story, then earn trust through reliable delivery.",
    capabilities: ["Brand narrative & bilingual writing", "Activation SOPs & on-site operations", "Multi-platform content & reporting", "HQ, team & supplier alignment"],
    selected: "SELECTED WORK",
    selectedTitle: "Five cases. Five ways to move a narrative into the real world.",
    selectedBody: "Each case follows business objective, individual actions, stakeholder complexity, measured outcomes and learning. Actual results, annualised estimates and proposal targets are kept distinct.",
    filtersLabel: "Filter projects by capability",
    filters: {
      all: "All",
      activation: "Activations",
      editorial: "Editorial",
      operations: "Operations",
      strategy: "Strategy",
    } as Record<Filter, string>,
    openCase: "Open case",
    detailLabels: {
      metrics: "Key outcomes",
      context: "Business objective",
      contribution: "Key actions",
      outputs: "Results & evidence",
      boundary: "Learning & role relevance",
      gallery: "PDF project material",
    },
    close: "Close",
    roleFit: "ROLE FIT / TENCENT CDG PR",
    roleFitTitle: "Turning a job description into workflow evidence.",
    roleFitBody:
      "The four core CDG PR responsibilities are mapped to demonstrated business judgement, cross-team delivery, content output and measurement.",
    evidence: "Relevant evidence",
    scope: "Scope boundary",
    fitRows: [
      {
        no: "01",
        ask: "Support PR projects and follow feedback and coverage",
        evidence: "TCL spans planning, assets, on-site operations, a global SOP and reporting; Bonpoint uses monthly platform data to refine content cadence.",
        scope: "Metrics follow supplied reporting: venue footfall is not unique attendance, and annualised figures are not full-year actuals.",
      },
      {
        no: "02",
        ask: "Communicate with media, creators, KOLs and external stakeholders",
        evidence: "Aligned French HQ, China teams, designers and delivery suppliers; TCL also required coordination across 14 KOLs, four venues and local operators.",
        scope: "Shows stakeholder orchestration without claiming sole ownership of every external relationship.",
      },
      {
        no: "03",
        ask: "Deliver communications activities and write press materials",
        evidence: "Delivered two localised L’OCCITANE releases through HQ review, helped shape the 50th-anniversary content system, and operated always-on social content.",
        scope: "Writing, planning and delivery roles are separated; proposal endorsement is not presented as full execution performance.",
      },
      {
        no: "04",
        ask: "Learn the full PR flow, the business and industry themes",
        evidence: "Across consumer-tech activations, luxury social growth, hospitality market entry and membership programmes, work is framed as objective—action—outcome.",
        scope: "The methods transfer to tech PR, but are not presented as Tencent-internal or major-internet-company experience.",
      },
    ],
    writing: "WRITING ROOM",
    writingTitle: "Communications judgement also lives in long-form work.",
    writingBody: "Press writing, integrated marketing proposals and academic research sit alongside project delivery. Only summaries are shown here to protect client and research material.",
    openPdf: "Full sample available in interview",
    confidentiality: "CONFIDENTIALITY / Budgets, private KOL and media lists, internal links, future plans and unverified targets are omitted. Proposals and targets are never presented as results.",
    docs: [
      {
        title: "L’OCCITANE Culture Award Release",
        type: "PRESS RELEASE · BILINGUAL COORDINATION",
        desc: "An event-release sample, including coordination with the French HQ on information for China media distribution.",
      },
      {
        title: "Ethical Consumption & Greenwashing",
        type: "RESEARCH · ISSUE ANALYSIS",
        desc: "A study of consumer culture, brand responsibility and how trust is earned—or lost.",
      },
      {
        title: "Luxury Fragrance IMC",
        type: "IMC PLAN · BRAND STRATEGY",
        desc: "A planning sample structured around audiences, touchpoints and content cadence.",
      },
      {
        title: "MA Dissertation",
        type: "ACADEMIC RESEARCH · MEDIA",
        desc: "A full research and argumentation sample developed during postgraduate media study in the UK.",
      },
    ],
    process: "PROCESS",
    processTitle: "Signal → Story → Trust",
    processBody: "A repeatable and deliberately practical communications path.",
    processSteps: [
      {
        word: "Signal",
        en: "SIGNAL",
        title: "Find the real question first",
        body: "Unpack the brief, brand context, industry information and audience tension to identify the one signal that needs to be heard.",
      },
      {
        word: "Story",
        en: "STORY",
        title: "Give information an order",
        body: "Translate the key message into releases, themes, visual requirements, activation flows and language every team can use.",
      },
      {
        word: "Trust",
        en: "TRUST",
        title: "Deliver on the promise",
        body: "Use SOPs, milestone tracking, on-site coordination and reporting to protect the detail and move ideas beyond the deck.",
      },
    ],
    profile: "PROFILE",
    profileTitle: "The training comes from the classroom—and the room itself.",
    profileBody: "Currently a PR Specialist (Project Execution) at 上海音睿广告有限公司, with a UK BA in Media, Communication and Cultural Studies and an MA in Media and Communication.",
    timeline: [
      ["2025.10 — PRESENT", "上海音睿广告有限公司", "PR Specialist (Project Execution)"],
      ["2024.09 — 2025.11", "University of Westminster", "MA Media and Communication"],
      ["2021.09 — 2024.06", "Newcastle University", "BA Media, Communication and Cultural Studies"],
    ],
    skillLabel: "TOOLS & WORKING LANGUAGES",
    skillText: "Chinese / English · Office / WPS · Premiere Pro / Jianying",
    ctaKicker: "THE NEXT STORY WORTH TRUSTING",
    ctaTitle: "If you need a PR project operator who can connect the brief, copy, design, activation and review, let’s talk.",
    emailMe: "Email me",
    footer: "WU YUNHENG · BRAND PR PORTFOLIO",
    footerNote: "Clear signal. Ordered story. Trusted delivery.",
  },
};

const projects: Project[] = [
  {
    id: "tcl",
    index: "01",
    title: { zh: "TCL · 四城快闪与全球SOP", en: "TCL · Four-city activations & global SOP" },
    sector: { zh: "消费科技 / 整合活动", en: "CONSUMER TECH / INTEGRATED ACTIVATION" },
    summary: {
      zh: "负责意大利四城快闪的项目设计、落地协调、现场运营与社媒传播，并沉淀全球SOP。项目汇总记录现场总人流2167万+、参与人次18.8万+；14位KOL产出38条内容，获得276万+播放/曝光。",
      en: "Designed and coordinated four Italian pop-ups across on-site operations, social amplification and a reusable global SOP. Project reporting records 21.67M+ venue footfall, 188K+ participation instances and 2.76M+ views/reach from 38 pieces of content by 14 KOLs.",
    },
    role: { zh: "项目设计 + 执行统筹 + 传播复盘", en: "PROJECT DESIGN + DELIVERY + REPORTING" },
    context: {
      zh: "在米兰冬奥传播周期，品牌需要把产品体验带入意大利四座城市：既保持全球视觉与品牌口径一致，又要适配不同商场、场地、供应商与现场节奏，并让线下体验沉淀为可传播内容。",
      en: "During the Milan Winter Olympics communications window, the brand needed a consistent product experience across four Italian cities while adapting to different venues, suppliers and operating conditions—and turning offline attention into shareable content.",
    },
    metrics: [
      { value: "21.67M+", label: { zh: "现场总人流", en: "venue footfall" } },
      { value: "188K+", label: { zh: "参与人次", en: "participation instances" } },
      { value: "16K+", label: { zh: "现场互动", en: "on-site interactions" } },
      { value: "4,262+", label: { zh: "礼品发放", en: "gifts distributed" } },
    ],
    contributions: {
      zh: [
        "把品牌目标拆成四城快闪的动线、互动机制、礼品规则与人员分工，形成可执行方案",
        "对接商场、设计、美陈、设备与当地供应商，推进物料修改、制作验收与现场落地",
        "统筹现场运营与数据回收，在不同城市的客流和场地约束下快速校准执行细节",
        "联动14位KOL完成内容发布与数据汇总，并把关键流程沉淀为全球活动SOP",
      ],
      en: [
        "Translated the brand objective into visitor flow, interaction mechanics, gifting rules and team responsibilities",
        "Aligned venues, design, fabrication, equipment and local suppliers through revisions, production checks and installation",
        "Coordinated on-site operations and data capture, adjusting details to each city's traffic and venue constraints",
        "Coordinated 14 KOLs, consolidated performance and codified the operating logic into a global activation SOP",
      ],
    },
    outputs: {
      zh: [
        "线下汇总：现场总人流2167万+、参与人次18.8万+、互动1.6万+、礼品发放4262+",
        "社媒汇总：14位KOL、38条内容、2,766,986播放/曝光、58,184互动、互动率3.78%",
        "交付全球活动SOP，为跨城市复制与团队协作提供统一标准",
      ],
      en: [
        "Offline reporting: 21.67M+ venue footfall, 188K+ participation instances, 16K+ interactions and 4,262+ gifts distributed",
        "Social reporting: 14 KOLs, 38 posts, 2,766,986 views/reach, 58,184 interactions and a 3.78% engagement rate",
        "Delivered a global activation SOP that created one standard for replication and team alignment",
      ],
    },
    boundary: {
      zh: "大型跨城项目需要让标准化SOP与在地快速响应并行；下一轮会把设备、商场、美陈验收与现场演练前置到更细的风险清单。以上为项目汇总口径，“现场总人流”与“参与人次”均不解释为独立访客，项目也不表述为冬奥官方合作。",
      en: "The key learning is to pair a standardised SOP with fast local response; next time, equipment, venue, fabrication checks and rehearsals would move into a more granular risk checklist. Figures follow project reporting: venue footfall and participation instances are not unique attendance, and this is not presented as an official Olympics partnership.",
    },
    filters: ["activation", "operations"],
    size: "wide",
    media: [
      { src: "/portfolio/pdf/tcl-05.jpg", type: "image", alt: { zh: "TCL四城快闪项目概览", en: "TCL four-city activation overview" } },
      { src: "/portfolio/pdf/tcl-06.jpg", type: "image", alt: { zh: "TCL快闪互动与场地规划", en: "TCL activation mechanics and venue planning" } },
      { src: "/portfolio/pdf/tcl-11.jpg", type: "image", alt: { zh: "TCL快闪空间与执行材料", en: "TCL spatial and delivery material" } },
      { src: "/portfolio/pdf/tcl-14.jpg", type: "image", alt: { zh: "TCL现场运营材料", en: "TCL on-site operations material" } },
      { src: "/portfolio/pdf/tcl-18.jpg", type: "image", alt: { zh: "TCL项目结果总结", en: "TCL project outcome summary" } },
    ],
  },
  {
    id: "loccitane",
    index: "02",
    title: { zh: "L’OCCITANE · 50周年品牌叙事", en: "L’OCCITANE · 50th-anniversary narrative" },
    sector: { zh: "美妆 / 整合传播", en: "BEAUTY / INTEGRATED COMMS" },
    summary: {
      zh: "将法国总部的50周年叙事转译为中国市场可传播、可体验的内容体系：主导溯源提案并完成两篇本地化新闻稿。项目总结记录中国区2.3亿+曝光、双话题1.2亿阅读与180万+互动。",
      en: "Translated the global 50th-anniversary story into a China-ready content and experience system, leading an origin-trip proposal and delivering two localised releases. Reporting records 230M+ China impressions, 120M hashtag reads and 1.8M+ interactions.",
    },
    role: { zh: "品牌叙事 + 新闻写作 + 总部协同", en: "BRAND NARRATIVE + EDITORIAL + HQ ALIGNMENT" },
    context: {
      zh: "品牌既要保持法国总部50周年叙事的全球一致性，也要在中国高端美妆语境中，把普罗旺斯、自然、匠心、艺术与幸福愉悦转化为消费者可感知、媒体可采用的内容与体验。",
      en: "At the 50-year milestone, the challenge was to preserve global consistency while making Provence, nature, craftsmanship, art and wellbeing culturally relevant and editorially usable in China.",
    },
    metrics: [
      { value: "230M+", label: { zh: "中国区曝光", en: "China impressions" } },
      { value: "120M", label: { zh: "双话题阅读", en: "hashtag reads" } },
      { value: "1.8M+", label: { zh: "双话题互动", en: "hashtag interactions" } },
      { value: "12M+", label: { zh: "官方内容阅读", en: "official-content reads" } },
    ],
    contributions: {
      zh: [
        "将50年品牌资产拆解为文化根源、自然疗愈、匠心表达与未来焕新四条叙事线",
        "完成两篇中国区新闻稿的撰写、本地化及多轮总部校准",
        "围绕工厂、薰衣草田、SPA、热气球与陶艺工坊搭建溯源旅程及纪录片、KV方向",
        "设计管理层对谈、媒体议题、创作者匹配与UGC路径，形成多阶段内容矩阵",
      ],
      en: [
        "Structured the 50-year story across cultural roots, natural wellbeing, craftsmanship and future-facing renewal",
        "Drafted and localised two China releases through multiple HQ review rounds",
        "Built an origin-trip journey across factory, lavender field, spa, hot-air balloon and artisan workshop touchpoints",
        "Mapped leadership interviews, media narratives, creator fit and UGC into a phased content system",
      ],
    },
    outputs: {
      zh: [
        "50周年传播：中国区2.3亿+曝光；双话题1.2亿阅读、180万+互动；官方内容1200万+阅读、420万视频播放",
        "文化奖议题：50+篇报道、820万+官方内容阅读、260万+视频播放",
        "溯源提案获法国总部与中国团队认可，并被采纳为后续执行蓝本",
      ],
      en: [
        "50th-anniversary reporting: 230M+ China impressions; 120M hashtag reads and 1.8M+ interactions; 12M+ official-content reads and 4.2M video views",
        "Culture Award reporting: 50+ stories, 8.2M+ official-content reads and 2.6M+ video views",
        "The origin-trip proposal was endorsed by the French HQ and China team and adopted as the execution blueprint",
      ],
    },
    boundary: {
      zh: "项目证明了把全球品牌资产转成中国本地内容系统的能力；下一轮会更早锁定素材标签、审批节奏与渠道版本，降低跨总部返工。50周年与文化奖两组数据分别呈现、不合并；材料仅定性描述销售热度提升，不扩写为销售额或增长率。",
      en: "The work demonstrates how global brand assets can become a locally relevant content system; next time, asset tagging, approval cadence and channel versions would be locked earlier. Anniversary and Culture Award results remain separate, and qualitative sales momentum is not expanded into unsupported revenue figures.",
    },
    filters: ["editorial", "strategy"],
    size: "narrow",
    media: [
      { src: "/portfolio/pdf/loccitane-01.jpg", type: "image", alt: { zh: "欧舒丹50周年溯源提案封面", en: "L’OCCITANE 50th-anniversary proposal cover" } },
      { src: "/portfolio/pdf/loccitane-06.jpg", type: "image", alt: { zh: "欧舒丹50周年品牌叙事", en: "L’OCCITANE 50th-anniversary narrative" } },
      { src: "/portfolio/pdf/loccitane-07.jpg", type: "image", alt: { zh: "欧舒丹溯源旅程规划", en: "L’OCCITANE origin-trip journey" } },
      { src: "/portfolio/pdf/loccitane-11.jpg", type: "image", alt: { zh: "欧舒丹体验内容规划", en: "L’OCCITANE experiential content plan" } },
      { src: "/portfolio/pdf/loccitane-17.jpg", type: "image", alt: { zh: "欧舒丹传播内容矩阵", en: "L’OCCITANE communications content matrix" } },
      { src: "/portfolio/pdf/loccitane-41.jpg", type: "image", alt: { zh: "欧舒丹项目总结", en: "L’OCCITANE project summary" } },
    ],
  },
  {
    id: "bonpoint",
    index: "03",
    title: { zh: "Bonpoint · 全渠道社媒增长", en: "Bonpoint · Always-on social growth" },
    sector: { zh: "奢侈品 / 社媒运营", en: "LUXURY / SOCIAL OPERATIONS" },
    summary: {
      zh: "围绕微信、小红书、微博与抖音搭建内容矩阵、发布节奏和月度复盘。截至4月，微信粉丝168,206、较2025年12月增长2.9%；小红书13,973、增长3.2%；按4月表现年化全渠道阅读1M+。",
      en: "Built a four-platform content cadence and monthly review loop. By April, WeChat reached 168,206 followers (+2.9% vs Dec 2025) and RED 13,973 (+3.2%); April performance annualises to 1M+ cross-channel reads.",
    },
    role: { zh: "多平台内容运营 + 数据复盘", en: "MULTI-PLATFORM CONTENT + ANALYTICS" },
    context: {
      zh: "精品童装品牌需要把分散的日常内容转化为稳定的品牌资产：既维持法式高端调性，也要针对不同平台的用户习惯建立清晰节奏，并用月度数据判断增长机会。",
      en: "The brand needed to turn fragmented daily posts into a consistent asset—protecting its French luxury codes while adapting cadence and formats to each platform and using monthly data to identify growth opportunities.",
    },
    metrics: [
      { value: "1M+", label: { zh: "年化全渠道阅读*", en: "annualised reads*" } },
      { value: "+2.9%", label: { zh: "微信粉丝至168,206", en: "WeChat to 168,206" } },
      { value: "+3.2%", label: { zh: "小红书粉丝至13,973", en: "RED to 13,973" } },
      { value: "6.4%", label: { zh: "微信最高打开率", en: "peak WeChat open rate" } },
    ],
    contributions: {
      zh: [
        "按品牌节点、产品故事与用户兴趣搭建微信、小红书、微博、抖音四平台内容矩阵",
        "推进选题、素材、文案、短视频与发布节奏，使同一品牌主题适配不同平台语境",
        "按月汇总粉丝、阅读、打开率与内容表现，识别高效题材和渠道增长差异",
        "用数据复盘反推后续选题、内容形式与发布节奏，建立持续优化闭环",
      ],
      en: [
        "Built a four-platform matrix around brand moments, product stories and audience interests",
        "Coordinated topics, assets, copy, short-form video and publishing cadence for platform-native execution",
        "Consolidated followers, reads, open rates and post performance into a monthly review",
        "Used findings to refine subsequent topics, formats and timing into a repeatable optimisation loop",
      ],
    },
    outputs: {
      zh: [
        "截至4月：微信168,206粉丝，较2025年12月+2.9%；小红书13,973，+3.2%；微博79,000，持平",
        "微信单篇最高打开率6.4%，高于4.4%基准",
        "基于4月数据年化：全渠道阅读1M+；其中微信350K+、小红书80K+、抖音190K+、微博380K+",
      ],
      en: [
        "By April: WeChat 168,206 followers (+2.9% vs Dec 2025), RED 13,973 (+3.2%) and Weibo 79,000 (flat)",
        "Peak WeChat open rate reached 6.4%, above the 4.4% benchmark",
        "Annualised from April: 1M+ cross-channel reads, including WeChat 350K+, RED 80K+, Douyin 190K+ and Weibo 380K+",
      ],
    },
    boundary: {
      zh: "这个案例体现的是用月度数据管理长期内容，而不是只报告单篇爆款。下一步会把内容标签与粉丝净增长进一步关联，强化题材—渠道—增长的因果判断。带“*”的1M+及各平台年度阅读均由4月数据年化推算，不是已发生的全年结果。",
      en: "The value lies in using monthly data to manage an always-on system, not simply reporting a single hit. A next step would link content tags more closely to net follower growth. The 1M+ total and channel-level annual reads are annualised from April, not completed full-year actuals.",
    },
    filters: ["operations", "editorial"],
    size: "narrow",
    media: [
      { src: "/portfolio/pdf/bonpoint-02.jpg", type: "image", alt: { zh: "Bonpoint平台粉丝数据", en: "Bonpoint platform follower data" } },
      { src: "/portfolio/pdf/bonpoint-03.jpg", type: "image", alt: { zh: "Bonpoint多平台内容表现", en: "Bonpoint multi-platform content performance" } },
      { src: "/portfolio/pdf/bonpoint-07.jpg", type: "image", alt: { zh: "Bonpoint内容运营节奏", en: "Bonpoint content operating cadence" } },
      { src: "/portfolio/pdf/bonpoint-13.jpg", type: "image", alt: { zh: "Bonpoint社媒项目总结", en: "Bonpoint social project summary" } },
    ],
  },
  {
    id: "hospitality",
    index: "04",
    title: { zh: "HAUS / LUX · 中国市场入场", en: "HAUS / LUX · China market entry" },
    sector: { zh: "酒旅 / 入场传播策略", en: "HOSPITALITY / MARKET-ENTRY COMMS" },
    summary: {
      zh: "为两个开业前项目把高端酒旅资产转成中国传播方案：HAUS建立“预热—开业—持续声量”三阶段PR体系；LUX*以电影首映叙事串联12年中国旅程与四城体验。两套方案均获认可并进入后续执行方向。",
      en: "Translated two pre-opening hospitality briefs into China-market playbooks: a three-phase PR architecture for HAUS and a cinematic four-city brand-premiere concept for LUX*. Both proposals were endorsed for next-stage execution.",
    },
    role: { zh: "整合传播策略 + 跨市场客户对接", en: "INTEGRATED STRATEGY + CROSS-MARKET ALIGNMENT" },
    context: {
      zh: "HAUS Da Lat需要在2026年开业前建立中国高净值客群、投资与酒旅媒体认知；LUX*则需要在上海外滩项目落地前，将品牌12年中国旅程转化为具有期待感和记忆点的传播事件。",
      en: "HAUS Da Lat needed China-market credibility before opening, while LUX* needed to turn its 12-year China journey into a memorable brand moment ahead of its Shanghai Bund property.",
    },
    metricsHeading: { zh: "方案事实", en: "Proposal facts" },
    metrics: [
      { value: "2", label: { zh: "开业前品牌项目", en: "pre-opening briefs" } },
      { value: "3", label: { zh: "HAUS传播阶段", en: "HAUS PR phases" } },
      { value: "4", label: { zh: "LUX*城市叙事", en: "LUX* city chapters" } },
      { value: "A", label: { zh: "LUX*获采纳方向", en: "adopted LUX* route" } },
    ],
    contributions: {
      zh: [
        "研究品牌资产、项目卖点与目标人群，与海外总部多轮对齐中国市场预期与品牌调性",
        "为HAUS建立信息屋及预热、开业、持续传播三阶段架构，覆盖投资、奢华生活方式、旅行与建筑媒体",
        "搭建媒体、KOL、渠道、时间与评估框架，把抽象定位转成可执行的传播路径",
        "为LUX*提出“旅行成为回忆，回忆成为电影”，用影片、人物与体验串联四城旅程",
      ],
      en: [
        "Researched brand assets, project propositions and audiences, aligning China expectations with overseas stakeholders",
        "Built HAUS's message house and three-phase pre-launch, opening and sustenance architecture",
        "Structured media, KOL, channel, timing and measurement plans into an executable rollout",
        "Developed LUX*'s ‘Travel becomes memories; memories become cinema’ platform across film, storyteller and experience",
      ],
    },
    outputs: {
      zh: [
        "HAUS方案获海外总部与中国团队认可，进入执行筹备",
        "LUX* Option A被采纳为后续执行核心方向",
        "在实体项目尚未完全开放时，将空间资产提前转化为品牌故事、媒体议题与体验触点",
      ],
      en: [
        "The HAUS proposal was endorsed by the overseas HQ and China team and moved into execution preparation",
        "LUX* Option A was adopted as the core direction for next-stage execution",
        "Converted not-yet-open physical assets into brand stories, media narratives and experience touchpoints",
      ],
    },
    boundary: {
      zh: "开业前传播的关键，是先建立可延展的叙事资产，再让媒体、体验与节点服务同一定位。HAUS的潜在触达、报道及社交内容数字均为提案目标；LUX*未提供实际曝光、到场、预订或销售数据，因此不作为结果呈现。",
      en: "Pre-opening communications work best when narrative assets are built before media, experience and milestones activate them. HAUS reach, coverage and social figures are proposal targets; LUX* provides no actual reach, attendance, booking or sales data, so none is presented as performance.",
    },
    filters: ["activation", "editorial", "operations"],
    size: "wide",
    media: [
      { src: "/portfolio/pdf/lux-01.jpg", type: "image", alt: { zh: "LUX*品牌活动创意方案", en: "LUX* brand activation proposal" } },
      { src: "/portfolio/pdf/lux-04.jpg", type: "image", alt: { zh: "LUX*电影首映叙事", en: "LUX* cinematic premiere narrative" } },
      { src: "/portfolio/pdf/lux-05.jpg", type: "image", alt: { zh: "LUX*四城品牌旅程", en: "LUX* four-city brand journey" } },
      { src: "/portfolio/pdf/haus-01.jpg", type: "image", alt: { zh: "HAUS中国公关提案", en: "HAUS China PR proposal" } },
      { src: "/portfolio/pdf/haus-07.jpg", type: "image", alt: { zh: "HAUS三阶段传播架构", en: "HAUS three-phase communications architecture" } },
      { src: "/portfolio/pdf/haus-10.jpg", type: "image", alt: { zh: "HAUS传播执行框架", en: "HAUS communications delivery framework" } },
    ],
  },
  {
    id: "wuliangye",
    index: "05",
    title: { zh: "五粮液 · 会员内容IP与私域增长", en: "Wuliangye · Member IP & private growth" },
    sector: { zh: "酒类 / 会员增长", en: "SPIRITS / MEMBERSHIP GROWTH" },
    summary: {
      zh: "提出“两代人生，一枚好酒”父亲节提案，设计“内容IP—会员权益—裂变拉新—限时转化”机制。会员中心整体阶段总结记录2.3亿+曝光、50万会员、8万+UGC，私域销售占比由不足2%提升至15%。",
      en: "Designed a Father's Day proposal around ‘Two generations, one fine spirit’, linking content IP, member benefits, referrals and conversion. The broader membership-programme summary reports 230M+ impressions, 500K members, 80K+ UGC and private-channel sales share rising from under 2% to 15%.",
    },
    role: { zh: "主题策略 + 私域增长机制设计", en: "CAMPAIGN STRATEGY + PRIVATE-DOMAIN GROWTH" },
    context: {
      zh: "会员中心2.0上线后，面临流量不足、互动偏弱、权益缺少差异化与情感主题缺位的问题。项目需要同时服务年轻用户拉新、老会员身份认同与销售转化。",
      en: "After Membership Center 2.0 launched, the challenge was limited traffic, weak interaction, undifferentiated benefits and no emotional platform—while balancing youth acquisition, member loyalty and conversion.",
    },
    metrics: [
      { value: "230M+", label: { zh: "会员中心整体阶段 · 曝光", en: "broader programme · impressions" } },
      { value: "500K", label: { zh: "会员中心整体阶段 · 会员", en: "broader programme · members" } },
      { value: "80K+", label: { zh: "会员中心整体阶段 · UGC", en: "broader programme · UGC" } },
      { value: "15%", label: { zh: "会员中心整体阶段 · 私域销售占比", en: "broader programme · private sales share" } },
    ],
    contributions: {
      zh: [
        "从白酒代际记忆与父亲节赠礼场景提炼“两代人生，一枚好酒”，把传统文化资产转成当代情感入口",
        "搭建主题播客、会员限时权益、裂变拉新与股东购酒四大模块",
        "把故事征集、KOL对谈、线下品鉴、刻字礼遇、拼团与排行榜串成内容—分享—注册—下单闭环",
        "配置自媒体、短信、行业媒体、KOL与朋友圈广告矩阵，并拆解技术、客服、供应链及数据复盘需求",
      ],
      en: [
        "Derived ‘Two generations, one fine spirit’ from intergenerational memory and Father's Day gifting",
        "Built four modules spanning a branded podcast, member-only offers, referral acquisition and shareholder privileges",
        "Connected stories, KOL dialogue, tastings, engraving, group buying and leaderboards into a content-to-conversion loop",
        "Defined the channel matrix and technical, service, fulfilment and measurement support required for delivery",
      ],
    },
    outputs: {
      zh: [
        "会员中心整体阶段：2.3亿+曝光、品牌讨论量环比+31%、50万会员、8万+UGC、67%用户主动分享率",
        "整体阶段转化：中秋封坛3分钟售罄、会员月均复购率43%、私域销售占比由不足2%提升至15%",
        "将一次节日活动设计为可复用于后续营销节点的会员内容IP与增长机制",
      ],
      en: [
        "Broader programme phase: 230M+ impressions, brand discussion +31% MoM, 500K members, 80K+ UGC and 67% active sharing",
        "Broader conversion indicators: Mid-Autumn release sold out in three minutes, 43% monthly member repurchase and private sales share up from under 2% to 15%",
        "Designed the activation as a repeatable member-content IP and growth mechanism rather than a one-off promotion",
      ],
    },
    boundary: {
      zh: "项目价值在于把会员中心从交易工具升级为内容、社群与品牌IP载体。下一轮会在活动前建立更细的拉新—活跃—复购分层看板。以上数据属于会员中心整体阶段总结，包含其他节点，不能全部归因于618/父亲节单一活动；PDF中的销售额与UV为目标，不作为结果。",
      en: "The strategic value was reframing the membership centre as a content, community and brand-IP asset. Next time, acquisition, activation and repurchase would be separated in the dashboard before launch. Figures belong to the broader programme phase, including other moments, and are not attributed solely to Father's Day; sales and UV figures elsewhere in the PDF are targets, not outcomes.",
    },
    filters: ["strategy", "editorial"],
    size: "full",
    media: [
      { src: "/portfolio/pdf/wuliangye-01.jpg", type: "image", alt: { zh: "五粮液会员中心活动提案", en: "Wuliangye membership activation proposal" } },
      { src: "/portfolio/pdf/wuliangye-06.jpg", type: "image", alt: { zh: "五粮液会员中心业务问题", en: "Wuliangye membership business challenge" } },
      { src: "/portfolio/pdf/wuliangye-10.jpg", type: "image", alt: { zh: "五粮液代际叙事主题", en: "Wuliangye intergenerational narrative" } },
      { src: "/portfolio/pdf/wuliangye-13.jpg", type: "image", alt: { zh: "五粮液内容IP模块", en: "Wuliangye content-IP modules" } },
      { src: "/portfolio/pdf/wuliangye-14.jpg", type: "image", alt: { zh: "五粮液会员权益机制", en: "Wuliangye member-benefit mechanics" } },
      { src: "/portfolio/pdf/wuliangye-15.jpg", type: "image", alt: { zh: "五粮液裂变增长路径", en: "Wuliangye referral-growth journey" } },
    ],
  },
];

function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function MediaItem({ media, lang, card = false, reduceMotion = false }: { media: Media; lang: Lang; card?: boolean; reduceMotion?: boolean }) {
  if (media.type === "video") {
    return (
      <video
        src={assetPath(media.src)}
        aria-label={media.alt[lang]}
        muted={card}
        loop={card}
        autoPlay={card && !reduceMotion}
        playsInline
        controls={!card}
        preload="metadata"
      />
    );
  }

  return <img src={assetPath(media.src)} alt={media.alt[lang]} loading={card ? "lazy" : "eager"} />;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const c = ui[lang];

  const selected = projects.find((project) => project.id === selectedId) ?? null;
  const visibleProjects = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.filters.includes(filter))),
    [filter],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("wyh-portfolio-language");
      const initial: Lang = saved === "en" ? "en" : "zh";
      setLang(initial);
      document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";
    } catch {
      document.documentElement.lang = "zh-CN";
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mediaQuery.matches);
    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);
    return () => mediaQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filter, reduceMotion]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("modal-open");
    }

    if (!selected && dialog.open) dialog.close();

    return () => document.body.classList.remove("modal-open");
  }, [selected]);

  function switchLanguage(next: Lang) {
    setLang(next);
    setMenuOpen(false);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    try {
      window.localStorage.setItem("wyh-portfolio-language", next);
    } catch {
      // The language still switches when storage is unavailable.
    }
  }

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedId(null);
    document.body.classList.remove("modal-open");
  }

  const navItems = [
    ["#work", c.navWork],
    ["#role-fit", c.navFit],
    ["#writing", c.navWriting],
    ["#process", c.navProcess],
    ["#profile", c.navProfile],
  ];

  return (
    <>
      <a className="skip-link" href="#main">{c.skip}</a>

      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label={lang === "zh" ? "返回首页" : "Back to top"}>
            <span>WYH</span>
            <span className="brand-slash">/</span>
            <span>PR</span>
          </a>

          <nav className="desktop-nav" aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
            {navItems.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="nav-actions">
            <div className="language-toggle" role="group" aria-label={c.language}>
              <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => switchLanguage("zh")} aria-pressed={lang === "zh"}>中</button>
              <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLanguage("en")} aria-pressed={lang === "en"}>EN</button>
            </div>
            <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
              <span>{c.menu}</span>
              <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
            </button>
          </div>
        </div>

        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label={lang === "zh" ? "移动导航" : "Mobile navigation"}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span aria-hidden="true">↘</span></a>)}
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow reveal">{c.eyebrow}</p>
            <h1 className={`display-title reveal ${lang === "en" ? "display-title-en" : ""}`}>
              {c.heroTitle.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <div className="hero-lower reveal">
              <p className="hero-lead">{c.heroLead}</p>
              <div className="hero-actions">
                <a className="primary-link" href="#work">{c.viewWork}<span aria-hidden="true">↘</span></a>
                <a className="secondary-link" href={assetPath("/documents/wu-yunheng-resume.pdf")} download="wu-yunheng-resume.pdf">{c.resume}<span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <p className="availability reveal"><span aria-hidden="true" />{c.availability}</p>
          </div>

          <div className="hero-visual reveal">
            <div className="visual-index" aria-hidden="true">01—05</div>
            <figure>
              <img src={assetPath("/portfolio/pdf/tcl-05.jpg")} alt={c.heroFigure} />
              <figcaption>
                <span>{c.heroCaption}</span>
                <span>↗</span>
              </figcaption>
            </figure>
            <div className="signal-ribbon" aria-hidden="true">
              <span>SIGNAL</span><b>→</b><span>STORY</span><b>→</b><span>TRUST</span>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label={c.proofLabel}>
          <div className="proof-inner">
            <p>{c.proofLabel}</p>
            <div className="proof-grid">
              {c.proof.map(([value, label]) => (
                <div className="proof-item" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section positioning-section reveal">
          <div className="section-label">{c.positioning}</div>
          <div className="positioning-content">
            <h2>{c.positioningTitle}</h2>
            <div className="positioning-detail">
              <p>{c.positioningBody}</p>
              <ul>
                {c.capabilities.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading reveal">
            <div className="section-label">{c.selected}</div>
            <div>
              <h2>{c.selectedTitle}</h2>
              <p>{c.selectedBody}</p>
            </div>
          </div>

          <div className="filter-bar reveal" role="group" aria-label={c.filtersLabel}>
            {(Object.keys(c.filters) as Filter[]).map((item) => (
              <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
                {c.filters[item]}
              </button>
            ))}
          </div>

          <aside className="scope-banner reveal">
            <span aria-hidden="true">✦</span>
            <p>{c.confidentiality}</p>
          </aside>

          <p className="sr-only" aria-live="polite">{visibleProjects.length} {lang === "zh" ? "个案例" : "cases"}</p>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className={`project-card project-${project.size} reveal`} key={project.id}>
                <button type="button" className="project-open" onClick={() => setSelectedId(project.id)} aria-label={`${c.openCase}: ${project.title[lang]}`} aria-haspopup="dialog">
                  <div className="project-media">
                    <MediaItem media={project.media[0]} lang={lang} card reduceMotion={reduceMotion} />
                    <div className="project-hover"><span>{c.openCase}</span><b aria-hidden="true">↗</b></div>
                  </div>
                  <div className="project-topline">
                    <span>{project.index}</span>
                    <span>{project.sector[lang]}</span>
                  </div>
                  <h3>{project.title[lang]}</h3>
                  <p>{project.summary[lang]}</p>
                  <div className="project-role"><span>{lang === "zh" ? "贡献范围" : "ROLE SCOPE"}</span><strong>{project.role[lang]}</strong></div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="role-fit" id="role-fit">
          <div className="role-fit-inner">
            <div className="section-heading role-fit-heading reveal">
              <div className="section-label">{c.roleFit}</div>
              <div>
                <h2>{c.roleFitTitle}</h2>
                <p>{c.roleFitBody}</p>
              </div>
            </div>

            <div className="fit-table">
              {c.fitRows.map((row) => (
                <article className="fit-row reveal" key={row.no}>
                  <div className="fit-no">{row.no}</div>
                  <h3>{row.ask}</h3>
                  <div><span>{c.evidence}</span><p>{row.evidence}</p></div>
                  <div><span>{c.scope}</span><p>{row.scope}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section writing-section" id="writing">
          <div className="section-heading reveal">
            <div className="section-label">{c.writing}</div>
            <div>
              <h2>{c.writingTitle}</h2>
              <p>{c.writingBody}</p>
            </div>
          </div>

          <div className="document-grid">
            {c.docs.map((doc, index) => (
              <article className="document-item reveal" key={doc.title}>
                <span className="document-no">0{index + 1}</span>
                <span className="document-type">{doc.type}</span>
                <h3>{doc.title}</h3>
                <p>{doc.desc}</p>
                <span className="document-open">{c.openPdf}<b aria-hidden="true">—</b></span>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section process-inner">
            <div className="section-heading reveal">
              <div className="section-label">{c.process}</div>
              <div>
                <h2>{c.processTitle}</h2>
                <p>{c.processBody}</p>
              </div>
            </div>
            <div className="process-grid">
              {c.processSteps.map((step, index) => (
                <article className="process-step reveal" key={step.en}>
                  <div className="process-number">0{index + 1}</div>
                  <div className="process-word"><span>{step.word}</span><small>{step.en}</small></div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section profile-section" id="profile">
          <div className="section-heading reveal">
            <div className="section-label">{c.profile}</div>
            <div>
              <h2>{c.profileTitle}</h2>
              <p>{c.profileBody}</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="timeline">
              {c.timeline.map(([date, place, role]) => (
                <article className="timeline-row reveal" key={`${date}-${place}`}>
                  <time>{date}</time>
                  <div><h3>{place}</h3><p>{role}</p></div>
                </article>
              ))}
            </div>
            <aside className="skills-panel reveal">
              <span>{c.skillLabel}</span>
              <p>{c.skillText}</p>
              <a href={assetPath("/documents/wu-yunheng-resume.pdf")} download="wu-yunheng-resume.pdf">{c.resume}<b aria-hidden="true">↓</b></a>
            </aside>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-inner reveal">
            <p>{c.ctaKicker}</p>
            <h2>{c.ctaTitle}</h2>
            <div className="contact-links">
              <a href="mailto:wu18217350179@163.com">wu18217350179@163.com <span aria-hidden="true">↗</span></a>
              <a href={assetPath("/documents/wu-yunheng-resume.pdf")} download="wu-yunheng-resume.pdf">{c.resume} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{c.footer}</span>
        <span>{c.footerNote}</span>
        <a href="#top">{lang === "zh" ? "回到顶部" : "BACK TO TOP"} ↑</a>
      </footer>

      <dialog ref={dialogRef} className="case-dialog" onClose={() => setSelectedId(null)} aria-labelledby={selected ? `dialog-${selected.id}` : undefined}>
        {selected && (
          <div className="dialog-shell">
            <header className="dialog-header">
              <div><span>{selected.index} / 05</span><span>{selected.sector[lang]}</span></div>
              <button type="button" onClick={closeDialog} aria-label={c.close}>{c.close}<b aria-hidden="true">×</b></button>
            </header>

            <div className="dialog-intro">
              <h2 id={`dialog-${selected.id}`}>{selected.title[lang]}</h2>
              <p>{selected.summary[lang]}</p>
            </div>

            <section className="dialog-results" aria-label={selected.metricsHeading?.[lang] ?? c.detailLabels.metrics}>
              <div className="dialog-results-label">
                <span>{selected.metricsHeading?.[lang] ?? c.detailLabels.metrics}</span>
                <span>01—04</span>
              </div>
              <div className="dialog-metrics">
                {selected.metrics.map((metric) => (
                  <div className="dialog-metric" key={`${selected.id}-${metric.value}-${metric.label.en}`}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label[lang]}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="dialog-evidence">
              <section>
                <span>{c.detailLabels.context}</span>
                <p>{selected.context[lang]}</p>
              </section>
              <section>
                <span>{c.detailLabels.contribution}</span>
                <ul>{selected.contributions[lang].map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <span>{c.detailLabels.outputs}</span>
                <ul>{selected.outputs[lang].map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="boundary-note">
                <span>{c.detailLabels.boundary}</span>
                <p>{selected.boundary[lang]}</p>
              </section>
            </div>

            <div className="dialog-gallery">
              <div className="dialog-gallery-label"><span>{c.detailLabels.gallery}</span><span>{selected.media.length.toString().padStart(2, "0")} ITEMS</span></div>
              {selected.media.map((media) => <figure key={media.src}><MediaItem media={media} lang={lang} /></figure>)}
            </div>

            <button type="button" className="dialog-close-bottom" onClick={closeDialog}>{c.close}<span aria-hidden="true">↑</span></button>
          </div>
        )}
      </dialog>
    </>
  );
}
