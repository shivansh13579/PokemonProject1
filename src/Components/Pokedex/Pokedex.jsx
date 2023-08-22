import { useState } from "react";
import PokemonList from "../PokemonList/PokemonLIst";
import Search from "../Search/Search";
import './Pokedex.css';
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex(){
    const [searchTerm,setSearchterm] = useState('');
    
    return (
        
        <div className="pokedex-wrapper">
                
        <Search updateSearchTerm={setSearchterm}/>
        {searchTerm}
        { (searchTerm.length==0) ? <PokemonList />:<PokemonDetails pokemonName={searchTerm}/>}
        </div>
        
           )
}

export default Pokedex;