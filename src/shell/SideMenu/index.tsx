import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { useSideMenuContext } from "@shell/SideMenu/side-menu.controller";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const { state, close, open } = useSideMenuContext();
  return (
    <SwipeableDrawer
      open={state}
      variant="temporary"
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("root"),
        style: { position: "absolute" },
      }}
      onClose={close}
      onOpen={open}
    >
      <section className="min-w-xs py-6">
        <h2 className="px-4">Menu</h2>
        <List>
          <ListItem disablePadding>
            <Link className="w-full" onClick={close} to="/">
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Geolocation tracking" />
              </ListItemButton>{" "}
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full" onClick={close} to="/about">
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </section>
    </SwipeableDrawer>
  );
};

export default SideMenu;
