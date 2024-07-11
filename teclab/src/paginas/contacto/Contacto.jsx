import React, { useRef, useState } from "react";
import { useForm } from "../../componentes/js/useForm";
import { validacion } from "../../componentes/js/validaciones";
import { Error } from "../../componentes/Icon/Error";
import emailjs from "@emailjs/browser";

export const Contacto = () => {
	const [error, setError] = useState({});
	const [enviar, setEnviar] = useState(false);

	const dataInicial = {
		nombre: "",
		correo: "",
		telefono: "",
		mensaje: "",
	};

	const refForm = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		const err = validacion(form);
		setError(err);

		const serviceId = "service_8qn6jd1";
		const templateId = "template_iohm6cg";
		const apiKey = "zAm1ngOoaPDMlk760";

		if (Object.keys(err).length === 0) {
			setEnviar(true);
			emailjs
				.sendForm(serviceId, templateId, refForm.current, apiKey)
				.then((data) => {
					console.log(data);
					data.success === "true" && setForm(dataInicial);
					setEnviar(false);
				})
				.catch((error) => {
					console.log(error);
					setEnviar(false);
				});
		}
	};

	const { form, handleChange } = useForm(dataInicial, validacion);

	return (
		<>
			<section className="contacto" id="contacto">
				<div className="login-box">
					<form
						ref={refForm}
						action=""
						onSubmit={handleSubmit}
						id="formulario-contacto"
					>
						<div className="container-box">
							<div className="user-container">
								<div className="user-box">
									<input
										type="text"
										id="nombre"
										name="nombre"
										value={form.nombre}
										onChange={handleChange}
										required
										placeholder="Ej: Valentina Galetto"
									/>
									<label>Nombre Completo</label>
								</div>

								{error.nombre && (
									<div className="warning">
										<div className="warning__icon">
											<Error />
										</div>
										<div className="warning__title">{error.nombre}</div>
									</div>
								)}
							</div>

							<div className="user-container">
								<div className="user-box">
									<input
										type="email"
										id="correo"
										name="correo"
										value={form.correo}
										onChange={handleChange}
										required
										placeholder="Ej: correo@correo.com"
									/>
									<label>Correo Electronico</label>
								</div>

								{error.correo && (
									<div className="warning">
										<div className="warning__icon">
											<Error />
										</div>
										<div className="warning__title">{error.correo}</div>
									</div>
								)}
							</div>
						</div>

						<div className="user-container">
							<div className="user-box">
								<input
									type="number"
									id="telefono"
									name="telefono"
									value={form.telefono}
									onChange={handleChange}
									placeholder="Ej: 2657001122"
									required
								/>
								<label>Numero de Celular</label>
							</div>

							{error.telefono && (
								<div className="warning">
									<div className="warning__icon">
										<Error />
									</div>
									<div className="warning__title">{error.telefono}</div>
								</div>
							)}
						</div>

						<div className="user-container">
							<div className="user-box">
								<textarea
									name="mensaje"
									id="mensaje"
									placeholder="Mensaje"
									value={form.mensaje}
									onChange={handleChange}
									required
								>
									<label>Mensaje</label>
								</textarea>
							</div>

							{error.mensaje && (
								<div className="warning warning-mensaje">
									<div className="warning__icon">
										<Error />
									</div>
									<div className="warning__title">{error.mensaje}</div>
								</div>
							)}
						</div>
						<center>
							<button id="btn-enviar" disabled={enviar}>
								{enviar ? "ENVIANDO..." : "ENVIAR"}
								<span></span>
							</button>
						</center>
					</form>
				</div>
			</section>
		</>
	);
};
