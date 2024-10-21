import React, { useEffect, useState } from 'react';
import { getPokemon } from '@/app/services/pokemon';
import styles from './pokemonList.module.css';
import Modal from '../Modal/Modal';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Carregando Pokémon...</p>;

  return (
    <div>
        <input
        type="text"
        placeholder="Filtrar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
        />
        <div className={styles.pokemonList}>

        {filteredPokemonList.map((pokemon) => (
            <div 
            key={pokemon.id} 
            className={styles.pokemonItem} 
            onClick={() => handlePokemonClick(pokemon.name)}
            >
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
        ))}

        <Modal
            isOpen={isModalOpen} 
            onClose={closeModal} 
            pokemon={selectedPokemon} 
        />
        </div>
    </div>
  );
};

export default PokemonList;
