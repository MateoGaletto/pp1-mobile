import { useState } from "react";

export const useForm = (initialData, onValidate) => {
	const [form, setForm] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const err = onValidate(form);

		if (err === null) {
			console.log("Enviando Formulario...");
		} else {
			setErrors(err);
		}
	};

	return { form, errors, handleChange, handleSubmit };
};
