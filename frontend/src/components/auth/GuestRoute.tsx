import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
