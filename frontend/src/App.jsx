import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import StaticPage from "./pages/StaticPage";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/page/:slug',
        element: <StaticPage />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
