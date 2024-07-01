import React, { useEffect } from "react";
import { useForm } from "./js/useForm";
import { Error } from "./Icon/Error";

export const Contacto = () => {
	const initialData = {
		nombre: "",
		correo: "",
		numero: "",
		mensaje: "",
	};

	const onValidate = (form) => {
		let isError = false;
		let errors = {};

		if (!form.nombre.trim()) {
			errors.nombre = 'El campo "Nombre" no debe ser vacio.';
		}

		if (!form.correo.trim()) {
			errors.correo = 'El campo "Correo" no debe ser vacio.';
		}

		if (!form.asunto.trim()) {
			errors.asunto = 'El campo "Telefono" no debe ser vacio.';
		}

		if (!form.mensaje.trim()) {
			errors.mensaje = 'El campo "Mensaje" no debe ser vacio.';
		}

		return isError ? errors : null;
	};

	const { form, errors, loading, handleChange, handleSubmit } = useForm(
		initialData,
		onValidate
	);

	return (
		<>
			<section className="contacto" id="contacto">
				<div className="login-box">
					<form id="formulario-contacto" onSubmit={handleSubmit}>
						<div className="container-box">
							<div className="user-box">
								<input
									type="text"
									id="nombre"
									name="nombre"
									value={form.nombre}
									onChange={handleChange}
								/>
								<label>Nombre Completo</label>

								{errors.nombre && (
									<div class="warning">
										<div class="warning__icon">
											<Error />
										</div>
										<div class="warning__title">{errors.nombre}</div>
									</div>
								)}
							</div>
							<div className="user-box">
								<input
									type="email"
									id="correo"
									name="correo"
									value={form.correo}
									onChange={handleChange}
								/>
								<label>Correo Electronico</label>

								{errors.correo && (
									<div class="warning">
										<div class="warning__icon">
											<Error />
										</div>
										<div class="warning__title">{errors.correo}</div>
									</div>
								)}
							</div>
						</div>
						<div className="user-box">
							<input
								type="number"
								id="telefono"
								name="telefono"
								value={form.telefono}
								onChange={handleChange}
							/>
							<label>Numero de Celular</label>
							{errors.telefono && (
								<div class="warning">
									<div class="warning__icon">
										<Error />
									</div>
									<div class="warning__title">{errors.telefono}</div>
								</div>
							)}
						</div>
						<div className="user-box">
							<textarea
								name="mensaje"
								id="mensaje"
								placeholder="Mensaje"
								value={form.mensaje}
								onChange={handleChange}
							></textarea>
							{errors.mensaje && (
								<div class="warning">
									<div class="warning__icon">
										<Error />
									</div>
									<div class="warning__title">{errors.mensaje}</div>
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
