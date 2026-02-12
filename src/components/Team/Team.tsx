"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { actors } from "@/lib/mock-data";
import styles from "./Team.module.css";

export default function Team() {
  const leadership = actors.filter(
    (a) =>
      a.role.toLowerCase().includes("режиссёр") ||
      (a.rank && a.rank.includes("Художественный руководитель")),
  );
  const sorted = [...leadership].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className={styles.section} id="team" aria-labelledby="team-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="team-title" className={styles.title}>
            Художественный руководитель и режиссёр
          </h2>
        </motion.div>

        <div className={styles.cardsWrap}>
          <ul className={styles.teamGrid}>
            {sorted.map((actor, i) => (
              <motion.li
                key={actor.id}
                className={styles.card}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
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
                    <h3 className={styles.name}>{actor.name}</h3>
                    {actor.rank && <p className={styles.rank}>{actor.rank}</p>}
                    <p className={styles.role}>{actor.role}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className={styles.moreWrap}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/team" className={styles.moreLink}>
            Вся команда →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
