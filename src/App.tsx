import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "@shell/Header";
import Footer from "@shell/Footer";
import Main from "@shell/Main";
import SideMenu from "@shell/SideMenu";
import ReloadPrompt from "@components/shell/ReloadPrompt";
import ErrorDialog from "@components/shell/ErrorDialog";
import { initApp } from "@application/app";
import { SideMenuProvider } from "@shell/SideMenu/side-menu.controller";
import Network from "@components/shell/Network";
import Geolocation from "@components/shell/Geolocation";

function App() {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <BrowserRouter>
        <SideMenuProvider>
          <Header />
          <SideMenu />
        </SideMenuProvider>
        <Main />
        <Footer />
        <ErrorDialog />
      </BrowserRouter>
      <Geolocation />
      <Network />
      <ReloadPrompt />
    </>
  );
}

export default App;
