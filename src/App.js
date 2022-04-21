import React from 'react';
import Graph from './Components/Graph/Graph';

function App() {
  return (
    <section className="App">
      <nav 
        style={{
          "backgroundColor":"#142F58", 
          "margin":"0 0", 
          "padding":"1vh 0",
          "boxShadow": "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          "display":"flex",
          "alignContent":"end",
          "alignItems":"end",
          "textAlign":"right",
          "width":"100%", 
          "height":"10vh",
          
        }}>
          <ul
            style={{
              "color":"#F0AD19", 
              "display":"flex",
              "flexDirection":"row",
              "listStyleType": "none",
              "fontFamily": "'Poppins', sans-serif",
              "fontStyle": "italic"
            }}
          >
            <li
              style={{
                "textDecoration": "overline"
              }}
            >
              Microplastics</li>
          </ul>
      </nav>
      <div 
        style={{
          "width":"100%", 
          "height":"auto",
          "display":"flex",
          "flexDirection":"row",
          "alignContent":"center",
          "padding":"3vh 0rem"
        }}>
        <div
          style={{
            "width":"100%",
            "padding":"4vh 3rem"
          }}
        >
          <Graph/>
        </div>
      </div>
    </section>
  );
}

export default App;



