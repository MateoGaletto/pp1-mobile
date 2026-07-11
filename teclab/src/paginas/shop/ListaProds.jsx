import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productos } from "../../componentes/js/productos";
import { Typed } from "../../componentes/Typed";
import { CATEGORIAS } from "./Seleccioncategoria";
import {
  SeleccionSabores,
  requiereSabores,
  cantidadRequerida,
} from "./SeleccionSabores";

export const ListaProds = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const { categoria } = useParams();
  const infoCategoria = CATEGORIAS[categoria];

  // Producto sobre el que se está eligiendo sabores (null = modal cerrado)
  const [productoSeleccionandoSabores, setProductoSeleccionandoSabores] =
    useState(null);

  const productosFiltrados = infoCategoria
    ? productos.filter((p) => p.category === infoCategoria.categoriaProducto)
    : productos;

  const agregarAlCarrito = (product, sabores = null) => {
    if (sabores) {
      const itemConSabores = {
        ...product,
        id: `${product.id}-${Date.now()}`,
        cantidad: 1,
        sabores,
      };

      setTotal(total + product.precio);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, itemConSabores]);
      return;
    }

    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      );

      setTotal(total + product.precio * product.cantidad);
      setCountProducts(countProducts + product.cantidad);

      return setAllProducts([...products]);
    }

    setTotal(total + product.precio * product.cantidad);
    setCountProducts(countProducts + product.cantidad);
    setAllProducts([...allProducts, product]);
  };

  const handleClickAgregar = (product) => {
    if (requiereSabores(product.nombre)) {
      setProductoSeleccionandoSabores(product);
      return;
    }
    agregarAlCarrito(product);
  };

  const handleConfirmarSabores = (saboresSeleccionados) => {
    agregarAlCarrito(productoSeleccionandoSabores, saboresSeleccionados);
    setProductoSeleccionandoSabores(null);
  };

  return (
    <div id="shopContent" className="container__flex">
      <Typed />

      {infoCategoria && (
        <Link to="/comprar" className="volver-categorias">
          ← Cambiar categoría
        </Link>
      )}

      <div className="container-prods">
        {productosFiltrados.map((product) => (
          <div className="flex-item" key={product.id}>
            <img src={product.img} alt={product.nombre} />
            <h2 className="name-product">{product.nombre}</h2>
            <p className="price">${product.precio}</p>

            <button
              className="add-product"
              onClick={() => handleClickAgregar(product)}
            >
              {requiereSabores(product.nombre)
                ? "Elegir sabores"
                : "Añadir al carrito"}
            </button>
          </div>
        ))}
      </div>

      {productoSeleccionandoSabores && (
        <SeleccionSabores
          producto={productoSeleccionandoSabores}
          onClose={() => setProductoSeleccionandoSabores(null)}
          onConfirm={handleConfirmarSabores}
        />
      )}
    </div>
  );
};
