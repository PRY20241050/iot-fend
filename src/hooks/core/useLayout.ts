import { useEffect, useState } from "react";

const getInitialState = (query: string, defaultState?: boolean) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches."
    );
  }

  return false;
};

export function useMedia(query: string, defaultState?: boolean): boolean {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener("change", onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
}

export function useLayout() {
  const isMobile = useMedia("(max-width: 768px)", false);
  const isTablet = useMedia(
    "(min-width: 768px) and (max-width: 1200px)",
    false
  );
  const isDesktop = useMedia("(min-width: 1024px)", false);
  const isDesktopXSorMore = useMedia("(min-width: 1200px)", true);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopXSorMore,
  };
}
