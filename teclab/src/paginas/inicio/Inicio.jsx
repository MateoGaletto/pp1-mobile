import React from "react";
import { Link } from "react-router-dom";
import imagenes from "../../componentes/js/imagenes.js";

export const Inicio = () => {
	return (
		<>
			{/* <!-- contenedor --> */}

			<main className="container">
				{/* <!-- Primera Seccion(HOME) --> */}
				<section className="home" id="home">
					<div className="home__container">
						<p className="home__container-parrafo">PASTELERÍA Y MÁS</p>
						<Link className="home__container-btn" to="/comprar">
							SHOP
						</Link>
					</div>
				</section>
				{/* <!-- Segunda Seccion(ABOUT US) --> */}
				<section className="about__us" id="conocenos">
					<div className="about__us-left">
						<h3 className="about__us-title-left">SOBRE NOSOTROS</h3>
						<img className="about__us-img" src={imagenes.img4} loading="lazy" />
					</div>
					<div className="about__us-right">
						<h2 className="about__us-title-right">
							Somos una pastelería
							<span className="about__us-original">ORIGINAL</span>
						</h2>
						<p className="about__us-paragraph">
							Desde que comenzamos con el rubro en 2017, nuestra pastelería ha
							sido un sueño hecho realidad. Nuestro producto estrella, las
							medialunas rellenas, son el resultado de años de perfeccionamiento
							y amor por la repostería. Su masa suave y esponjosa,
							cuidadosamente elaborada, se combina con rellenos exquisitos que
							van desde el clásico dulce de leche hasta innovadoras fusiones de
							sabores. Cada bocado es una experiencia única que deja una sonrisa
							en el rostro de quienes las prueban.
							<br />
							<br />
							Detrás de cada medialuna hay horas de trabajo arduo y dedicación.
							Desde la selección de los ingredientes más frescos hasta el
							delicado proceso de horneado, cuidamos cada detalle para
							asegurarnos de que cada producto que sale de nuestra cocina sea
							simplemente perfecto. Pero nuestra pasión va más allá de las
							medialunas. Tambien contamos con otras delicias tentadoras, desde
							chipas recién horneados hasta pastafrolas y postres decorados con
							esmero.
						</p>
					</div>
				</section>
				{/* <!-- Tercer Seccion(MEDIALUNAS) --> */}
				<section className="medialunas" id="medialunas">
					<div className="medialunas__container-facturas">
						<h3 className="medialunas__title-top">MEDIALUNAS</h3>
						<div className="medialunas__container-img">
							<img
								className="medialunas__img"
								src={imagenes.img5}
								loading="lazy"
							/>
							<img
								className="medialunas__img"
								src={imagenes.img6}
								loading="lazy"
							/>
							<img
								className="medialunas__img nutella"
								src={imagenes.img8}
								loading="lazy"
							/>
							<img
								className="medialunas__img"
								src={imagenes.img5}
								loading="lazy"
							/>
						</div>
					</div>

					<div className="medialunas__container-identidad">
						<h2 className="medialunas__title-down">IDENTIDAD</h2>
						<div className="medialunas__descrip">
							<p>
								Nuestras exquisitas medialunas hacen que despierten todos los
								sentidos. En cada bocado se encuentran con un sabor dulce y una
								textura esponjosa , siendo un complemento perfecto para
								acompañar una taza de café o mate.
							</p>
						</div>
					</div>
				</section>
				{/* <!-- Cuarta Seccion(OTROS) --> */}
				<section className="otros" id="otros">
					<div className="otros__container-img">
						<h2 className="otros__title">OTRAS OPCIONES</h2>
						<div className="otros__img">
							<div className="otros__img-basis scone">
								<img src={imagenes.img12} loading="lazy" />
								<h3>Scones</h3>
								<p>
									Deliciosamente dorado y con un aroma tentador, este scone de
									queso es una obra maestra de la repostería. Su exterior
									crujiente esconde un interior suave y esponjoso, impregnado
									con el rico sabor del queso derretido. El equilibrio entre lo
									salado del queso y lo sutilmente dulce de la masa hace que
									cada bocado sea una delicia para el paladar.
								</p>
							</div>
							<div className="otros__img-basis porciones">
								<img src={imagenes.img11} loading="lazy" />
								<h3>Postres</h3>
								<p>
									Las porciones de postre suelen tener una textura esponjosa y
									suave, pero pueden variar dependiendo del tipo de postre.
									Algunos pueden ser más húmedos y densos, mientras que otros
									son más ligeros y aireados. Por ejemplo la porción de Red
									Velvet tiene una textura suave y delicada, similar a un
									bizcochuelo esponjoso. La porción de Carrot Cake tiene una
									textura más densa debido a los trozos de zanahoria y nueces.
									Tambien tenemos postre como Doble Oreo, Matilda, Mousse de
									Chocolate, entre otras.
								</p>
							</div>
							<div className="otros__img-basis cañoncitos">
								<img src={imagenes.img10} loading="lazy" />
								<h3>Cañoncitos</h3>
								<p>
									Los cañoncitos son pequeños rollos de masa horneada, cuyo
									interior es suave y esponjoso, y puede estar relleno con dulce
									de leche ó pastelera.
									<br />
									Los cañoncitos de dulce de leche y de pastelera son dos
									delicias de la repostería con encanto propio.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* <!-- Quinta Seccion(CONTACTO) --> */}
				<section className="contacto" id="contacto">
					<div className="contacto__left-container">
						<h2 className="contacto__left-titulo">ENCONTRANOS</h2>
					</div>
					<div className="contacto__right-container">
						<div className="contacto__direcciones">
							<h5>Direcciones</h5>
							<p>San Luis, San Martin 1265</p>
							<p>Villa Mercedes, Belgrano 663</p>
						</div>
						<div className="contacto__redes">
							<h5>Redes</h5>
							<a href="https://www.instagram.com/valentinaage_/" target="blank">
								Instagram
							</a>
							<a
								href="https://www.facebook.com/valentinagalettoe"
								target="blank"
							>
								Facebook
							</a>
						</div>
						<div className="contacto__correo">
							<h5>Correo</h5>
							<p>valegaletto_@hotmail.com</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};
