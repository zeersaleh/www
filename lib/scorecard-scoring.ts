import "server-only";
import type { Locale, Localized } from "@/lib/i18n";
import {
  scorecardVariants,
  type ScorecardAnswers,
  type ScorecardVariantId,
} from "@/lib/scorecard-config";

export interface ScorecardResult {
  modelVersion: string;
  overall: number;
  dimensions: { id: string; label: string; score: number }[];
  risks: string[];
}

interface RiskRule {
  applies: (a: ScorecardAnswers) => boolean;
  message: Localized;
}

interface ScoringModel {
  /** Per-dimension weight; weights sum to 1. */
  weights: Record<string, number>;
  /** dimension id → question id → option value → 0–100 score. */
  maps: Record<string, Record<string, Record<string, number>>>;
  risks: RiskRule[];
}

/**
 * Tibyan scoring models, one per scorecard variant.
 * Each dimension is scored 0–100 from the relevant answers; the overall
 * score is the weighted mean. Weights and mappings are deliberately simple
 * and documented so results are explainable to the lead on a call.
 */
const scoringModels: Record<ScorecardVariantId, ScoringModel> = {
  readiness: {
    weights: {
      data: 0.3,
      stakeholder: 0.25,
      trust: 0.25,
      localization: 0.2,
    },
    maps: {
      data: {
        "data-position": { none: 15, proxy: 55, commissioned: 90 },
        "mena-experience": { no: 30, yes: 75 },
      },
      stakeholder: {
        "stakeholder-plan": { no: 15, draft: 55, yes: 90 },
      },
      trust: {
        "local-ties": { none: 15, informal: 50, formal: 90 },
        origin: {
          diaspora: 85,
          gulf: 65,
          turkey: 60,
          europe: 45,
          "north-america": 40,
          other: 45,
        },
      },
      localization: {
        localization: { no: 10, translated: 45, native: 90 },
      },
    },
    risks: [
      {
        applies: (a) => a["data-position"] === "none",
        message: {
          en: "You have no Syria-specific data. Decisions made now will rest on assumption — commission proxy modeling before committing spend.",
          ar: "لا تملكون بيانات خاصة بسوريا. أي قرار الآن سيقوم على الافتراض — ابدأوا بنمذجة بيانات بديلة قبل الالتزام بأي إنفاق.",
        },
      },
      {
        applies: (a) => a["stakeholder-plan"] === "no",
        message: {
          en: "No stakeholder-communications plan. In a scrutinized reconstruction market, this is the single fastest way to turn a good project into a public problem.",
          ar: "لا توجد خطة اتصالات لأصحاب المصلحة. في سوق إعمار خاضع للتدقيق، هذا أسرع طريق لتحويل مشروع جيد إلى مشكلة علنية.",
        },
      },
      {
        applies: (a) => a["local-ties"] === "none",
        message: {
          en: "No local or diaspora ties. Trust cannot be bought with media spend here — a partnership and diaspora-bridge program should precede consumer marketing.",
          ar: "لا روابط محلية أو اغترابية. الثقة هنا لا تُشترى بالإنفاق الإعلاني — ينبغي أن يسبق برنامجُ شراكات وجسرِ اغتراب أيَّ تسويق استهلاكي.",
        },
      },
      {
        applies: (a) => a["localization"] !== "native",
        message: {
          en: "Your Arabic content is translated or absent. Audiences detect translated content within a sentence; budget for native Arabic drafting from day one.",
          ar: "محتواكم العربي مترجم أو غائب. الجمهور يكشف المحتوى المترجم من الجملة الأولى؛ خصّصوا ميزانية لكتابة عربية أصيلة من اليوم الأول.",
        },
      },
      {
        applies: (a) => a["risk"] === "low",
        message: {
          en: "Low risk tolerance in an early, fast-moving market. Consider a phased entry with defined evidence gates rather than waiting for full certainty.",
          ar: "قدرة منخفضة على تحمل المخاطر في سوق مبكر سريع الحركة. فكّروا في دخول مرحلي ببوابات أدلة محددة بدل انتظار اليقين الكامل.",
        },
      },
      {
        applies: (a) =>
          a["budget"] === "over-10m" && a["stakeholder-plan"] !== "yes",
        message: {
          en: "A $10M+ commitment without a working stakeholder plan concentrates reputational risk. Communications planning should move in step with capital planning.",
          ar: "التزام يتجاوز 10 ملايين دولار دون خطة فاعلة لأصحاب المصلحة يركّز المخاطر السمعية. ينبغي أن يسير تخطيط الاتصالات بموازاة تخطيط رأس المال.",
        },
      },
    ],
  },
  workflow: {
    weights: {
      workflow: 0.3,
      arabic: 0.25,
      governance: 0.25,
      measurement: 0.2,
    },
    maps: {
      workflow: {
        "ai-usage": { none: 10, adhoc: 35, piloted: 65, embedded: 90 },
        "briefing-process": { informal: 25, documented: 60, systematic: 90 },
      },
      arabic: {
        "arabic-production": { translated: 30, mixed: 60, native: 90 },
        "arabic-review": { none: 10, adhoc: 45, "native-editor": 90 },
      },
      governance: {
        "ai-policy": { none: 15, informal: 50, formal: 90 },
        "data-sensitivity": {
          no: 80,
          "yes-uncontrolled": 25,
          "yes-controlled": 85,
        },
      },
      measurement: {
        measurement: { none: 15, channel: 55, unified: 90 },
      },
    },
    risks: [
      {
        applies: (a) => a["ai-policy"] === "none",
        message: {
          en: "AI is in use with no written rules. Agree tool, data, and disclosure rules with legal and compliance before scaling — retrofitting governance is far more expensive.",
          ar: "الذكاء الاصطناعي مستخدم دون قواعد مكتوبة. اتفقوا مع الشؤون القانونية والامتثال على قواعد الأدوات والبيانات والإفصاح قبل التوسع — فترقيع الحوكمة لاحقًا أعلى كلفة بكثير.",
        },
      },
      {
        applies: (a) => a["ai-usage"] === "adhoc",
        message: {
          en: "AI use is individual and invisible. Gains stay personal, risks stay unmanaged, and nothing compounds — a structured pilot on a live campaign converts scattered experimentation into team capability.",
          ar: "استخدام الذكاء الاصطناعي فردي وغير مرئي. تبقى المكاسب شخصية والمخاطر بلا إدارة ولا يتراكم شيء — تجربة منظمة على حملة فعلية تحوّل التجارب المتناثرة إلى قدرة للفريق.",
        },
      },
      {
        applies: (a) => a["arabic-review"] !== "native-editor",
        message: {
          en: "No designated native-Arabic editor over AI output. Audiences detect machine Arabic within a sentence; an evaluation standard and a named reviewer should precede any scaled Arabic generation.",
          ar: "لا محرر معيّنًا لغته الأم العربية يراجع مخرجات الذكاء الاصطناعي. الجمهور يكشف العربية الآلية من الجملة الأولى؛ ينبغي أن يسبق معيارُ تقييم ومراجعٌ محدد أيَّ توليد عربي موسّع.",
        },
      },
      {
        applies: (a) => a["data-sensitivity"] === "yes-uncontrolled",
        message: {
          en: "Customer or regulated data is reaching AI tools case by case. Define which data classes may enter which tools — one leak outweighs a year of efficiency gains.",
          ar: "بيانات العملاء أو البيانات الخاضعة للتنظيم تصل إلى أدوات الذكاء الاصطناعي حالة بحالة. حدّدوا أي أصناف بيانات يجوز إدخالها في أي أدوات — فتسريب واحد يمحو مكاسب كفاءة سنة كاملة.",
        },
      },
      {
        applies: (a) => a["measurement"] === "none",
        message: {
          en: "Without measurement you cannot attribute AI gains — or catch AI-driven quality drops. Set a baseline before the first pilot so improvement is provable.",
          ar: "من دون قياس لا يمكن إثبات مكاسب الذكاء الاصطناعي — ولا التقاط تراجع الجودة الناتج عنه. ثبّتوا خط أساس قبل أول تجربة ليكون التحسّن قابلًا للإثبات.",
        },
      },
    ],
  },
};

export function scoreAnswers(
  variant: ScorecardVariantId,
  answers: ScorecardAnswers,
  locale: Locale
): ScorecardResult {
  const config = scorecardVariants[variant];
  const model = scoringModels[variant];

  const dimensions = config.dimensions.map((dim) => {
    const maps = model.maps[dim.id];
    const parts = Object.entries(maps)
      .map(([questionId, valueMap]) => valueMap[answers[questionId]])
      .filter((v): v is number => typeof v === "number");
    const score = parts.length
      ? Math.round(parts.reduce((a, b) => a + b, 0) / parts.length)
      : 0;
    return { id: dim.id, label: dim.label[locale], score };
  });

  const overall = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * model.weights[d.id], 0)
  );

  const risks = model.risks
    .filter((rule) => rule.applies(answers))
    .map((rule) => rule.message[locale]);

  return { modelVersion: config.modelVersion, overall, dimensions, risks };
}
