/* 映画カードのデータ */
import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.scss";
import { API_KEY } from "./requests"

const img_base_url = "https://image.tmdb.org/t/p/original";

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
};

type MovieTrailer = {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1 | undefined;
    };
};

export const Row = ({title, fetchUrl, isLargeRow}: Props) => {
    // 状態を通知する
    //     ↓変数  ↓変更を反映させるメソッド名
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    // urlが更新される度に
    useEffect( () => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);   // 第2引数を与える事で(第2引数の値の変更時をトリガーにして)第1引数の関数を実行

    console.log(movies);

    // Trailerの設定
    const movieTrailer: MovieTrailer = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };
    // Trailer のURL更新
    const handleClick = async (movie: Movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerulr = await axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}`)
            setTrailerUrl(trailerulr.data.results[0]?.key);
        }
    };

    return(
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
            {movies.map((movie, i) => (
                <img
                    key={movie.id}
                    className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                    src={`${img_base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                />
            ))}
            </div>
        </div>
    )
};