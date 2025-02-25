import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokeCard from "../components/PokeCard";
import { LoadingPokeCard } from "../components/PokeCard";
import { pokeapi } from "../utils/axios";

function Search() {
    const [pokeList, setPokeList] = useState([]);
    const { keyword } = useParams();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await pokeapi.get('/pokemon?limit=100000&offset=0');
            setPokeList(data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterData = () => {
        const filtered = pokeList?.filter(poke => {
            return poke.name.indexOf(keyword.toLowerCase()) == 0
        })
        setResult(filtered);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [pokeList]);

    useEffect(() => {
        filterData();
    }, [keyword]);

    return (
        <>
            <div className='grid grid-cols-1 sm:mx-12 sm:grid-cols-2 md:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6'>
                {
                    isLoading ?
                        <LoadingPokeCard />
                        :
                        result?.length == 0 ?
                            <div className="py-12 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 col-span-4 text-md text-center" role="alert">
                                <div className="font-medium text-3xl mb-4">Oops! No pokemons found.</div>
                                <img className="mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" />
                                <div className="mt-4">I'm sorry we can't find pokemons with keyword <span className="font-semibold">{keyword}</span>.</div>
                            </div>

                            :
                            result?.map((poke, index) => {
                                return <PokeCard key={index} data={poke} />
                            })
                }
            </div>
        </>
    )
}

export default Search;