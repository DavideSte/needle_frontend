import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import RootPage from "./core/pages/RootPage.tsx";
import ProtectedArea from "./features/auth/components/ProtectedArea.tsx";
import { lazy, Suspense, ReactNode } from "react";
import AuthRedirect from "./features/auth/components/AuthRedirect.tsx";
import HomePage from "./features/profile/pages/HomePage.tsx";
import SpotifyAuthCheck from "./features/playlist/components/SpotifyAuthCheck.tsx";
import PlaylistPage from "./features/playlist/pages/PlaylistPage.tsx";
import Loader from "./components/custom/Loader.tsx";

const LoginPage = lazy(() => import("./features/auth/pages/LoginPage.tsx"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage.tsx"));
const VerifyPage = lazy(() => import("./features/auth/pages/VerifyPage.tsx"));
const LogoutPage = lazy(() => import("./features/auth/pages/LogoutPage.tsx"));
const SearchPage = lazy(() => import("./features/search/pages/SearchPage.tsx"));
const ProfilePage = lazy(() => import("./features/profile/pages/ProfilePage.tsx"));
const CollectionPage = lazy(() => import("./features/collection/pages/CollectionPage.tsx"));
const CreatePlaylistPage = lazy(() => import("./features/playlist/pages/CreatePlaylistPage.tsx"));
const RecapPlaylistPage = lazy(() => import("./features/playlist/pages/RecapPlaylistPage.tsx"));
const NotFoundPage = lazy(() => import("./core/pages/NotFoundPage.tsx"));

const paths = {
  root: "/",
  login: "/login",
  register: "/register",
  verify: "/verify",
  logout: "/logout",
  search: "/search",
  profile: "/profile",
  collection: "/collection",
  playlist: "/playlist/:id",
  createPlaylist: "/create-playlist",
  recap: "/create-playlist/recap",
  notFound: "*",
};

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<Loader message="Loading..." />}>{element}</Suspense>
);

const router: RouteObject[] = [
  {
    path: paths.root,
    element: <RootPage />,
    children: [
      {
        path: paths.login,
        element: withSuspense(
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        ),
      },
      {
        path: paths.register,
        element: withSuspense(
          <AuthRedirect>
            <RegisterPage />
          </AuthRedirect>
        ),
      },
      {
        path: paths.verify,
        element: withSuspense(<VerifyPage />),
      },
      {
        path: "",
        element: <ProtectedArea />,
        children: [
          { path: paths.root, element: withSuspense(<HomePage />) },
          { path: paths.logout, element: withSuspense(<LogoutPage />) },
          { path: paths.search, element: withSuspense(<SearchPage />) },
          { path: paths.profile, element: withSuspense(<ProfilePage />) },
          { path: paths.collection, element: withSuspense(<CollectionPage />) },
          { path: paths.playlist, element: withSuspense(<PlaylistPage />) },
          {
            path: paths.createPlaylist,
            element: <SpotifyAuthCheck />,
            children: [
              { index: true, element: withSuspense(<CreatePlaylistPage />) },
              { path: paths.recap, element: withSuspense(<RecapPlaylistPage />) },
            ],
          },
        ],
      },
      { path: paths.notFound, element: withSuspense(<NotFoundPage />) },
    ],
  },
];

export default function Routes() {
  return <RouterProvider router={createBrowserRouter(router)} />;
}
