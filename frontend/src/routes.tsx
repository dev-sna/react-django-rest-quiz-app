import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateQuiz from "./modules/CreateQuiz/CreateQuiz";
import Home from "./modules/Home/Home";
import Login from "./modules/Login/Login";
import { useAuth } from "./modules/providers/AuthProvider";
import Quizzes from "./modules/Quizzes/Quizzes";
import Register from "./modules/Register/Register";
import TakeQuiz from "./modules/TakeQuiz/TakeQuiz";
import UpdateQuiz from "./modules/UpdateQuiz/UpdateQuiz";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { user }: any = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRedirect: React.FC<any> = ({ children }) => {
  const { user }: any = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Quizzes />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/update-quiz/:id" element={<UpdateQuiz />} />
        </Route>
        <Route path="/take-quiz/:quiz_uuid" element={<TakeQuiz />} />
      </Routes>
    </BrowserRouter>
  );
};
