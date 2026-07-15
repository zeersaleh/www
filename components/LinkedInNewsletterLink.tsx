import { socialLinks } from "@/lib/i18n";

export default function LinkedInNewsletterLink({
  orFollowLabel,
  ctaLabel,
}: {
  orFollowLabel: string;
  ctaLabel: string;
}) {
  return (
    <p className="mt-3 text-sm text-navy-100/70">
      {orFollowLabel}{" "}
      <a
        href={socialLinks.linkedinNewsletter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold-300 underline underline-offset-2 hover:text-sand-50"
      >
        {ctaLabel}
      </a>
    </p>
  );
}
