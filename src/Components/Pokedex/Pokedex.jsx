import PokemonList from "../PokemonList/PokemonLIst";
import Search from "../Search/Search";
import './Pokedex.css';

function Pokedex(){
    
    return (
        
        <div className="pokedex-wrapper">
        <h1 className="name-wrapper">pokedex</h1>        
        <Search/>
        <PokemonList/>
        </div>

           )
}

export default Pokedex;