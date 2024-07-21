import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";

import AppLayout from "@ui/AppLayout";
import Chats from "@pages/Chats";
const Profile = lazy(() => import("@pages/Profile"));
const Contacts = lazy(() => import("@pages/Contacts"));
const Login = lazy(() => import("@pages/Login"));
const Signup = lazy(() => import("@pages/Signup"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

import RoomProvider from "./context/RoomContext";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProtectedRoute>
          <Routes>
            <Route
              path="/"
              element={
                <RoomProvider>
                  <AppLayout />
                </RoomProvider>
              }
            >
              <Route index element={<Navigate to="/chats" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/contacts" element={<Contacts />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ProtectedRoute>
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
