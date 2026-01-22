import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const API_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const getPokemon = async (pokemonIdOrName) => {
  try {
    const response = await axios.get(`${API_URL}${pokemonIdOrName}`);
    const speciesResponse = await axios.get(`${API_SPECIES_URL}${response.data.id}/`);

    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );

    const description = descriptionEntry ? descriptionEntry.flavor_text : 'Description not available';

    return {
      ...response.data,
      description,
    };
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error; // Throws the error so the component can handle it
  }
};

export const battlePokemons = async () => {
  try {
    const randomId1 = Math.floor(Math.random() * 150) + 1;
    const randomId2 = Math.floor(Math.random() * 150) + 1;

    const p1 = await getPokemon(randomId1);
    const p2 = await getPokemon(randomId2);

    const p1Power = p1.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
    const p2Power = p2.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

    let winner;
    if (p1Power > p2Power) {
      winner = p1.name;
    } else if (p2Power > p1Power) {
      winner = p2.name;
    } else {
      winner = 'Tie';
    }

    return { p1, p2, winner };
  } catch (error) {
    console.error("Error in Pokemon battle:", error);
    throw error;
  }
};
