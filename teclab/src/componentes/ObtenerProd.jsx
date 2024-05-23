import React from "react";
import productos from "./productos";

const ObtenerProd = () => {
	const enviarCarrito = (producto) => {
		console.log(producto);
	};

	return (
		<>
			<div id="shopContent" className="shopContent">
				{productos.map((producto) => (
					<div key={producto.id}>
						<h2>{producto.nombre}</h2>
						<button onClick={() => enviarCarrito(producto)}>Agregar</button>
					</div>
				))}
			</div>
		</>
	);
};

export default ObtenerProd;
