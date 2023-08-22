import axios from "axios";
import { useState } from "react";


function usePokemonDetails(id){
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemons() {
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name)
      });

      setPokemonListState({...pokemonListState,type : response.data.types ? response.data.types[0].type.name:''})
}

const [pokemonListState,setPokemonListState]=usePokemonList();

useEffect(() => {
    downloadPokemons();
    console.log("list",pokemon.types ,pokemonListState);
  }, []);

  return[pokemon,pokemonListState]
}

export default usePokemonDetails;