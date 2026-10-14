import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (pathname === previousPathname.current) return;

    previousPathname.current = pathname;

    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [navigationType, pathname]);

  return null;
}

export default ScrollToTop;
