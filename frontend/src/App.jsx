import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpot from "./components/SpotComponents/CreateSpot";
import AllSpots from "./components/SpotComponents/AllSpots";
import OneSpot from "./components/SpotComponents/OneSpot";
import ManageSpots from "./components/SpotComponents/ManageSpots";
import UpdateSpot from "./components/SpotComponents/UpdateSpotModal/UpdateSpot";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllSpots />,
      },
      {
        path: "/spot",
        children: [
          {
            path: ":spotId",
            element: <OneSpot />,
          },
          {
            path: "new",
            element: <CreateSpot />,
          },
          {
            path: "user/:userId",
            element: <ManageSpots />,
          },
          {
            path: ":spotId/update",
            element: <UpdateSpot />,
          }
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
