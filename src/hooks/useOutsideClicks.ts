import { useEffect, useRef } from "react";

export default function useOutsideClicks(handle: () => void, propagate = true) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handle();
      }
    }
    document.addEventListener("click", handleClose, propagate);
    return () => document.removeEventListener("click", handleClose, propagate);
  }, [handle]);

  return ref as React.LegacyRef<any> | undefined;
}
