import React from "react";
import { ReactTyped } from "react-typed";

export const Typed = ({ categoria }) => {
  const contenido = {
    medialuna: {
      titulo: "Medialunas",
      strings: ["Clasicas", "Especiales"],
    },
    postres: {
      titulo: "Postres",
      strings: ["Exquisitos"],
    },
    otro: {
      titulo: "",
      strings: ["Chipas", "Scones", "Alfajores"],
    },
  };

  const data = contenido[categoria];

  if (!data) return null;

  return (
    <>
      <h1 className="comprar_title">
        {data.titulo}{" "}
        <ReactTyped
          strings={data.strings}
          startDelay={800}
          backDelay={1000}
          typeSpeed={75}
          backSpeed={75}
          loop
          style={{
            color: "#f09491",
          }}
        />
      </h1>
    </>
  );
};
