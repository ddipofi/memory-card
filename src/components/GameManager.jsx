import { useState, useEffect, useRef } from "react";
import Card from "./Card";

export default function GameManager() {
    const [status, setStatus] = useState({
        pokemonList: [],
        score: 0,
        highScore: 0,
        prev: new Set(),
    });
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        async function getPokemonList() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=30&offset=14"
            );
            const data = await response.json();
            setStatus({
                ...status,
                pokemonList: data.results
                    .filter((_, index) => index % 3 === 0)
                    .sort(() => Math.random() - 0.5),
            });
        }

        getPokemonList().catch((e) => console.log(e));
    }, []);

    return (
        <div className="game-manager">
            <h2>Score: {status.score}</h2>
            <h2>High Score: {status.highScore}</h2>
            {status.pokemonList?.map((pokemon) => (
                <Card
                    key={pokemon.name}
                    name={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                    apiUrl={pokemon.url}
                    status={status}
                    onClick={setStatus}
                ></Card>
            ))}
        </div>
    );
}
