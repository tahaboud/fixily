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
import AdminLogin from "./pages/AdminLogin";
import ArtisanAccount from "./pages/ArtisanAccount";
import ArtisanAvailability from "./pages/ArtisanAvailability";
import ArtisanForgotPassword from "./pages/ArtisanForgotPassword";
import ArtisanLogin from "./pages/ArtisanLogin";
import ArtisanSignUp from "./pages/ArtisanSignUp";
import Categories from "./pages/Categories";
import ClientAccount from "./pages/ClientAccount";
import ClientForgotPassword from "./pages/ClientForgotPassword";
import ClientLogin from "./pages/ClientLogin";
import ClientSignUp from "./pages/ClientSignUp";
import CreateNewJob from "./pages/CreateNewJob";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Photo from "./pages/Photo";
import SubCategories from "./pages/SubCategories";
import Wilayas from "./pages/Wilayas";
import { getUser } from "./state/actions/authActions";
import { ActionEnums } from "./state/types/actionEnums";
import "./style.css";
import AdminRoutes from "./utils/AdminRoutes";
import ArtisanRoutes from "./utils/ArtisanRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import Policy from "./pages/Policy";
import ScrollToTop from "./components/ScrollToTop";
import DataPolicy from "./pages/DataPolicy";

function App() {
  const dispatch = useAppDispatch();

  const { isAuthenticated, data, userDataFetchedFromToken, isArtisan } =
    useAppSelector((state) => state.auth);

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
      fontFamily: "Lato",
      fontWeightRegular: 500,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getUser({ token }));
    } else {
      dispatch({ type: ActionEnums.SET_USER_DATA_FETCHED_FROM_TOKEN_TRUE });
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
          }>
          <Alert severity={snack.color} sx={{ width: "100%" }}>
            {snack.message}
          </Alert>
        </Snackbar>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              element={
                <PrivateRoutes
                  userDataFetchedFromToken={userDataFetchedFromToken}
                  isAuthenticated={isAuthenticated}
                />
              }>
              <Route element={<AdminRoutes data={data} />}>
                <Route element={<Admin />} path="/panel-admin" />
              </Route>
              <Route element={<ArtisanRoutes data={data} />}>
                <Route element={<Categories />} path="/categories" />
                <Route element={<SubCategories />} path="/sub-categories" />
                <Route element={<Wilayas />} path="/wilayas" />
                <Route element={<Photo />} path="/photo" />
                <Route element={<ArtisanAvailability />} path="/availability" />
              </Route>
              <Route
                element={isArtisan ? <ArtisanAccount /> : <ClientAccount />}
                path="/account"
              />
            </Route>
            <Route element={<LandingPage />} path="/" />
            <Route element={<Policy />} path="/policy" />
            <Route element={<DataPolicy />} path="/mydata" />

            <Route element={<Login />} path="/login" />
            <Route element={<ClientLogin />} path="/login/client" />
            <Route element={<AdminLogin />} path="/login/admin" />
            <Route element={<ArtisanLogin />} path="/login/artisan" />
            <Route element={<ArtisanSignUp />} path="/register/artisan" />
            <Route element={<ClientSignUp />} path="/register/client" />
            <Route element={<CreateNewJob />} path="/new-job" />
            <Route
              element={<ClientForgotPassword />}
              path="/forget-password/client"
            />
            <Route
              element={<ArtisanForgotPassword />}
              path="/forget-password/artisan"
            />
          </Routes>
        </Router>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
