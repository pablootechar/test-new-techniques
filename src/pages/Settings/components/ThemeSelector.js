import React, { useState } from "react";
import { styled } from "styled-components";
import {
  darkCyan,
  darkPurple,
  darkPink,
  darkOrange,
  darkSkyBlue,
  darkNavyBlue,
  darkYellow,
  darkGreen,
  darkRed,
  darkCrimson,
} from "../../../styles";

const themes = [
  darkCyan,
  darkPurple,
  darkPink,
  darkOrange,
  darkSkyBlue,
  darkNavyBlue,
  darkYellow,
  darkGreen,
  darkRed,
  darkCrimson,
];

const ThemeStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: calc(100% - 20px);
  margin: 0 10px;
  padding: 10px 20px;
  background: #0a0a0a;
`;

const ThemeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 7px;
  margin: 5px 20px;
  background: #0f0f0f;
`;

const ThemeColor = styled.div`
  height: 25px;
  width: 100%;
  background-color: ${(props) => props.color};
`;

const Dropdown = styled.div`
  background: #0d0d0d;
  width: 95%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  padding: 0px 10px;
`;

export const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setNewTheme = (themeTitle) => {
    localStorage.setItem("@animatrix/theme", themeTitle);
    window.location.reload();
  };

  return (
    <div>
      <Dropdown onClick={() => setIsOpen(!isOpen)}>
        <h3>Themes</h3>
        <i
          className={isOpen ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}
          style={{ color: "#f5f5f5" }}
        ></i>
      </Dropdown>
      {isOpen && (
        <ThemeStyles>
          {themes.map((theme) => (
            <ThemeBox
              key={theme.themeTitle}
              onClick={() => setNewTheme(theme.themeTitle)}
            >
              <ThemeColor color={theme.colors.background} style={{ marginRight: "5px" }} />
              <ThemeColor color={theme.representativeColor} />
            </ThemeBox>
          ))}
        </ThemeStyles>
      )}
    </div>
  );
};
