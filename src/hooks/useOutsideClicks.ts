import { useEffect, useRef } from "react";

export default function useOutsideClicks(handle: () => void) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handle();
      }
    }
    document.addEventListener("click", handleClose, true);
    return () => document.removeEventListener("click", handleClose, true);
  }, [handle]);

  return ref as React.LegacyRef<any> | undefined;
}
