import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemons() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${21}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  const [pokemonListState] = usePokemonList(
    `https://pokeapi.co/api/v2/type/${pokemon.types[0]}`,
    true
  );

  useEffect(() => {
    downloadPokemons();
    console.log("list", pokemonListState);
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-detail-image" src={pokemon.image} />
      <div className="pokemon-detail-name">
        name : <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-detail-name">height: {pokemon.height}</div>
      <div className="pokemon-detail-name">weight: {pokemon.weight}</div>
      <div className="pokemon-detail-type">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>

      {pokemon.types && 
        <div>
          More {pokemon.types[0]} type pokemons
          <ul>
            {pokemonListState.pokemonList &&
              pokemonListState.pokemonList.map((p) => (
                <li key={p.pokemon.url}>{p.pokemon.name}</li>
              ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default PokemonDetails;
