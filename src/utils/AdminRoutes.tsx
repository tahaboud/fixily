import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types";

const AdminRoutes = ({ data }: { data: User | null }) => {
  return data && data.is_admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
