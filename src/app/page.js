'use client';
import { useState, useEffect } from "react";
import { getPokemon } from "./services/pokemon";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import styles from './page.module.css';
import Image from "next/image";
import PokemonList from "./components/PokemonList/PokemonList";

export default function Home() {
  const [showBattle, setShowBattle] = useState(false);
  const [showList, setShowList] = useState(false);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(null);

  // search bars state
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  // Pokemon list
  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= 150; i++) {
        promises.push(getPokemon(i));
      }
      const results = await Promise.all(promises);
      setPokemonList(results);
    };

    fetchPokemons();
  }, []);

  // compare two pokemons and find the winner
  const battlePokemons = (pokemon1, pokemon2) => {
    const totalStats1 = pokemon1.stats.reduce((total, stat) => total + stat.base_stat, 0);
    const totalStats2 = pokemon2.stats.reduce((total, stat) => total + stat.base_stat, 0);

    if (totalStats1 > totalStats2) {
      return pokemon1.name;
    } else if (totalStats1 < totalStats2) {
      return pokemon2.name;
    } else {
      return 'Tie';
    }
  };

  const handlePokemonSelect = (pokemon, setPokemon, setSearchTerm, setShowSuggestions) => {
    setPokemon(pokemon);     // set selected
    setSearchTerm(pokemon.name);
    setShowSuggestions(false);

    if (pokemon1 && pokemon2) {
      const battleResult = battlePokemons(pokemon1, pokemon2);
      setWinner(battleResult); // set winner
    }
  };

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      const battleResult = battlePokemons(pokemon1, pokemon2);
      setWinner(battleResult);
    }
  }, [pokemon1, pokemon2]);

  const filteredPokemons1 = searchTerm1
    ? pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm1.toLowerCase())
      )
    : [];

  const filteredPokemons2 = searchTerm2
    ? pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm2.toLowerCase())
      )
    : [];

  return (
    <div className={styles.content} style={{ textAlign: 'center' }}>
      <Image
        src="/logopkm.png" 
        alt="pokemon logo" 
        width={273} 
        height={176} 
        priority={true}
        className={styles.logo}
      />

      {!showBattle && !showList && ( // options
        <div className={styles.gameOption}>
          <button 
            className={styles.battleButton}
            onClick={() => setShowBattle(true)}
          >
            Play
          </button>
          <button 
            className={styles.battleButton} 
            onClick={() => setShowList(true)}
          >
            View Pokemon List
          </button>
        </div>
      )}

      {showBattle && ( // battle
        <>
          <div className={styles.searchCards}>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search Pokemon 1..."
                value={searchTerm1}
                onChange={(e) => {
                  setSearchTerm1(e.target.value);
                  setShowSuggestions1(true);
                }}
                className={styles.searchBar}
              />
              {searchTerm1 && showSuggestions1 && filteredPokemons1.length > 0 && (
                <ul className={styles.suggestions}>
                  {filteredPokemons1.map((pokemon) => (
                    <li 
                      key={pokemon.id} 
                      onClick={() => handlePokemonSelect(pokemon, setPokemon1, setSearchTerm1, setShowSuggestions1)}
                    >
                      {pokemon.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search Pokemon 2..."
                value={searchTerm2}
                onChange={(e) => {
                  setSearchTerm2(e.target.value);
                  setShowSuggestions2(true);
                }}
                className={styles.searchBar}
              />
              {searchTerm2 && showSuggestions2 && filteredPokemons2.length > 0 && (
                <ul className={styles.suggestions}>
                  {filteredPokemons2.map((pokemon) => (
                    <li 
                      key={pokemon.id} 
                      onClick={() => handlePokemonSelect(pokemon, setPokemon2, setSearchTerm2, setShowSuggestions2)}
                    >
                      {pokemon.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>} {/* error message */}

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

          {/* show the winner after selecting both pokemons */}
          {pokemon1 && pokemon2 && winner && (
            <div className={styles.winnerText}>
              <h2>Winner: {winner === 'Tie' ? 'Tie!' : `${winner} wins!`}</h2>
            </div>
          )}

          <button 
            className={styles.battleButton}
            onClick={() => setShowBattle(false)} 
          >
            Back
          </button>
        </>
      )}

      {showList && ( // pokemons
        <>
          <h1>Pokemon List</h1>
          <PokemonList />

          <button 
            className={styles.battleButton}
            onClick={() => setShowList(false)} 
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
