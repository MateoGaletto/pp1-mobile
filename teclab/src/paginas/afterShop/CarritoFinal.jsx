import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./carritoFinal.css";

export const CarritoFinal = () => {
  const [opcionEntrega, setOpcionEntrega] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirmar = () => {
    if (!opcionEntrega) {
      setError("Selecciona una opción de entrega para continuar");
      return;
    }
    setError("");

    navigate("/confirmacion");
    console.log("Opción elegida:", opcionEntrega);
  };

  return (
    <main>
      <div className="carrito-final">
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
