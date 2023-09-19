import styled from "styled-components";

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

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 80%;
  margin: 10%;
  position: absolute;
  bottom: 10%;
  border-radius: 8px;
  z-index: 100;
`;

const BoxText = styled.h3`
  color: #fff;
  text-align: center;
`;

const XIcon = styled.i`
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 20px;
`;

export const MessageModal = ({
  typeMessage,
  textMessage,
  modalState,
  handleStateOfModal,
}) => {

  const closeModal = () => {
    localStorage.removeItem("@animatrix/recent-update-photo");
    handleStateOfModal(!modalState);
  };

  return (
    <Container>
      <BackgroundOfModal onClick={() => closeModal()} />
      <MessageBox
        style={{
          background: typeMessage === "error" ? "#f22e2e" : "#30bf62",
          border: `2px solid ${
            typeMessage === "error" ? "#ff0000" : "#00a339"
          }`,
        }}
      >
        <XIcon className="fa-solid fa-x" onClick={() => closeModal()} />
        <BoxText>{textMessage}</BoxText>
      </MessageBox>
    </Container>
  );
};
