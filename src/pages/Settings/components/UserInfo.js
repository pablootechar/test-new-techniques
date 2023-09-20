import styled from "styled-components";
import { shade } from "polished";

const DivOfUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background: #0a0a0a;
`;

const UserImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`;

const UserNameAndPlan = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 15px;
`;

const UserName = styled.h1`
    font-size: 18px;
    font-weight: bold;
`;

const UserPlan = styled.h5`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;

  &.premium {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(
      45deg,
      ${({ theme }) => shade(0.05, theme.representativeColor)},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.4, theme.representativeColor)}
    );
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 300%;
    color: transparent;
    animation: rgb-border 8s linear infinite;
  }

  @keyframes rgb-border {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 300%;
    }
  }
`;

export const UserInfo = ({ userPhoto, userName, userPlan, loggedOutUser, showModal, setShowModal }) => {
  return (
    <DivOfUserInfo onClick={() => setShowModal(!showModal)}>
      {loggedOutUser ? (
        <div>Faz login pae</div>
      ) : (
        <>
          <UserImage src={userPhoto} alt="" />
          <UserNameAndPlan>
            <UserName>{userName}</UserName>
            <UserPlan className={userPlan === 1 ? "premium" : "free"}>{userPlan === 1 ? "Premium" : "Free"}</UserPlan>
          </UserNameAndPlan>
          <i className="fa-solid fa-angle-right"></i>
        </>
      )}
    </DivOfUserInfo>
  );
};
