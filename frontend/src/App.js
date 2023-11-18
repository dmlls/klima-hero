import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Munichmap from "./pages/Munichmap";

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
