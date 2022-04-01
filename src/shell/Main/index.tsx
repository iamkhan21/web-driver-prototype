import React from "react";
import { Route, Routes } from "react-router-dom";
import { ViewUrls } from "@/configs/routes";

const Home = React.lazy(() => import("@views/Home"));
const About = React.lazy(() => import("@views/About"));

const Main = () => {
  return (
    <main className="relative">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ViewUrls.HOME} element={<Home />} />
          <Route path={ViewUrls.ABOUT} element={<About />} />
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default Main;
