import { isLocale } from "@/lib/i18n";
import { isValidEmail, saveLead, verifyTurnstile } from "@/lib/leads";
import {
  isScorecardVariantId,
  scorecardVariants,
  type ScorecardVariantId,
} from "@/lib/scorecard-config";
import { scoreAnswers } from "@/lib/scorecard-scoring";

export async function POST(request: Request) {
  let body: {
    tool?: string;
    answers?: Record<string, string>;
    email?: string;
    locale?: string;
    subscribe?: boolean;
    turnstileToken?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid-body" }, { status: 400 });
  }

  // Older clients predate variants and send no tool field.
  const tool = body.tool ?? "readiness";
  if (!isScorecardVariantId(tool)) {
    return Response.json({ error: "unknown-tool" }, { status: 400 });
  }
  const variant: ScorecardVariantId = tool;
  const questions = scorecardVariants[variant].questions;

  const locale = body.locale && isLocale(body.locale) ? body.locale : "en";
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!isValidEmail(email)) {
    return Response.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!(await verifyTurnstile(body.turnstileToken))) {
    return Response.json({ error: "verification-failed" }, { status: 403 });
  }

  // Only accept known question ids with known option values.
  const answers: Record<string, string> = {};
  for (const question of questions) {
    const value = body.answers?.[question.id];
    if (
      typeof value === "string" &&
      question.options.some((o) => o.value === value)
    ) {
      answers[question.id] = value;
    }
  }
  if (Object.keys(answers).length < questions.length) {
    return Response.json({ error: "incomplete-answers" }, { status: 400 });
  }

  const result = scoreAnswers(variant, answers, locale);

  // Capture the lead before returning results — the gate is server-side.
  await saveLead({
    source: variant === "workflow" ? "workflow-scorecard" : "scorecard",
    email,
    locale,
    payload: {
      answers,
      overall: result.overall,
      modelVersion: result.modelVersion,
      subscribedToNewsletter: body.subscribe === true,
    },
  });
  if (body.subscribe === true) {
    await saveLead({
      source: "newsletter",
      email,
      locale,
      payload: { via: variant === "workflow" ? "workflow-scorecard" : "scorecard" },
    });
  }

  return Response.json(result);
}
