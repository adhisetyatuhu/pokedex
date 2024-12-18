import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate()
    return (
        <>
            <h1 onClick={() => navigate('/')} className="my-4 text-xl font-bold">Header</h1>
        </>
    )
}

export default Header;