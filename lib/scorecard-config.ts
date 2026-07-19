import type { Localized } from "@/lib/i18n";

export interface ScorecardOption {
  value: string;
  label: Localized;
}

export interface ScorecardQuestion {
  id: string;
  label: Localized;
  options: ScorecardOption[];
}

const readinessQuestions: ScorecardQuestion[] = [
  {
    id: "sector",
    label: { en: "Which sector are you entering?", ar: "أي قطاع تدخل؟" },
    options: [
      { value: "energy-infrastructure", label: { en: "Energy & infrastructure", ar: "الطاقة والبنية التحتية" } },
      { value: "telecom-tech", label: { en: "Telecom & tech", ar: "الاتصالات والتقنية" } },
      { value: "real-estate-tourism", label: { en: "Real estate & tourism", ar: "العقارات والسياحة" } },
      { value: "healthcare", label: { en: "Healthcare", ar: "الرعاية الصحية" } },
      { value: "agriculture", label: { en: "Agriculture & agribusiness", ar: "الزراعة والصناعات الغذائية" } },
      { value: "banking-financial-services", label: { en: "Banking & financial services", ar: "الخدمات المصرفية والمالية" } },
    ],
  },
  {
    id: "budget",
    label: {
      en: "Target investment budget (USD)",
      ar: "الميزانية الاستثمارية المستهدفة (بالدولار)",
    },
    options: [
      { value: "under-250k", label: { en: "Under $250k", ar: "أقل من 250 ألفًا" } },
      { value: "250k-1m", label: { en: "$250k – $1M", ar: "من 250 ألفًا إلى مليون" } },
      { value: "1m-10m", label: { en: "$1M – $10M", ar: "من مليون إلى 10 ملايين" } },
      { value: "over-10m", label: { en: "Over $10M", ar: "أكثر من 10 ملايين" } },
    ],
  },
  {
    id: "risk",
    label: { en: "Your risk tolerance", ar: "قدرتك على تحمّل المخاطر" },
    options: [
      { value: "low", label: { en: "Low — we need strong certainty", ar: "منخفضة — نحتاج يقينًا عاليًا" } },
      { value: "medium", label: { en: "Medium — measured bets", ar: "متوسطة — رهانات محسوبة" } },
      { value: "high", label: { en: "High — early-mover appetite", ar: "مرتفعة — شهية الداخل المبكر" } },
    ],
  },
  {
    id: "mena-experience",
    label: {
      en: "Prior operating experience in MENA?",
      ar: "هل لديكم خبرة تشغيلية سابقة في المنطقة؟",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "origin",
    label: { en: "Primary market of origin", ar: "سوق المنشأ الرئيسي" },
    options: [
      { value: "gulf", label: { en: "Gulf", ar: "الخليج" } },
      { value: "turkey", label: { en: "Turkey", ar: "تركيا" } },
      { value: "europe", label: { en: "Europe", ar: "أوروبا" } },
      { value: "north-america", label: { en: "North America", ar: "أمريكا الشمالية" } },
      { value: "diaspora", label: { en: "Syrian diaspora capital", ar: "رأسمال الاغتراب السوري" } },
      { value: "other", label: { en: "Other", ar: "أخرى" } },
    ],
  },
  {
    id: "data-position",
    label: {
      en: "Do you have Syria-specific market data for your sector?",
      ar: "هل لديكم بيانات سوق خاصة بسوريا في قطاعكم؟",
    },
    options: [
      { value: "none", label: { en: "None yet", ar: "لا شيء بعد" } },
      { value: "proxy", label: { en: "Some proxy or regional data", ar: "بيانات بديلة أو إقليمية جزئية" } },
      { value: "commissioned", label: { en: "Commissioned research in hand", ar: "بحث مُكلَّف به ومنجز" } },
    ],
  },
  {
    id: "stakeholder-plan",
    label: {
      en: "Do you have a stakeholder-communications plan for government and community bodies?",
      ar: "هل لديكم خطة اتصالات لأصحاب المصلحة من جهات حكومية ومجتمعية؟",
    },
    options: [
      { value: "no", label: { en: "No", ar: "لا" } },
      { value: "draft", label: { en: "A draft or partial plan", ar: "مسودة أو خطة جزئية" } },
      { value: "yes", label: { en: "Yes, a working plan", ar: "نعم، خطة فاعلة" } },
    ],
  },
  {
    id: "local-ties",
    label: {
      en: "Do you have local partners or diaspora ties on the ground?",
      ar: "هل لديكم شركاء محليون أو روابط اغتراب على الأرض؟",
    },
    options: [
      { value: "none", label: { en: "None", ar: "لا يوجد" } },
      { value: "informal", label: { en: "Informal relationships", ar: "علاقات غير رسمية" } },
      { value: "formal", label: { en: "Formal partnerships", ar: "شراكات رسمية" } },
    ],
  },
  {
    id: "localization",
    label: {
      en: "Is your brand content produced natively in Arabic?",
      ar: "هل يُنتج محتوى علامتكم بالعربية كتابةً أصيلة؟",
    },
    options: [
      { value: "no", label: { en: "No Arabic content yet", ar: "لا محتوى عربيًا بعد" } },
      { value: "translated", label: { en: "Translated from English", ar: "مترجم عن الإنجليزية" } },
      { value: "native", label: { en: "Drafted natively in Arabic", ar: "يُكتب بالعربية أصلًا" } },
    ],
  },
];

export type ScorecardAnswers = Record<string, string>;

const readinessDimensions: ScorecardDimension[] = [
  { id: "data", label: { en: "Data readiness", ar: "جاهزية البيانات" } },
  {
    id: "stakeholder",
    label: { en: "Stakeholder communications", ar: "اتصالات أصحاب المصلحة" },
  },
  { id: "trust", label: { en: "Local trust", ar: "الثقة المحلية" } },
  {
    id: "localization",
    label: { en: "Brand localization", ar: "توطين العلامة" },
  },
];

const workflowQuestions: ScorecardQuestion[] = [
  {
    id: "team-size",
    label: { en: "How large is your marketing team?", ar: "ما حجم فريقكم التسويقي؟" },
    options: [
      { value: "1-5", label: { en: "1–5 people", ar: "من 1 إلى 5 أشخاص" } },
      { value: "6-15", label: { en: "6–15 people", ar: "من 6 إلى 15 شخصًا" } },
      { value: "16-plus", label: { en: "16 or more", ar: "16 شخصًا أو أكثر" } },
    ],
  },
  {
    id: "ai-usage",
    label: {
      en: "How does your team use AI today?",
      ar: "كيف يستخدم فريقكم الذكاء الاصطناعي اليوم؟",
    },
    options: [
      { value: "none", label: { en: "Not at all", ar: "لا يستخدمه إطلاقًا" } },
      { value: "adhoc", label: { en: "Ad hoc — individuals use chat tools on their own", ar: "استخدام فردي متفرق لأدوات المحادثة" } },
      { value: "piloted", label: { en: "Structured pilots in parts of the workflow", ar: "تجارب منظمة في أجزاء من سير العمل" } },
      { value: "embedded", label: { en: "Embedded in daily production", ar: "مدمج في الإنتاج اليومي" } },
    ],
  },
  {
    id: "briefing-process",
    label: {
      en: "How are campaigns briefed and approved?",
      ar: "كيف تُسنَد الحملات وتُعتمد؟",
    },
    options: [
      { value: "informal", label: { en: "Informally — email and chat", ar: "بشكل غير رسمي — بريد ومراسلات" } },
      { value: "documented", label: { en: "Documented briefs, manual approvals", ar: "موجزات موثّقة واعتمادات يدوية" } },
      { value: "systematic", label: { en: "Standardized briefs and an approval workflow", ar: "موجزات موحّدة ومسار اعتماد واضح" } },
    ],
  },
  {
    id: "arabic-production",
    label: {
      en: "How is your Arabic content produced?",
      ar: "كيف يُنتَج محتواكم العربي؟",
    },
    options: [
      { value: "translated", label: { en: "Translated from English", ar: "يُترجم عن الإنجليزية" } },
      { value: "mixed", label: { en: "A mix of translation and native drafting", ar: "مزيج من الترجمة والكتابة الأصيلة" } },
      { value: "native", label: { en: "Drafted natively in Arabic", ar: "يُكتب بالعربية أصلًا" } },
    ],
  },
  {
    id: "arabic-review",
    label: {
      en: "Who reviews AI-generated Arabic before it is published?",
      ar: "من يراجع العربية المولَّدة بالذكاء الاصطناعي قبل النشر؟",
    },
    options: [
      { value: "none", label: { en: "No one — it goes out as generated", ar: "لا أحد — تُنشر كما وُلّدت" } },
      { value: "adhoc", label: { en: "Whoever is available", ar: "من يكون متاحًا وقتها" } },
      { value: "native-editor", label: { en: "A designated native-Arabic editor", ar: "محرر معيّن لغته الأم العربية" } },
    ],
  },
  {
    id: "ai-policy",
    label: {
      en: "Do you have rules for AI tools and data handling?",
      ar: "هل لديكم قواعد لأدوات الذكاء الاصطناعي ومعالجة البيانات؟",
    },
    options: [
      { value: "none", label: { en: "No rules yet", ar: "لا قواعد بعد" } },
      { value: "informal", label: { en: "Informal guidance", ar: "إرشادات غير رسمية" } },
      { value: "formal", label: { en: "A written policy the team follows", ar: "سياسة مكتوبة يلتزم بها الفريق" } },
    ],
  },
  {
    id: "data-sensitivity",
    label: {
      en: "Does campaign work involve customer or regulated data?",
      ar: "هل يتعامل عمل الحملات مع بيانات عملاء أو بيانات خاضعة للتنظيم؟",
    },
    options: [
      { value: "no", label: { en: "No", ar: "لا" } },
      { value: "yes-uncontrolled", label: { en: "Yes — handled case by case", ar: "نعم — تُعالج حالة بحالة" } },
      { value: "yes-controlled", label: { en: "Yes — with defined controls", ar: "نعم — بضوابط محددة" } },
    ],
  },
  {
    id: "measurement",
    label: {
      en: "How do you measure campaign performance?",
      ar: "كيف تقيسون أداء الحملات؟",
    },
    options: [
      { value: "none", label: { en: "Rarely, or after the fact", ar: "نادرًا، أو بعد انتهاء الحملة" } },
      { value: "channel", label: { en: "Channel dashboards, no shared KPIs", ar: "لوحات لكل قناة دون مؤشرات مشتركة" } },
      { value: "unified", label: { en: "Shared KPIs reviewed on a cadence", ar: "مؤشرات مشتركة تُراجع دوريًا" } },
    ],
  },
];

const workflowDimensions: ScorecardDimension[] = [
  {
    id: "workflow",
    label: { en: "Workflow maturity", ar: "نضج سير العمل" },
  },
  {
    id: "arabic",
    label: { en: "Arabic output quality", ar: "جودة المخرجات العربية" },
  },
  {
    id: "governance",
    label: { en: "Governance & data handling", ar: "الحوكمة ومعالجة البيانات" },
  },
  { id: "measurement", label: { en: "Measurement", ar: "القياس" } },
];

export interface ScorecardDimension {
  id: string;
  label: Localized;
}

export interface ScorecardVariantConfig {
  modelVersion: string;
  questions: ScorecardQuestion[];
  dimensions: ScorecardDimension[];
}

export const scorecardVariants = {
  readiness: {
    modelVersion: "v1",
    questions: readinessQuestions,
    dimensions: readinessDimensions,
  },
  workflow: {
    modelVersion: "workflow-v1",
    questions: workflowQuestions,
    dimensions: workflowDimensions,
  },
} satisfies Record<string, ScorecardVariantConfig>;

export type ScorecardVariantId = keyof typeof scorecardVariants;

export function isScorecardVariantId(
  value: string
): value is ScorecardVariantId {
  return value in scorecardVariants;
}
