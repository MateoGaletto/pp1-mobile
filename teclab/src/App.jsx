import React from "react";
import Footer from "./componentes/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Inicio from "./paginas/inicio/Inicio.jsx";
import Comprar from "./paginas/shop/Comprar.jsx";

const App = () => {
	return (
		<>
			<div className="contenedor">
				<div className="contenido">
					<Routes>
						<Route path="/" element={<Inicio />} />
						<Route path="/comprar" element={<Comprar />} />
					</Routes>
				</div>

				<Footer />
			</div>
		</>
	);
};

export default App;
