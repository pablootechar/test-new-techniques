import React, { useState, useEffect } from "react";
import DatabaseApi from "../../shared/DatabaseApi";
import { Loading } from "../../shared/components";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`;

const ListHead = styled.div`
  background: ${({ theme }) => theme.representativeColor};
  display: flex;
  width: 100%;
  padding: 4px;
  justify-content: space-between;
  align-items: center;

  & > h5 {
    padding: 0px 5px;
    border-right: 1px solid #fff;

    &:last-child {
      border: none;
    }
  }
`;

const ItemCategory = styled.div`
    margin-right: 20px;
`;

const ItemContent = styled.div``;

const UserList = styled.ul``;

const UserItem = styled.li`
    display: flex;
    margin-bottom: 20px;
`;

export const AdminPage = () => {
  const [storageAllUser, setStorageAllUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const textColor = {
    color: "#000",
  };

  useEffect(() => {
    async function getInfo() {
      const allUser = await DatabaseApi.getAllUsers();
      setStorageAllUser(allUser);
    }
    getInfo();
  }, []);

  const showModalOfExclude = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const reloadUserList = async () => {
    const allUser = await DatabaseApi.getAllUsers();
    setStorageAllUser(allUser);
  };

  const handleConfirmDelete = async (user_id) => {
    try {
      await DatabaseApi.adminRemoveUsers(user_id);
      reloadUserList();
      setShowModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const showModalOfEdit = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
  };

  const handleEditNameChange = (e) => {
    const newName = e.target.value;
    setUserToEdit((prevUser) => ({ ...prevUser, name: newName }));
  };

  const handleConfirmEdit = async () => {
    await DatabaseApi.adminEditUser(
      userToEdit.id,
      userToEdit.isPremium,
      userToEdit.isAdmin
    );
    reloadUserList();
    setShowEditModal(false);
    setUserToEdit(null);
    window.location.reload();
  };

  const handleEditIsPremiumChange = (e) => {
    const newIsPremium = parseInt(e.target.value);
    setUserToEdit((prevUser) => ({ ...prevUser, isPremium: newIsPremium }));
  };

  const handleEditIsAdminChange = (e) => {
    const newIsAdmin = parseInt(e.target.value);
    setUserToEdit((prevUser) => ({ ...prevUser, isAdmin: newIsAdmin }));
  };

  return typeof storageAllUser !== "undefined" ? (
    <AdminContainer>
      <h1>User control</h1>
      <UserList>
        {/* <ListHead>
          <h5>id</h5>
          <h5>name</h5>
          <h5>premium</h5>
          <h5>admin</h5>
          <h5>actions</h5>
        </ListHead> */}
        {storageAllUser.map((singleUser) => {
          return (
            <UserItem key={singleUser?.id} className="list-title">
              <ItemCategory>
                <h5>id</h5>
                <h5>name</h5>
                <h5>premium</h5>
                <h5>admin</h5>
                <h5>actions</h5>
              </ItemCategory>
              <ItemContent>
                <h5>{singleUser?.id}</h5>
                <h5>{singleUser?.name}</h5>
                <h5>{singleUser?.isPremium === 1 ? "true" : "false"}</h5>
                <h5>{singleUser?.isAdmin === 1 ? "true" : "false"}</h5>
                <div className="admim-button">
                  <button
                    onClick={() => showModalOfEdit(singleUser)}
                    className="edit-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      fill="#ffffff"
                    >
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => showModalOfExclude(singleUser)}
                    className="delete-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      fill="#ffffff"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </div>
              </ItemContent>
            </UserItem>
          );
        })}
      </UserList>

      <Modal show={showModal} onHide={handleCloseModal} className="modal-main">
        <Modal.Header closeButton>
          <Modal.Title style={textColor}>Confirmação de exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-delete-user">
          Você deseja mesmo excluir o usuário {userToDelete?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="modal-button-cancel"
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            className="modal-button-save"
            onClick={() => handleConfirmDelete(userToDelete?.id)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        className="modal-main"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <label>Id:</label>
            <input
              type="text"
              value={userToEdit?.id || ""}
              onChange={handleEditNameChange}
              disabled
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={userToEdit?.name || ""}
              onChange={handleEditNameChange}
              disabled
            />
          </div>
          <div>
            <label>isPremium:</label>
            <select
              value={userToEdit?.isPremium || 0}
              onChange={handleEditIsPremiumChange}
            >
              <option value={1}>true</option>
              <option value={0}>false</option>
            </select>
          </div>
          <div>
            <label>isAdmin:</label>
            <select
              value={userToEdit?.isAdmin || 0}
              onChange={handleEditIsAdminChange}
            >
              <option value={1}>true</option>
              <option value={0}>false</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="modal-button-cancel"
            onClick={handleCloseEditModal}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="modal-button-save"
            onClick={handleConfirmEdit}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

    </AdminContainer>
  ) : (
    <Loading />
  );
};
