import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
  import { LazyMotion, domAnimation } from "framer-motion";

ReactDOM.createRoot(document.getElementById("root")).render(


  <LazyMotion features={domAnimation} strict>
    <App />
  </LazyMotion>
  
);