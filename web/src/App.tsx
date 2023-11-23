import "reflect-metadata";

import { Provider } from "inversify-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import FloorEditor from "./FloorEditor";
import { container } from "./inversify";
import FloorsPage from "./pages/BuildingFloorsPage";
import BuildingPage from "./pages/BuildingPage";
import BuildingsPage from "./pages/BuildingsPage";
import CampusHome from "./pages/CampusHome";
import ConnectorPage from "./pages/ConnectorPage";
import ConnectorsPage from "./pages/ConnectorsPage";
import DeviceModelPage from "./pages/DeviceModelPage";
import DeviceModelsPage from "./pages/DeviceModelsPage";
import DevicePage from "./pages/DevicePage";
import DevicesPage from "./pages/DevicesPage";
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
              path="/buildings"
              element={
                <RequireAuth>
                  <BuildingsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/connectors"
              element={
                <RequireAuth>
                  <ConnectorsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/device-models"
              element={
                <RequireAuth>
                  <DeviceModelsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/devices"
              element={
                <RequireAuth>
                  <DevicesPage />
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
              path="/device-models/:deviceModelCode"
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
