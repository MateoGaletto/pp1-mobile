import React, { useState } from "react";
import { productos } from "./js/productos";

export const FiltroBusqueda = (allProducts, setAllProducts) => {
	const [busqueda, setBusqueda] = useState({
		medialuna: false,
		porcion: false,
		otro: false,
	});

	const handleOnCheckbox = (e) => {
		setBusqueda({
			...busqueda,
			[e.target.value]: e.target.checked,
		});

		if (e.target.checked) {
			const resultadoBusqueda = productos.filter(
				(item) => item.categoria === e.target.value
			);

			setAllProducts([...allProducts, ...resultadoBusqueda]);
		} else {
			const resultadoBusqueda = allProducts.filter(
				(item) => item.categoria !== e.target.value
			);

			setAllProducts([...resultadoBusqueda]);
		}
	};

	return (
		<>
			<div className="checkbox-container">
				<h2>Buscar</h2>
				<div className="input-checkbox">
					<input
						onChange={handleOnCheckbox}
						type="checkbox"
						name="buscar"
						value="medialuna"
						id="medialuna"
					/>
					<label htmlFor="medialuna">Medialunas</label>
				</div>

				<div className="input-checkbox">
					<input
						onChange={handleOnCheckbox}
						type="checkbox"
						name="buscar"
						value="porcion"
						id="porcion"
					/>
					<label htmlFor="porcion">Porciones</label>
				</div>

				<div className="input-checkbox">
					<input
						onChange={handleOnCheckbox}
						type="checkbox"
						name="buscar"
						value="otro"
						id="otro"
					/>
					<label htmlFor="otro">Otros</label>
				</div>
			</div>
		</>
	);
};
