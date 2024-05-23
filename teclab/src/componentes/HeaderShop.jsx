import React, { useState } from "react";
import { Link } from "react-router-dom";
import imagenes from "./imagenes.js";
import ShopCart from "./Icon/ShopCart.jsx";

const HeaderShop = () => {
	const [mostrarCarrito, setMostrarCarrito] = useState(false);
	console.log(mostrarCarrito);
	return (
		<>
			{/* (NAVBAR)  */}
			<nav className="nav nav-shop">
				<div className="nav__ul-container">
					<ul className="nav__ul">
						<li className="nav__item">
							<Link className="nav__link inicio" to="/">
								Inicio
							</Link>
						</li>
					</ul>
				</div>
				<div className="nav__shop-container">
					<div className="icon-shop">
						<div onClick={() => setMostrarCarrito(!mostrarCarrito)}>
							<ShopCart />
						</div>

						<div className="numero_oculto">
							<p></p>
						</div>
					</div>
				</div>
			</nav>
			{mostrarCarrito && <ShopCart />}
		</>
	);
};

export default HeaderShop;
