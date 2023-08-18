import PokemonList from "../PokemonList/PokemonLIst";
import Search from "../Search/Search";
import './Pokedex.css';

function Pokedex(){
    
    return (
        <>
        <div className="pokedex-wrapper">
        <div className="name-wrapper">pokedex</div>        
        <Search/>
        <PokemonList/>
        </div>
       

        </>
    )
}

export default Pokedex;