import React from "react";
import { Link } from "react-router-dom";
import imagenes from "./imagenes.js";
import Contact from "./Icon/Contact.jsx";
import Shop from "./Icon/Shop.jsx";
import Croissant from "./Icon/Croissant.jsx";
import Otros from "./Icon/Otros.jsx";

const Header = () => {
	return (
		<>
			{/* <!-- Seccion extra(NAVBAR) --> */}
			<nav className="nav">
				<div className="nav__ul-container">
					<ul className="nav__ul">
						<li className="nav__item">
							<a href="#medialunas" className="nav__link">
								<Croissant />
								Medialunas
							</a>
						</li>
						<li className="nav__item">
							<a href="#otros" className="nav__link">
								<Otros />
								Otros
							</a>
						</li>
						<li className="nav__item">
							<a href="#contacto" className="nav__link">
								<Contact />
								Contacto
							</a>
						</li>
						<li className="nav__item">
							<Link className="nav__link" to="/comprar">
								<Shop />
								Shop
							</Link>
						</li>
					</ul>
				</div>
				<div className="nav__logo-container">
					<Link to="/">
						<img className="nav__logo" src={imagenes.img1} loading="lazy" />
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Header;
