import React, { useState } from "react";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Input from "../../components/Input";
import Button from "../../components/Button";

function EditUserModal({
  editModalOpen,
  closeEditModal,
  handleEditSave,
  currentUser,
  setCurrentUser,
}) {
  const [errors, setErrors] = useState({
    email: "",
    userName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevError) => ({
      ...prevError,
      [name]: "",
    }));
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const validateAndSave = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentUser.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (!emailPattern.test(currentUser.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    }
    if (!currentUser.userName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Name is required",
      }));
    }
    handleEditSave();
  };
  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={closeEditModal}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <h2>Edit User</h2>
        <IoCloseSharp
          size={24}
          onClick={closeEditModal}
          className="action-icon"
        />
      </div>
      <div className="modal-content">
        {currentUser && (
          <div className="edit-user-form">
            <Input
              type="email"
              name="email"
              value={currentUser.email}
              onChange={handleInputChange}
              errorMessage={errors.email}
              label="Email"
            />
            <Input
              type="text"
              name="userName"
              value={currentUser.userName}
              onChange={handleInputChange}
              errorMessage={errors.userName}
              label="Name"
            />
            <div className="edit-isadmin">
              <label>Is Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={currentUser.isAdmin}
                onChange={(e) =>
                  setCurrentUser((prevUser) => ({
                    ...prevUser,
                    isAdmin: e.target.checked,
                  }))
                }
              />
            </div>
            <Button  onClick={validateAndSave} children="Save" />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default EditUserModal;
