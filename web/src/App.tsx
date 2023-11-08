import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import FloorEditor from "./FloorEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/floor" element={<FloorEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
