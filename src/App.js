import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import AllList from "./COMPONENTS/AllList";
import { Routes, Route } from "react-router-dom";
import Admin from "./COMPONENTS/Admin";
import Error from "./COMPONENTS/Error";

function App() {
  return (
    <div>
      <div className="back"></div>
      <div className="App">
        <Routes>
          <Route path="/" element={<AllList />} />
          <Route path="/add" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
