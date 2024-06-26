import "reflect-metadata";

import { Provider } from "inversify-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SequenceProvider } from "./context/SequenceContext";
import FloorEditor from "./FloorEditor";
import { container } from "./inversify";
import FloorsPage from "./pages/BuildingFloorsPage";
import BuildingPage from "./pages/BuildingPage";
import BuildingsPage from "./pages/BuildingsPage";
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
import PathsPage from "./pages/PathsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/page";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import RequestsPage from "./pages/RequestsPage";
import RoomsPage from "./pages/RoomsPage";
import TaskRequestsPage from "./pages/TaskRequestsPage";
import TaskSequencePage from "./pages/TaskSequencePage";
import TasksPage from "./pages/TasksPage";
import UsersPage from "./pages/UsersPage";
import { RequireAuth } from "./utils/RequireAuth";
import { RequireRole } from "./utils/RequireRole";

function App() {
  return (
    <Provider container={container}>
      <AuthProvider>
        <SequenceProvider>
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
                    <RequireRole role="campus">
                      <BuildingsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/tasks"
                element={
                  <RequireAuth>
                    <RequireRole role="user">
                      <TasksPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireAuth>
                    <RequireRole role="admin">
                      <UsersPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/connectors"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <ConnectorsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/device-models"
                element={
                  <RequireAuth>
                    <RequireRole role="fleet">
                      <DeviceModelsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/devices"
                element={
                  <RequireAuth>
                    <RequireRole role="fleet">
                      <DevicesPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/buildings/:buildingCode"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <BuildingPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/buildings/:buildingCode/floors"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <FloorsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/buildings/:buildingCode/floors/:floorCode"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <FloorPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/buildings/:buildingCode/floors/:floorCode/rooms"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <RoomsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/connectors/:code"
                element={
                  <RequireAuth>
                    <RequireRole role="campus">
                      <ConnectorPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/device-models/:deviceModelCode"
                element={
                  <RequireAuth>
                    <RequireRole role="fleet">
                      <DeviceModelPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/devices/robots/:deviceCode"
                element={
                  <RequireAuth>
                    <RequireRole role="fleet">
                      <DevicePage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/floor-editor"
                element={
                  <RequireAuth>
                    <FloorEditor />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/requests"
                element={
                  <RequireAuth>
                    <RequireRole role="admin">
                      <RequestsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/paths"
                element={
                  <RequireAuth>
                    <PathsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/task-requests"
                element={
                  <RequireAuth>
                    <RequireRole role="task">
                      <TaskRequestsPage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/task-sequence"
                element={
                  <RequireAuth>
                    <RequireRole role="task">
                      <TaskSequencePage />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </BrowserRouter>
        </SequenceProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
