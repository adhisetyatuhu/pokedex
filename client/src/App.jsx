import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import PokeCard from './components/PokeCard.jsx'

// buat github organization [done]
// buat repository [done]
// init project vite [done]
// setup tailwindcss [done]
// consume pokeapi [done]
// display ke layout card [done]

function App() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
  const [pokeList, setPokeList] = useState([]);

  const fetchPokeList = async () => {
    const offset = 0;
    try {
      const { data } = await axios.get(baseUrl + 'pokemon?limit=24&offset=' + offset);
      setPokeList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeList();
  }, [])

  useEffect(() => { })

  return (
    <>
      <div className='grid grid-cols-1 sm:mx-12 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
          pokeList.results?.map((pokemon, index) => {
            return <PokeCard key={index} data={pokemon} />
          })
        }
      </div>
    </>
  )
}

export default App
