import { useEffect, RefObject, useState } from "react";

interface OptionsInterface {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export default function useElementObserver(
  ref: RefObject<HTMLDivElement>,
  options: OptionsInterface = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
) {
  const [isNearScreen, setIsNearScreen] = useState(false);

  useEffect(() => {
    // store in variable to clean up correctly, may change during the lifetime of the component
    let currentRef = ref.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsNearScreen(entry.isIntersecting);
      });
    }, options);

    // check if the element ref is present
    const checkAndObserve = () => {
      if (ref.current) {
        currentRef = ref.current;
        observer.observe(currentRef);
      }
    };

    // initial check to see if element is already in view
    checkAndObserve();

    // check for every mutation in the body, the element may be added or removed
    const mutationObserver = new MutationObserver(() => {
      checkAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [ref, options]);

  return { isNearScreen };
}
