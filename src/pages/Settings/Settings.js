import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ThemeSelector, UserInfo } from "./components";
import { Loading, MessageModal } from "../../shared/components";
import DatabaseApi from "../../shared/DatabaseApi";
import { SHA512 } from "crypto-js";

const Button = styled.button`
  background: #000;
  width: 90%;
  margin: 5%;
  padding: 10px;
  font-size: 20px;

  &.login {
    border: 2px solid green;
    color: green;
  }

  &.logout {
    border: 2px solid red;
    color: red;
  }
`;

export const Settings = () => {
  const [canRender, setCanRender] = useState(false);
  const isLogged = localStorage.getItem("@animatrix/profile");

  const localInfos =
    JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [loggedOutUser, setLoggedOutUser] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const encryptedEmail = SHA512(localInfos?.email).toString();
  const buttonRef = useRef();

  useEffect(() => {
    async function setEssentialInfo() {
      let infoUser = await DatabaseApi.isLogged(encryptedEmail);
      let imageUrl = await DatabaseApi.getImageUrl(infoUser?.photoId);
      setUserInfo(infoUser);
      setUserPhoto(imageUrl);
    }

    if (localInfos?.id) {
      setEssentialInfo();
    } else {
      setLoggedOutUser(true);
    }
    setTimeout(() => {
      setCanRender(true);
    }, 1000);
  }, []);

  const loginClick = () => {
    window.location.href = "/profile/login";
  };

  const logoutClick = () => {
    localStorage.removeItem("@animatrix/profile");
    window.location.reload();
  };

  const handleButtonClick = () => {
    const button = buttonRef.current;
    if (button) {
      const classList = Array.from(button.classList);
      if (classList.includes("login")) {
        loginClick();
      } else if (classList.includes("logout")) {
        logoutClick();
      }
    }
  };

  return canRender ? (
    <div>
      <h1>Settings</h1>
      {showMessage && (
        <MessageModal
          typeMessage="error"
          textMessage="calma lá paizão, ainda n fiz essa tela"
          modalState={showMessage}
          handleStateOfModal={setShowMessage}
        />
      )}
      <UserInfo
        userName={userInfo?.name}
        userPlan={userInfo?.isPremium}
        userPhoto={userPhoto}
        loggedOutUser={loggedOutUser}
        showModal={showMessage}
        setShowModal={setShowMessage}
      />
      <ThemeSelector />
      <Button
        ref={buttonRef}
        className={isLogged === null ? "login" : "logout"}
        onClick={handleButtonClick}
      >
        {isLogged === null ? "Login" : "Logout"}
      </Button>
    </div>
  ) : (
    <Loading />
  );
};
