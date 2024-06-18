import React from "react";
import { productos } from "./js/productos";
import { Typed } from "./Typed";

export const ListaProds = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const agregarAlCarrito = (product) => {
		if (allProducts.find((item) => item.id === product.id)) {
			const products = allProducts.map((item) =>
				item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
			);

			setTotal(total + product.precio * product.cantidad);
			setCountProducts(countProducts + product.cantidad);
			return setAllProducts([...products]);
		}

		setTotal(total + product.precio * product.cantidad);
		setCountProducts(countProducts + product.cantidad);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div id="shopContent" className="container__flex">
			<Typed />
			<div className="container-prods">
				{productos.map((product) => (
					<div className="flex-item" key={product.id}>
						<img src={product.img} alt={product.nombre} />
						<h2 className="name-product">{product.nombre}</h2>
						<p className="price">${product.precio}</p>

						<button
							className="add-product"
							onClick={() => agregarAlCarrito(product)}
						>
							Añadir al carrito
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
