import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from "axios";


function PokemonList(){

    const [PokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    async function downloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResult = response.data.results;
        const pokemonResultPromise = pokemonResult.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
         console.log(pokemonData);
         const res = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return{
                name : pokemon.name, 
                image : pokemon.sprites.other.home.front_default,
                types : pokemon.types
            }
         })
         setPokemonList(res);
        setIsLoading(false);

    }
   
      useEffect(()=>{
         downloadPokemons();
      },[]);
    return(
        <div className="pokemon-wrapper">
        <div>List of Pokemon </div>
       {(isLoading) ? 'Loading' : ' Data downloaded'}
        </div>
    )
}

export default PokemonList;