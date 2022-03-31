import Header from "./shell/Header";
import Footer from "./shell/Footer";
import { BrowserRouter } from "react-router-dom";
import Main from "./shell/Main";
import React from "react";
import SideMenu from "./shell/SideMenu";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <SideMenu />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
