import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./carritoFinal.css";

const WHATSAPP_NUMBER = "542657612401";

const generarNumeroPedido = () => {
  const numero = Math.floor(10000 + Math.random() * 90000); // 5 dígitos
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
        .map((s) => `   • ${s.cantidad} ${s.sabor}`)
        .join("\n");

      return `${lineaProducto}\n${detalleSabores}`;
    })
    .join("\n");

  return (
    `Hola! Quiero confirmar mi pedido *${numeroPedido}*\n\n` +
    `*Datos personales*\n` +
    `Nombre: ${nombreCompleto}\n` +
    `Teléfono: ${numero}\n` +
    `Dirección: ${direccion}\n\n` +
    `*Productos*\n${listaProductos}\n\n` +
    `*Total: $${total}*\n\n` +
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

  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    };

    const mensaje = formatearMensaje(datosPedido);
    const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje,
    )}`;

    // Abre WhatsApp en una pestaña nueva, sin sacar al usuario de la app
    window.open(urlWhatsapp, "_blank");

    // Vacía el carrito ya que el pedido se confirmó
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);

    // Lleva al usuario a la página de confirmación con los datos del pedido
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
              placeholder="Ej: 2664123456"
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
              onChange={(e) => setDireccion(e.target.value)}
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
