import Header from "./shell/Header";
import Footer from "./shell/Footer";
import { BrowserRouter } from "react-router-dom";
import Main from "./shell/Main";
import React from "react";
import SideMenu from "./shell/SideMenu";
import ReloadPrompt from "./components/shell/ReloadPrompt";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Main />
        <SideMenu />
        <Footer />
      </BrowserRouter>
      <ReloadPrompt />
    </>
  );
}

export default App;
