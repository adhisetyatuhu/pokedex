import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokeCard from "../components/PokeCard";

function Search() {
    const [pokeList, setPokeList] = useState([]);
    const { keyword } = useParams();
    const [result, setResult] = useState();

    const fetchData = async () => {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            setPokeList(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const filterData = () => {
        const filtered = pokeList?.filter(poke => {
            return poke.name.indexOf(keyword) == 0
        })
        setResult(filtered);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [pokeList])

    return (
        <>
            <div className='grid grid-cols-1 sm:mx-12 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                {
                    result?.map((poke, index) => {
                        return <PokeCard key={index} data={poke} />
                    })
                }
            </div>
        </>
    )
}

export default Search;