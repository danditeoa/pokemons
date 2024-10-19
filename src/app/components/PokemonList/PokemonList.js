import React, { useEffect, useState } from 'react';
import { getPokemon } from '@/app/services/pokemon';
import Link from 'next/link';
import styles from './pokemonList.module.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= 150; i++) {
        promises.push(getPokemon(i));
      }
      const results = await Promise.all(promises);
      setPokemonList(results);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Carregando Pokémon...</p>;

  return (
    <div className={styles.pokemonList}>
      {pokemonList.map((pokemon) => (
        <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
          <div className={styles.pokemonCard}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
