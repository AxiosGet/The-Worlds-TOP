import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import AllList from "./COMPONENTS/AllList";
import { Routes, Route } from "react-router-dom";
import Admin from "./COMPONENTS/Admin";
import Error from "./COMPONENTS/Error";
import BG from "./a.jpg";

function App() {
  return (
    <div>
      <div className="back">
        <img src={BG} />
      </div>
      <div className="App">
        <Routes>
          <Route path="/" element={<AllList />} />
          <Route path="/add" element={<Admin />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
