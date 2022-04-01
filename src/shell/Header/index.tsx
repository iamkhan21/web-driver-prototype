import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSideMenuContext } from "@shell/SideMenu/side-menu.controller";

const Header = () => {
  const { open } = useSideMenuContext();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={open}
        >
          <MenuIcon />
        </IconButton>
        <h2>Home</h2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
