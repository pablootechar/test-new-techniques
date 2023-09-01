import React from "react";
import { darkCyan, darkPurple } from "../../../styles"
import { styled } from "styled-components";

export const ThemeSelector = () => {

    const themes = [
        darkCyan,
        darkPurple,
    ]

    const setNewTheme = (themeTitle) => {
        localStorage.setItem("currentTheme", themeTitle);
        window.location.reload(); 
    }

    const DivTwoColorsOfTheme = styled.div`
        display: flex;
        height: 25px;
        width: 63px;
        justify-content: space-between;
        position: relative;
        background: #2d2d2d;
        padding: 5px;
        margin: 10px;
    `

    const DivTheme = styled.div`
        height: 100%;
        width: 25px;
    `

    const ThemeColor = (backgroundColor) => {
        const themeStyle = {
            background: backgroundColor
        }

        return themeStyle;
    }

    return (
        <div>
            <h3>Themes</h3>
            {themes.map(theme => {
                return (
                    <DivTwoColorsOfTheme key={theme.themeTitle} onClick={() => setNewTheme(theme.themeTitle)}>
                        <DivTheme style={ThemeColor(theme.colors.background)} />
                        <DivTheme style={ThemeColor(theme.representativeColor)} />
                    </DivTwoColorsOfTheme>
                )
            })}
        </div>
    )
}
