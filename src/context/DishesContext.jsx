// DishContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const DishContext = createContext();
export const useDishes = () => useContext(DishContext);

const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/dctacademy/react-task/main/db.json"
      );
      setDishes(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <DishContext.Provider
      value={{ dishes, setDishes, selectedDishes, setSelectedDishes }}
    >
      {children}
    </DishContext.Provider>
  );
};

export default DishProvider;
