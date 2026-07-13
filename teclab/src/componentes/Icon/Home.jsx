import React from "react";
const Home = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="26"
        height="26"
      >
        {/* techo: un solo trazo grueso en forma de pico */}
        <path
          d="M2 12 L12 3 L22 12"
          style={{
            fill: "currentColor",
            stroke: "#fff",
            strokeWidth: 2.2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        />
        {/* cuerpo de la casa con la puerta recortada */}
        <path
          style={{ fill: "#fff" }}
          d="M4 12 H20 V19 A2 2 0 0 1 18 21 H14 V15 H10 V21 H6 A2 2 0 0 1 4 19 Z"
        />
      </svg>
    </div>
  );
};

export default Home;
