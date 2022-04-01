import React from "react";

const About = () => {
  return (
    <article className="content">
      <section>
        <h3>Build info</h3>
        <p>App build (v.{__BUILD_VERSION__.slice(0, 8)})</p>
        <p>Uploaded at {__BUILD_DATE__}</p>
      </section>
    </article>
  );
};

export default About;
