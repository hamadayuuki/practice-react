import React, { useState, useEffect } from "react"
import axios from "./axios"
import { requests } from "./requests"

type Banner = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
};

export const Banner = () => {
    const [banner, setBanner] = useState<Banner>({});

    useEffect( () => {
        async function fetchData() {
            const response = await axios.get(requests.feachNetflixOriginals);
            console.log(response.data.result)
            const index = Math.floor(Math.random() * response.data.results.length - 1);
            setBanner(response.data.results[index]);
            return response;
        };
        
        fetchData();
    }, []);

    console.log(banner);

    // descriptionの長さを調整する
    function truncate(str: any, n: number) {
        // undefinedを弾く
        if (str !== undefined) {
        return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        }
    }
}