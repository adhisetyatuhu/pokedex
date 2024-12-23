import axios from "axios";
import { useEffect, useState, Component } from "react";
import { useParams } from "react-router";
import ReactHowler from "react-howler";
import { LoadingIcon } from "../components/PokeCard";
import ReactApexChart from "react-apexcharts";
import { elements } from "../utils/colors";
import Swal from 'sweetalert2'
import openSound from '../assets/sound/open.wav'
import removeSound from '../assets/sound/remove.wav'
import server from "../utils/axios";

const StatChart = (props) => {
    const [stats, setStats] = useState(null);

    const [state, setState] = useState({
        series: [{
            name: 'Base Stats',
            data: [],
        }],
        options: {
            chart: {
                type: 'radar',
                toolbar: {
                    show: false
                },
                resizable: true
            },
            title: {
                text: ''
            },
            yaxis: {
                // stepSize: 30,
                show: false,
                max: 150
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        colors: ["#000", "#000", "#000", "#000", "#000", "#000"]
                    }
                }
            },


        },
    });

    const getStats = () => {
        if (stats?.length > 0) {
            const statNames = [...stats].map(stat => {
                return stat.stat.name
            });
            const statValues = [...stats].map(stat => {
                return stat.base_stat
            });
            setState({ ...state, series: [{ ...state.series, data: statValues }], options: { ...state.options, xaxis: { categories: statNames } } });
        }
    }

    useEffect(() => {
        setStats(props.stats)
    }, []);

    useEffect(() => {
        setStats(props.stats)
    }, [props.stats]);

    useEffect(() => {
        getStats();
    }, [stats])

    return (
        <div>
            <div id="chart" className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/15 from-0% to-black/0 to-70%">
                <div className="hidden lg:block">
                    <ReactApexChart options={state.options} series={state.series} type="radar" height={550} width={580} />
                </div>
                <div className="block lg:hidden">
                    <ReactApexChart options={state.options} series={state.series} type="radar" height={350} width={380} />
                </div>
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

function Hero(props) {
    const [sound, setSound] = useState(null);
    const [isHowling, setIsHowling] = useState(false);
    const [favoritePokemon, setFavoritePokemon] = useState(null);

    const getColor = (type) => elements[type] || elements["undefined"];

    const addToFavorite = async (pokeData) => {
        try {
            playOpenSound()
            await server.post('/favorites', {
                name: pokeData.name,
                url: `https://pokeapi.co/api/v2/pokemon/${pokeData.name}`,
            })
            Swal.fire({
                title: "Success!",
                text: "You caught the Pokémon!",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFavoritePokemon = async () => {
        try {
            const { data } = await server.get('/favorites');
            setFavoritePokemon(data);
            fetchFavoritePokemon();
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromFavorite = async (id) => {
        try {
            playRemoveSound()
            await server.delete('/favorites/' + id)
            fetchFavoritePokemon();
            Swal.fire({
                title: "Success!",
                text: "You released the Pokémon!",
                icon: "success"
            });
        } catch (error) {
            console.log(error)
        }
    }

    const showButtonCatch = () => {
        const findPokemon = favoritePokemon?.find(pokemon => pokemon.name === props.data?.name);
        if (findPokemon) {
            return (
                <button className=" bg-zinc-100 hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded mt-3" onClick={() => removeFromFavorite(findPokemon.id)}>
                    Release Pokemon!
                </button>
            )
        } else {
            return (
                <button className=" bg-zinc-100 hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded mt-3" onClick={() => addToFavorite(props?.data)}>
                    Catch Pokemon!
                </button>
            )
        }
    }

    const playOpenSound = () => {
        let audio = new Audio(openSound);
        audio.play();
    }

    const playRemoveSound = () => {
        let audio = new Audio(removeSound);
        audio.play();
    }

    useEffect(() => {
        setSound(props.data?.cries.latest);
        fetchFavoritePokemon();
    }, []);

    useEffect(() => {
        setSound(props.data?.cries.latest);
    }, [props.data?.cries.latest])

    return (
        <>
            <div className={` bg-gray-300 px-12 ${props?.data?.types ? getColor(props.data?.types[0].type.name) : 'bg-gray-200/70'}`}>
                <div className="flex justify-center md:justify-between items-center flex-wrap">
                    <div className="my-4">
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-bold capitalize mb-2">{props.data?.name}</h2>

                            {/* types */}
                            <div className="flex gap-2 items-center italic">{props.data?.types.map((type, index) => {
                                return (index === 0 ? <span key={index}>{type.type.name}</span> : <><span>-</span><span key={index}>{type.type.name}</span></>)
                            })}</div>
                            {/* end types */}

                        </div>

                        <figure className="flex justify-center">
                            {
                                props.isLoading ?
                                    <LoadingIcon />
                                    :
                                    <img onMouseEnter={() => setIsHowling(true)} onMouseLeave={() => setIsHowling(false)} className="h-60 md:h-80 hover:animate-pulse hover:cursor-pointer" src={props.data?.sprites.other["official-artwork"].front_default} />
                            }
                            {
                                isHowling && <ReactHowler src={sound} playing={isHowling} volume={0.2} />
                            }
                        </figure>

                        <div className="flex justify-between mt-2">
                            <span>Weight: {props.data?.weight / 10} kg</span>
                            <span>Height: {props.data?.height / 10} m</span>
                        </div>

                        <div className="flex justify-center mt-2">
                            {showButtonCatch()}
                        </div>
                    </div>


                    {/* base stats */}
                    <div>
                        {/* <h2 className="text-xl font-bold mb-3">Base Stats</h2> */}
                        <StatChart stats={props.data?.stats} />
                    </div>
                    {/* end base stats */}
                </div>
            </div>

        </>
    );
}

function Ability(props) {
    const [abilityData, setAbilityData] = useState();

    const fetchAbilityData = async () => {
        try {
            const { data } = await axios.get(props.data.ability?.url);
            setAbilityData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAbilityData();
    }, []);

    return (
        <>
            <li>
                <div className="capitalize font-semibold">
                    {props.data?.ability?.name}
                </div>
                <div>
                    {abilityData?.effect_entries?.map((effect, index) => {
                        return <div key={index}>{effect.language.name === "en" ? effect.effect : ""}</div>
                    })}
                </div>
            </li>
        </>
    )
}

function AbilityCard(props) {

    return (
        <>
            <div className="border rounded-md px-4 bg-slate-50">
                <div className="py-1 font-semibold text-xl">Abilities</div>
                <hr />
                <ul className="list-disc px-4 py-2">
                    {
                        props.data?.abilities.map((ability, index) => {
                            return <Ability key={index} data={ability} />
                        })
                    }
                </ul>
            </div>
        </>
    )
}

function Detail(props) {
    const { id } = useParams(null);
    const [pokeData, setPokeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
            setPokeData(data);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Hero data={pokeData} isLoading={isLoading} setIsLoading={setIsLoading} />
            <div className="m-4"></div>

            <AbilityCard data={pokeData} />
        </>
    );
}

export default Detail;