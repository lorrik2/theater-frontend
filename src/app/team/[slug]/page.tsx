import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { actors } from "@/lib/mock-data";
import { ActorPageContent } from "@/components/ActorPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return actors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const actor = actors.find((a) => a.slug === slug);
  if (!actor) return { title: "Артист" };
  return {
    title: `${actor.name} — Драматический театр «Круг»`,
    description: actor.bio,
    openGraph: { title: actor.name, description: actor.bio },
  };
}

export default async function ActorPage({ params }: Props) {
  const { slug } = await params;
  const actor = actors.find((a) => a.slug === slug);
  if (!actor) notFound();

  return <ActorPageContent actor={actor} />;
}
