import React, { useEffect, useState } from "react";
import { useDishes } from "../../context/DishesContext";
import "./index.css";
import Pagination from "../../components/pagination";
const ITEMS_PER_PAGE = 10;

const Results = () => {
  const { selectedDishes } = useDishes();
  const [dishes] = useState(
    localStorage.getItem("dishes")
      ? JSON.parse(localStorage.getItem("dishes"))
      : []
  );
  const [dishesList, setDishesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sortedDishes = [...dishes].sort(
      (a, b) => (b?.Points || 0) - (a?.Points || 0)
    );
    setDishesList(sortedDishes);
  }, [dishes]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastDish = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDish = indexOfLastDish - ITEMS_PER_PAGE;
  const currentDishes = dishesList.slice(indexOfFirstDish, indexOfLastDish);
  const totalPages = Math.ceil(dishesList.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <h1 className="poll-title">Poll Results</h1>
      <div className="cards-result-container">
        {currentDishes.map((dish) => (
          <div
            className={`card-result ${
              selectedDishes.some((sd) => sd.id === dish.id)
                ? "selected-dish"
                : ""
            }`}
            key={dish.id}
          >
            <div className="card-result-image">
              <img src={dish.image} alt={dish.dishName}  />
            </div>
            <div className="card-result-details">
              <h2>{dish.dishName}</h2>
              <p className="points-result">Points: {dish.Points || 0}</p>
              <p className="description-result">{dish.description}</p>
              {selectedDishes.some((sd) => sd.id === dish.id) && (
                <b>Rank : {selectedDishes.find(sd => sd.id === dish.id)?.rank}</b>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Results;
