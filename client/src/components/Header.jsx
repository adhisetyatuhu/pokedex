import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="flex items-center justify-between my-4">
                <h1 onClick={() => navigate('/')} className="text-xl font-bold hover:cursor-pointer">
                    <img src="https://d33wubrfki0l68.cloudfront.net/547a9970a7d43be64cdf108f330a8dd372d72c90/45801/images/pokemon_logo.png" width={150} alt="" />
                </h1>
                <div className="flex gap-4">
                    <span onClick={() => navigate('/')} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold">Home</span>
                    <span onClick={() => navigate('/favorites')} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400 font-semibold">Favorites</span>
                </div>
            </nav>
        </>
    )
}

export default Header;