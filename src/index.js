import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp/SignUp"; 
import Dashboard from "./screens/dashboard/Dashboard";
import QuizResult from "./screens/quizResult/QuizResult"; 
import QuizQuestions from "./screens/quizQuestions/QuizQuestions"; 
import PollCompletion from "./screens/pollCompletion/PollCompletion";
import ItemNotFound from "./screens/ItemNotFound/ItemNotFound";
import QuizAnalysis from "./screens/quizAnalysis/QuizAnalysis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />, 
  },
  {
    path: "/dashboard",
    element: <Dashboard />, 
  },
  {
    path: "/pollCompletion",
    element: <PollCompletion />, 
  },
  {
    path: "/quizresult",
    element: <QuizResult />, 
  },
  {
    path: "/quiz/:quizId",
    element: <QuizQuestions />, 
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




