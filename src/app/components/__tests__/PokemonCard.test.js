import { render, screen } from '@testing-library/react';
import PokemonCard from '../PokemonCard/PokemonCard';

describe('PokemonCard', () => {
  it('should render the name and characteristics of the Pokemon', () => {
    const mockPokemon = {
      name: 'Pikachu',
      image: 'https://example.com/pikachu.png',
      stats: [
        { base_stat: 35 }, // HP
        { base_stat: 55 }, // Attack
        { base_stat: 40 }, // Defense
      ],
      description: 'Pikachu is an electric-type Pokemon.'
    };

    render(<PokemonCard {...mockPokemon} />);

    // check if pokemon is in the document
    expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument();
    
    expect(screen.getByText(/hp:/i)).toBeInTheDocument();
    expect(screen.getByText(/attack:/i)).toBeInTheDocument();
    expect(screen.getByText(/defense:/i)).toBeInTheDocument();

    expect(screen.getByText(/HP:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/35/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Attack:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/55/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Defense:/i)).toBeInTheDocument(); 
    expect(screen.getByText(/40/i)).toBeInTheDocument();

    expect(screen.getByText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu is an electric-type pokemon/i)).toBeInTheDocument();
  });
});
