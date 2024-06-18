import React from "react";
import ScrollToTop from "react-scroll-to-top";

export const Footer = () => {
	return (
		<footer className="footer">
			<h4 className="footer__container-titulo">Valentina Galetto Pastelería</h4>
			<p className="footer__container-derechos">
				Copyright © 2024 - Diseño Web realizado por <b>Mateo Galetto</b>
			</p>

			<ScrollToTop
				smooth
				top="500"
				style={{
					backgroundColor: "#f09491",
					borderRadius: "50%",
					width: "50px",
					height: "50px",
					transition: "0.2s",
				}}
				color="#fff"
			/>
		</footer>
	);
};
