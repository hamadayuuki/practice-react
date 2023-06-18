import React, { useState, useEffect } from "react"
import axios from "./axios"
import { requests } from "./requests"
import "./Banner.scss"

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

    // DOM
    return(
        <header
        className = "Banner"
        style = {{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${banner?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
       >
            <div className="Banner-contents">
                <h1 className="banner-title">
                {banner?.title || banner?.name || banner?.original_name}
                </h1>

                <div className="Banner-buttons">
                    <button className="Banner-button">Play</button>
                    <button className="Banner-button">My List</button>
                </div>

                <h1 className="Banner-description">{truncate(banner?.overview, 150)}</h1>
            </div>
            <div className="Banner-fadeBottom" />
        </header>
    );
}