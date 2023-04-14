import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LandingPageLayout from "./pages/Landing/LandingPageLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import AdManaging from "./pages/Dashboard/AdManager/AdManaging";
import FreshDeal from "./pages/Dashboard/CustomUser/FreshDeal";
import PriceChecker from "./pages/Dashboard/CustomUser/PriceChecker";
import ChangeSubscription from "./pages/Dashboard/CustomUser/ChangeSubscription";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";
import ProfileSettings from "./pages/Dashboard/AdManager/ProfileSettings";

const App = () => {
  const { auth } = useAuth();

  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPageLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* private routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<RequireAuth allowedRole="AdManager" />}>
            <Route path="admanaging" element={<AdManaging />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route element={<RequireAuth allowedRole="CustomUser" />}>
            <Route path="freshdeal" element={<FreshDeal />} />
            <Route path="pricechecker" element={<PriceChecker />} />
            <Route path="changesubscription" element={<ChangeSubscription />} />
          </Route>
        </Route>

        {/* undefined routes */}
        <Route
          path="*"
          element={
            <Navigate to={auth?.accessToken ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
