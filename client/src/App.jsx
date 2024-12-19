import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import PokeCard, { LoadingPokeCard } from './components/PokeCard.jsx'
import Pagination from './components/Pagination.jsx'

function App() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
  const [pokeList, setPokeList] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0");
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
  for (let i = 0; i < 15; i++) {
    loadingCards.push(<LoadingPokeCard key={i} />);
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:mx-12 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
          isLoading ? loadingCards :
            pokeList.results?.map((pokemon, index) => {
              return <PokeCard key={index} data={pokemon} />
            })

        }
      </div>
      <Pagination pokeList={pokeList} setCurrentUrl={setCurrentUrl} />
    </>
  )
}

export default App
