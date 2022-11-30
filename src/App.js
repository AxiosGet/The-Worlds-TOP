import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import AllList from "./COMPONENTS/AllList";

function App() {
  return (
    <div>
      <div className="back"></div>
      <div className="App">
        <AllList />
      </div>
    </div>
  );
}

export default App;
