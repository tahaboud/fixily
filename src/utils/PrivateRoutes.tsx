import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({
  isAuthenticated,
  userDataFetchedFromToken,
}: {
  isAuthenticated: boolean;
  userDataFetchedFromToken: boolean;
}) => {
  return !userDataFetchedFromToken ? (
    "Loading..."
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
