import React from "react";
import HeaderShop from "../../componentes/HeaderShop.jsx";
import { ReactTyped } from "react-typed";
import ObtenerProd from "../../componentes/ObtenerProd.jsx";

function Comprar() {
	return (
		<>
			<HeaderShop />

			<div className="comprar">
				<div className="comprar__container">
					<h1 className="comprar_title">
						Medialunas{" "}
						<ReactTyped
							strings={["Comunes", "Especiales"]}
							startDelay={800}
							backDelay={1000}
							typeSpeed={75}
							backSpeed={75}
							loop
							style={{
								color: "#f09491",
							}}
						/>
					</h1>
				</div>
				<div className="container__flex">
					<ObtenerProd />
				</div>
			</div>
		</>
	);
}

export default Comprar;
