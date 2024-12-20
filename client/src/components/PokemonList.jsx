import PokeCard from './PokeCard'

function PokemonList({ pokeList, isLoading, loadingCards, isFavorite }) {
  return (
    <div className='grid grid-cols-1 sm:mx-12 sm:grid-cols-2 md:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6'>
      {
        isLoading ? loadingCards :
          isFavorite ?
            pokeList.map((pokemon, index) => {
              console.log(pokemon)
              return <PokeCard key={index} data={pokemon} isFavorite={isFavorite} />
            }) :
            pokeList?.results?.map((pokemon, index) => {
              return <PokeCard key={index} data={pokemon} />
            })
      }
    </div>
  )
}

export default PokemonList