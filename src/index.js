import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Register from "./screens/register/Register";
import Dashboard from "./screens/dashboard/Dashboard";
import PollCompletion from "./screens/pollCompletion/PollCompletion";
import QuizCompletion from "./screens/quizCompletion/QuizCompletion";
import Questions from "./screens/questions/Questions";
import ItemNotFound from "./screens/itemNotFound/ItemNotFound";
import QuizAnalysis from "./screens/quizAnalysis/QuizAnalysis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/pollcompleted",
    element: <PollCompletion />,
  },
  {
    path: "/quizcompleted",
    element: <QuizCompletion />,
  },
  {
    path: "/quiz/:quizId",
    element: <Questions />,
  },
  {
    path: "/item-not-found",
    element: <ItemNotFound />,
  },
  {
    path: "/quizanalysis/:quizId",
    element: <QuizAnalysis />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes>
        {router}
        {/* Catch-all route for undefined routes */}
        <Route element={<ItemNotFound />} />
      </Routes>
    </RouterProvider>
  </React.StrictMode>
);
