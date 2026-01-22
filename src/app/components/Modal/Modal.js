import React from 'react';
import styles from './modal.module.css';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, pokemon }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{pokemon.name}</h2>

        <Image
          src={pokemon.sprites.front_default} alt={pokemon.name}
          width={150} 
          height={150} 
          priority={true}
        />
        <p className={styles.stat}><strong>HP:</strong> {pokemon.stats[0]?.base_stat}</p>
        <p className={styles.stat}><strong>Attack:</strong> {pokemon.stats[1]?.base_stat}</p>
        <p className={styles.stat}><strong>Defense:</strong> {pokemon.stats[2]?.base_stat}</p>
        {/* <p className={styles.description}><strong>Description:</strong> {pokemon.description || 'Description not available'}</p> */}
        <button className={styles.battleButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
