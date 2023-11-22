import "reflect-metadata";

import { Provider } from "inversify-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import FloorEditor from "./FloorEditor";
import { container } from "./inversify";
import FloorsPage from "./pages/BuildingFloorsPage";
import BuildingPage from "./pages/BuildingPage";
import ConnectorPage from "./pages/ConnectorPage";
import DeviceModelPage from "./pages/DeviceModelPage";
import DevicePage from "./pages/DevicePage";
import FloorPage from "./pages/FloorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RGPDPage from "./pages/RGPDPage/page";
import RoomPage from "./pages/RoomPage";
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
                  <FloorsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/buildings/:buildingCode/floors/:floorCode"
              element={
                <RequireAuth>
                  <FloorPage />
                </RequireAuth>
              }
            />
            <Route
              path="/buildings/:buildingCode/floors/:floorCode/rooms"
              element={
                <RequireAuth>
                  <RoomPage />
                </RequireAuth>
              }
            />
            <Route
              path="/connectors/:code"
              element={
                <RequireAuth>
                  <ConnectorPage />
                </RequireAuth>
              }
            />
            <Route
              path="/deviceModels/:deviceModelCode"
              element={
                <RequireAuth>
                  <DeviceModelPage />
                </RequireAuth>
              }
            />
            <Route
              path="/devices/robots/:deviceCode"
              element={
                <RequireAuth>
                  <DevicePage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/floor-editor"
              element={
                <RequireAuth>
                  <FloorEditor />
                </RequireAuth>
              }
            />
            <Route
              path="/rgpd"
              element={
                <RequireAuth>
                  <RGPDPage />
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
