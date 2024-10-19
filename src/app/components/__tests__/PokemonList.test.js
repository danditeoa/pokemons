import React from 'react';
import { render } from '@testing-library/react';
import { getPokemon } from '@/app/services/pokemon';
import PokemonList from '../PokemonList/PokemonList';

jest.mock('../../services/pokemon');

describe('PokemonList', () => {
  beforeEach(() => {
    const mockPokemons = Array.from({ length: 2 }, (_, i) => ({
      id: i + 1,
      name: i === 0 ? 'bulbasaur' : 'ivysaur',
      sprites: {
        front_default: `${i === 0 ? 'bulbasaur' : 'ivysaur'}.png`,
      },
    }));

    getPokemon.mockImplementation((id) => Promise.resolve(mockPokemons[id - 1]));
  });

  it('should render the component', async () => {
    render(<PokemonList />);

  });
});
