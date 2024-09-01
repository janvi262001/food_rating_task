import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./pages/Navbar";
import AuthProvider from "./context/AuthContext";
import DishesProvider from "./context/DishesContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <DishesProvider>
        <Routes>
          {routes.map(({ path, component: Component, isProtected }, index) => {
            if (isProtected) {
              return (
                <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute>
                      <Navbar />
                      <Component />
                    </ProtectedRoute>
                  }
                />
              );
            }
            return (
              <Route
                key={index}
                path={path}
                element={<Component />}
              />
            );
          })}
        </Routes>
      </DishesProvider>
    </AuthProvider>
  );
};

export default App;
