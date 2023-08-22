import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: "",
    prevUrl: "",
    type: ''
  });

  async function downloadPokemons() {

  
      setPokemonListState((state) => ({ ...state, isLoading: true }));
      const response = await axios.get(pokemonListState.pokedexUrl); //this download the 20 pokemon
  
      const pokemonResult = response.data.results; //we get the array of pokemons from url
  
      console.log('response ise',response.data.pokemon);
      console.log(pokemonListState);
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous
      }));

      const pokemonResultPromise = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url)
      );

      //passing that promise array to axios .all
      const pokemonData = await axios.all(pokemonResultPromise);
      console.log(pokemonData);

      //noe iterate the data of each pokemon and extract id,name,image,types
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other)
            ? pokemon.sprites.other.home.front_default
            : pokemon.sprites.other.home.front_shiny,
          types: pokemon.types,
        };
      });
      console.log(pokeListResult);
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return { pokemonListState, setPokemonListState };
}

export default usePokemonList;
