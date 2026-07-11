import React, { useState } from "react";
import "./seleccionSabores.css";

// Lista de sabores disponibles — modificá este array para agregar/quitar sabores
export const SABORES_DISPONIBLES = [
  "Membrillo",
  "Dulce de Leche",
  "Pastelera",
  "Pastelera con Frutillas",
  "Pastelera con Frutos rojos",
  "Limon",
  "Chocolate Blanco",
  "Choco Oreo",
  "Chocotorta",
  "Chocolate con nuez",
  "Nutella",
];

export const SABORES_DISPONIBLES_CLASICAS = [
  "Membrillo",
  "Dulce de Leche",
  "Pastelera",
];

// Productos que requieren selección de sabores antes de agregar al carrito
export const PRODUCTOS_CON_SABORES = [
  "Docena de autor",
  "1/2 Docena de autor",
  "Docena clasica",
  "1/2 Docena clasica",
];

export const requiereSabores = (nombreProducto) =>
  PRODUCTOS_CON_SABORES.includes(nombreProducto);

export const cantidadRequerida = (nombreProducto) =>
  nombreProducto.startsWith("1/2") ? 6 : 12;

/**
 * Modal para elegir sabores de una docena/media docena.
 *
 * Props:
 * - producto: el producto sobre el que se está eligiendo (para mostrar nombre)
 * - onClose: función al cancelar
 * - onConfirm: function(saboresSeleccionados: { sabor: string, cantidad: number }[])
 */
export const SeleccionSabores = ({ producto, onClose, onConfirm }) => {
  const [conteo, setConteo] = useState(
    Object.fromEntries(SABORES_DISPONIBLES.map((s) => [s, 0])),
  );

  const requerido = cantidadRequerida(producto.nombre);
  const totalSeleccionado = Object.values(conteo).reduce((a, b) => a + b, 0);
  const faltan = requerido - totalSeleccionado;

  const sumar = (sabor) => {
    if (totalSeleccionado >= requerido) return;
    setConteo((prev) => ({ ...prev, [sabor]: prev[sabor] + 1 }));
  };

  const restar = (sabor) => {
    if (conteo[sabor] <= 0) return;
    setConteo((prev) => ({ ...prev, [sabor]: prev[sabor] - 1 }));
  };

  const handleConfirmar = () => {
    if (totalSeleccionado !== requerido) return;

    const saboresSeleccionados = Object.entries(conteo)
      .filter(([, cantidad]) => cantidad > 0)
      .map(([sabor, cantidad]) => ({ sabor, cantidad }));

    onConfirm(saboresSeleccionados);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sabores">
        <h3>{producto.nombre}</h3>
        <p className="sabores-subtitulo">
          Elegí {requerido} sabores (se pueden repetir)
        </p>

        <div className={`sabores-contador ${faltan === 0 ? "completo" : ""}`}>
          {faltan === 0
            ? "¡Listo! Ya elegiste todos los sabores"
            : `Te faltan ${faltan} de ${requerido}`}
        </div>

        <div className="sabores-lista">
          {SABORES_DISPONIBLES.map((sabor) => (
            <div className="sabor-item" key={sabor}>
              <span className="sabor-nombre">{sabor}</span>

              <div className="sabor-controles">
                <button
                  type="button"
                  onClick={() => restar(sabor)}
                  disabled={conteo[sabor] === 0}
                >
                  −
                </button>
                <span className="sabor-cantidad">{conteo[sabor]}</span>
                <button
                  type="button"
                  onClick={() => sumar(sabor)}
                  disabled={totalSeleccionado >= requerido}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-botones">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-confirmar"
            onClick={handleConfirmar}
            disabled={totalSeleccionado !== requerido}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
