import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal/Modal';

const mockPokemon = {
  name: 'Pikachu',
  sprites: {
    front_default: '/pikachu.png',
  },
  stats: [
    { base_stat: 35 },
    { base_stat: 55 },
    { base_stat: 40 },
  ],
};

describe('Modal Component', () => {
  test('should not render when isOpen is false', () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} pokemon={mockPokemon} />);
    expect(container.firstChild).toBeNull();
  });

  test('should render correctly when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}} pokemon={mockPokemon} />);

    
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    expect(screen.getByText(/HP:/)).toBeInTheDocument();
    expect(screen.getByText(/Attack:/)).toBeInTheDocument();
    expect(screen.getByText(/Defense:/)).toBeInTheDocument();
    
    // check if Pokemon image was rendered
    const image = screen.getByAltText('Pikachu');
    expect(image).toBeInTheDocument();

    expect(image.src).toContain(encodeURIComponent('/pikachu.png'));
  });

  test('should call onClose when the "Close" button is clicked', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} pokemon={mockPokemon} />);
    
    fireEvent.click(screen.getByText('Close'));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should prevent closing when clicking inside the modal', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} pokemon={mockPokemon} />);
    
    fireEvent.click(screen.getByText('Pikachu'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});
