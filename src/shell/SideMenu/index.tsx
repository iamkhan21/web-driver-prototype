import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { useSideMenuContext } from "@shell/SideMenu/side-menu.controller";
import { Link } from "react-router-dom";
import { ViewNames, ViewUrls } from "@/configs/routes";

const SideMenu = () => {
  const { state, close, open } = useSideMenuContext();
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
      <section className="min-w-xs py-6">
        <h2 className="px-4">Menu</h2>
        <List>
          <ListItem disablePadding>
            <Link
              className="w-full no-underline text-current"
              onClick={close}
              to={ViewUrls.HOME}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={ViewNames.HOME} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              className="w-full no-underline text-current"
              onClick={close}
              to={ViewUrls.ABOUT}
            >
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={ViewNames.ABOUT} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </section>
    </Drawer>
  );
};

export default SideMenu;
