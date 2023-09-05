import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    body{
        background: ${(props => props.theme.colors.background)};
        font-size: 16px;
        color: ${(props => props.theme.colors.textColor)};
        height: 100vh;
        width: 100%;
        padding-bottom: 50px;
    }
`