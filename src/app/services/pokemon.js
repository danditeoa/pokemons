import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Função para buscar dados de um Pokémon por nome
 * @param {string} pokemonName Nome do Pokémon
 * @returns {object} Dados do Pokémon ou erro
 */
export const getPokemon = async (pokemonName) => {
  try {
    const response = await axios.get(`${API_URL}${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
    throw error;
  }
};
