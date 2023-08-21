import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){

    // const [pokemonList,setPokemonList] = useState([]);
    // const [isLoading,setIsLoading] = useState(true);
    // const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl,setNextUrl] = useState('');
    // const [prevUrl,setPrevUrl] = useState('');

    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
    })

    async function downloadPokemons(){
        setPokemonListState((state)=>({...state,isLoading:true}));
        const response = await axios.get(pokemonListState.pokedexUrl); //this download the 20 pokemon

        const pokemonResult = response.data.results;  //we get the array of pokemons from url

        console.log(response.data);
        setPokemonListState((state)=>({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }));
    
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
         setPokemonListState((state)=>({
            ...state,
            pokemonList:pokeListResult,
            isLoading:false
        }));

    }
   
      useEffect(()=>{
         downloadPokemons();
      },[pokemonListState.pokedexUrl]);
    return(
        <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
            {(pokemonListState.isLoading) ? 'Loading' : 
            pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/> )}
        </div>
        <div className="controls">
            <button disabled={pokemonListState.prevUrl==null} onClick={()=>{
                const urlToSet = pokemonListState.prevUrl;
                setPokemonListState((state)=>({...state,pokedexUrl:urlToSet})
            )}}>Prev</button>
            <button disabled={pokemonListState.nextUrl==null} onClick={()=>{
                const urlToSet = pokemonListState.nextUrl;
                setPokemonListState((state)=>({...state,pokedexUrl:urlToSet})
            )}}>next</button>
        </div>
        </div>
    )
}

export default PokemonList;