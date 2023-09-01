import { styled } from "styled-components";


export const MainHome = styled.div`
    background: linear-gradient(to bottom, ${(props => props.theme.representativeColor)}, ${(props => props.theme.colors.background)}) ;
    height: 100vh;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    position: relative;
`