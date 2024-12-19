import React from 'react'

function Pagination({ pokeList, setCurrentUrl }) {
  return (
    <div className='mt-5'>
      <span className='px-4 py-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold' onClick={() => { pokeList.previous ? setCurrentUrl(pokeList.previous) : null }}>Prev</span>
      <span className='ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold' onClick={() => { pokeList.next ? setCurrentUrl(pokeList.next) : null }}>Next</span>
    </div>
  )
}

export default Pagination