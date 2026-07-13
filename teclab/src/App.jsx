import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./componentes/Header.jsx";
import { Loader } from "./componentes/Loader.jsx";
import { Inicio } from "./paginas/inicio/Inicio.jsx";
import { Footer } from "./componentes/Footer.jsx";
import { ListaProds } from "./paginas/shop/ListaProds.jsx";
import { SeleccionCategoria } from "./paginas/shop/Seleccioncategoria.jsx";
import { Contacto } from "./paginas/contacto/Contacto.jsx";
import { CarritoFinal } from "./paginas/afterShop/CarritoFinal.jsx";
import { Confirmacion } from "./paginas/afterShop/Confirmacion.jsx";

export const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  const TIEMPO_MINIMO_MS = 1200;

  const [cargando, setCargando] = useState(true);
  const [desvaneciendo, setDesvaneciendo] = useState(false);

  useEffect(() => {
    const inicio = Date.now();

    const ocultarLoader = () => {
      const transcurrido = Date.now() - inicio;
      const restante = Math.max(TIEMPO_MINIMO_MS - transcurrido, 0);

      setTimeout(() => {
        setDesvaneciendo(true);
        setTimeout(() => setCargando(false), 400);
      }, restante);
    };

    if (document.readyState === "complete") {
      ocultarLoader();
    } else {
      window.addEventListener("load", ocultarLoader);
      return () => window.removeEventListener("load", ocultarLoader);
    }
  }, []);
  return (
    <Router>
      {cargando && <Loader desvaneciendo={desvaneciendo} />}
      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />}></Route>
        <Route path="/comprar" element={<SeleccionCategoria />} />
        <Route
          path="/comprar/:categoria"
          element={
            <ListaProds
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          }
        />
        <Route
          path="/finalizar"
          element={
            <CarritoFinal
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              setCountProducts={setCountProducts}
            />
          }
        ></Route>
        <Route path="/confirmacion" element={<Confirmacion />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};
