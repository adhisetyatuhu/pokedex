import { useEffect, useState } from 'react'
import './App.css'
import { LoadingPokeCard } from './components/PokeCard.jsx'
import Pagination from './components/Pagination.jsx'
import PokemonList from './components/PokemonList.jsx'
import { pokeapi } from './utils/axios.js'
import { useParams } from 'react-router'

function App() {
  const [pokeList, setPokeList] = useState([]);
  const { page } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPage = async () => {
    const limit = 16;
    try {
      setIsLoading(true);
      const { data } = await pokeapi.get(`/pokemon?limit=${limit}&offset=${page * limit}`);
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
  }, [page])

  const loadingCards = []
  for (let i = 0; i < 16; i++) {
    loadingCards.push(<LoadingPokeCard key={i} />);
  }

  return (
    <>
      <PokemonList pokeList={pokeList} isLoading={isLoading} loadingCards={loadingCards} />
      <Pagination pokeList={pokeList} page={page} />
    </>
  )
}

export default App
