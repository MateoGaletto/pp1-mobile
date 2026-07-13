// ============================================
// Cálculo de costo de envío por distancia en línea recta
// Usa Nominatim (OpenStreetMap) para geocodificar direcciones —
// es gratuito y no requiere API key ni tarjeta de crédito.
//
// Nota: Nominatim pide un uso razonable (no más de ~1 request/seg).
// Para un proyecto con mucho tráfico, conviene mover esto a un
// backend propio con cache, en vez de llamarlo directo desde el navegador.
// ============================================

// Dirección fija del local — cambiala si corresponde
export const DIRECCION_LOCAL =
  "Belgrano 663, Villa Mercedes, San Luis, Argentina";

// Tramos de precio según distancia (en km). El último tramo (Infinity)
// siempre debe quedar al final y cubre "todo lo que sea más lejos".
export const TRAMOS_ENVIO = [
  { maxKm: 1.5, costo: 1500 },
  { maxKm: 2.5, costo: 2500 },
  { maxKm: 3.5, costo: 3500 },
  { maxKm: Infinity, costo: 5000 },
];

// Recorte geográfico alrededor de Villa Mercedes (con margen amplio)
// para que Nominatim solo busque coincidencias dentro de esa zona.
// Formato Nominatim: viewbox = min_lon,max_lat,max_lon,min_lat
const VIEWBOX_VILLA_MERCEDES = "-65.62,-33.47,-65.30,-33.88";

/**
 * Convierte una dirección de texto en coordenadas { lat, lon }.
 * Lanza un error si no se encuentra la dirección.
 *
 * Se restringe a Argentina (countrycodes=ar) y, además, se acota
 * la búsqueda al área de Villa Mercedes (viewbox + bounded=1), ya
 * que los envíos son solo dentro de esa ciudad.
 */
export const geocodificarDireccion = async (direccion) => {
  const url =
    `https://nominatim.openstreetmap.org/search?format=json&limit=1` +
    `&countrycodes=ar&viewbox=${VIEWBOX_VILLA_MERCEDES}&bounded=1` +
    `&q=${encodeURIComponent(direccion)}`;

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error("No se pudo consultar el servicio de mapas");
  }

  const resultados = await respuesta.json();
  if (!resultados || resultados.length === 0) {
    throw new Error("No se encontró esa dirección");
  }

  return {
    lat: parseFloat(resultados[0].lat),
    lon: parseFloat(resultados[0].lon),
  };
};

/**
 * Distancia en línea recta entre dos coordenadas, en km,
 * usando la fórmula de Haversine.
 */
export const calcularDistanciaKm = (coordA, coordB) => {
  const R = 6371; // radio de la Tierra en km
  const dLat = ((coordB.lat - coordA.lat) * Math.PI) / 180;
  const dLon = ((coordB.lon - coordA.lon) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((coordA.lat * Math.PI) / 180) *
      Math.cos((coordB.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Devuelve el costo de envío según el tramo de distancia correspondiente.
 */
export const calcularCostoPorDistancia = (distanciaKm) => {
  const tramo = TRAMOS_ENVIO.find((t) => distanciaKm <= t.maxKm);
  return tramo.costo;
};

/**
 * Arma el link de Google Maps con la ruta local -> dirección del cliente.
 * No requiere API key, es un link público de Google Maps.
 */
export const armarUrlMapsRuta = (direccionCliente) => {
  const origen = encodeURIComponent(DIRECCION_LOCAL);
  const destino = encodeURIComponent(direccionCliente);
  return `https://www.google.com/maps/dir/?api=1&origin=${origen}&destination=${destino}`;
};

// Ciudad/provincia que se le agrega a la dirección del cliente para
// desambiguar la búsqueda (ej: "San Martín 1234" solo, sin ciudad,
// puede matchear en cualquier parte del mundo).
const CONTEXTO_CIUDAD = "Villa Mercedes, San Luis, Argentina";

/**
 * Función principal: dada la dirección del cliente, geocodifica el
 * local y la dirección del cliente, calcula distancia y costo, y
 * arma el link de Maps. Lanza error si alguna dirección no se encuentra.
 */
export const calcularEnvio = async (direccionCliente) => {
  // Si el cliente ya escribió la ciudad, no la duplicamos
  const direccionCompleta = direccionCliente
    .toLowerCase()
    .includes("villa mercedes")
    ? direccionCliente
    : `${direccionCliente}, ${CONTEXTO_CIUDAD}`;

  const [coordLocal, coordCliente] = await Promise.all([
    geocodificarDireccion(DIRECCION_LOCAL),
    geocodificarDireccion(direccionCompleta),
  ]);

  const distanciaKm = calcularDistanciaKm(coordLocal, coordCliente);
  const costoEnvio = calcularCostoPorDistancia(distanciaKm);
  const urlMapsRuta = armarUrlMapsRuta(direccionCompleta);

  return {
    distanciaKm: Math.round(distanciaKm * 10) / 10, // 1 decimal
    costoEnvio,
    urlMapsRuta,
  };
};
