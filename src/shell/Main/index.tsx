import React from "react";
import { Route, Routes } from "react-router-dom";
import { ViewUrls } from "@/configs/routes";

const Home = React.lazy(() => import("@views/Home"));
const About = React.lazy(() => import("@views/About"));
const Scanner = React.lazy(() => import("@views/Scanner"));

const Main = () => {
  return (
    <main className="relative">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ViewUrls.HOME} element={<Home />} />
          <Route path={ViewUrls.SCANNER} element={<Scanner />} />
          <Route path={ViewUrls.ABOUT} element={<About />} />
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default Main;
