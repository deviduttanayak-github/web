import {React, useState, useEffect } from 'react';
import './style.css';

var counter = 0;
function Loading() {
    const [dots, setdots] = useState("");

    const updateDots = () => {
        var c = counter%4;
        if(c==0) setdots("");
        else if(c==1) setdots(".");
        else if(c==2) setdots("..");
        else setdots("...")
        counter += 1;
        setTimeout(() => {
            updateDots();
        }, 1000);
    };

    useEffect(() => {
        updateDots();
        return () => {
            counter = 0;
        }
    }, [])

    return (
        <div className="loading">
            <h3>loading{dots}</h3>
        </div>
    )
}

export default Loading
