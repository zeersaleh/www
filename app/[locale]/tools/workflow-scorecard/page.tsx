import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import ScorecardTool from "@/components/ScorecardTool";
import { JsonLd, localeUrl } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "/tools/workflow-scorecard",
    dict.tools.workflowTitle,
    dict.tools.workflowDesc
  );
}

export default async function WorkflowScorecardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: dict.tools.workflowTitle,
    description: dict.tools.workflowDesc,
    applicationCategory: "BusinessApplication",
    url: localeUrl(locale, "/tools/workflow-scorecard"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd data={softwareJsonLd} />
      <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">
        {dict.tools.workflowTitle}
      </h1>
      <p className="mt-3 leading-relaxed text-ink-600">
        {dict.tools.workflowDesc}
      </p>
      <div className="mt-8">
        <ScorecardTool
          locale={locale}
          variant="workflow"
          labels={{
            ...dict.tools,
            yourScore: dict.tools.workflowYourScore,
            methodologyNote: dict.tools.workflowMethodologyNote,
          }}
        />
      </div>
    </section>
  );
}
