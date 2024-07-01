import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./componentes/Header.jsx";
import { Inicio } from "./paginas/inicio/Inicio.jsx";
import { Footer } from "./componentes/Footer.jsx";
import { ListaProds } from "./componentes/ListaProds.jsx";
import { Contacto } from "./componentes/Contacto.jsx";

export const App = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<Router>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/contacto" element={<Contacto />}></Route>
				<Route
					path="/comprar"
					element={
						<ListaProds
							allProducts={allProducts}
							setAllProducts={setAllProducts}
							total={total}
							setTotal={setTotal}
							countProducts={countProducts}
							setCountProducts={setCountProducts}
						/>
					}
				/>
			</Routes>
			<Footer />
		</Router>
	);
};
