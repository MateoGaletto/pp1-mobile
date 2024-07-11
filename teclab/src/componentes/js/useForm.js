import { useState } from "react";

export const useForm = (dataInicial, validacion) => {
	const [form, setForm] = useState(dataInicial);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return { form, errors, handleChange };
};
