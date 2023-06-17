/* 映画カードのデータ */
import React, { useState, useEffect } from "react"
import axios from "axios"

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

export const Row = ({title, fetchUrl}: Props) => {
    // 状態を通知する
    //     ↓変数  ↓変更を反映させるメソッド名
    const [movies, setMovies] = useState<Movie[]>([]);

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

    return(
        <div className = "Row " />
    )
};