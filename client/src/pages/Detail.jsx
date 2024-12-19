import axios from "axios";
import { useEffect, useState, Component } from "react";
import { useParams } from "react-router";
import ReactHowler from "react-howler";
import { LoadingIcon } from "../components/PokeCard";
import ReactApexChart from "react-apexcharts";

const StatChart = (props) => {
    const [stats, setStats] = useState(null);

    const [state, setState] = useState({
        series: [{
            name: 'Base Stats',
            data: [],
        }],
        options: {
            chart: {
                height: 350,
                type: 'radar',
                toolbar: {
                    show: false
                }
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
                categories: []
            }
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
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="radar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

function Hero(props) {
    const [sound, setSound] = useState(null);
    const [isHowling, setIsHowling] = useState(false);

    useEffect(() => {
        setSound(props.data?.cries.latest);
    }, []);

    useEffect(() => {
        setSound(props.data?.cries.latest);
    }, [props.data?.cries.latest])

    return (
        <>
            <div className="flex justify-between items-center bg-gray-300 px-12">
                <div className="p-6">
                    <h2 className="text-3xl font-bold capitalize mb-2">{props.data?.name}</h2>

                    {/* types */}
                    <div className="flex gap-2">{props.data?.types.map((type, index) => {
                        return (<span key={index} className="border border-black rounded-3xl px-4">{type.type.name}</span>)
                    })}</div>
                    {/* end types */}

                    <div className="flex justify-between mt-2">
                        <span>Weight: {props.data?.weight}</span>
                        <span>Height: {props.data?.height}</span>
                    </div>
                </div>

                <figure className="h-96 bg-gray-300 flex items-center">
                    {
                        props.isLoading ?
                            <LoadingIcon />
                            :
                            <img onMouseEnter={() => setIsHowling(true)} onMouseLeave={() => setIsHowling(false)} className="h-80 hover:animate-pulse hover:cursor-pointer" src={props.data?.sprites.other["official-artwork"].front_default} />
                    }
                    {
                        isHowling && <ReactHowler src={sound} playing={isHowling} volume={0.05} />
                    }
                </figure>

                {/* base stats */}
                <div>
                    {/* <h2 className="text-xl font-bold mb-3">Base Stats</h2> */}
                    <StatChart stats={props.data?.stats} />
                </div>
                {/* end base stats */}

            </div>
        </>
    );
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
        </>
    );
}

export default Detail;