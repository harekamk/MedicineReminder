import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import History from "./pages/History";
import Pharmacies from "./pages/Pharmacies";
import Settings from "./pages/Settings";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />

      <Route
    path="/medicines"
    element={
      <PrivateRoute>
        <Medicines />
      </PrivateRoute>
    }
  />

      <Route
    path="/history"
    element={
      <PrivateRoute>
        <History />
      </PrivateRoute>
    }
  />

  <Route
    path="/pharmacies"
    element={
      <PrivateRoute>
        <Pharmacies />
      </PrivateRoute>
    }
  />

      <Route
    path="/settings"
    element={
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    }
  />

    </Routes>
  );
}

export default App;