import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import Admin from "./pages/Admin";
import ArtisanForgotPassword from "./pages/ArtisanForgotPassword";
import ArtisanLogin from "./pages/ArtisanLogin";
import ArtisanSignUp from "./pages/ArtisanSignUp";
import ClientForgotPassword from "./pages/ClientForgotPassword";
import ClientLogin from "./pages/ClientLogin";
import ClientSignUp from "./pages/ClientSignUp";
import Followup from "./pages/Followup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getUser } from "./state/actions/authActions";
import AdminRoutes from "./utils/AdminRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, data } = useAppSelector((state) => state.auth);
  const theme = createTheme({
    typography: {
      fontFamily: "Lato, sans-serif",
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser({ token }));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route element={<AdminRoutes data={data} />}>
              <Route element={<Admin />} path="/admin" />
            </Route>
          </Route>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<ClientLogin />} path="/login/client" />
          <Route element={<ArtisanLogin />} path="/login/artisan" />
          <Route element={<ArtisanSignUp />} path="/register/artisan" />
          <Route element={<ClientSignUp />} path="/register/client" />
          <Route
            element={<ClientForgotPassword />}
            path="/forget-password/client"
          />
          <Route
            element={<ArtisanForgotPassword />}
            path="/forget-password/artisan"
          />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Followup />} path="/followup" />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
