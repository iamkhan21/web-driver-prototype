import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "@shell/Header";
import Footer from "@shell/Footer";
import Main from "@shell/Main";
import SideMenu from "@shell/SideMenu";
import ReloadPrompt from "@components/shell/ReloadPrompt";
import Geolocation from "@components/shared/Geolocation";
import { initApp } from "@application/app";

function App() {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Main />
        <SideMenu />
        <Footer />
      </BrowserRouter>
      <Geolocation />
      <ReloadPrompt />
    </>
  );
}

export default App;
