import React from "react";
import { Route, Routes } from "react-router-dom";
import { ViewUrls } from "@/configs/routes";
import ComponentLoader from "@components/shared/ComponentLoader";

const Home = React.lazy(() => import("@views/Home"));
const About = React.lazy(() => import("@views/About"));
const Scanner = React.lazy(() => import("@views/Scanner"));
const Documents = React.lazy(() => import("@views/Documents"));
const Inspection = React.lazy(() => import("@views/Inspection"));
const NotFound = React.lazy(() => import("@views/NotFound"));

const Main = () => {
  return (
    <main>
      <React.Suspense fallback={<ComponentLoader />}>
        <Routes>
          <Route path={ViewUrls.HOME} element={<Home />} />
          <Route path={ViewUrls.INSPECTION} element={<Inspection />} />
          <Route path={ViewUrls.SCANNER} element={<Scanner />} />
          <Route path={ViewUrls.DOCUMENTS} element={<Documents />} />
          <Route path={ViewUrls.ABOUT} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default Main;
