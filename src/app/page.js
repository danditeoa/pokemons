import Image from "next/image";
import styles from "./page.module.css";
import { getPokemon } from "./services/pokemon";

// Fazendo a busca de dados diretamente no componente (Server Component)
export default async function Home() {
  let pokemon = null;
  let error = null;

  try {
    pokemon = await getPokemon('ditto');
  } catch (e) {
    error = "Erro ao buscar o Pokémon";
  }

  if (error) {
    return <div className={styles.page}>Erro ao carregar os dados do Pokémon</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Pokémon: {pokemon.name}</h1>
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
      />
    </div>
  );
}
