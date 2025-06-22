import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import Sidebar from "./Components/Sidebar";
import { useAppContext } from "./Context/AppContext";

function App() {
  const { theme, setTheme } = useAppContext();

  return (
    <main
      className={`h-screen flex ${theme} font-nacelle font-normal overflow-hidden`}
    >
      <BrowserRouter>
        <Sidebar />
        <div className={`flex-1 p-6 ${theme}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
