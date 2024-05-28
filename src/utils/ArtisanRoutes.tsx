import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types";

const ArtisanRoutes = ({ data }: { data: User | null }) => {
  return data && data.is_artisan ? <Outlet /> : <Navigate to="/" />;
};

export default ArtisanRoutes;
