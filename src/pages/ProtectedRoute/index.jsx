import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDishes } from '../../context/DishesContext';
import users from '../../users.json';

const ProtectedRoute = ({ children, isAdminRoute }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userId = localStorage.getItem('userId');
  const { user, setUser } = useAuth();
  const { dishes,setSelectedDishes } = useDishes();
  const dishesData = localStorage.getItem("dishes")? JSON.parse(localStorage.getItem("dishes")) : null;
  const usersData = localStorage.getItem('users');

  useEffect(() => {
    const userData = users.find((u) => u.id == userId);
    if (dishesData === null || dishesData?.length===0 ) {
      const updatedResponse = dishes.map((dish) => ({
        ...dish,
        Points: 0,
      }));
      localStorage.setItem("dishes", JSON.stringify(updatedResponse));
    }
    if (!usersData) {
      const usersWithoutPassword = users.map((u) => {
        const { password, ...rest } = u;
        return rest;
      });
      localStorage.setItem('users', JSON.stringify(usersWithoutPassword));
    } else {
      if (user) { 
        const usersData = JSON.parse(localStorage.getItem('users'));
        const updatedUsers = usersData.find((u) => u?.id === user?.id);
        setSelectedDishes(updatedUsers?.selections || []);
      }
    }
  
    if (userData && (!user || user.id !== userData.id)) {
      setUser(userData);
    }
  }, [userId, setUser, user,dishes]);
  

  if (!isAuthenticated || !userId) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && (!user || !user.isAdmin)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
