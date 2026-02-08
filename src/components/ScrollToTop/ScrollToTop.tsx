"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.css";

const SCROLL_THRESHOLD = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={scrollToTop}
      aria-label="Наверх к слайдеру"
    >
      <span className={styles.arrow}>↑</span>
    </button>
  );
}
