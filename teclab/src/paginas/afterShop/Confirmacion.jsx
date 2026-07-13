import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./confirmacion.css";

const generarNumeroPedido = () => {
  const numero = Math.floor(10000 + Math.random() * 90000);
  return `PED-${numero}`;
};

export const Confirmacion = () => {
  const location = useLocation();
  const datosPedido = location.state;

  /*Si el usuario entra directo a /confirmacion sin pasar por el checkout, no hay datosPedido, 
  en ese caso genero un numero igual para no romper la vista.*/
  const numeroPedido = datosPedido?.numeroPedido ?? generarNumeroPedido();

  return (
    <main>
      <div className="confirmacion-pedido">
        <div className="check-icon">✓</div>

        <h3>¡Tu pedido fue confirmado!</h3>
        <p>
          Te redirigimos a WhatsApp para que envíes tu pedido y coordines con
          nosotros.
        </p>

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
