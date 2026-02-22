import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getActors } from "@/lib/cms-data";
import styles from "./TeamPage.module.css";

export const metadata: Metadata = {
  title: "Команда — Драматический театр «Круг»",
  description: "Актеры и режиссёры театра. Биографии, роли, фото.",
};

export default async function TeamPage() {
  const actors = await getActors();
  const sorted = [...actors].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Команда</h1>
        <p className={styles.subtitle}>Актеры и режиссёры театра</p>
      </header>

      <section className={styles.section}>
        <ul className={styles.teamGrid}>
          {sorted.map((actor) => (
            <li key={actor.id} className={styles.card}>
              <Link href={`/team/${actor.slug}`} className={styles.cardLink}>
                <div className={styles.photoWrap}>
                  <Image
                    src={actor.photo}
                    alt={actor.name}
                    width={400}
                    height={500}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.name}>{actor.name}</h2>
                  {actor.rank && <p className={styles.rank}>{actor.rank}</p>}
                  <p className={styles.role}>{actor.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
