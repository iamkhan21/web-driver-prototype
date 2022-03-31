import React from "react";
import Drawer from "@mui/material/Drawer";

const SideMenu = () => {
  return (
    <Drawer
      open={false}
      variant="temporary"
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("root"),
        style: { position: "absolute" },
      }}
    >
      <section className="w-full max-w-xs px-4 py-6">
        <h2>Menu</h2>
        <nav className="flex flex-col">
          <p>dfsgsd</p>
          <p>dfsgsd</p>
          <p>dfsgsd</p>
          <p>dfsgsd</p>
        </nav>
      </section>
    </Drawer>
  );
};

export default SideMenu;
