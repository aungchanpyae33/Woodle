import { useEffect } from "react";
import { useState } from "react";

function ReactMdSize() {
  const isSmall = window.innerWidth <= 1024;

  const [mdsize, setmdsize] = useState(isSmall);
  useEffect(() => {
    const handleMdSize = () => {
      setmdsize(window.innerWidth <= 1024);
    };
    handleMdSize();
    window.addEventListener("resize", handleMdSize);

    return () => {
      window.removeEventListener("resize", handleMdSize);
    };
  }, []);

  return mdsize;
}

export default ReactMdSize;
