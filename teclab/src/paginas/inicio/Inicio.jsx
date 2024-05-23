import React from "react";
import HeaderInicio from "../../componentes/Header.jsx";
import imagenes from "../../componentes/imagenes.js";

const Inicio = () => {
	return (
		<>
			{/* <!-- contenedor --> */}

			<main className="container">
				{/* HEADER */}
				<HeaderInicio />
				{/* <!-- Primera Seccion(HOME) --> */}
				<section className="home" id="home">
					<div className="home__container">
						<p className="home__container-parrafo">PASTELERÍA Y MÁS</p>
						<a className="home__container-btn" href="#conocenos">
							CONOCENOS
						</a>
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
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
							ratione maiores eos unde culpa dolor deserunt nihil architecto
							placeat at laudantium earum ipsa qui corporis iure repellat,
							harum, officiis libero.
							<br />
							<br />
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
							eius soluta, ullam molestias esse incidunt at harum delectus,
							enim, sint inventore. Commodi veniam, nostrum aliquid ea expedita
							cupiditate cumque placeat?
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
								src={imagenes.img7}
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
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Quasi, qui aut quia vitae dicta asperiores doloremque!
									Doloribus, eveniet deserunt iure obcaecati magni fugiat
									expedita nihil iste quis voluptatibus vitae? Nihil.
								</p>
							</div>
							<div className="otros__img-basis porciones">
								<img src={imagenes.img11} loading="lazy" />
								<h3>Postres</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Recusandae, ut id deleniti quam illum odio sit, similique,
									incidunt placeat eius repudiandae fuga aperiam ipsum vel nihil
									ad reiciendis perspiciatis explicabo.
								</p>
							</div>
							<div className="otros__img-basis cañoncitos">
								<img src={imagenes.img10} loading="lazy" />
								<h3>Cañoncitos</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Recusandae, ut id deleniti quam illum odio sit, similique,
									incidunt placeat eius repudiandae fuga aperiam ipsum vel nihil
									ad reiciendis perspiciatis explicabo.
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
				{/* FOOTER */}
			</main>
		</>
	);
};

export default Inicio;
