import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){

    const [PokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL); //this download the 20 pokemon

        const pokemonResult = response.data.results;  //we get the array of pokemons from url

        console.log(response.data);
       //ittarating the array of pokemon and using their url to create the array of promise
       //that will download the 20 pokemon
        const pokemonResultPromise = pokemonResult.map((pokemon)=>axios.get(pokemon.url));

        //passing that promise array to axios .all 
        const pokemonData = await axios.all(pokemonResultPromise);
         console.log(pokemonData);

         //noe iterate the data of each pokemon and extract id,name,image,types
         const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name : pokemon.name, 
                image : (pokemon.sprites.other) ? pokemon.sprites.other.home.front_default : pokemon.sprites.other.home.front_shiny,
                types : pokemon.types
            }
         })
         console.log(pokeListResult);
         setPokemonList(pokeListResult);
        setIsLoading(false);

    }
   
      useEffect(()=>{
         downloadPokemons();
      },[]);
    return(
        <div className="pokemon-wrapper">
        <div>List of Pokemon </div>
        <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading' : 
            PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} /> )}
        </div>

        </div>
    )
}

export default PokemonList;