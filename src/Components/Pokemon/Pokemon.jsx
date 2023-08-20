import './Pokemon.css';
import { Link } from 'react-router-dom';

function Pokemon({name,image,id}){
     

    return (
        <Link to={`/pokemon/${id}`}>
        <div className='pokemon'>
        <div className='pokemon-name'>{name}</div>
        <div className='pokemon-image'><img src={image}/></div>
        </div>
        </Link>

    )
}

export default Pokemon;