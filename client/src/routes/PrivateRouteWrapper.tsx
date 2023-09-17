import { useAuth } from "hooks/useAuth";
import { Navigate } from "react-router-dom";
import paths from "./paths";

interface PrivateRouteWrapperProps {
  children: React.ReactNode;
}

function PrivateRouteWrapper({ children }: PrivateRouteWrapperProps) {
  const auth = useAuth();
  if (auth.user) {
    return children;
  } else {
    return <Navigate to={paths.LOGIN} replace />;
  }
}

export default PrivateRouteWrapper;
