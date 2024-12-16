import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import PokeCard from './components/PokeCard.jsx'

// buat github organization [done]
// buat repository [done]
// init project vite [done]
// setup tailwindcss 
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
      {
        pokeList.results?.map((pokemon, index) => {
          return <PokeCard key={index} data={pokemon} />
        })
      }
    </>
  )
}

export default App
