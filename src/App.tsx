import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { getUser } from "./components/state/actions/authActions";
import { auth } from "./config/firebase";
import { useAppDispatch, useAppSelector } from "./hooks";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminRoutes from "./utils/AdminRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, details } = useAppSelector((state) => state.auth);
  useEffect(() => {
    onAuthStateChanged(auth, () => dispatch(getUser()));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route element={<AdminRoutes details={details} />}>
            <Route element={<Admin />} path="/admin" />
          </Route>
        </Route>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </Router>
  );
}

export default App;
