import { Navigate, Outlet } from "react-router-dom";
import { UserDetails } from "../types";

const AdminRoutes = ({ details }: { details: UserDetails | null }) => {
  return details && details.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
