'use client';

import { useState } from "react";
import { battlePokemons } from "./services/pokemon";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import styles from './page.module.css';
import Image from "next/image";

export default function Home() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBattle = async () => {
    setLoading(true);
    setError(null); // Limpa o erro anterior antes de começar uma nova batalha

    try {
      const battleResult = await battlePokemons();
      
      setPokemon1(battleResult.p1);
      setPokemon2(battleResult.p2);
      setWinner(battleResult.winner);
    } catch (err) {
      console.error("Erro ao iniciar a batalha:", err);
      setError("Erro ao buscar os Pokémon. Tente novamente."); // Mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.content} style={{ textAlign: 'center' }}>
      <div className={styles.gameOption}>
        <Image
            src="/logopkm.png" 
            alt="pokemon logo" 
            width={273} 
            height={176} 
            priority={true}
            className={styles.logo}
          />

        <button 
          className={styles.battleButton} 
          onClick={handleBattle} 
          disabled={loading} 
        >
          {loading ? 'Carregando...' : 'Iniciar Nova Batalha'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>} {/* Exibbir mensagem de erro */}

      {pokemon1 && pokemon2 && (
        <div className={styles.cards}>
          <PokemonCard 
            name={pokemon1.name} 
            image={pokemon1.sprites.front_default} 
            stats={pokemon1.stats}
            description={pokemon1.description}
          />
          <Image
          src="/vs.png" 
          alt="versus" 
          width={150} 
          height={150} 
          priority={true}
          className={styles.image}
        />
          <PokemonCard 
            name={pokemon2.name} 
            image={pokemon2.sprites.front_default} 
            stats={pokemon2.stats}
            description={pokemon2.description}
          />
        </div>
      )}

      {winner && (
        <div className={styles.winnerText}>
          <h2>Vencedor: {winner === 'Empate' ? 'Empate!' : `${winner} venceu!`}</h2>
        </div>
      )}
    </div>
  );
}
