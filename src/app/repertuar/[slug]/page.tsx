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
    const repertoirePerformances = await getRepertoirePerformances();
    return repertoirePerformances.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const play = await getPerformanceBySlug(slug);
  if (!play) return { title: "Спектакль", description: "Спектакль не найден." };
  const url = canonicalUrl(`/repertuar/${slug}`);
  const desc =
    play.description?.trim() ||
    `Спектакль «${play.title}» в репертуаре театра Круг. Описание, фото, роли.`;
  return {
    title: `${play.title} — Репертуар — Драматический театр «Круг»`,
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

export default async function RepertuarSlugPage({ params }: Props) {
  const { slug } = await params;
  const play = await getPerformanceBySlug(slug);
  if (!play) notFound();

  const [actors = [], repertoirePerformances = []] = await Promise.all([
    getActors().catch(() => []),
    getRepertoirePerformances().catch(() => []),
  ]);

  return (
    <PerformancePageContent
      play={play}
      actors={actors}
      performances={repertoirePerformances}
      config={{
        basePath: "repertuar",
        breadcrumbLabel: "Спектакли",
        breadcrumbHref: "/repertuar",
        galleryBeforeCast: false,
      }}
    />
  );
}
