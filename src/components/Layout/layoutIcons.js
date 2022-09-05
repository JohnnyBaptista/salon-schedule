import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const renderRouterIcons = (routes, navigate) => {
  return routes.map((route, idx) => (
    <ListItemButton
      key={`${route.title}-route-${idx.toString()}`}
      onClick={() => navigate(`/dash/${route.path}`)}
    >
      <ListItemIcon>{route.icon}</ListItemIcon>
      <ListItemText primary={route.title} />
    </ListItemButton>
  ));
};

