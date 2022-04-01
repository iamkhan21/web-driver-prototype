import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("@views/Home"));
const About = React.lazy(() => import("@views/About"));

const Main = () => {
  return (
    <main className="relative p-4">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default Main;
