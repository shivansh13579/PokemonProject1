
import useDebaunce from '../../hooks/useDebaunce';
import './Search.css'
function Search ({updateSearchTerm}){
     const debounceCallback = useDebaunce((e)=>updateSearchTerm(e.target.value))
     return(
        <div className="search-wrapper">
            <input 
            id='pokemon-name-search' 
            type="text" 
            placeholder="search-pokemon..." 
            onChange={debounceCallback}
            />
        
        </div>
     )
}

export default Search;