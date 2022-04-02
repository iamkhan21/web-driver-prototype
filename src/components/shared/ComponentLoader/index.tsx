import React, { useEffect, useState } from "react";

const ComponentLoader = () => {
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowMsg(true), 5_000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return showMsg ? <p>Content loading...</p> : null;
};

export default ComponentLoader;
