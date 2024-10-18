'use client';

import { useState } from "react";
import { battlePokemons } from "./services/pokemon";
import PokemonCard from "./components/PokemonCard";
import styles from './page.module.css';

export default function Home() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBattle = async () => {
    setLoading(true);
    const battleResult = await battlePokemons();
    
    setPokemon1(battleResult.p1);
    setPokemon2(battleResult.p2);
    setWinner(battleResult.winner);
    setLoading(false);
  };

  return (
    <div className={styles.content} style={{ textAlign: 'center' }}>
      <h1>Batalha Pokémon</h1>
      
      <button onClick={handleBattle} disabled={loading} style={{ padding: '10px', margin: '20px' }}>
        {loading ? 'Carregando...' : 'Iniciar Nova Batalha'}
      </button>

      {pokemon1 && pokemon2 && (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <PokemonCard 
            name={pokemon1.name} 
            image={pokemon1.sprites.front_default} 
            stats={pokemon1.stats} 
          />
          <PokemonCard 
            name={pokemon2.name} 
            image={pokemon2.sprites.front_default} 
            stats={pokemon2.stats} 
          />
        </div>
      )}

      {winner && (
        <div style={{ marginTop: '20px' }}>
          <h2>Vencedor: {winner === 'Empate' ? 'Empate!' : `${winner} venceu!`}</h2>
        </div>
      )}
    </div>
  );
}
