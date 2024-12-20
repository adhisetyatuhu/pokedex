import axios from 'axios'
import { useState, useEffect } from 'react'
import PokemonList from '../components/PokemonList.jsx'
import { LoadingPokeCard } from '../components/PokeCard.jsx'

function Favorite() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPage = async () => {
    setIsLoading(true);
    try {
      const { data: favoriteData } = await axios.get('http://localhost:3000/favorites');
      setPokeList(favoriteData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, [])

  const loadingCards = []
  for (let i = 0; i < 15; i++) {
    loadingCards.push(<LoadingPokeCard key={i} />);
  }

  return (
    <PokemonList pokeList={pokeList} isLoading={isLoading} loadingCards={loadingCards} isFavorite={true} />
  )
}

export default Favorite