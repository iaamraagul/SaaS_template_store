import { Route, Routes } from "react-router-dom";

import SaaSHeader from "./components/SaaSHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import MarketplacePage from "./pages/MarketplacePage";
import SignupPage from "./pages/SignupPage";

function MarketplaceLayout() {
  return (
    <>
      <SaaSHeader />
      <Routes>
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/templates" element={<MarketplacePage />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="*" element={<MarketplaceLayout />} />
    </Routes>
  );
}
