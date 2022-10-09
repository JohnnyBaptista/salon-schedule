import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Layout from "../components/Layout/Layout";
import Main from "../pages/Main";
import Estoque from "../pages/Estoque/Estoque";
import Clientes from "../pages/Clientes/Clientes";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "../pages/Login";

function MainRoutes() {
  const defaultProtectedRouteProps = useMemo(
    () => ({
      isAuthenticated: true,
      authenticationPath: "/",
    }),
    []
  );

  const routes = useMemo(
    () => [
      {
        icon: <DashboardIcon />,
        title: "Inicio",
        path: "home",
        element: <Main />,
      },
      {
        icon: <PeopleIcon />,
        title: "Clientes",
        path: "clientes",
        element: <Clientes />,
      },
      {
        icon: <ShoppingCartIcon />,
        title: "Estoque",
        path: "estoque",
        element: <Estoque />,
      },
    ],
    []
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/dash"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              protectedComponent={<Layout routes={routes} />}
            />
          }
        >
          {routes.map((route, idx) => (
            <>
              <Route
                key={`route-${idx.toString()}-${route.title}`}
                path={route.path}
                element={
                  <ProtectedRoute
                    {...defaultProtectedRouteProps}
                    protectedComponent={route.element}
                  />
                }
              />
            </>
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRoutes;

