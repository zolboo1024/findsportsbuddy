//custom footer that has my name on it
//visible on all pages
import React from 'react';

var style = {
    backgroundColor: "#d2aaad",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    color: "black",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

export default function DisplayMap(props) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                Made by zolboo1024 using React and Node.js
            </div>
        </div>
    )
}