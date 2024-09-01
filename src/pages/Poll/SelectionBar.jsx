import React from "react";
import Button from "../../components/Button";
import { MdOutlineDataSaverOff } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";

function SelectionBar({ selections, dishesList, isSubmitted, handleSave }) {
  return (
    <div>
      <div className="selection-bar">
        {!selections.length > 0 && (
          <div className="instructions">
            <p>Select 3 dishes to vote:</p>
            <p>
              1st rank gets 30 points, 2nd rank gets 20 points, and 3rd rank
              gets 10 points.
            </p>
          </div>
        )}
        {selections.length > 0 && (
          <div>
            <div className="selected-dishes">
              <h3>Selected Dishes:</h3>
              <ul>
                {selections.map(
                  (dish) =>
                    dish?.rank > 0 && (
                      <li key={dish.id}>
                        Rank {dish?.rank} -{" "}
                        {dishesList.find((d) => d.id === dish.id)?.dishName}
                      </li>
                    )
                )}
              </ul>
            </div>
            <div className="selection-btn-main">
              <Button
                onClick={handleSave}
                children={
                  <span className="btn-span">
                    {isSubmitted ? (
                      <MdFileDownloadDone className="btn-icon" size={16} />
                    ) : (
                      <MdOutlineDataSaverOff className="btn-icon" size={16} />
                    )}
                    {isSubmitted ? "Submitted!" : "Save"}
                  </span>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionBar;
