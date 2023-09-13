import React from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import styled from "styled-components";

const LogoutButton = styled.button`
  background: #000;
  width: 90%;
  margin: 5%;
  border: 2px solid red;
  padding: 10px;
  font-size: 20px;
  color: red;
`;

const LoginButton = styled.button`
  background: #000;
  width: 90%;
  margin: 5%;
  border: 2px solid green;
  padding: 10px;
  font-size: 20px;
  color: green;
`;

export const Settings = () => {
  const isLogged = localStorage.getItem("@animatrix/profile");

  const loginClick = () => {
    window.location.href = "/profile/login";
  };

  const logoutClick = () => {
    localStorage.removeItem("@animatrix/profile");
    window.location.reload();
  };

  return (
    <div>
      <h1>Settings</h1>
      <ThemeSelector />
      {isLogged === null ? (
        <LoginButton onClick={loginClick}>Login</LoginButton>
      ) : (
        <LogoutButton onClick={logoutClick}>Logout</LogoutButton>
      )}
    </div>
  );
};
