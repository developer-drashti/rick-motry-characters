// import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import {
  //   RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterList from "../views/CharacterList";
import CharacterDetail from "../views/CharacterDetail";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate({ to: "/characters/1" });
    }, []);
    return null;
  },
});

const characterRoute = createRoute({
  path: "/characters/$page",
  getParentRoute: () => rootRoute,
  component: CharacterList,
});

const detailRoute = createRoute({
  path: "/character/$id",
  getParentRoute: () => rootRoute,
  component: CharacterDetail,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, characterRoute, detailRoute]),
});
