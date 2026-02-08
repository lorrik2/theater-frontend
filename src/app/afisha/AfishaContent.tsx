"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { performances } from "@/lib/mock-data";
import styles from "../styles/Page.module.css";

type FilterValue = "all" | "premiere" | "repertoire";

export default function AfishaContent() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all"
      ? performances
      : filter === "premiere"
        ? performances.filter((p) => p.isPremiere)
        : performances.filter((p) => !p.isPremiere);

  return (
    <section className={styles.section}>
      <div className={styles.filtersRow}>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={filter === "all" ? styles.filterActive : styles.filterBtn}
        >
          Все
        </button>
        <button
          type="button"
          onClick={() => setFilter("premiere")}
          className={filter === "premiere" ? styles.filterActive : styles.filterBtn}
        >
          Премьера
        </button>
        <button
          type="button"
          onClick={() => setFilter("repertoire")}
          className={filter === "repertoire" ? styles.filterActive : styles.filterBtn}
        >
          Репертуар
        </button>
      </div>

      <ul className={styles.cardsGrid}>
        {filtered.map((play) => (
          <li key={play.id} className={styles.card}>
            <Link href={`/afisha/${play.slug}`} className={styles.cardLink}>
              <div className={styles.posterWrap}>
                <Image
                  src={play.poster}
                  alt={play.title}
                  width={400}
                  height={560}
                  className={styles.poster}
                />
                <span className={styles.age}>{play.ageRating}</span>
                {play.isPremiere && (
                  <span className={styles.premiere}>Премьера</span>
                )}
              </div>
              <div className={styles.body}>
                <h2 className={styles.cardTitle}>{play.title}</h2>
                <p className={styles.meta}>
                  {play.date} · {play.time}
                  {play.duration && ` · ${play.duration}`}
                </p>
                <p className={styles.genre}>{play.genre}</p>
                <p className={styles.desc}>{play.description}</p>
                <span className={styles.btnDetail}>Подробнее</span>
              </div>
            </Link>
            <Link href="#tickets" className={styles.btnTicket}>
              Купить билет
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
