import { Navigate } from "react-router-dom";
export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  protectedComponent,
}) {
  if (isAuthenticated) {
    return protectedComponent;
  }

  return Navigate({ to: authenticationPath });
}
