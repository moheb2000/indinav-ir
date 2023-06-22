import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import StaticPage from "./pages/StaticPage";
import StaticPost from "./pages/StaticPost";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import ModifyPost from "./pages/ModifyPost";
import ModifyPage from "./pages/ModifyPage";
import AddPage from "./pages/AddPage";

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
        path: '/login',
        element: <Login />
      },
      {
        path: '/page/:slug',
        element: <StaticPage />
      },
      {
        path: '/page/:slug/edit',
        element: <ModifyPage />
      },
      {
        path: '/page/add',
        element: <AddPage />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/post/:slug',
        element: <StaticPost />
      },
      {
        path: '/post/:slug/edit',
        element: <ModifyPost />
      },
      {
        path: '/post/add',
        element: <AddPost />
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
