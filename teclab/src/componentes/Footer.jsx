import React from "react";
import ScrollToTop from "react-scroll-to-top";

export const Footer = () => {
  const anioInicio = 2024;
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <h4 className="footer__container-titulo">Valentina Galetto Pastelería</h4>
      <p className="footer__container-derechos">
        Copyright ©{" "}
        {anioInicio === anioActual
          ? anioActual
          : `${anioInicio} - ${anioActual}`}{" "}
        - Diseño Web realizado por <b>Mateo Galetto Estrada</b>
      </p>

      <ScrollToTop
        smooth
        top="500"
        style={{
          backgroundColor: "#f09491",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          transition: "0.2s",
        }}
        color="#fff"
      />
    </footer>
  );
};
