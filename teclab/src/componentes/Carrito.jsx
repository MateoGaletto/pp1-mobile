import React from "react";

export const Carrito = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const eliminarProducto = (product) => {
		const eliminar = allProducts.filter((item) => item.id !== product.id);

		setTotal(total - product.precio * product.cantidad);
		setCountProducts(countProducts - product.cantidad);
		setAllProducts(eliminar);
	};

	const vaciarCarrito = () => {
		const vaciar = confirm(
			"¿Está seguro que desea eliminar todos sus productos del carrito?"
		);

		if (vaciar) {
			setAllProducts([]);
			setTotal(0);
			setCountProducts(0);
		}
	};

	return (
		<>
			<div className="row-product">
				{allProducts.map((product) => (
					<div className="cart-product" key={product.id}>
						<div className="info-cart-product">
							<span className="cantidad-producto-carrito">
								{product.cantidad}
							</span>
							<p className="titulo-producto-carrito">{product.nombre}</p>
							<span className="precio-producto-carrito">${product.precio}</span>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="icon-close"
							onClick={() => eliminarProducto(product)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</div>
				))}
			</div>
			<div className="cart-total">
				<h3>Total:</h3>
				<span className="total-pagar">${total}</span>
			</div>
		</>
	);
};
