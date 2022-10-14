import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Root from "./layout/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Register></Register>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
      ],
    },
  ]);
  return (
    <div className="App font-poppins w-9/12 mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
