import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const API_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const getPokemon = async (pokemonIdOrName) => {
  try {
    const response = await axios.get(`${API_URL}${pokemonIdOrName}`);
    
    const speciesResponse = await axios.get(response.data.species.url);
    console.log(speciesResponse.data);

    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
      entry => entry.language.name === 'pt-br'
    );
    console.log(descriptionEntry);

    const description = descriptionEntry ? descriptionEntry.flavor_text : 'Descrição não disponível';

    return {
      ...response.data,
      description,
    };
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
    throw error;
  }
};

export const battlePokemons = async () => {
  try {
    const randomId1 = Math.floor(Math.random() * 150) + 1;
    const randomId2 = Math.floor(Math.random() * 150) + 1;

    const p1 = await getPokemon(randomId1);
    const p2 = await getPokemon(randomId2);

    const p1Stats = p1.stats;
    const p2Stats = p2.stats;

    const p1Power = p1Stats[0].base_stat + p1Stats[1].base_stat + p1Stats[2].base_stat;
    const p2Power = p2Stats[0].base_stat + p2Stats[1].base_stat + p2Stats[2].base_stat;

    let winner;
    if (p1Power > p2Power) {
      winner = p1.name;
    } else if (p2Power > p1Power) {
      winner = p2.name;
    } else {
      winner = 'Empate';
    }

    return { p1, p2, winner };
  } catch (error) {
    console.error("Erro na batalha de Pokémon:", error);
    throw error;
  }
};
