import React, { useState, useEffect } from "react"
import "./NavigationBar.scss"

type Navigation = {
    className?: string;
};

export const NavigationBar = () => {
    const [show, setShow] = useState(false);

    useEffect( () => {
        const handleShow = () => {
            if (window.scrollY > 100) {
                setShow(false)
            } else {
                setShow(true);
            }
        };

        // "scroll" が行われるたびに handleShow() を実行
        window.addEventListener("scroll", handleShow);
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    // DOM
    return(
        //                                     ↓show に応じて適応
        <div className={`Navigation ${show && "Navigation-black"}`}>
            <img
                className="Navigation-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img
                className="Navigation-avater"
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="Avatar"
            />
        </div>
    )
}




