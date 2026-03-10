"use client";

import { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import ActorRolesModal from "@/components/ActorRolesModal";
import type { Actor, Performance } from "@/lib/types";
import {
  isDirectorOrArtisticDirector,
  isTheaterFounder,
  hasActorCardContent,
  getActorPerformanceRolesMerged,
} from "@/lib/actor-utils";
import styles from "../../app/team/TeamPage.module.css";

export default function TeamGrid({
  actors,
  performances,
}: {
  actors: Actor[];
  performances: Performance[];
}) {
  const [modalActor, setModalActor] = useState<{
    actor: Actor;
    performanceRoles: { title: string; slug: string; role: string }[];
  } | null>(null);

  const founders = actors.filter((a) => isTheaterFounder(a));
  const director = actors.find(
    (a) => isDirectorOrArtisticDirector(a) && !isTheaterFounder(a)
  );
  const otherActors = actors.filter(
    (a) => a.id !== director?.id && !founders.some((f) => f.id === a.id)
  );

  const renderActorCard = (
    actor: Actor,
    opts: { showLink: boolean; showModal: boolean }
  ) => {
    const cardContent = (
      <>
        <div className={styles.photoWrap}>
          <OptimizedImage
            src={actor.photo}
            alt={actor.name || "Актёр"}
            width={400}
            height={500}
            className={styles.photo}
            style={{ objectFit: "contain", objectPosition: "top" }}
            priority
            skipShimmer
          />
        </div>
        <div className={styles.body}>
          <h2 className={styles.name}>{actor.name || "Актёр"}</h2>
          {actor.rank && <p className={styles.rank}>{actor.rank}</p>}
          <p className={styles.role}>{actor.role}</p>
          {opts.showLink && <span className={styles.detailBtn}>Подробнее</span>}
          {opts.showModal && (
            <span className={styles.detailBtn}>Роли в спектаклях</span>
          )}
        </div>
      </>
    );
    return opts.showLink ? (
      <Link
        href={`/team/${actor.slug}`}
        className={`${styles.cardLink} ${styles.cardLinkClickable}`}
      >
        {cardContent}
      </Link>
    ) : (
      <button
        type="button"
        className={`${styles.cardLink} ${styles.cardLinkClickable}`}
        onClick={() =>
          setModalActor({
            actor,
            performanceRoles: getActorPerformanceRolesMerged(
              actor,
              performances
            ),
          })
        }
        aria-label={`${actor.name || "Актёр"} — роли в спектаклях`}
      >
        {cardContent}
      </button>
    );
  };

  return (
    <>
      {director && (
        <div className={styles.directorRow}>
          <div className={styles.directorWrap}>
            <ul className={styles.directorGrid}>
            <li key={director.id} className={styles.card}>
              <Link
                href={`/team/${director.slug}`}
                className={`${styles.cardLink} ${styles.cardLinkClickable}`}
              >
                <div className={styles.photoWrap}>
                  <OptimizedImage
                    src={director.photo}
                    alt={director.name || "Актёр"}
                    width={400}
                    height={500}
                    className={styles.photo}
                    style={{ objectFit: "contain", objectPosition: "top" }}
                    priority
                    skipShimmer
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.name}>{director.name || "Актёр"}</h2>
                  {director.rank && <p className={styles.rank}>{director.rank}</p>}
                  <p className={styles.role}>{director.role}</p>
                  <span className={styles.detailBtn}>Подробнее</span>
                </div>
              </Link>
            </li>
          </ul>
          </div>
        </div>
      )}
      {otherActors.length > 0 && (
        <>
          {director && <div className={styles.teamDivider} aria-hidden />}
          <ul className={styles.teamGrid}>
        {otherActors.map((actor) => {
          const showLink = isDirectorOrArtisticDirector(actor);
          const showModal = !showLink;
          return (
            <li key={actor.id} className={styles.card}>
              {renderActorCard(actor, { showLink, showModal })}
            </li>
          );
        })}
      </ul>
        </>
      )}
      {founders.length > 0 && (
        <div className={styles.founderSection}>
          <h2 className={styles.founderSubtitle}>Основатель театра</h2>
          <div className={styles.founderWrap}>
            <ul className={styles.directorGrid}>
              {founders.map((founder) => (
                <li key={founder.id} className={styles.card}>
                  {renderActorCard(founder, {
                    showLink: isDirectorOrArtisticDirector(founder) || hasActorCardContent(founder),
                    showModal: !isDirectorOrArtisticDirector(founder) && !hasActorCardContent(founder),
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {modalActor && (
        <ActorRolesModal
          name={modalActor.actor.name}
          photo={modalActor.actor.photo}
          role={modalActor.actor.role}
          performanceRoles={modalActor.performanceRoles}
          isOpen={!!modalActor}
          onClose={() => setModalActor(null)}
        />
      )}
    </>
  );
}
