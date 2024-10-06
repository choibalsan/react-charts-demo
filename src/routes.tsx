import {createRoute, createRootRoute, Outlet, createRouter, redirect} from '@tanstack/react-router';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import {Auth} from './auth';
import {NotFoundPage} from "./pages/NotFoundPage.tsx";

const rootRoute = createRootRoute({
  component: () => (<Outlet/>),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: DashboardPage,
  beforeLoad: async () => {
    const isAuthenticated = await Auth.checkAuth();
    if (!isAuthenticated) {
      return {
        redirect: '/login',
      };
    }
  },
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*', // Matches any unknown path
  component: NotFoundPage,
});

const defaultRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: async () => {
    const isAuthenticated = await Auth.checkAuth();

    redirect({
      to: isAuthenticated ? '/dashboard' : '/login',
      throw: true,
    })
  },
});

// Create the router instance
const routeTree = rootRoute.addChildren([loginRoute, dashboardRoute, notFoundRoute, defaultRedirectRoute]);

export const portfoliosRouter = createRouter({
  routeTree,
});
