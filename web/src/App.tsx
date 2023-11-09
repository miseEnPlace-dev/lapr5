import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import FloorEditor from "./FloorEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/floor" element={<FloorEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
