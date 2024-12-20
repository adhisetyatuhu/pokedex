import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { LoadingPokeCard } from './components/PokeCard.jsx'
import Pagination from './components/Pagination.jsx'
import PokemonList from './components/PokemonList.jsx'

function App() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
  const [pokeList, setPokeList] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=16&offset=0");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPage = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(currentUrl);
      setPokeList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, [])

  useEffect(() => {
    fetchPage();
  }, [currentUrl])

  const loadingCards = []
  for (let i = 0; i < 16; i++) {
    loadingCards.push(<LoadingPokeCard key={i} />);
  }

  return (
    <>
      <PokemonList pokeList={pokeList} isLoading={isLoading} loadingCards={loadingCards} />
      <Pagination pokeList={pokeList} setCurrentUrl={setCurrentUrl} />
    </>
  )
}

export default App
