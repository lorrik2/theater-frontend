"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const MOBILE_BREAKPOINT = 768;

const gallery = [
  { src: "/fon/8.jpg", alt: "Фасад театра" },
  { src: "/fon/12.jpg", alt: "Зрительный зал" },
  { src: "/fon/13.jpg", alt: "Фойе" },
  { src: "/fon/14.jpg", alt: "Закулисье" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section
      className={styles.section}
      id="o-teatre"
      aria-labelledby="about-title"
    >
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="about-title" className={styles.title}>
            О театре
          </h2>
          <p className={styles.subtitle}>
            История здания и труппы, миссия и атмосфера
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className={styles.lead}>
              Драматический театр «Круг» основан в 2010 году. Мы занимаем
              историческое здание в центре города — бывший особняк XIX века,
              переоборудованный под камерную сцену.
            </p>
            <p>
              Наша миссия — сохранять живую театральную традицию и открывать
              классику новым поколениям. Художественный руководитель — Андрей
              Волков, режиссёр и педагог, лауреат национальных премий.
            </p>
            <p>
              В репертуаре — русская и мировая классика, современная драматургия
              и экспериментальные постановки. Зрительный зал на 120 мест создаёт
              атмосферу камерности и доверия между сценой и залом.
            </p>
            <Link href="/o-teatre" className={styles.link}>
              Подробнее об истории и миссии →
            </Link>
          </motion.div>

          <div className={styles.videoWrap}>
            <div className={styles.videoPlaceholder}>
              <span className={styles.videoLabel}>
                Видео-визитка театра (2–3 мин)
              </span>
              <div className={styles.videoPlaceholderInner} />
            </div>
          </div>
        </div>

        <motion.div
          className={styles.gallery}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.galleryTitle}>Фотогалерея</h3>
          <div
            className={`${styles.galleryWrap} ${isMobile && !expanded ? styles.galleryWrapCollapsed : styles.galleryWrapExpanded}`}
          >
            <ul className={styles.galleryGrid}>
              {gallery.map((img, i) => (
                <li key={i}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className={styles.galleryImg}
                  />
                </li>
              ))}
            </ul>
            <div
              className={`${styles.fadeOverlay} ${isMobile && !expanded ? styles.fadeOverlayVisible : styles.fadeOverlayHidden}`}
              aria-hidden={!(isMobile && !expanded)}
            >
              <div className={styles.fadeCta}>
                <button
                  type="button"
                  className={styles.fadeBtn}
                  onClick={() => setExpanded(true)}
                >
                  Показать ещё
                </button>
                <Link href="/o-teatre" className={styles.fadeLink}>
                  Вся галерея →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
