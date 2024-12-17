import axios from "axios";
import { useEffect, useState } from "react";

function PokeCard(props) {
    const [pokeData, setPokeData] = useState(null);
    const [pokeImg, setPokeImg] = useState(null);

    const fetchData = async () => {
        const { data } = await axios.get(props.data?.url);
        setPokeData(data);
        setPokeImg(data.sprites.other["official-artwork"].front_default);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="p-4 border rounded-md bg-gray-300 flex justify-between">
                <figure className="bg-gray-300">
                    <img className=" h-28" src={pokeImg} alt={props.data?.name} />
                </figure>
                <figcaption className="text-right">
                    <h2 className="font-bold text-xl capitalize">{props.data?.name}</h2>
                    <p className="italic">{pokeData?.types.map((type, index) => {
                        return (index > 0 ? `, ${type.type.name}` : type.type.name)
                        {/* return type.type.name */ }
                    })}</p>
                </figcaption>
            </div>
        </>
    )
}

export default PokeCard;