import React, { useEffect, useState } from 'react';
import { getPokemon } from '@/app/services/pokemon';
import Link from 'next/link';
import styles from './pokemonList.module.css';
import Modal from '../Modal/Modal';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePokemonClick = async (name) => {
    const pokemonData = await getPokemon(name);
    setSelectedPokemon(pokemonData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  if (loading) return <p>Carregando Pokémon...</p>;

  return (
    <div className={styles.pokemonList}>
      {pokemonList.map((pokemon) => (
        <div 
          key={pokemon.id} 
          className={styles.pokemonCard} 
          onClick={() => handlePokemonClick(pokemon.name)} // Abre o modal ao clicar
        >
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}

      {/* Modal para exibir detalhes do Pokémon */}
      <Modal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        pokemon={selectedPokemon} 
      />
    </div>
  );
};

export default PokemonList;
