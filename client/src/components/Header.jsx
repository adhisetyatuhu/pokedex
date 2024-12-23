import { useState } from "react";
import { useNavigate } from "react-router";
import useNavigation from '../hooks/useNavigation'

function Header() {
    const { navigateTo } = useNavigation();

    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState();


    return (
        <>
            <nav className="flex items-center gap-4 justify-center md:justify-between p-4 flex-wrap">
                <h1 onClick={() => navigateTo('/')} className="text-xl font-bold hover:cursor-pointer">
                    <img src="https://d33wubrfki0l68.cloudfront.net/547a9970a7d43be64cdf108f330a8dd372d72c90/45801/images/pokemon_logo.png" width={150} alt="" />
                </h1>
                <form className="flex items-center flex-nowrap" onSubmit={(e) => { e.preventDefault(); navigateTo('/search/' + searchKeyword) }}>
                    <input onChange={(e) => { setSearchKeyword(e.target.value) }} type="text" id="searchInput" name="searchInput" className="py-1 px-2 border border-r-0 rounded-l-md focus:outline-none" placeholder="Search..." />
                    <button className="py-1 px-2 border rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    </button>
                </form>
                <div className="flex gap-4">
                    <span onClick={() => navigateTo('/')} className={`px-4 py-2 ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-300' : 'text-gray-500'} hover:cursor-pointer hover:bg-gray-100 font-semibold`}>Home</span>
                    <span onClick={() => navigateTo('/favorites')} className={`px-4 py-2 ${location.pathname === '/favorites' ? 'text-blue-600 border-b-2 border-blue-300' : 'text-gray-500'} hover:cursor-pointer hover:bg-gray-100 font-semibold`}>Favorites</span>
                </div>
            </nav>
        </>
    )
}

export default Header;