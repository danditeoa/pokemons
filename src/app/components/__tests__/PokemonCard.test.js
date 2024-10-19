import { render, screen } from '@testing-library/react';
import PokemonCard from '../PokemonCard/PokemonCard';

describe('PokemonCard', () => {
  it('should render the name and characteristics of the Pokémon', () => {
    const mockPokemon = {
      name: 'Pikachu',
      image: 'https://example.com/pikachu.png',
      stats: [
        { base_stat: 35 }, // HP
        { base_stat: 55 }, // Ataque
        { base_stat: 40 }, // Defesa
      ],
      description: 'Pikachu é um Pokémon do tipo elétrico.'
    };

    render(<PokemonCard {...mockPokemon} />);

    // checa pokemon no documento
    expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument();
    
    expect(screen.getByText(/hp:/i)).toBeInTheDocument();
    expect(screen.getByText(/ataque:/i)).toBeInTheDocument();
    expect(screen.getByText(/defesa:/i)).toBeInTheDocument();

    expect(screen.getByText(/HP:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/35/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Ataque:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/55/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Defesa:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/40/i)).toBeInTheDocument();

    expect(screen.getByText(/Descrição:/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu é um pokémon do tipo elétrico/i)).toBeInTheDocument();
  });
});
