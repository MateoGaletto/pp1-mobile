import React, { useState } from "react";
import "./seleccionSabores.css";

export const SABORES_DISPONIBLES = [
  "Pastelera",
  "Chocolate blanco",
  "Limón",
  "Pistacho",
  "Avellana",
  "Dulce de leche",
  "Chocolate",
  "Oreo",
  "Chococorta",
  "Bon o bon",
  "Mafalda",
  "Café con chocolate",
];

export const MERMELADAS_DISPONIBLES = ["Frutos rojos", "Frambuesa", "Maracuyá"];

export const TOPPINGS_DISPONIBLES = [
  "Frutillas",
  "Nuez",
  "Almendras",
  "Pistachos",
  "Lajas de chocolate (blanca o semiamarga)",
];

export const PRODUCTOS_CON_SABORES = [
  "Docena de autor",
  "1/2 Docena de autor",
  "Docena clasica",
  "1/2 Docena clasica",
];

// Sabores que NO tienen mermelada/topping (ya vienen con su relleno fijo)
const SABORES_SIN_EXTRAS = [
  "Mafalda",
  "Oreo",
  "Chococorta",
  "Bon o bon",
  "Café con chocolate",
];

export const requiereSabores = (nombreProducto) =>
  PRODUCTOS_CON_SABORES.includes(nombreProducto);

export const cantidadRequerida = (nombreProducto) =>
  nombreProducto.startsWith("1/2") ? 6 : 12;

const nuevoIdVariante = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const SeleccionSabores = ({ producto, onClose, onConfirm }) => {
  const [variantesPorSabor, setVariantesPorSabor] = useState({});

  const requerido = cantidadRequerida(producto.nombre);
  const totalSeleccionado = Object.values(variantesPorSabor)
    .flat()
    .reduce((acc, v) => acc + v.cantidad, 0);
  const faltan = requerido - totalSeleccionado;

  const agregarVariante = (sabor) => {
    if (totalSeleccionado >= requerido) return;
    setVariantesPorSabor((prev) => ({
      ...prev,
      [sabor]: [
        ...(prev[sabor] || []),
        { id: nuevoIdVariante(), cantidad: 1, mermeladas: [], toppings: [] },
      ],
    }));
  };

  const quitarVariante = (sabor, id) => {
    setVariantesPorSabor((prev) => ({
      ...prev,
      [sabor]: prev[sabor].filter((v) => v.id !== id),
    }));
  };

  const cambiarCantidad = (sabor, id, delta) => {
    if (delta > 0 && totalSeleccionado >= requerido) return;
    setVariantesPorSabor((prev) => ({
      ...prev,
      [sabor]: prev[sabor].map((v) =>
        v.id === id ? { ...v, cantidad: Math.max(1, v.cantidad + delta) } : v,
      ),
    }));
  };

  const toggleExtra = (sabor, id, tipo, valor) => {
    setVariantesPorSabor((prev) => ({
      ...prev,
      [sabor]: prev[sabor].map((v) => {
        if (v.id !== id) return v;
        const lista = v[tipo];
        const nuevaLista = lista.includes(valor)
          ? lista.filter((x) => x !== valor)
          : [...lista, valor];
        return { ...v, [tipo]: nuevaLista };
      }),
    }));
  };

  const handleConfirmar = () => {
    if (totalSeleccionado !== requerido) return;

    const saboresSeleccionados = Object.entries(variantesPorSabor).flatMap(
      ([sabor, variantes]) =>
        variantes.map((v) => ({
          sabor,
          cantidad: v.cantidad,
          mermeladas: v.mermeladas,
          toppings: v.toppings,
        })),
    );

    onConfirm(saboresSeleccionados);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sabores">
        <h3>{producto.nombre}</h3>
        <p className="sabores-subtitulo">
          Elegí {requerido} medialunas en total. Podés repetir un sabor varias
          veces con combinaciones distintas de mermelada/topping.
        </p>

        <div className={`sabores-contador ${faltan === 0 ? "completo" : ""}`}>
          {faltan === 0
            ? "¡Listo! Ya elegiste todas las medialunas"
            : `Te faltan ${faltan} de ${requerido}`}
        </div>

        <div className="sabores-lista">
          {SABORES_DISPONIBLES.map((sabor) => {
            const variantes = variantesPorSabor[sabor] || [];
            const sinExtras = SABORES_SIN_EXTRAS.includes(sabor);

            return (
              <div
                className={`sabor-item ${
                  variantes.length > 0 ? "elegido" : ""
                }`}
                key={sabor}
              >
                <div className="sabor-fila">
                  <span className="sabor-nombre">{sabor}</span>
                  <button
                    type="button"
                    className="btn-agregar-variante"
                    onClick={() => agregarVariante(sabor)}
                    disabled={
                      totalSeleccionado >= requerido || variantes.length >= 3
                    }
                  >
                    + Agregar
                  </button>
                </div>

                {variantes.map((variante, index) => {
                  const tieneExtras =
                    variante.mermeladas.length > 0 ||
                    variante.toppings.length > 0;

                  return (
                    <div className="variante-card" key={variante.id}>
                      <div className="variante-header">
                        <span className="variante-numero">
                          Combinación {index + 1}
                          {tieneExtras && (
                            <span className="variante-badge-extra">
                              ✓ personalizado
                            </span>
                          )}
                        </span>

                        <div className="variante-acciones">
                          <div className="sabor-controles">
                            <button
                              type="button"
                              onClick={() =>
                                cambiarCantidad(sabor, variante.id, -1)
                              }
                              disabled={variante.cantidad <= 1}
                            >
                              −
                            </button>
                            <span className="sabor-cantidad">
                              {variante.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                cambiarCantidad(sabor, variante.id, 1)
                              }
                              disabled={totalSeleccionado >= requerido}
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="variante-quitar"
                            onClick={() => quitarVariante(sabor, variante.id)}
                          >
                            Quitar
                          </button>
                        </div>
                      </div>

                      {!sinExtras && (
                        <div className="sabor-extras">
                          <div className="sabor-extras-grupo">
                            <span className="sabor-extras-label">
                              Mermelada (opcional)
                            </span>
                            <div className="sabor-extras-chips">
                              {MERMELADAS_DISPONIBLES.map((m) => (
                                <label className="extra-chip" key={m}>
                                  <input
                                    type="checkbox"
                                    checked={variante.mermeladas.includes(m)}
                                    onChange={() =>
                                      toggleExtra(
                                        sabor,
                                        variante.id,
                                        "mermeladas",
                                        m,
                                      )
                                    }
                                  />
                                  {m}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="sabor-extras-grupo">
                            <span className="sabor-extras-label">
                              Topping (opcional)
                            </span>
                            <div className="sabor-extras-chips">
                              {TOPPINGS_DISPONIBLES.map((t) => (
                                <label className="extra-chip" key={t}>
                                  <input
                                    type="checkbox"
                                    checked={variante.toppings.includes(t)}
                                    onChange={() =>
                                      toggleExtra(
                                        sabor,
                                        variante.id,
                                        "toppings",
                                        t,
                                      )
                                    }
                                  />
                                  {t}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
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
