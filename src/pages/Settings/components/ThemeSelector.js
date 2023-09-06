import React, { useState } from "react";
import {
  darkCyan,
  darkPurple,
  darkPink,
  darkOrange,
  darkSkyBlue,
  darkYellow,
  darkGreen,
  darkRed,
  darkCrimson,
  darkNavyBlue,
} from "../../../styles";
import { styled } from "styled-components";

const AllThemes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 10px;
  width: 80%;
`;

const DivTwoColorsOfTheme = styled.div`
  display: flex;
  height: 25px;
  width: 63px;
  justify-content: space-between;
  position: relative;
  background: #2d2d2d;
  padding: 5px;
  margin: 10px;
`;

const DivTheme = styled.div`
  height: 100%;
  width: 25px;
`;

const Dropdown = styled.div`
  background: #141414;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const setNewTheme = (themeTitle) => {
    localStorage.setItem("currentTheme", themeTitle);
    window.location.reload();
  };

  const ThemeColor = (backgroundColor) => {
    const themeStyle = {
      background: backgroundColor,
    };

    return themeStyle;
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
        <AllThemes>
          {themes.map((theme) => {
            return (
              <DivTwoColorsOfTheme
                key={theme.themeTitle}
                onClick={() => setNewTheme(theme.themeTitle)}
              >
                <DivTheme style={ThemeColor(theme.colors.background)} />
                <DivTheme style={ThemeColor(theme.representativeColor)} />
              </DivTwoColorsOfTheme>
            );
          })}
        </AllThemes>
      )}
    </div>
  );
};
