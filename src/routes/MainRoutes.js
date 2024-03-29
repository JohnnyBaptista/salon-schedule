import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Layout from "../components/Layout/Layout";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Estoque from "../pages/Estoque/Estoque";
import Clientes from "../pages/Clientes/Clientes";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "../pages/Login";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Funcionarios from "../pages/Funcionario/Funcionarios";
import Agendamento from "../pages/Agendamento/Agendamento";
import _ from "lodash";
import WhatsApp from "../pages/WhatsApp/WhatsApp";

function MainRoutes() {
  const defaultProtectedRouteProps = () => {
    const lcstrg = localStorage.getItem("salon_token");
    const token = JSON.parse(lcstrg);
    const hasToken = _.isEmpty(token);
    if (!hasToken) {
      return {
        isAuthenticated: true,
        authenticationPath: "/",
      };
    }
    return {
      isAuthenticated: false,
      authenticationPath: "/",
    };
  };

  const routes = useMemo(
    () => [
      {
        icon: <CalendarMonthIcon />,
        title: "Agendamentos",
        path: "agendamento",
        element: <Agendamento />,
      },
      {
        icon: <PeopleIcon />,
        title: "Clientes",
        path: "clientes",
        element: <Clientes />,
      },
      {
        icon: <EngineeringIcon />,
        title: "Funcionarios",
        path: "funcionarios",
        element: <Funcionarios />,
      },
      // {
      //   icon: <ShoppingCartIcon />,
      //   title: "Estoque",
      //   path: "estoque",
      //   element: <Estoque />,
      // },
      {
        icon: <WhatsAppIcon />,
        title: "Conectar Whatsapp",
        path: "wpp",
        element: <WhatsApp />,
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
              {...defaultProtectedRouteProps()}
              protectedComponent={<Layout routes={routes} />}
            />
          }
        >
          {routes.map((route, idx) => (
            <Route
              key={`route-${idx.toString()}-${route.title}`}
              path={route.path}
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps()}
                  protectedComponent={route.element}
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRoutes;
