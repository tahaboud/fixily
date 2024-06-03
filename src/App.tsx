import {
  Alert,
  Slide,
  Snackbar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { SnackbarContext } from "./components/common/SnackbarContext";
import { useAppDispatch, useAppSelector } from "./hooks";
import Admin from "./pages/Admin";
import ArtisanAvailability from "./pages/ArtisanAvailability";
import ArtisanForgotPassword from "./pages/ArtisanForgotPassword";
import ArtisanLogin from "./pages/ArtisanLogin";
import ArtisanSignUp from "./pages/ArtisanSignUp";
import Categories from "./pages/Categories";
import ClientForgotPassword from "./pages/ClientForgotPassword";
import ClientLogin from "./pages/ClientLogin";
import ClientSignUp from "./pages/ClientSignUp";
import Followup from "./pages/Followup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Photo from "./pages/Photo";
import Signup from "./pages/Signup";
import SubCategories from "./pages/SubCategories";
import Wilayas from "./pages/Wilayas";
import { getUser } from "./state/actions/authActions";
import AdminRoutes from "./utils/AdminRoutes";
import ArtisanRoutes from "./utils/ArtisanRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, data, userDataFetchedFromToken } = useAppSelector(
    (state) => state.auth
  );
  const [snack, setSnack] = useState<{
    message: string;
    color: "success" | "info" | "warning" | "error";
    open: boolean;
    duration?: number;
  }>({
    message: "",
    color: "success",
    open: false,
  });
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
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContext.Provider value={{ snack, setSnack }}>
        <Snackbar
          open={snack.open}
          autoHideDuration={snack.duration || 1000}
          TransitionComponent={Slide}
          onClose={() =>
            setSnack((current) => {
              return { ...current, open: false };
            })
          }
        >
          <Alert severity={snack.color} sx={{ width: "100%" }}>
            {snack.message}
          </Alert>
        </Snackbar>
        <Router>
          <Routes>
            <Route
              element={
                <PrivateRoutes
                  userDataFetchedFromToken={userDataFetchedFromToken}
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route element={<AdminRoutes data={data} />}>
                <Route element={<Admin />} path="/admin" />
              </Route>
              <Route element={<ArtisanRoutes data={data} />}>
                <Route element={<Categories />} path="/categories" />
                <Route element={<SubCategories />} path="/sub-categories" />
                <Route element={<Wilayas />} path="/wilayas" />
                <Route element={<Photo />} path="/photo" />
                <Route element={<ArtisanAvailability />} path="/availability" />
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
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
