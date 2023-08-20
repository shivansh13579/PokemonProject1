import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){

    const [PokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl,setNextUrl] = useState('');
    const [prevUrl,setPrevUrl] = useState('');

    async function downloadPokemons(){
        const response = await axios.get(pokedexUrl); //this download the 20 pokemon

        const pokemonResult = response.data.results;  //we get the array of pokemons from url

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
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
      },[pokedexUrl]);
    return(
        <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading' : 
            PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/> )}
        </div>
        <div className="controls">
            <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
            <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>next</button>
        </div>
        </div>
    )
}

export default PokemonList;