import React, { useState, useEffect } from "react";
import "./index.css";
import { useDishes } from "../../context/DishesContext";
import { useAuth } from "../../context/AuthContext";
import SelectionBar from "./SelectionBar";
import Pagination from "../../components/pagination";
import noDataFound from "../../Images/noDataFound.avif";
import Notification from "../../components/Notification";
const ITEMS_PER_PAGE = 12;

const Poll = () => {
  const { dishes, setDishes, setSelectedDishes, selectedDishes } = useDishes();
  const { user } = useAuth();
  const [selections, setSelections] = useState(selectedDishes);
  const [currentPage, setCurrentPage] = useState(1);
  const [dishesList, setDishesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({});
  
  useEffect(() => {
    if (dishes.length > 0) {
      setDishesList(dishes);
    }
  }, [dishes]);

  useEffect(() => {
    if (selectedDishes.length > 0) {
      setSelections(selectedDishes);
      setIsSubmitted(true);
    }
  }, [selectedDishes]);

  const handleSelection = (dish, rank, index) => {
    console.log('rank: ', rank);
    if (rank === 0) {
      const updatedSelections = selections.filter(
        (selectedDish) => selectedDish.id !== dish.id
      );
      setSelections(updatedSelections);
      setIsSubmitted(false);
      return;
    }
    setIsSubmitted(false);
    setSelections((prev) => {
      const newSelections = prev.filter(
        (item) => item.id !== dish.id && item.rank !== rank
      );
      const updatedSelections = [...newSelections, { ...dish, rank }];
      updatedSelections.sort((a, b) => a.rank - b.rank);

      setDishesList((dishes) => {
        const updatedDishes = [...dishes];
        const selectedDish =
          updatedDishes[index + ITEMS_PER_PAGE * (currentPage - 1)];
        return updatedDishes;
      });
      return updatedSelections;
    });
  };

  const handleSave = () => {
    const rankPoints = [30, 20, 10];
    if (selections.length !== 3) {
      setNotificationDetails({
        type: "error",
        message: "Please select exactly 3 dishes.",
      });
      setShowNotification(true);
      return;
    }
  
    const usersData =  localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")) : null;
    const currentUser = usersData.find((u) => u.id === user.id);
    const lastSelection = currentUser.selections;
    if(lastSelection && lastSelection.length > 0){
      
    }
    if (currentUser) {
      currentUser.selections = selections;
      localStorage.setItem("users", JSON.stringify(usersData));
    }
    const dishesData = localStorage.getItem("dishes")? JSON.parse(localStorage.getItem("dishes")) : null;
    lastSelection?.forEach((selection) => {
      const dish = dishesData.find((d) => d.id === selection.id);
      if (dish) {
        dish.Points = dish.Points
          ? dish.Points - rankPoints[selection.rank - 1]
          : -rankPoints[selection.rank - 1];
      }
    })
    selections.forEach((selection) => {
      const dish = dishesData.find((d) => d.id === selection.id);
      if (dish) {
        dish.Points = dish.Points
          ? dish.Points + rankPoints[selection.rank - 1]
          : rankPoints[selection.rank - 1];
      }
    });
    setDishes(dishesData);
    localStorage.setItem("dishes", JSON.stringify(dishesData));
    setSelectedDishes(selections);
    setIsSubmitted(true);
    setNotificationDetails({
      type: "success",
      message: "Voting saved successfully.",
    });
    setShowNotification(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastDish = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDish = indexOfLastDish - ITEMS_PER_PAGE;
  const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);

  const totalPages = Math.ceil(dishes.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <h1 className="poll-title">Vote for Your Favorite Dishes</h1>
      {dishes.length === 0 ? (
        <div className="no-dishes">
          <img
            src={noDataFound}
            alt="No Dishes Found"
            className="no-dishes-image"
          />
          <p>No dishes found. Please try again later.</p>
        </div>
      ) : (
        <>
          <SelectionBar
            selections={selections}
            dishesList={dishesList}
            isSubmitted={isSubmitted}
            handleSave={handleSave}
          />
          <div className="card-container">
            {currentDishes.map((dish, index) => (
              <div
                className={`${
                  selections.find((sel) => sel.id === dish.id)?.rank
                    ? "card-active"
                    : ""
                } card`}
                key={dish.id}
              >
                <img
                  src={dish.image}
                  alt={dish.dishName}
                  className="card-image"
                />
                <div className="card-content">
                  <h2 className="card-title">{dish.dishName}</h2>
                  <p className="card-description">{dish.description}</p>
                  <select
                    className="card-select"
                    value={
                      selections.find((sel) => sel.id === dish.id)?.rank || 0
                    }
                    onChange={(e) =>
                      handleSelection(dish, parseInt(e.target.value), index)
                    }
                  >
                    <option value={0}>No Rank</option>
                    <option value={1}>Rank 1 (30 points)</option>
                    <option value={2}>Rank 2 (20 points)</option>
                    <option value={3}>Rank 3 (10 points)</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <Notification
            visible={showNotification}
            type={notificationDetails.type}
            message={notificationDetails.message}
            onClose={() => setShowNotification(false)}
          />
        </>
      )}
    </div>
  );
};

export default Poll;
