import React, { useState, useEffect } from "react";
import DatabaseApi from "../../../shared/DatabaseApi";
import { Loading } from "../../../shared/components";
import styled from "styled-components";
import { shade } from "polished";
// import modalStyle from "../Css/Modal.module.css"

const Container = styled.div`
  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 100%;
`;

const BackgroundOfModal = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalOfAllPhotos = styled.div`
  position: fixed;
  z-index: 1000000;
  top: 2vh;
  bottom: 2vh;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 96vh;
  background: #000000;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.representativeColor};
  border-radius: 8px;
`;

const ButtonCloseModal = styled.button`
  position: fixed;
  top: 1vh;
  right: 1.5vh;
  background: ${({ theme }) => shade(0.2, theme.representativeColor)};
  padding: 3px 5px;
  border-radius: 3px;
  border: none;
`;

const XIcon = styled.i`
  color: #f5f5f5;
  font-size: 3vh;
`;

const ListOfPhotos = styled.div``;

const ListOfCategoryTitle = styled.h3`
    font-size: 25px;
    margin: 10px 0;
`;

const ListOfCategory = styled.ul`
  display: flex;
  overflow-x: auto;
`;

const ListItem = styled.li`
  margin-right: 15px;
  & > img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;

const LoadPhotos = ({ info, setValueToIsOpen }) => {
  const loggedUser = JSON.parse(localStorage.getItem("@animatrix/profile"));

  const setNewPhoto = async (photo_id) => {
    await DatabaseApi.setNewUserPhoto(loggedUser?.id, photo_id);
    // localStorage.setItem("@animatrix/recent-update-photo", true)
    window.location.reload();
    setValueToIsOpen(false);
  };

  return (
    <ListOfPhotos>
      <ListOfCategoryTitle>{info.nameRow}</ListOfCategoryTitle>
      <ListOfCategory>
        {info.photos.map((photo) => {
          return (
            <ListItem
              key={photo.idphotos}
              onClick={() => setNewPhoto(photo.idphotos)}
            >
              <img
                src={photo.photoUrl}
                alt={`${info.nameRow} ${photo.idphotos}`}
              />
            </ListItem>
          );
        })}
      </ListOfCategory>
    </ListOfPhotos>
  );
};

export const ModalPhoto = ({ isOpen, setOpen }) => {
  const [rows, setRows] = useState();

  useEffect(() => {
    async function getPhotos() {
      const OnePiece = await DatabaseApi.getAllPhotos("one_piece");
      const Jujutsu = await DatabaseApi.getAllPhotos("jujutsu_kaisen");
      const BlackClover = await DatabaseApi.getAllPhotos("black_clover");
      const Inuyasha = await DatabaseApi.getAllPhotos("inuyasha");

      const allRows = [
        { nameRow: "One Piece", photos: OnePiece },
        { nameRow: "Jujutsu Kaisen", photos: Jujutsu },
        { nameRow: "Black Clover", photos: BlackClover },
        { nameRow: "Inuyasha", photos: Inuyasha },
      ];

      setRows(allRows);
    }

    getPhotos();
  }, []);

  if (isOpen) {
    return (
      <Container>
        <BackgroundOfModal onClick={() => setOpen(!isOpen)} />
        <ModalOfAllPhotos>
          <ButtonCloseModal onClick={() => setOpen(!isOpen)}>
            <XIcon className="fa-solid fa-x" onClick={() => setOpen(!isOpen)} />
          </ButtonCloseModal>
          <h1>Chose you photo</h1>
          {typeof rows !== "undefined" ? (
            rows.map((row) => {
              return <LoadPhotos info={row} setValueToIsOpen={setOpen} />;
            })
          ) : (
            <Loading />
          )}
        </ModalOfAllPhotos>
      </Container>
    );
  }
};
