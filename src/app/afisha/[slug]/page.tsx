import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPerformanceBySlug,
  getRepertoirePerformances,
  getActors,
} from "@/lib/cms-data";
import { canonicalUrl, OG_LOGO } from "@/lib/site-config";
import PerformancePageContent from "@/components/PerformancePageContent";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const performances = await getRepertoirePerformances();
    return performances
      .filter((p) => p.inAfisha)
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const play = await getPerformanceBySlug(slug);
  if (!play) return { title: "Спектакль", description: "Спектакль не найден." };
  const url = canonicalUrl(`/afisha/${slug}`);
  const desc =
    play.description?.trim() ||
    `Спектакль «${play.title}» в афише театра Круг. Купить билеты онлайн.`;
  return {
    title: `${play.title} — Драматический театр «Круг»`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url,
      siteName: "Драматический театр «Круг»",
      title: play.title,
      description: desc,
      images: play.poster
        ? [{ url: play.poster, width: 1200, height: 630, alt: play.title }]
        : [{ ...OG_LOGO, alt: play.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: play.title,
      description: desc,
    },
  };
}

export default async function AfishaSlugPage({ params }: Props) {
  const { slug } = await params;
  const play = await getPerformanceBySlug(slug);
  if (!play) notFound();

  const [actors = [], performances = []] = await Promise.all([
    getActors().catch(() => []),
    getRepertoirePerformances().catch(() => []),
  ]);

  return (
    <PerformancePageContent
      play={play}
      actors={actors}
      performances={performances}
      config={{
        basePath: "afisha",
        breadcrumbLabel: "Афиша",
        breadcrumbHref: "/afisha",
        galleryBeforeCast: true,
      }}
    />
  );
}
