import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./confirmacion.css";

// Genera un número de pedido aleatorio, ej: "PED-48213"
const generarNumeroPedido = () => {
  const numero = Math.floor(10000 + Math.random() * 90000); // 5 dígitos
  return `PED-${numero}`;
};

export const Confirmacion = () => {
  // useState con función inicializadora: se ejecuta solo una vez,
  // así el número no cambia en cada re-render del componente.
  const [numeroPedido] = useState(generarNumeroPedido);

  return (
    <main>
      <div className="confirmacion-pedido">
        <h3>¡Tu pedido fue confirmado!</h3>
        <p>
          Pulsa <a href="">aqui</a> para dirigirte a nuestro Whatsapp y
          confirmar tu pedido
        </p>
        <a href="" className="link">
          link de wsp
        </a>

        <div className="numero-pedido">
          <span>Número de pedido</span>
          <strong>{numeroPedido}</strong>
        </div>

        <Link to="/" className="btn-confirmar">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
};
