import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "../../ui/Spinner";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (loading) return;
    if (!user && (!pathname.includes("login") || !pathname.includes("signup")))
      navigate("/login");
    if (user && (pathname.includes("/login") || pathname.includes("signup")))
      navigate("/chats");
  }, [loading, user, navigate, pathname]);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100 py-1">
        <Spinner />;
      </div>
    );

  return <>{children}</>;
}

export default ProtectedRoute;
