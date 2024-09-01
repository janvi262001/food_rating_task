import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../components/Button";

function ShowSelectionModal({ isModalOpen, closeModal, currentUser }) {
  const rankPoints = [30, 20, 10];
  const dishesList = localStorage.getItem("dishes")
    ? JSON.parse(localStorage.getItem("dishes"))
    : [];
  const userList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleEditClick = () => {
    if (isEditing) {
      const updatedDishesList = dishesList.map((dish) => {
        const selectedDish = selectedDishes.find(
          (selected) => selected.id === dish.id
        );
        if (selectedDish) {
          return { ...dish, Points: selectedDish.Points };
        }
        return dish;
      });

      const updatedUserList = userList.map((user) => {
        if (user.id === currentUser.id) {
          return { ...user, selections: selectedDishes };
        }
        return user;
      });

      localStorage.setItem("dishes", JSON.stringify(updatedDishesList));
      localStorage.setItem("users", JSON.stringify(updatedUserList));
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const selection = userList?.find(
      (u) => u?.id === currentUser?.id
    )?.selections;
    selection?.map((dish) => {
      const dishPoint = dishesList?.find((d) => d?.id === dish?.id)?.Points;
      dish.Points = dishPoint;
    });
    setSelectedDishes(selection || []);
  }, [currentUser]);

  const handleRankChange = (dishId, newRank) => {
    const updatedDishes = [...selectedDishes];
    const dishToEdit = updatedDishes.find((dish) => dish.id === dishId);
    if (!dishToEdit) return;
    const oldRank = dishToEdit.rank;
    const oldDisheWithRank = updatedDishes.find(
      (dish) => dish.rank === newRank
    );
    if (oldRank === newRank) return;
    const changeDishesRank = updatedDishes.map((dish) => {
      if (dish.id === dishToEdit.id) {
        return {
          ...dish,
          rank: newRank,
          Points: dish.Points - rankPoints[oldRank - 1] + rankPoints[newRank - 1],
        };
      }
      if (dish.id === oldDisheWithRank.id) {
        return {
          ...dish,
          rank: oldRank,
          Points: dish.Points + rankPoints[oldRank - 1] - rankPoints[newRank - 1],
        };
      }
      return dish;
    });
    changeDishesRank.sort((a, b) => a.rank - b.rank);
    setSelectedDishes(changeDishesRank);
  };

  const handlePointsChange = (dishId, newPoints) => {
    const updatedDishes = selectedDishes.map((dish) =>
      dish.id === dishId ? { ...dish, Points: newPoints } : dish
    );
    setSelectedDishes(updatedDishes);
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={()=>{setSelectedDishes([]);closeModal()}}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <h2>Votings</h2>
        <IoCloseSharp size={24} onClick={closeModal} className="action-icon" />
      </div>
      
      {selectedDishes.length === 0 ? (
        <div className="no-selection-message">
          <p>This user hasn't voted yet. There are no selections to display.</p>
        </div>
      ) : (
        <>
          <Button onClick={handleEditClick}>
            {isEditing ? "Save Changes" : "Edit All Ranks"}
          </Button>
          <div className="modal-content">
            {selectedDishes?.map((dish) => (
              <div className="modal-card" key={dish.id}>
                <img
                  src={dish.image}
                  alt={dish.dishName}
                  className="modal-image"
                />
                <div className="modal-details">
                  <h3>{dish.dishName}</h3>
                  <div className="modal-points">
                    <p>
                      Rank:
                      {isEditing ? (
                        <select
                          value={dish.rank}
                          onChange={(e) =>
                            handleRankChange(dish.id, Number(e.target.value))
                          }
                          className="custom-select"
                        >
                          {[...Array(selectedDishes.length)].map(
                            (_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            )
                          )}
                        </select>
                      ) : (
                        <span>{dish.rank}</span>
                      )}
                    </p>
                    <p>
                      Points:
                      {isEditing ? (
                        <input
                          type="number"
                          value={dish.Points}
                          onChange={(e) =>
                            handlePointsChange(dish.id, Number(e.target.value))
                          }
                          className="custom-input"
                        />
                      ) : (
                        <span>{dish.Points}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}

export default ShowSelectionModal;
