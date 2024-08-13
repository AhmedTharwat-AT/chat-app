import { useRoom } from "@/context/RoomContext";
import { PHONE_MAX_WIDTH, ROUTES } from "@/utils/constants";
import { AbstractView, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ExtendTouchEvent extends React.TouchEvent<HTMLDivElement> {
  view: {
    innerWidth: number;
  } & AbstractView;
}

function useTouchNavigation() {
  const { room } = useRoom();
  const { pathname } = useLocation();
  const [touchStart, setTouchStart] = useState(0);
  const navigate = useNavigate();

  const path = pathname.replace("/", "");

  function handleTouchStart(e: ExtendTouchEvent) {
    if (room || !ROUTES.includes(path)) return;
    if (e.view?.innerWidth > PHONE_MAX_WIDTH) return;

    setTouchStart(e.touches[0].clientX);
  }
  function handleTouchEnd(e: ExtendTouchEvent) {
    if (room || !ROUTES.includes(path) || !touchStart) return;
    if (e.view?.innerWidth > PHONE_MAX_WIDTH) return;

    const touchEnd = e.changedTouches[0].clientX;
    const pageIndex = ROUTES.findIndex((route) => route === path);
    const pagesCount = ROUTES.length;

    // touch from right to left
    if (touchStart > touchEnd + 50) {
      if (pageIndex < pagesCount - 1) navigate(ROUTES[pageIndex + 1]);
    }
    // touch from left to right
    if (touchStart < touchEnd - 50) {
      if (pageIndex > 0) navigate(ROUTES[pageIndex - 1]);
    }
  }

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}

export default useTouchNavigation;
