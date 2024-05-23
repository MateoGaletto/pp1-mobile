//Shop
import docena from "../img/facturas/docena.jpg";

const productos = [
	{
		id: 1,
		img: docena,
		nombre: "Docena de autor",
		precio: 8000,
	},
	{
		id: 2,
		img: docena,
		nombre: "1/2 Docena de autor",
		precio: 5000,
	},
	{
		id: 3,
		img: docena,
		nombre: "Docena común",
		precio: 8000,
	},
	{
		id: 4,
		img: docena,
		nombre: "1/2 Docena común",
		precio: 8000,
	},
	{
		id: 5,
		img: docena,
		nombre: "Docena clasica",
		precio: 8000,
	},
	{
		id: 6,
		img: docena,
		nombre: "1/2 Docena clasica",
		precio: 8000,
	},
];
export default productos;

// let carrito = [];

// productos.forEach((product) => {
// 	let content = document.createElement("div");
// 	content.className = "card";
// 	content.innerHTML = `
// 		<img src="${product.img}">
// 		<h3>${product.nombre}</h3>
// 		<p>$${product.precio}</p>
// 	`;

// 	shopContent.append(content);
// });
