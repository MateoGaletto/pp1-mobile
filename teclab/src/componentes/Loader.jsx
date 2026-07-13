import React from "react";
import { Medialuna } from "./Icon/Medialuna.jsx"; // ajustá la ruta según donde lo guardaste

export const Loader = ({ desvaneciendo }) => {
  return (
    <div className={`loader-overlay ${desvaneciendo ? "desvaneciendo" : ""}`}>
      <Medialuna className="loader-medialuna" />
    </div>
  );
};
