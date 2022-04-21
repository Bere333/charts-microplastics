import React, {useState} from 'react';

function Button({ title, downloadFunction }) {
    return(
        <button
            style={{
                "fontFamily": "'Poppins', sans-serif",
                "color":"black",
                "backgroundColor":"#F0AD19",
                "fontWeight": "bold",
                "boxShadow": "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                "border": "none",
                "borderRadius": "10px",
                "height":"auto",
                "width":"10rem",
                "padding":"1rem 1rem",
                "margin":"0.5rem 0"
            }}
            onClick={downloadFunction}
        >
            {title}
        </button>
    )
}

export default Button;