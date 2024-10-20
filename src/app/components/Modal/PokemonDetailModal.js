
  import React from 'react';
  import { Bar } from 'react-chartjs-2'; // Importando o gráfico de barras
  import styles from './modal.module.css'; // Supondo que você tenha estilos para o modal
  
  const PokemonDetailModal = ({ pokemon, onClose }) => {
    // Prepara os dados para o gráfico
    const data = {
      labels: ['HP', 'Ataque', 'Defesa', 'Ataque Especial', 'Defesa Especial', 'Velocidade'],
      datasets: [
        {
          label: 'Estatísticas',
          data: [
            pokemon.stats[0]?.base_stat || 0,
            pokemon.stats[1]?.base_stat || 0,
            pokemon.stats[2]?.base_stat || 0,
            pokemon.stats[3]?.base_stat || 0,
            pokemon.stats[4]?.base_stat || 0,
            pokemon.stats[5]?.base_stat || 0,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p><strong>Descrição:</strong> {pokemon.description || 'Descrição não disponível'}</p>
          
          {/* Gráfico de Estatísticas */}
          <h3>Estatísticas</h3>
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };
  
  export default PokemonDetailModal;
  