import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Pages/ChatPage";
import Home from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
