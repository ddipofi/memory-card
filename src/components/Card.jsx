import { useState, useEffect, useRef } from "react";
import "../styles/Card.css";

export default function Card({ name, apiUrl, status, onClick }) {
    const [pokemonImg, setPokemonImg] = useState();
    const hasFetched = useRef(false);
    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        async function getPokemonImg() {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setPokemonImg(data.sprites.other["official-artwork"].front_default);
            console.log(data.sprites.other["official-artwork"].front_default);
        }

        getPokemonImg().catch((e) => console.log(e));
    }, [apiUrl]);

    return (
        <button
            className="card"
            onClick={() => {
                const newScore = status.score + 1;
                onClick({
                    pokemonList: shuffle(status.pokemonList),
                    score: status.prev.has(name) ? 0 : newScore,
                    highScore:
                        status.highScore < newScore && !status.prev.has(name)
                            ? newScore
                            : status.highScore,
                    prev: status.prev.has(name)
                        ? new Set()
                        : new Set(status.prev).add(name),
                });
            }}
        >
            <img src={pokemonImg} alt="" />
            {name}
        </button>
    );
}
