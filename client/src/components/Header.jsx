import { useState } from "react";
import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState();


    return (
        <>
            <nav className="flex items-center justify-between my-4">
                <h1 onClick={() => navigate('/')} className="text-xl font-bold hover:cursor-pointer">
                    <img src="https://d33wubrfki0l68.cloudfront.net/547a9970a7d43be64cdf108f330a8dd372d72c90/45801/images/pokemon_logo.png" width={150} alt="" />
                </h1>
                <form className="flex items-center flex-nowrap" onSubmit={() => navigate('/search/' + searchKeyword)}>
                    <input onChange={(e) => { setSearchKeyword(e.target.value) }} type="text" id="searchInput" name="searchInput" className="py-1 px-2 border border-r-0 rounded-l-md focus:outline-none" placeholder="Search..." />
                    <button className="py-1 px-2 border rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    </button>
                </form>
                <div className="flex gap-4">
                    <span onClick={() => navigate('/')} className={`px-4 py-2 rounded-md ${location.pathname === '/' ? 'bg-blue-500' : 'bg-blue-400'} text-white hover:cursor-pointer hover:bg-blue-300 font-semibold`}>Home</span>
                    <span onClick={() => navigate('/favorites')} className={`px-4 py-2 rounded-md ${location.pathname === '/favorites' ? 'bg-blue-500' : 'bg-blue-400'} text-white hover:cursor-pointer hover:bg-blue-300 font-semibold`}>Favorites</span>
                </div>
            </nav>
        </>
    )
}

export default Header;