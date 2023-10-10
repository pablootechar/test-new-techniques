import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AdminButton, ThemeSelector, UserInfo } from "./components";
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
  const localInfos = JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const encryptedEmail = SHA512(localInfos?.email).toString();
  const buttonRef = useRef();
  const defaultUserEmail = "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e";

  useEffect(() => {
    async function setEssentialInfo() {
      let infoUser = await DatabaseApi.isLogged(
        encryptedEmail || defaultUserEmail
      );
      localStorage.setItem("@animatrix/user-photoId", infoUser?.photoId)
      let imageUrl = await DatabaseApi.getImageUrl(infoUser?.photoId);

      setUserInfo(infoUser);
      setUserPhoto(imageUrl);
    }

    setEssentialInfo();

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
          textMessage={userInfo?.id === 1 && "Você precisa fazer login antes"}
          modalState={showMessage}
          handleStateOfModal={setShowMessage}
        />
      )}
      <UserInfo
        userName={userInfo?.name}
        userPlan={userInfo?.isPremium}
        userPhoto={userPhoto}
        userId={userInfo?.id}
        showModal={showMessage}
        setShowModal={setShowMessage}
      />
      {userInfo?.isAdmin === 1 && <AdminButton />}
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
