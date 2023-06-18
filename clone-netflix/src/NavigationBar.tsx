import React, { useState, useEffect } from "react"

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
}




