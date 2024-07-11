export const validacion = (form) => {
	let errors = {};
	let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	let regexCorreo = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
	let regexTelefono = /^(\d{10})$/;
	let regexMensaje = /^.{1,255}$/;

	if (!form.nombre.trim()) {
		errors.nombre = 'El campo "Nombre" no debe ser vacio.';
	} else if (!regexNombre.test(form.nombre)) {
		errors.nombre = 'El campo "Nombre" solo acepta letras y espacios.';
	} else if (form.nombre.length <= 5) {
		errors.nombre = 'El campo "Nombre" tiene que tener mas de 5 caracteres.';
	}

	if (!form.correo.trim()) {
		errors.correo = 'El campo "Correo" no debe ser vacio.';
	} else if (!regexCorreo.test(form.correo)) {
		errors.correo = 'El campo "Correo" Contiene un formato no valido.';
	}

	if (!form.telefono.trim()) {
		errors.telefono = 'El campo "Telefono" no debe ser vacio.';
	} else if (!regexTelefono.test(form.telefono)) {
		errors.telefono = 'El campo "Telefono" debe contener 10 números.';
	}

	if (!form.mensaje.trim()) {
		errors.mensaje = 'El campo "Mensaje" no debe ser vacio.';
	} else if (!regexMensaje.test(form.mensaje)) {
		errors.mensaje = 'El campo "Mensaje" solo acepta 255 caracteres.';
	}

	return errors;
};
