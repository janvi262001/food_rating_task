import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import usersData from "../../users.json";
import "./index.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Pagination from "../../components/pagination";
import ShowSelectionModal from "./ShowSelectionModal";
import EditUserModal from "./EditUserModal";

const AdminPanel = () => {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(usersList.length / usersPerPage);

  useEffect(() => {
    if (user && user.isAdmin) {
      const filteredUsers = usersData.filter((u) => u.id !== user.id);
      setUsersList(filteredUsers);
    }
  }, [user]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usersList.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentUser(null);
    setEditModalOpen(false);
  };

  const handleEditSave = () => {
    const updatedUsers = usersList.map((u) =>
      u.id === currentUser.id ? currentUser : u
    );
    setUsersList(updatedUsers);
    closeEditModal();
  };

  const handleDelete = (userId) => {
    const updatedUsers = usersList.filter((u) => u.id !== userId);
    setUsersList(updatedUsers);
  };

  return (
    <div className="container">
      <h1 className="admin-panel-title">Admin Panel</h1>
      <table className="user-table">
        <thead className="user-table-header">
          <tr>
            <th className="user-table-header-cell">ID</th>
            <th className="user-table-header-cell">Email</th>
            <th className="user-table-header-cell">Selected Dishes</th>
            <th className="user-table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="user-table-body">
          {currentUsers.map((u) => (
            <tr key={u.id} className="user-table-row">
              <td className="user-table-cell">{u.id}</td>
              <td className="user-table-cell">{u.email}</td>
              <td className="user-table-cell">
                <button
                  className="show-selection-button"
                  onClick={() => openModal(u)}
                >
                  Show Selected Dishes
                </button>
              </td>
              <td className="user-table-cell">
                <MdEdit
                  className="action-icon"
                  onClick={() => openEditModal(u)}
                />
                <MdDelete
                  className="action-icon"
                  onClick={() => handleDelete(u.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <EditUserModal
        editModalOpen={editModalOpen}
        closeEditModal={closeEditModal}
        currentUser={currentUser}
        handleEditSave={handleEditSave}
        setCurrentUser={setCurrentUser}
      />
      <ShowSelectionModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        currentUser={currentUser}
      />
    </div>
  );
};

export default AdminPanel;
