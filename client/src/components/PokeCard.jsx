function PokeCard(props) {
    return (
        <>
            <div className="p-4 border rounded-md">
                <figure className="bg-gray-300 h-24 w-60">

                </figure>
                <figcaption className="text-center">
                    {props.data?.name}
                </figcaption>
            </div>
        </>
    )
}

export default PokeCard;