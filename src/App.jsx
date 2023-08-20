
import './App.css';
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom';

function App() {


  return (
    <div className='outer-pokedex'>
    <h1 className="name-wrapper">
   <Link to='/'>pokedex</Link> 
    </h1>
     <CustomRoutes/>
       
    </div>
  )
}

export default App
