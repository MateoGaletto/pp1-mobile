import React from "react";
import { useForm } from "./js/useForm";
import { Error } from "./Icon/Error";

export const Contacto = () => {
	const initialData = {
		nombre: "",
		correo: "",
		telefono: "",
		mensaje: "",
	};

	const onValidate = (form) => {
		let isError = false;
		let errors = {};
		let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
		let regexCorreo = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
		let regexMensaje = /^.{1,255}$/;

		if (!form.nombre.trim()) {
			errors.nombre = 'El campo "Nombre" no debe ser vacio.';
			isError = true;
		} else if (!regexNombre.test(form.nombre)) {
			errors.nombre = 'El campo "Nombre" solo acepta letras y espacios.';
			isError = true;
		}

		if (!form.correo.trim()) {
			errors.correo = 'El campo "Correo" no debe ser vacio.';
			isError = true;
		} else if (!regexCorreo.test(form.correo)) {
			errors.nombre = 'El campo "Correo" Contiene un formato no valido.';
			isError = true;
		}

		if (!form.telefono.trim()) {
			errors.telefono = 'El campo "Telefono" no debe ser vacio.';
			isError = true;
		}

		if (!form.mensaje.trim()) {
			errors.mensaje = 'El campo "Mensaje" no debe ser vacio.';
			isError = true;
		} else if (!regexMensaje.test(form.mensaje)) {
			errors.nombre = 'El campo "Mensaje" solo acepta 255 caracteres.';
			isError = true;
		}

		return isError ? errors : null;
	};

	const { form, errors, handleChange, handleSubmit } = useForm(
		initialData,
		onValidate
	);

	return (
		<>
			<section className="contacto" id="contacto">
				<div className="login-box">
					<form id="formulario-contacto" onSubmit={handleSubmit}>
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
									/>
									<label>Nombre Completo</label>
								</div>
								{errors.nombre && (
									<div className="warning">
										<div className="warning__icon">
											<Error />
										</div>
										<div className="warning__title">{errors.nombre}</div>
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
									/>
									<label>Correo Electronico</label>
								</div>

								{errors.correo && (
									<div className="warning">
										<div className="warning__icon">
											<Error />
										</div>
										<div className="warning__title">{errors.correo}</div>
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
									required
								/>
								<label>Numero de Celular</label>
							</div>

							{errors.telefono && (
								<div className="warning">
									<div className="warning__icon">
										<Error />
									</div>
									<div className="warning__title">{errors.telefono}</div>
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

							{errors.mensaje && (
								<div className="warning warning-mensaje">
									<div className="warning__icon">
										<Error />
									</div>
									<div className="warning__title">{errors.mensaje}</div>
								</div>
							)}
						</div>
						<center>
							<button id="btn-enviar">
								ENVIAR
								<span></span>
							</button>
						</center>
					</form>
				</div>
			</section>
		</>
	);
};
