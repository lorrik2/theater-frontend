"use client";

import Image from "next/image";
import Link from "next/link";
import useFancybox from "@/hooks/useFancybox";
import styles from "./GalleryLightbox.module.css";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  /** Вариант: grid для страницы О театре, slider для блока About, row — один ряд с кнопкой «смотреть все» */
  variant?: "grid" | "slider" | "row";
  /** Ссылка «Смотреть все фото» — отображается как последняя карточка в variant="row" */
  moreLink?: { href: string; label: string };
}

export default function GalleryLightbox({
  images,
  variant = "grid",
  moreLink,
}: GalleryLightboxProps) {
  const [fancyboxRef] = useFancybox();

  if (variant === "row") {
    return (
      <div className={styles.galleryRow}>
        <ul ref={fancyboxRef} className={styles.galleryRowList}>
          {images.map((img, i) => (
            <li key={i} className={styles.galleryRowItem}>
              <a
                href={img.src}
                data-fancybox="gallery"
                data-caption={`${img.alt} (${i + 1}/${images.length})`}
                className={styles.thumbBtn}
                aria-label={`Открыть фото: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.thumbImg}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </a>
            </li>
          ))}
        </ul>
        {moreLink && (
          <Link href={moreLink.href} className={styles.moreCard}>
            <span className={styles.moreCardText}>{moreLink.label}</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <ul
      ref={fancyboxRef}
      className={variant === "grid" ? styles.galleryGrid : styles.galleryList}
    >
      {images.map((img, i) => (
        <li key={i}>
          <a
            href={img.src}
            data-fancybox="gallery"
            data-caption={`${img.alt} (${i + 1}/${images.length})`}
            className={styles.thumbBtn}
            aria-label={`Открыть фото: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={500}
              className={styles.thumbImg}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
