// Modal.js
import React from 'react';
import styles from './modal.module.css'; // Certifique-se de ter um arquivo CSS para o modal

const Modal = ({ isOpen, onClose, pokemon }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p><strong>HP:</strong> {pokemon.stats[0]?.base_stat}</p>
        <p><strong>Ataque:</strong> {pokemon.stats[1]?.base_stat}</p>
        <p><strong>Defesa:</strong> {pokemon.stats[2]?.base_stat}</p>
        <p><strong>Descrição:</strong> {pokemon.description || 'Descrição não disponível'}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
