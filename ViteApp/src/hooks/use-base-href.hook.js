import { useEffect, useState } from "react";

export const useBaseHref = () => {
  const [baseHref, setBaseHref] = useState("/");

  useEffect(() => {
    const base = document.querySelector("head base");
    const href = base?.getAttribute("href");
    setBaseHref(href || baseHref);
  }, []);

  return baseHref;
};
