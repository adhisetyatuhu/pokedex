import React from 'react'
import useNavigation from '../hooks/useNavigation'

function Pagination({ pokeList, page }) {
  const { navigateTo } = useNavigation();
  return (
    <div className='mt-5'>
      <span className={pokeList.previous ? 'px-4 py-2 mr-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold' : 'hidden'} onClick={() => navigateTo(`/list/${!page ? 0 : pokeList.previous ? ((parseInt(page) || 1) - 1) : 0}`)}>Prev</span>
      <span className={pokeList.next ? 'px-4 py-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold' : 'hidden'} onClick={() => { navigateTo(`/list/${!page ? 1 : pokeList.next ? ((parseInt(page) || 0) + 1) : page}`) }}>Next</span>
    </div>
  )
}

export default Pagination