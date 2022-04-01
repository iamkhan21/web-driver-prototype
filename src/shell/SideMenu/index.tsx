import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSideMenuContext } from "@shell/SideMenu/side-menu.controller";
import { Link, useLocation } from "react-router-dom";
import { ViewRelations } from "@/configs/routes";
import Box from "@mui/material/Box";

const SideMenu = () => {
  const { state, close } = useSideMenuContext();
  const { pathname } = useLocation();

  return (
    <Drawer
      open={state}
      variant="temporary"
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("root"),
        style: { position: "absolute" },
      }}
      onClose={close}
    >
      <section className="min-w-xs">
        <Box
          sx={{
            paddingBlock: "1rem",
            backgroundColor: "primary.main",
          }}
        >
          <h2 className="px-4 text-white">Menu</h2>
        </Box>
        <nav className="py-2">
          <List>
            {Object.entries(ViewRelations).map(([path, data]) => (
              <ListItem key={path} disablePadding>
                <Link
                  className="w-full no-underline text-current"
                  onClick={close}
                  to={path}
                >
                  <ListItemButton selected={pathname === path}>
                    <ListItemIcon>{data.icon}</ListItemIcon>
                    <ListItemText primary={data.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </nav>
      </section>
    </Drawer>
  );
};

export default SideMenu;
