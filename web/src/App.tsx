import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import FloorEditor from "./FloorEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/floor" element={<FloorEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
