import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Servicio para obtener las certificaciones
import Certifications from "./services/certifications";

// Componente del encabezado
import Header from "./components/header";

// Página de la biblioteca
import LibraryPage from "./pages/library";

// Página de inicio
import HomePage from "./pages/home";

import LoadingPage from "./components/LoadingPage";

function App() {
  return (
    <Router>
      <LoadingPage />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;