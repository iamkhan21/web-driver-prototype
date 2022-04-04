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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const SideMenu = () => {
  const { state, close } = useSideMenuContext();
  const { pathname } = useLocation();

  return (
    <Drawer
      open={state}
      variant="temporary"
      anchor="top"
      PaperProps={{
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          maxWidth: 500,
          boxShadow: "none",
          marginInline: "auto",
        },
      }}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            backgroundColor: "primary.main",
          }}
        >
          <h2 className="text-white">Menu</h2>
          <IconButton aria-label="close menu" onClick={close}>
            <CloseIcon className="text-white" />
          </IconButton>
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
