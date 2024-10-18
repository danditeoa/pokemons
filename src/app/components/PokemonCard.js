import React from "react";

export default function PokemonCard({ name, image, stats }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '200px', textAlign: 'center' }}>
      <h2>{name}</h2>
      <img src={image} alt={name} style={{ width: '150px', height: '150px' }} />
      <p><strong>HP:</strong> {stats[0].base_stat}</p>
      <p><strong>Ataque:</strong> {stats[1].base_stat}</p>
      <p><strong>Defesa:</strong> {stats[2].base_stat}</p>
    </div>
  );
}
