import "reflect-metadata";

import { Provider } from "inversify-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import FloorEditor from "./FloorEditor";
import { container } from "./inversify";
import FloorPage from "./pages/BuildingFloorsPage";
import BuildingPage from "./pages/BuildingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <Provider container={container}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="/buildings/:buildingCode"
              element={
                <RequireAuth>
                  <BuildingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/buildings/:buildingCode/floors"
              element={
                <RequireAuth>
                  <FloorPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/floor"
              element={
                <RequireAuth>
                  <FloorEditor />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
