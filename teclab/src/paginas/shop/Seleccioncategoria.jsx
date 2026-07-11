import React from "react";
import { Link } from "react-router-dom";
import "./seleccionCategoria.css";

// Mapeo entre el slug de la URL y las categorías reales usadas en productos.js
export const CATEGORIAS = {
  medialuna: { label: "Medialunas", categoriaProducto: "medialuna" },
  postres: { label: "Postres", categoriaProducto: "Porción" },
  otro: { label: "Otros", categoriaProducto: "otro" },
};

export const SeleccionCategoria = () => {
  return (
    <main>
      <div className="seleccion-categoria">
        <h1 className="seleccion-titulo">¿Qué querés comprar hoy?</h1>

        <div className="banderas-container">
          {Object.entries(CATEGORIAS).map(([slug, { label }]) => (
            <Link to={`/comprar/${slug}`} className="bandera" key={slug}>
              <span className="bandera-label">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
