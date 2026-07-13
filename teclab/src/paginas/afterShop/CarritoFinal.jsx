import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calcularEnvio } from "../../componentes/js/envioCalculo";
import "./carritoFinal.css";

const WHATSAPP_NUMBER = "542657715123";

const generarNumeroPedido = () => {
  const numero = Math.floor(10000 + Math.random() * 90000);
  return `PED-${numero}`;
};

const formatearMensaje = ({
  numeroPedido,
  nombreCompleto,
  numero,
  direccion,
  metodoPago,
  opcionEntrega,
  allProducts,
  total,
  distanciaKm,
  costoEnvio,
}) => {
  const metodoPagoTexto =
    metodoPago === "transferencia" ? "Transferencia" : "Efectivo";
  const opcionEntregaTexto =
    opcionEntrega === "local" ? "Retiro en el local" : "Envío a domicilio";

  const listaProductos = allProducts
    .map((p) => {
      const lineaProducto = `- ${p.nombre} x${p.cantidad} - $${
        p.precio * p.cantidad
      }`;

      if (!p.sabores || p.sabores.length === 0) {
        return lineaProducto;
      }

      const detalleSabores = p.sabores
        .map((s) => {
          let linea = `   • ${s.cantidad} ${s.sabor}`;

          const extras = [];
          if (s.mermeladas && s.mermeladas.length > 0) {
            extras.push(`mermelada: ${s.mermeladas.join(", ")}`);
          }
          if (s.toppings && s.toppings.length > 0) {
            extras.push(`topping: ${s.toppings.join(", ")}`);
          }

          if (extras.length > 0) {
            linea += ` (${extras.join(" / ")})`;
          }

          return linea;
        })
        .join("\n");

      return `${lineaProducto}\n${detalleSabores}`;
    })
    .join("\n");

  const lineaEnvio =
    opcionEntrega === "domicilio"
      ? `\n*Envío (${distanciaKm} km): $${costoEnvio}*`
      : "";

  const totalFinal = opcionEntrega === "domicilio" ? total + costoEnvio : total;

  return (
    `Hola! Quiero confirmar mi pedido *${numeroPedido}*\n\n` +
    `*Datos personales*\n` +
    `Nombre: ${nombreCompleto}\n` +
    `Teléfono: ${numero}\n` +
    `Dirección: ${direccion}\n\n` +
    `*Productos*\n${listaProductos}\n\n` +
    `*Subtotal: $${total}*` +
    `${lineaEnvio}\n` +
    `*Total: $${totalFinal}*\n\n` +
    `*Método de pago:* ${metodoPagoTexto}\n` +
    `*Entrega:* ${opcionEntregaTexto}`
  );
};

export const CarritoFinal = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  setCountProducts,
}) => {
  // Datos personales
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [numero, setNumero] = useState("");
  const [direccion, setDireccion] = useState("");

  // Método de pago y entrega
  const [metodoPago, setMetodoPago] = useState("");
  const [opcionEntrega, setOpcionEntrega] = useState("");

  // Cálculo de envío
  const [calculandoEnvio, setCalculandoEnvio] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [distanciaKm, setDistanciaKm] = useState(null);
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [urlMapsRuta, setUrlMapsRuta] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Si el usuario cambia la dirección después de haber calculado el
  // envío, invalidamos el resultado para forzar un nuevo cálculo.
  const handleChangeDireccion = (valor) => {
    setDireccion(valor);
    setDistanciaKm(null);
    setCostoEnvio(null);
    setUrlMapsRuta(null);
    setErrorEnvio("");
  };

  const handleCalcularEnvio = async () => {
    if (!direccion.trim()) {
      setErrorEnvio("Ingresá tu dirección arriba para calcular el envío");
      return;
    }

    setCalculandoEnvio(true);
    setErrorEnvio("");

    try {
      const resultado = await calcularEnvio(direccion);
      setDistanciaKm(resultado.distanciaKm);
      setCostoEnvio(resultado.costoEnvio);
      setUrlMapsRuta(resultado.urlMapsRuta);
    } catch (e) {
      setErrorEnvio(
        "No pudimos encontrar esa dirección. Revisá que esté bien escrita.",
      );
    } finally {
      setCalculandoEnvio(false);
    }
  };

  const handleConfirmar = () => {
    if (!nombreCompleto.trim() || !numero.trim() || !direccion.trim()) {
      setError("Completa tus datos personales para continuar");
      return;
    }

    if (!metodoPago) {
      setError("Selecciona un método de pago para continuar");
      return;
    }

    if (!opcionEntrega) {
      setError("Selecciona una opción de entrega para continuar");
      return;
    }

    if (opcionEntrega === "domicilio" && costoEnvio === null) {
      setError("Calculá el costo de envío antes de continuar");
      return;
    }

    setError("");

    const numeroPedido = generarNumeroPedido();

    const datosPedido = {
      numeroPedido,
      nombreCompleto,
      numero,
      direccion,
      metodoPago,
      opcionEntrega,
      allProducts,
      total,
      distanciaKm,
      costoEnvio,
    };

    const mensaje = formatearMensaje(datosPedido);
    const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje,
    )}`;

    window.open(urlWhatsapp, "_blank");

    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);

    navigate("/confirmacion", { state: datosPedido });
  };

  return (
    <main>
      <div className="carrito-final">
        <h3>Tus datos</h3>

        <div className="datos-personales">
          <label className="campo-input">
            Nombre completo
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </label>

          <label className="campo-input">
            Número de teléfono
            <input
              type="tel"
              placeholder="Ej: 2657123456"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>

          <label className="campo-input">
            Dirección
            <input
              type="text"
              placeholder="Ej: San Martín 1234"
              value={direccion}
              onChange={(e) => handleChangeDireccion(e.target.value)}
            />
          </label>
        </div>

        <h3>Método de Pago (seleccionar una opción)</h3>

        <div className="opsEntrega">
          <label className="op-entrega">
            Transferencia
            <input
              type="radio"
              name="pago"
              value="transferencia"
              checked={metodoPago === "transferencia"}
              onChange={(e) => setMetodoPago(e.target.value)}
            />
          </label>

          <label className="op-entrega">
            Efectivo
            <input
              type="radio"
              name="pago"
              value="efectivo"
              checked={metodoPago === "efectivo"}
              onChange={(e) => setMetodoPago(e.target.value)}
            />
          </label>
        </div>

        <h3>Formato de Entrega (seleccionar una opción)</h3>

        <div className="opsEntrega">
          <label className="op-entrega">
            Retiro en el local
            <input
              type="radio"
              name="entrega"
              value="local"
              checked={opcionEntrega === "local"}
              onChange={(e) => setOpcionEntrega(e.target.value)}
            />
          </label>

          <label className="op-entrega">
            Envío a domicilio
            <input
              type="radio"
              name="entrega"
              value="domicilio"
              checked={opcionEntrega === "domicilio"}
              onChange={(e) => setOpcionEntrega(e.target.value)}
            />
          </label>
        </div>

        {opcionEntrega === "domicilio" && (
          <div className="envio-container">
            <button
              type="button"
              className="btn-calcular-envio"
              onClick={handleCalcularEnvio}
              disabled={calculandoEnvio}
            >
              {calculandoEnvio
                ? "Calculando..."
                : costoEnvio !== null
                  ? "Volver a calcular"
                  : "Calcular costo de envío"}
            </button>

            {errorEnvio && <p className="error-entrega">{errorEnvio}</p>}

            {costoEnvio !== null && (
              <div className="envio-resultado">
                <p>
                  Distancia aproximada: <strong>{distanciaKm} km</strong>
                </p>
                <p>
                  Costo de envío: <strong>${costoEnvio}</strong>
                </p>
                <a
                  href={urlMapsRuta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="envio-link-maps"
                >
                  Ver ruta en Google Maps ↗
                </a>
              </div>
            )}
          </div>
        )}

        {error && <p className="error-entrega">{error}</p>}

        <div className="modal-botones">
          <button className="btn-cancelar" onClick={() => navigate(-1)}>
            Volver
          </button>
          <button className="btn-confirmar" onClick={handleConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </main>
  );
};
