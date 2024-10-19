import React from "react";
import Image from "next/image";
import styles from './pokemonCard.module.css';

export default function PokemonCard({ name, image, stats, description }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.boxImage}>
        <Image
          src={image} 
          alt={name} 
          width={150} 
          height={150} 
          priority={true}
          className={styles.image}
        />
      </div>
      <p className={styles.skill}><strong>HP:</strong> {stats[0].base_stat}</p>
      <p className={styles.skill}><strong>Ataque:</strong> {stats[1].base_stat}</p>
      <p className={styles.skill}><strong>Defesa:</strong> {stats[2].base_stat}</p>
      <p className={styles.skill}><strong>Descrição:</strong> {description}</p>
    </div>
  );
}
