import type { Metadata } from "next";
import Link from "next/link";
import styles from "../styles/Page.module.css";

export const metadata: Metadata = {
  title: "Помочь театру — Драматический театр «Круг»",
  description:
    "Поддержать театр: реквизиты для перевода, QR-код для быстрой оплаты.",
};

export default function PomochTeatruPage() {
  return (
    <div className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span className={styles.breadcrumbsSep}>→</span>
        <span>Помочь театру</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.h1}>Помочь театру</h1>
        <p className={styles.lead}>
          Ваша поддержка помогает нам создавать новые спектакли
        </p>
      </header>

      <section className={styles.contentSection}>
        <h2 className={styles.h2}>Реквизиты для перевода</h2>
        <div className={styles.videoPlaceholder}>
          <p className="text-center text-graphite-600">
            Здесь будут реквизиты для перевода
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.h2}>QR-код для оплаты</h2>
        <div className={styles.videoPlaceholder}>
          <p className="text-center text-graphite-600">
            Здесь будет QR-код для быстрой оплаты
          </p>
        </div>
      </section>
    </div>
  );
}
