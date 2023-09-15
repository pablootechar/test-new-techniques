import { shade } from "polished";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-decoration: none !important;
        outline: none;
    }

    body{
        background: ${({ theme }) => theme.colors.background};
        font-size: 16px;
        color: ${({ theme }) => theme.colors.textColor};
        height: 100vh;
        width: 100%;
        padding-bottom: 50px;
    }

    body::-webkit-scrollbar {
        width: 10px;
        background: #1a1a1a;
    }

    body::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => shade(0.2, theme.colors.textColor)};
        border-radius: 20px;
    }

    ::selection{
        background: ${({ theme }) => theme.representativeColor};
        color: #f5f5f5;
    }

`;
